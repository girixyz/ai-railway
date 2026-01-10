
import os
import shutil
import zipfile
import subprocess
import sys
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset
from torchvision import datasets, models, transforms
from tqdm import tqdm
from PIL import Image

# ==========================================
# 0. SETUP & ENVIRONMENT CHECK
# ==========================================

def install_package(package_name):
    try:
        __import__(package_name)
    except ImportError:
        print(f"Installing {package_name}...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", package_name])

# Auto-install ultralytics if missing (Standard for Colab)
try:
    import ultralytics
except ImportError:
    print("Ultralytics not found. Installing...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "ultralytics"])
    import ultralytics

from ultralytics import YOLO

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using Device: {DEVICE}")

# ==========================================
# 1. HELPERS
# ==========================================

def setup_colab_dataset(zip_name="dataset.zip", extract_root="/content"):
    """
    Helper to unzip the dataset if running in Colab.
    Expected zip structure:
      /train, /valid, /test (for YOLO)
      /training data/engine, /training data/wagons (for Classifier)
    """
    zip_path = os.path.join(extract_root, zip_name)
    
    if os.path.exists(zip_path):
        print(f"Found {zip_name}. Extracting...")
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(extract_root)
        print("Extraction complete.")
    else:
        print(f"Note: {zip_name} not found at {extract_root}. Assuming files are already present or uploaded manually.")

# ==========================================
# 2. CLASSIFICATION MODEL (Engine vs Wagons)
# ==========================================

def train_classifier(data_dir, num_epochs=10):
    print("\n=== Starting Engine/Wagon Classification Training ===")
    
    # Data Augmentation & Normalization
    data_transforms = {
        'train': transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.RandomHorizontalFlip(),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ]),
        'val': transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ]),
    }

    if not os.path.exists(data_dir):
        print(f"Skipping Classification Check: Directory '{data_dir}' not found.")
        print(f"Current Working Directory: {os.getcwd()}")
        print(f"Contents: {os.listdir(os.getcwd())}")
        return

    # Load Data
    # ImageFolder expects structure: data_dir/class_name/images...
    try:
        full_dataset = datasets.ImageFolder(data_dir, data_transforms['train'])
    except Exception as e:
        print(f"Error loading dataset from {data_dir}: {e}")
        return

    # Split 80/20 train/val
    train_size = int(0.8 * len(full_dataset))
    val_size = len(full_dataset) - train_size
    train_dataset, val_dataset = torch.utils.data.random_split(full_dataset, [train_size, val_size])
    
    dataloaders = {
        'train': DataLoader(train_dataset, batch_size=32, shuffle=True, num_workers=2),
        'val': DataLoader(val_dataset, batch_size=32, shuffle=False, num_workers=2)
    }
    
    class_names = full_dataset.classes
    print(f"Classes found: {class_names}")

    # Load Pretrained ResNet18
    # Updated 'weights' syntax for newer torchvision versions, handled gracefully
    try:
        weights = models.ResNet18_Weights.DEFAULT
        model = models.resnet18(weights=weights)
    except AttributeError:
        # Fallback for older torchvision (often default in some Colab envs)
        model = models.resnet18(pretrained=True)

    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, len(class_names))
    model = model.to(DEVICE)

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.SGD(model.parameters(), lr=0.001, momentum=0.9)
    
    # Training Loop
    for epoch in range(num_epochs):
        print(f'Epoch {epoch+1}/{num_epochs}')
        print('-' * 10)

        for phase in ['train', 'val']:
            if phase == 'train':
                model.train()
            else:
                model.eval()

            running_loss = 0.0
            running_corrects = 0

            # Iterate over data
            for inputs, labels in tqdm(dataloaders[phase], desc=f"{phase} Phase"):
                inputs = inputs.to(DEVICE)
                labels = labels.to(DEVICE)

                optimizer.zero_grad()

                with torch.set_grad_enabled(phase == 'train'):
                    outputs = model(inputs)
                    _, preds = torch.max(outputs, 1)
                    loss = criterion(outputs, labels)

                    if phase == 'train':
                        loss.backward()
                        optimizer.step()

                running_loss += loss.item() * inputs.size(0)
                running_corrects += torch.sum(preds == labels.data)

            epoch_loss = running_loss / len(dataloaders[phase].dataset)
            epoch_acc = running_corrects.double() / len(dataloaders[phase].dataset)

            print(f'{phase} Loss: {epoch_loss:.4f} Acc: {epoch_acc:.4f}')

    print("Classification Training Complete.")
    torch.save(model.state_dict(), "classifier_resnet18.pth")
    print("Saved 'classifier_resnet18.pth'")


# ==========================================
# 3. OBJECT DETECTION (Wheel Defects via YOLO)
# ==========================================

def create_yolo_yaml(train_path, val_path, test_path, nc, names):
    yaml_content = f"""
train: {train_path}
val: {val_path}
test: {test_path}

nc: {nc}
names: {names}
    """
    with open("custom_data.yaml", "w") as f:
        f.write(yaml_content)
    return os.path.abspath("custom_data.yaml")

def train_yolo_detector(train_dir, valid_dir, test_dir, epochs=20):
    print("\n=== Starting Wheel Defect Detection (YOLO) ===")
    
    if not os.path.exists(train_dir):
        print(f"Skipping YOLO: Directory {train_dir} not found.")
        return

    # Update this with your specific defect classes
    # Ensure this matches your dataset logic
    class_names = ['defect'] 
    
    yaml_path = create_yolo_yaml(
        train_path=train_dir,
        val_path=valid_dir,
        test_path=test_dir,
        nc=len(class_names),
        names=class_names 
    )
    
    print(f"Created YAML at: {yaml_path}")
    
    # Load model
    model = YOLO("yolov8n.pt") # Nano model for speed

    # Train
    # project arg helps save results in a specific folder
    results = model.train(
        data=yaml_path, 
        epochs=epochs, 
        imgsz=640, 
        project="wheels_yolo",
        name="run1"
    )
    
    print("YOLO Training Complete.")


# ==========================================
# 4. EXECUTION BLOCK
# ==========================================

if __name__ == "__main__":
    # Define Content Root - logic mainly for Colab
    CONTENT_ROOT = "/content" if os.path.exists("/content") else "."
    
    # 0. Setup (Extract Zip if needed)
    # Upload your 'dataset.zip' to /content/ before running this
    setup_colab_dataset("dataset.zip", CONTENT_ROOT)

    # 1. Train Classifier (Engine vs Wagon)
    # Adjust path if 'training data' extracted effectively
    classifier_path = os.path.join(CONTENT_ROOT, "training data")
    
    if os.path.exists(classifier_path):
        train_classifier(classifier_path, num_epochs=10)
    else:
        # Fallback check if it's not nested
        train_classifier("training data", num_epochs=10)
    
    # 2. Train Detector (Wheels)
    # Adjust paths based on extraction
    train_dir = os.path.join(CONTENT_ROOT, "train")
    valid_dir = os.path.join(CONTENT_ROOT, "valid")
    test_dir = os.path.join(CONTENT_ROOT, "test")
    
    train_yolo_detector(
        train_dir=os.path.abspath(train_dir), 
        valid_dir=os.path.abspath(valid_dir), 
        test_dir=os.path.abspath(test_dir),
        epochs=20
    )

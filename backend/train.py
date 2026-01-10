import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import DataLoader, Subset
from ml.dataset import DeblurDataset
from ml.model import DeblurUNet
import os
from torchvision.utils import save_image
from torchvision.models import vgg19, VGG19_Weights
from tqdm import tqdm
import numpy as np
from dataclasses import dataclass


@dataclass(frozen=True)
class TrainingConfig:
    batch_size: int = 4
    learning_rate: float = 1e-4
    weight_decay: float = 1e-5  # Regularization to prevent overfitting
    epochs: int = 50
    device: str = "cuda" if torch.cuda.is_available() else "cpu"
    dataset_path: str = r"c:\New folder\blurred_sharp\blurred_sharp"
    checkpoint_dir: str = "checkpoints"
    sample_dir: str = "samples"
    perceptual_weight: float = 0.1  # Weight for VGG Loss


class PerceptualLoss(nn.Module):
    def __init__(self, device):
        super().__init__()
        # Load VGG19 using new weights API
        weights = VGG19_Weights.DEFAULT
        vgg = vgg19(weights=weights).features
        
        # We use a slice of VGG layers (up to relu5_4) for feature extraction
        self.vgg_features = vgg[:36].eval().to(device)
        
        for param in self.vgg_features.parameters():
            param.requires_grad = False
            
        # ImageNet normalization
        self.register_buffer("mean", torch.tensor([0.485, 0.456, 0.406]).view(1, 3, 1, 1).to(device))
        self.register_buffer("std", torch.tensor([0.229, 0.224, 0.225]).view(1, 3, 1, 1).to(device))

    def forward(self, input, target):
        # Normalize inputs for VGG
        if input.shape[1] != 3:
            input = input.repeat(1, 3, 1, 1)
            target = target.repeat(1, 3, 1, 1)
            
        input = (input - self.mean) / self.std
        target = (target - self.mean) / self.std
        
        input_features = self.vgg_features(input)
        target_features = self.vgg_features(target)
        
        return F.mse_loss(input_features, target_features)


def prepare_config() -> TrainingConfig:
    config = TrainingConfig()
    os.makedirs(config.checkpoint_dir, exist_ok=True)
    os.makedirs(config.sample_dir, exist_ok=True)
    return config


def train_one_epoch(model, loader, criterion_l1, criterion_perceptual, optimizer, config):
    model.train()
    running_loss = 0.0
    loop = tqdm(loader, desc="Training")
    
    for blur_imgs, sharp_imgs in loop:
        blur_imgs = blur_imgs.to(config.device)
        sharp_imgs = sharp_imgs.to(config.device)
        
        # Forward
        outputs = model(blur_imgs)
        
        l1_loss = criterion_l1(outputs, sharp_imgs)
        p_loss = criterion_perceptual(outputs, sharp_imgs)
        
        loss = l1_loss + (config.perceptual_weight * p_loss)
        
        # Backward
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        
        running_loss += loss.item()
        loop.set_postfix(loss=loss.item(), l1=l1_loss.item(), vgg=p_loss.item())
        
    return running_loss / len(loader)

def validate(model, loader, criterion_l1, config, epoch):
    model.eval()
    running_loss = 0.0
    with torch.no_grad():
        for i, (blur_imgs, sharp_imgs) in enumerate(loader):
            blur_imgs = blur_imgs.to(config.device)
            sharp_imgs = sharp_imgs.to(config.device)
            
            outputs = model(blur_imgs)
            loss = criterion_l1(outputs, sharp_imgs)
            running_loss += loss.item()
            
            # Save first batch samples
            if i == 0:
                comparison = torch.cat([blur_imgs[:4], outputs[:4], sharp_imgs[:4]], dim=0)
                save_image(comparison, f"{config.sample_dir}/epoch_{epoch}.png", nrow=4)
                
    return running_loss / len(loader)

def main(config: TrainingConfig | None = None):
    config = config or prepare_config()
    print(f"Using device: {config.device}")
    print(f"Regularization: Weight Decay {config.weight_decay}")
    print(f"Perceptual Loss Weight: {config.perceptual_weight}")
    
    # 1. Create indices for split
    # We use a temporary dataset just to get length
    temp_dataset = DeblurDataset(root_dir=config.dataset_path)
    total_len = len(temp_dataset)
    train_size = int(0.9 * total_len)
    
    # Generate random indices
    indices = list(range(total_len))
    np.random.seed(42) # Fixed seed for reproducibility
    np.random.shuffle(indices)
    
    train_indices = indices[:train_size]
    val_indices = indices[train_size:]
    
    # 2. Create Datasets with correct flags
    # Train set gets Augmentation
    train_dataset_full = DeblurDataset(root_dir=config.dataset_path, augment=True)
    train_ds = Subset(train_dataset_full, train_indices)
    
    # Val set fits PURE distribution (no augmentation)
    val_dataset_full = DeblurDataset(root_dir=config.dataset_path, augment=False)
    val_ds = Subset(val_dataset_full, val_indices)
    
    train_loader = DataLoader(train_ds, batch_size=config.batch_size, shuffle=True)
    val_loader = DataLoader(val_ds, batch_size=config.batch_size, shuffle=False)
    
    print(f"Training on {len(train_ds)} images (Augmented), validating on {len(val_ds)} images (Pure)")

    # Model
    model = DeblurUNet().to(config.device)
    # Check if we should resume or start fresh
    # If the user wants to refine accuracy, improving an existing model is often better than starting from scratch
    # BUT starting with a new loss landscape often requires careful tuning. 
    # Let's load if exists.
    if os.path.exists(os.path.join(config.checkpoint_dir, "best_model.pth")):
        print("Resuming from checkpoint...")
        try:
            model.load_state_dict(torch.load(os.path.join(config.checkpoint_dir, "best_model.pth")))
        except:
             print("Checkpoint mismatch or error. Starting generic training...")

    # Losses
    criterion_l1 = nn.L1Loss() 
    criterion_perceptual = PerceptualLoss(config.device)
    
    # Optimizer
    optimizer = optim.Adam(model.parameters(), lr=config.learning_rate, weight_decay=config.weight_decay)
    
    best_loss = float('inf')
    
    for epoch in range(config.epochs):
        print(f"Epoch {epoch+1}/{config.epochs}")
        train_loss = train_one_epoch(model, train_loader, criterion_l1, criterion_perceptual, optimizer, config)
        val_loss = validate(model, val_loader, criterion_l1, config, epoch+1)
        
        print(f"Train Loss (Combined): {train_loss:.4f} | Val L1 Loss: {val_loss:.4f}")
        
        # Save best model based on L1 validation loss (standard)
        # Even though we train with Perceptual, we want the model that is theoretically closest to ground truth
        if val_loss < best_loss:
            best_loss = val_loss
            print("Saving best model...")
            torch.save(model.state_dict(), os.path.join(config.checkpoint_dir, "best_model.pth"))

if __name__ == "__main__":
    main()

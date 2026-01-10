
import cv2
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import os
import glob
from nafnet_model import NAFNetSmall
from tqdm import tqdm
import math

# --- User's Code (Adapted for Integration) ---
class SyntheticTrainBlurDataset(Dataset):
    def __init__(self, image_paths, patch_size=256):
        self.image_paths = image_paths
        self.patch_size = patch_size

    def apply_linear_motion_blur(self, image):
        # 1. Randomize "Speed" (Kernel Size)
        kernel_size = np.random.randint(15, 45) 
        
        # 2. Randomize "Angle" (Horizontal +/- 5 degrees for track variation)
        angle = np.random.randint(-5, 5)

        # 3. Create the Motion Blur Kernel
        M = cv2.getRotationMatrix2D((kernel_size / 2, kernel_size / 2), angle, 1)
        motion_blur_kernel = np.diag(np.ones(kernel_size))
        motion_blur_kernel = cv2.warpAffine(motion_blur_kernel, M, (kernel_size, kernel_size))
        motion_blur_kernel = motion_blur_kernel / kernel_size

        # 4. Convolve the image with the kernel
        blurred = cv2.filter2D(image, -1, motion_blur_kernel)
        return blurred

    def __getitem__(self, idx):
        # Load Sharp Image
        img_path = self.image_paths[idx]
        sharp_img = cv2.imread(img_path)
        if sharp_img is None:
            # Fallback for corrupted images
            sharp_img = np.zeros((self.patch_size, self.patch_size, 3), dtype=np.uint8)
            
        sharp_img = cv2.cvtColor(sharp_img, cv2.COLOR_BGR2RGB)
        
        # Resize/Crop to patch_size
        h, w = sharp_img.shape[:2]
        if h < self.patch_size or w < self.patch_size:
            sharp_img = cv2.resize(sharp_img, (self.patch_size, self.patch_size))
        else:
            # Random crop
            y = np.random.randint(0, h - self.patch_size + 1)
            x = np.random.randint(0, w - self.patch_size + 1)
            sharp_img = sharp_img[y:y+self.patch_size, x:x+self.patch_size]

        # Generate Input (Blurred) on the fly
        blur_img = self.apply_linear_motion_blur(sharp_img)

        # Normalize AND Convert to [-1, 1] to match NAFNet training
        # User code: .float() / 255.0  -> [0, 1]
        # We need: (x - 0.5) / 0.5     -> [-1, 1]
        
        sharp_tensor = torch.from_numpy(sharp_img).permute(2, 0, 1).float() / 255.0
        blur_tensor = torch.from_numpy(blur_img).permute(2, 0, 1).float() / 255.0
        
        sharp_tensor = (sharp_tensor - 0.5) / 0.5
        blur_tensor = (blur_tensor - 0.5) / 0.5

        return blur_tensor, sharp_tensor

    def __len__(self):
        return len(self.image_paths)

# --- Training Helper ---
def train_experimental_model():
    print("Initializing Experimental Training with Synthetic Motion Blur...")
    
    # Paths
    sharp_dir = r"blurred_sharp (1)\blurred_sharp\sharp"
    image_paths = sorted(glob.glob(os.path.join(sharp_dir, "*.png")))
    if not image_paths:
        print("No sharp images found!")
        return
        
    print(f"Found {len(image_paths)} sharp images for synthetic training.")
    
    # Dataset & Loader
    dataset = SyntheticTrainBlurDataset(image_paths)
    loader = DataLoader(dataset, batch_size=4, shuffle=True, num_workers=0)
    
    # Model - Load BEST checkpoint to fine-tune
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    checkpoint_path = "output/checkpoints/best.pth"
    
    model = NAFNetSmall().to(device)
    if os.path.exists(checkpoint_path):
        print(f"Loading existing best checkpoint from {checkpoint_path}...")
        checkpoint = torch.load(checkpoint_path, map_location=device, weights_only=False)
        model.load_state_dict(checkpoint['model_state_dict'])
    else:
        print("No checkpoint found, starting from scratch (Warning: Evaluation might be poor)")
        
    optimizer = optim.AdamW(model.parameters(), lr=1e-4) # Lower LR for finetuning
    criterion = nn.MSELoss() # Simple MSE for speed/check
    
    # Simplified Train Loop (1 Epoch or limit)
    model.train()
    total_loss = 0
    steps = 0
    max_steps = 200 # Limit steps for "Just Try" check (approx 20% of dataset)
    
    print(f"Training for {max_steps} steps...")
    pbar = tqdm(loader, total=max_steps)
    
    for blur, sharp in pbar:
        if steps >= max_steps:
            break
            
        blur, sharp = blur.to(device), sharp.to(device)
        
        optimizer.zero_grad()
        output = model(blur)
        loss = criterion(output, sharp)
        loss.backward()
        optimizer.step()
        
        total_loss += loss.item()
        steps += 1
        pbar.set_postfix({'loss': f'{loss.item():.4f}'})
        
    # Save Experimental Model
    os.makedirs("output/checkpoints", exist_ok=True)
    exp_path = "output/checkpoints/experimental.pth"
    torch.save({
        'model_state_dict': model.state_dict(),
        'epoch': 999,
        'psnr': 0
    }, exp_path)
    print(f"Experimental model saved to {exp_path}")
    return exp_path

# --- Evaluation Helper ---
def evaluate_model(checkpoint_path):
    print(f"Evaluating model: {checkpoint_path}")
    from evaluate_pipeline import calculate_ssim # reusing if possible, else reimplement
    from nafnet_model import NAFNetSmall
    from deblur_agent import DeblurAgent 
    
    # Re-instantiate agent with new checkpoint
    try:
        agent = DeblurAgent(checkpoint_path=checkpoint_path, model_size='small')
    except Exception as e:
        print(f"Error loading agent: {e}")
        return 0
        
    test_dir = os.path.abspath(r"blurred_sharp (1)\blurred_sharp\blurred")
    gt_dir = os.path.abspath(r"blurred_sharp (1)\blurred_sharp\sharp")
    
    if not os.path.exists(test_dir):
        print(f"Error: Test dir not found: {test_dir}")
        return 0

    files = sorted(os.listdir(test_dir))
    ssim_values = []
    
    count = 0
    for f in tqdm(files, desc="Eval"):
        if count >= 20: break
        
        if not f.endswith(('.png', '.jpg')): continue
        
        blur_path = os.path.join(test_dir, f)
        gt_path = os.path.join(gt_dir, f)
        
        if not os.path.exists(gt_path):
            continue
            
        blur = cv2.imread(blur_path)
        gt = cv2.imread(gt_path)
        
        if blur is None or gt is None: continue
        
        res = agent.deblur(blur)
        
        # Calculate SSIM
        try:
            from skimage.metrics import structural_similarity as ssim
            val = ssim(res, gt, data_range=255, channel_axis=2)
            ssim_values.append(val)
            count += 1
        except ImportError:
            pass
            
    avg_ssim = np.mean(ssim_values) if ssim_values else 0
    return avg_ssim

if __name__ == "__main__":
    # 1. Train
    exp_ckpt = train_experimental_model()
    
    # 2. Evaluate
    if exp_ckpt:
        acc = evaluate_model(exp_ckpt)
        print(f"\nExperimental Accuracy (SSIM): {acc*100:.2f}%")
        
        # Compare with baseline (hardcoded from previous run or re-run)
        print("Baseline Accuracy (approx): 88.25%")
        
        if acc > 0.8825:
             print("RESULT: SUCCESS! The code INCREASED accuracy.")
        else:
             print("RESULT: The code DID NOT increase accuracy in this short test.")
             # Revert logic implied by user: "make sure all the file are as it is"
             # Since we saved to 'experimental.pth', we define 'best.pth' as untouched.
             print("Files are unchanged (experimental model saved separately).")


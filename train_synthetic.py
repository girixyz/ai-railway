
import os
import cv2
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from torch.cuda.amp import GradScaler, autocast
import glob
from tqdm import tqdm
from nafnet_model import NAFNetSmall
import random

# --- GPU Optimization Settings ---
torch.backends.cudnn.benchmark = True # Optimize for fixed input sizes

class SyntheticBlurDataset(Dataset):
    def __init__(self, image_paths, patch_size=256, augment=True):
        self.image_paths = image_paths
        self.patch_size = patch_size
        self.augment = augment

    def apply_linear_motion_blur(self, image):
        # 1. Randomize "Speed" (Kernel Size)
        # 15 to 45 is a good range for moderate to heavy motion blur
        kernel_size = np.random.randint(15, 45) 
        
        # 2. Randomize "Angle" 
        # +/- 45 degrees to cover more scenarios than just +/- 5
        # The user's snippet had +/- 5, but real train wobbles/panning might be more.
        # But let's stick closer to user's "track variation" intuition first?
        # User snippet: angle = np.random.randint(-5, 5)
        # Let's expand slightly to be robust: +/- 10
        angle = np.random.randint(-10, 10)

        # 3. Create Kernel
        if kernel_size % 2 == 0: kernel_size += 1 # Ensure odd
        M = cv2.getRotationMatrix2D((kernel_size // 2, kernel_size // 2), angle, 1)
        motion_blur_kernel = np.diag(np.ones(kernel_size))
        motion_blur_kernel = cv2.warpAffine(motion_blur_kernel, M, (kernel_size, kernel_size))
        motion_blur_kernel = motion_blur_kernel / np.sum(motion_blur_kernel) # Normalize

        # 4. Convolve
        blurred = cv2.filter2D(image, -1, motion_blur_kernel)
        return blurred

    def __getitem__(self, idx):
        path = self.image_paths[idx]
        sharp_img = cv2.imread(path)
        
        # Fallback
        if sharp_img is None:
             sharp_img = np.zeros((self.patch_size, self.patch_size, 3), dtype=np.uint8)

        # Random Crop
        h, w = sharp_img.shape[:2]
        if h > self.patch_size and w > self.patch_size:
            y = np.random.randint(0, h - self.patch_size)
            x = np.random.randint(0, w - self.patch_size)
            sharp_img = sharp_img[y:y+self.patch_size, x:x+self.patch_size]
        else:
            sharp_img = cv2.resize(sharp_img, (self.patch_size, self.patch_size))

        # Augmentation (Flip/Rotate)
        if self.augment:
            if random.random() > 0.5: # HFlip
                sharp_img = cv2.flip(sharp_img, 1)
            if random.random() > 0.5: # VFlip
                sharp_img = cv2.flip(sharp_img, 0)
        
        # Generate Blur
        blur_img = self.apply_linear_motion_blur(sharp_img)

        # To Tensor & Normalize to [-1, 1] per NAFNet requirements
        # (x / 255.0 - 0.5) / 0.5
        sharp_tensor = torch.from_numpy(sharp_img).permute(2, 0, 1).float() / 255.0
        blur_tensor = torch.from_numpy(blur_img).permute(2, 0, 1).float() / 255.0
        
        sharp_tensor = (sharp_tensor - 0.5) / 0.5
        blur_tensor = (blur_tensor - 0.5) / 0.5

        return blur_tensor, sharp_tensor

    def __len__(self):
        return len(self.image_paths)

class Trainer:
    def __init__(self):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        print(f"Training on: {self.device}")
        
        # Params
        self.batch_size = 8 # Fit in 4050 VRAM (approx 4GB used maybe?)
        self.epochs = 50
        self.lr = 2e-4
        
        # Paths
        self.sharp_dir = r"dataset/a1"
        self.ckpt_dir = "output/checkpoints"
        os.makedirs(self.ckpt_dir, exist_ok=True)
        
        # Data
        files = sorted(glob.glob(os.path.join(self.sharp_dir, "*")))
        files = [f for f in files if f.lower().endswith(('.jpg', '.png', '.jpeg'))]
        
        # Split
        split_idx = int(len(files) * 0.9)
        train_files = files[:split_idx]
        val_files = files[split_idx:]
        
        print(f"Train set: {len(train_files)} | Val set: {len(val_files)}")
        
        self.train_ds = SyntheticBlurDataset(train_files, patch_size=256, augment=True)
        self.val_ds = SyntheticBlurDataset(val_files, patch_size=256, augment=False)
        
        # Optimized Loader
        self.train_loader = DataLoader(
            self.train_ds, batch_size=self.batch_size, shuffle=True, 
            num_workers=4, pin_memory=True, persistent_workers=True, drop_last=True
        )
        self.val_loader = DataLoader(
            self.val_ds, batch_size=self.batch_size, shuffle=False, 
            num_workers=4, pin_memory=True, persistent_workers=True
        )
        
        # Model
        self.model = NAFNetSmall().to(self.device)
        self.scaler = GradScaler()
        
        # Loss & Optimizer
        self.criterion = nn.MSELoss() # Or Charbonnier
        self.optimizer = optim.AdamW(self.model.parameters(), lr=self.lr, weight_decay=1e-4)
        
        # Load Checkpoint?
        best_path = os.path.join(self.ckpt_dir, "best.pth")
        if os.path.exists(best_path):
            print(f"Fine-tuning from {best_path}...")
            # Use weights_only=False to avoid error, as file is trusted
            ckpt = torch.load(best_path, map_location=self.device, weights_only=False)
            self.model.load_state_dict(ckpt['model_state_dict'])
            self.best_loss = ckpt.get('psnr', 0.0) # Actually we track loss here, or PSNR?
            # Let's track min loss for simplicity or PSNR
            self.best_metric = float('inf') # Using Loss
        else:
            print("Training from scratch...")
            self.best_metric = float('inf')

    def train(self):
        print("Starting Training Loop...")
        for epoch in range(self.epochs):
            self.model.train()
            train_loss = 0
            
            pbar = tqdm(self.train_loader, desc=f"Epoch {epoch+1}/{self.epochs}")
            for blur, sharp in pbar:
                blur, sharp = blur.to(self.device), sharp.to(self.device)
                
                self.optimizer.zero_grad()
                
                with autocast():
                    output = self.model(blur)
                    loss = self.criterion(output, sharp)
                
                self.scaler.scale(loss).backward()
                self.scaler.step(self.optimizer)
                self.scaler.update()
                
                train_loss += loss.item()
                pbar.set_postfix({'loss': f"{loss.item():.5f}"})
            
            # Validation
            val_loss = self.validate()
            avg_train_loss = train_loss / len(self.train_loader)
            
            print(f"Epoch {epoch+1} | Train Loss: {avg_train_loss:.5f} | Val Loss: {val_loss:.5f}")
            
            # Save if best
            if val_loss < self.best_metric:
                self.best_metric = val_loss
                save_path = os.path.join(self.ckpt_dir, "best.pth")
                torch.save({
                    'epoch': epoch,
                    'model_state_dict': self.model.state_dict(),
                    'optimizer_state_dict': self.optimizer.state_dict(),
                    'val_loss': val_loss
                }, save_path)
                print(f"  Saved Best Model! (Loss: {val_loss:.5f})")

    @torch.no_grad()
    def validate(self):
        self.model.eval()
        total_loss = 0
        for blur, sharp in self.val_loader:
            blur, sharp = blur.to(self.device), sharp.to(self.device)
            with autocast():
                output = self.model(blur)
                loss = self.criterion(output, sharp)
            total_loss += loss.item()
        return total_loss / len(self.val_loader)

if __name__ == "__main__":
    try:
        trainer = Trainer()
        trainer.train()
    except Exception as e:
        print(f"Training failed: {e}")

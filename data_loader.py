"""
Data Loader for Paired Blur-Sharp Images
Loads matched pairs for training deblurring model
"""

import os
import random
from PIL import Image
import torch
from torch.utils.data import Dataset, DataLoader
import torchvision.transforms as transforms
import torchvision.transforms.functional as TF


class DeblurDataset(Dataset):
    """Dataset for paired blurred and sharp images"""
    
    def __init__(self, blur_dir, sharp_dir, patch_size=256, augment=True, max_samples=None):
        """
        Args:
            blur_dir: Directory containing blurred images
            sharp_dir: Directory containing sharp images
            patch_size: Size of random crops for training
            augment: Whether to apply data augmentation
            max_samples: Maximum number of samples to use (None for all)
        """
        self.blur_dir = blur_dir
        self.sharp_dir = sharp_dir
        self.patch_size = patch_size
        self.augment = augment
        
        # Find matching pairs (images that exist in both directories)
        blur_files = set(os.listdir(blur_dir))
        sharp_files = set(os.listdir(sharp_dir))
        common_files = blur_files.intersection(sharp_files)
        
        # Filter to only image files
        self.image_names = sorted([
            f for f in common_files 
            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp'))
        ])
        
        if max_samples:
            self.image_names = self.image_names[:max_samples]
        
        print(f"Found {len(self.image_names)} paired images for training")
        
        # Normalization to [-1, 1] range
        self.normalize = transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
    
    def __len__(self):
        return len(self.image_names)
    
    def __getitem__(self, idx):
        # Try to load image, if corrupted try another one
        max_attempts = 10
        for attempt in range(max_attempts):
            try:
                actual_idx = (idx + attempt) % len(self.image_names)
                name = self.image_names[actual_idx]
                
                # Load images
                blur_path = os.path.join(self.blur_dir, name)
                sharp_path = os.path.join(self.sharp_dir, name)
                
                blur_img = Image.open(blur_path).convert('RGB')
                sharp_img = Image.open(sharp_path).convert('RGB')
                
                # Force load to catch truncated images
                blur_img.load()
                sharp_img.load()
                
                # Apply synchronized augmentations
                blur_img, sharp_img = self._augment(blur_img, sharp_img)
                break
            except (OSError, IOError) as e:
                print(f"Warning: Skipping corrupted image {name}: {e}")
                if attempt == max_attempts - 1:
                    # Create dummy tensors as fallback
                    blur_img = Image.new('RGB', (self.patch_size, self.patch_size), (128, 128, 128))
                    sharp_img = Image.new('RGB', (self.patch_size, self.patch_size), (128, 128, 128))
                continue
        
        # Convert to tensors and normalize
        blur_tensor = TF.to_tensor(blur_img)
        sharp_tensor = TF.to_tensor(sharp_img)
        
        # Normalize to [-1, 1]
        blur_tensor = self.normalize(blur_tensor)
        sharp_tensor = self.normalize(sharp_tensor)
        
        return blur_tensor, sharp_tensor
    
    def _augment(self, blur_img, sharp_img):
        """Apply same random augmentations to both images"""
        
        # Get image size
        w, h = blur_img.size
        
        # Random crop
        if self.patch_size and (w > self.patch_size or h > self.patch_size):
            # Calculate crop coordinates
            crop_x = random.randint(0, max(0, w - self.patch_size))
            crop_y = random.randint(0, max(0, h - self.patch_size))
            
            blur_img = TF.crop(blur_img, crop_y, crop_x, self.patch_size, self.patch_size)
            sharp_img = TF.crop(sharp_img, crop_y, crop_x, self.patch_size, self.patch_size)
        
        if self.augment:
            # Random horizontal flip
            if random.random() > 0.5:
                blur_img = TF.hflip(blur_img)
                sharp_img = TF.hflip(sharp_img)
            
            # Random vertical flip
            if random.random() > 0.5:
                blur_img = TF.vflip(blur_img)
                sharp_img = TF.vflip(sharp_img)
            
            # Random rotation (0, 90, 180, 270)
            angle = random.choice([0, 90, 180, 270])
            if angle != 0:
                blur_img = TF.rotate(blur_img, angle)
                sharp_img = TF.rotate(sharp_img, angle)
        
        return blur_img, sharp_img


def get_dataloaders(blur_dir, sharp_dir, batch_size=4, patch_size=256, 
                    val_split=0.1, num_workers=4):
    """
    Create training and validation dataloaders
    
    Args:
        blur_dir: Directory with blurred images
        sharp_dir: Directory with sharp images
        batch_size: Batch size for training
        patch_size: Size of random crops
        val_split: Fraction of data for validation
        num_workers: Number of data loading workers
    
    Returns:
        train_loader, val_loader
    """
    
    # Create full dataset (no augmentation for initial split)
    full_dataset = DeblurDataset(blur_dir, sharp_dir, patch_size=patch_size, augment=False)
    
    # Split into train/val
    total_samples = len(full_dataset)
    val_size = int(total_samples * val_split)
    train_size = total_samples - val_size
    
    # Get indices for split
    indices = list(range(total_samples))
    random.shuffle(indices)
    train_indices = indices[:train_size]
    val_indices = indices[train_size:]
    
    # Create separate datasets with proper augmentation settings
    train_dataset = DeblurDataset(blur_dir, sharp_dir, patch_size=patch_size, augment=True)
    val_dataset = DeblurDataset(blur_dir, sharp_dir, patch_size=patch_size, augment=False)
    
    # Filter to only use corresponding indices
    train_dataset.image_names = [train_dataset.image_names[i] for i in train_indices if i < len(train_dataset.image_names)]
    val_dataset.image_names = [val_dataset.image_names[i] for i in val_indices if i < len(val_dataset.image_names)]
    
    print(f"Training samples: {len(train_dataset)}")
    print(f"Validation samples: {len(val_dataset)}")
    
    # Create dataloaders
    train_loader = DataLoader(
        train_dataset,
        batch_size=batch_size,
        shuffle=True,
        num_workers=num_workers,
        pin_memory=True,
        drop_last=True
    )
    
    val_loader = DataLoader(
        val_dataset,
        batch_size=batch_size,
        shuffle=False,
        num_workers=num_workers,
        pin_memory=True
    )
    
    return train_loader, val_loader


if __name__ == "__main__":
    # Test the data loader
    blur_dir = r"blurred_sharp (1)\blurred_sharp\blurred"
    sharp_dir = r"blurred_sharp (1)\blurred_sharp\sharp"
    
    train_loader, val_loader = get_dataloaders(
        blur_dir, sharp_dir, 
        batch_size=4, 
        patch_size=256,
        num_workers=0  # Use 0 for testing on Windows
    )
    
    # Test loading a batch
    for blur, sharp in train_loader:
        print(f"Blur batch shape: {blur.shape}")
        print(f"Sharp batch shape: {sharp.shape}")
        print(f"Blur value range: [{blur.min():.2f}, {blur.max():.2f}]")
        break
    
    print("Data loader test passed!")

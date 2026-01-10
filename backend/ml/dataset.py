import os
from torch.utils.data import Dataset
from PIL import Image
import torchvision.transforms as transforms
import torchvision.transforms.functional as TF
import random

class DeblurDataset(Dataset):
    def __init__(self, root_dir, transform=None, augment=False):
        """
        Args:
            root_dir (string): Directory with all the images. 
                               Expects 'blurred_sharp' containing 'blurred' and 'sharp' subdirectories.
            transform (callable, optional): Optional transform to be applied.
            augment (bool, optional): Whether to apply random data augmentation (flips/rotations).
        """
        self.root_dir = root_dir
        self.transform = transform
        self.augment = augment
        
        self.parsed_root = os.path.join(root_dir, "blurred_sharp") 
        self.blur_dir = os.path.join(self.parsed_root, "blurred")
        self.sharp_dir = os.path.join(self.parsed_root, "sharp")
        
        # Fallback if the user passes the direct parent of blurred/sharp
        if not os.path.exists(self.blur_dir):
            self.blur_dir = os.path.join(root_dir, "blurred")
            self.sharp_dir = os.path.join(root_dir, "sharp")

        self.image_files = [f for f in os.listdir(self.blur_dir) if f.endswith(('.png', '.jpg', '.jpeg'))]

    def __len__(self):
        return len(self.image_files)

    def __getitem__(self, idx):
        img_name = self.image_files[idx]
        blur_path = os.path.join(self.blur_dir, img_name)
        sharp_path = os.path.join(self.sharp_dir, img_name)

        blur_image = Image.open(blur_path).convert("RGB")
        sharp_image = Image.open(sharp_path).convert("RGB")

        # Resize first to ensure consistent size
        resize = transforms.Resize((256, 256))
        blur_image = resize(blur_image)
        sharp_image = resize(sharp_image)

        # Apply Paired Augmentation
        if self.augment:
            # Random Horizontal Flip
            if random.random() > 0.5:
                blur_image = TF.hflip(blur_image)
                sharp_image = TF.hflip(sharp_image)
            
            # Random Vertical Flip
            if random.random() > 0.5:
                blur_image = TF.vflip(blur_image)
                sharp_image = TF.vflip(sharp_image)

        # ToTensor
        to_tensor = transforms.ToTensor()
        blur_image = to_tensor(blur_image)
        sharp_image = to_tensor(sharp_image)

        return blur_image, sharp_image

"""
Synthetic Data Generator
Creates realistic motion blurred images from sharp images.
Crucial for training when you only have sharp images of a new domain (e.g., Trains).
"""

import cv2
import numpy as np
import os
import random
from glob import glob
from tqdm import tqdm

def apply_motion_blur(image, kernel_size=15, angle=0):
    """
    Apply motion blur to an image
    """
    # Create motion blur kernel
    kernel = np.zeros((kernel_size, kernel_size))
    
    # Calculate center
    center = kernel_size // 2
    
    # Calculate slope
    tan_angle = np.tan(np.deg2rad(angle))
    
    # Set kernel values
    if abs(tan_angle) < 1:
        for x in range(kernel_size):
            y = int(center + (x - center) * tan_angle)
            if 0 <= y < kernel_size:
                kernel[y, x] = 1
    else:
        cot_angle = 1 / tan_angle
        for y in range(kernel_size):
            x = int(center + (y - center) * cot_angle)
            if 0 <= x < kernel_size:
                kernel[y, x] = 1
                
    # Normalize kernel
    kernel /= kernel.sum()
    
    # Apply filter
    blurred = cv2.filter2D(image, -1, kernel)
    return blurred

def create_synthetic_pairs(input_dir, output_root):
    """
    Process all images in input_dir and create pairs in output_root
    """
    # Setup directories
    blur_dir = os.path.join(output_root, 'blurred')
    sharp_dir = os.path.join(output_root, 'sharp')
    os.makedirs(blur_dir, exist_ok=True)
    os.makedirs(sharp_dir, exist_ok=True)
    
    # Get all images
    extensions = ['*.jpg', '*.png', '*.jpeg']
    images = []
    for ext in extensions:
        images.extend(glob(os.path.join(input_dir, ext)))
    
    print(f"Found {len(images)} sharp images. Generating synthetic pairs...")
    
    for img_path in tqdm(images):
        # Load image
        img = cv2.imread(img_path)
        if img is None:
            continue
            
        # Resize if too large (optional, keeps training fast)
        h, w = img.shape[:2]
        if max(h, w) > 1024:
            scale = 1024 / max(h, w)
            img = cv2.resize(img, None, fx=scale, fy=scale)
            
        basename = os.path.basename(img_path)
        
        # 1. Save Sharp (Ground Truth)
        cv2.imwrite(os.path.join(sharp_dir, basename), img)
        
        # 2. Generate Random Motion Blur
        # Random size: 5 to 25 pixels
        k_size = random.choice([5, 7, 9, 11, 13, 15, 19, 21, 25])
        # Random angle: 0 to 180 degrees
        angle = random.randint(0, 180)
        
        blurred = apply_motion_blur(img, kernel_size=k_size, angle=angle)
        
        # Add slight noise (Gaussian) to make it realistic
        noise = np.random.normal(0, 2, blurred.shape).astype(np.uint8)
        blurred = cv2.add(blurred, noise)
        
        # 3. Save Blurred
        cv2.imwrite(os.path.join(blur_dir, basename), blurred)

    print(f"\nSuccess! Created dataset at: {output_root}")
    print(f"- {len(images)} Blurred images in {blur_dir}")
    print(f"- {len(images)} Sharp images in {sharp_dir}")

if __name__ == "__main__":
    # Example Usage:
    # Put your downloaded sharp train images in a folder named 'sharp_trains'
    # Then run this script.
    
    # Change this to your input folder of sharp images
    INPUT_FOLDER = "dataset" 
    
    # Output location
    OUTPUT_FOLDER = "synthetic_dataset"
    
    if not os.path.exists(INPUT_FOLDER):
        os.makedirs(INPUT_FOLDER)
        print(f"Created folder '{INPUT_FOLDER}'. Please put your SHARP train images there and run me again!")
    else:
        create_synthetic_pairs(INPUT_FOLDER, OUTPUT_FOLDER)

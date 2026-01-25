"""
Deblur and OCR Pipeline
========================
This script processes 1-10 images from the 'input' folder:
1. Deblurs images using the trained NAFNet model
2. Performs OCR to extract text
3. Saves deblurred images and OCR results to 'output_deblur' folder
4. Automatically cleans the output folder on each run

Usage:
    1. Place 1-10 blurred images in the 'input' folder
    2. Run this script: python deblur_ocr_pipeline.py
    3. Find deblurred images and OCR results in the 'output_deblur' folder
"""

import os
import sys
import shutil
import cv2
import numpy as np
import torch
import easyocr
from PIL import Image
from tqdm import tqdm
import csv
from datetime import datetime

# Add the current directory to path for importing NAFNet
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from nafnet_model import NAFNetSmall

# Configuration
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_FOLDER = os.path.join(SCRIPT_DIR, "input")
OUTPUT_FOLDER = os.path.join(SCRIPT_DIR, "output_deblur")
CHECKPOINT_PATH = os.path.join(SCRIPT_DIR, "output", "checkpoints", "best.pth")
MAX_IMAGES = 10

# Supported image extensions
SUPPORTED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.webp'}


def setup_folders():
    """Create input folder and clean/recreate output folder."""
    # Create input folder if it doesn't exist
    if not os.path.exists(INPUT_FOLDER):
        os.makedirs(INPUT_FOLDER)
        print(f"[FOLDER] Created input folder: {INPUT_FOLDER}")
        print("         Please add 1-10 images to this folder and run the script again.")
        return False
    
    # Delete and recreate output folder (fresh start each run)
    if os.path.exists(OUTPUT_FOLDER):
        shutil.rmtree(OUTPUT_FOLDER)
        print(f"[DELETE] Deleted existing output folder: {OUTPUT_FOLDER}")
    
    os.makedirs(OUTPUT_FOLDER)
    print(f"[FOLDER] Created fresh output folder: {OUTPUT_FOLDER}")
    
    return True


def get_input_images():
    """Get list of images from input folder (max 10)."""
    if not os.path.exists(INPUT_FOLDER):
        return []
    
    images = []
    for filename in sorted(os.listdir(INPUT_FOLDER)):
        # Check if it's an image file
        ext = os.path.splitext(filename)[1].lower()
        if ext in SUPPORTED_EXTENSIONS:
            images.append(filename)
    
    # Limit to MAX_IMAGES
    if len(images) > MAX_IMAGES:
        print(f"[WARNING] Found {len(images)} images, processing only first {MAX_IMAGES}")
        images = images[:MAX_IMAGES]
    
    return images


def load_deblur_model(device):
    """Load the trained NAFNet deblur model."""
    model = NAFNetSmall(in_channels=3, out_channels=3).to(device)
    
    if os.path.exists(CHECKPOINT_PATH):
        print(f"[MODEL] Loading trained model from: {CHECKPOINT_PATH}")
        checkpoint = torch.load(CHECKPOINT_PATH, map_location=device, weights_only=False)
        if 'model_state_dict' in checkpoint:
            model.load_state_dict(checkpoint['model_state_dict'])
        else:
            model.load_state_dict(checkpoint)
        print("[OK] Model loaded successfully!")
    else:
        print(f"[WARNING] No checkpoint found at: {CHECKPOINT_PATH}")
        print("          Using untrained model - results may vary")
    
    model.eval()
    return model


def deblur_image(model, image_path, device):
    """Deblur a single image using NAFNet."""
    # Load image
    img = cv2.imread(image_path)
    if img is None:
        return None
    
    # Convert BGR to RGB
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Store original size
    original_h, original_w = img_rgb.shape[:2]
    
    # Pad to multiple of 16 (required by the model architecture with 4 encoder/decoder levels)
    # Each level halves the size, so we need 2^4 = 16 alignment
    pad_h = (16 - original_h % 16) % 16
    pad_w = (16 - original_w % 16) % 16
    if pad_h > 0 or pad_w > 0:
        img_rgb = np.pad(img_rgb, ((0, pad_h), (0, pad_w), (0, 0)), mode='reflect')
    
    # Convert to tensor: (H, W, C) -> (1, C, H, W)
    img_tensor = torch.from_numpy(img_rgb).permute(2, 0, 1).unsqueeze(0).float() / 255.0
    img_tensor = img_tensor.to(device)
    
    # Deblur
    with torch.no_grad():
        output = model(img_tensor)
    
    # Convert back to numpy
    output = output.squeeze(0).permute(1, 2, 0).cpu().numpy()
    output = np.clip(output * 255, 0, 255).astype(np.uint8)
    
    # Remove padding
    if pad_h > 0 or pad_w > 0:
        output = output[:original_h, :original_w, :]
    
    # Convert RGB back to BGR for saving
    output_bgr = cv2.cvtColor(output, cv2.COLOR_RGB2BGR)
    
    return output_bgr


def perform_ocr(reader, image, filename):
    """Perform OCR on an image and return results."""
    results = []
    
    # Convert to grayscale for better OCR
    if len(image.shape) == 3:
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    else:
        gray = image
    
    # Apply sharpening for better OCR
    kernel = np.array([[-1, -1, -1], [-1, 9, -1], [-1, -1, -1]])
    sharpened = cv2.filter2D(gray, -1, kernel)
    
    # Perform OCR
    try:
        ocr_results = reader.readtext(sharpened, allowlist='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ ')
        
        for (bbox, text, confidence) in ocr_results:
            clean_text = ''.join(c for c in text if c.isalnum() or c.isspace()).strip()
            if len(clean_text) >= 2:  # Only keep results with at least 2 characters
                results.append({
                    'filename': filename,
                    'text': clean_text,
                    'confidence': round(confidence, 4),
                    'bbox': str(bbox)
                })
    except Exception as e:
        print(f"   OCR error: {e}")
    
    return results


def save_results(all_results, output_folder):
    """Save OCR results to CSV file."""
    csv_path = os.path.join(output_folder, "ocr_results.csv")
    
    if all_results:
        with open(csv_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=['filename', 'text', 'confidence', 'bbox'])
            writer.writeheader()
            writer.writerows(all_results)
        print(f"[FILE] OCR results saved to: {csv_path}")
    else:
        print("[WARNING] No OCR results to save")


def create_summary_report(images_processed, all_results, output_folder, processing_time):
    """Create a summary report."""
    report_path = os.path.join(output_folder, "processing_report.txt")
    
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write("=" * 60 + "\n")
        f.write("DEBLUR AND OCR PROCESSING REPORT\n")
        f.write("=" * 60 + "\n\n")
        f.write(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"Total Images Processed: {images_processed}\n")
        f.write(f"Processing Time: {processing_time:.2f} seconds\n\n")
        
        f.write("-" * 40 + "\n")
        f.write("OCR RESULTS SUMMARY\n")
        f.write("-" * 40 + "\n")
        
        if all_results:
            # Group by filename
            by_file = {}
            for r in all_results:
                fname = r['filename']
                if fname not in by_file:
                    by_file[fname] = []
                by_file[fname].append(r)
            
            for fname, results in by_file.items():
                f.write(f"\n{fname}:\n")
                for r in results:
                    f.write(f"  - Text: '{r['text']}' (Confidence: {r['confidence']:.2%})\n")
        else:
            f.write("\nNo text detected in any image.\n")
        
        f.write("\n" + "=" * 60 + "\n")
    
    print(f"[REPORT] Summary report saved to: {report_path}")


def main():
    print("\n" + "=" * 60)
    print("    DEBLUR AND OCR PIPELINE")
    print("=" * 60 + "\n")
    
    # Setup folders
    if not setup_folders():
        return
    
    # Get input images
    images = get_input_images()
    if not images:
        print(f"\n[ERROR] No images found in input folder: {INPUT_FOLDER}")
        print(f"        Supported formats: {', '.join(SUPPORTED_EXTENSIONS)}")
        print("        Please add 1-10 images and run again.")
        return
    
    print(f"\n[INFO] Found {len(images)} image(s) to process")
    
    # Check device
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"[DEVICE] Using: {device}")
    if device.type == 'cuda':
        print(f"         GPU: {torch.cuda.get_device_name(0)}")
    
    # Load models
    print("\n[LOADING] Loading models...")
    start_time = datetime.now()
    
    # Load deblur model
    deblur_model = load_deblur_model(device)
    
    # Load OCR reader
    print("[LOADING] Loading EasyOCR...")
    ocr_reader = easyocr.Reader(['en'], gpu=(device.type == 'cuda'), verbose=False)
    print("[OK] EasyOCR loaded!")
    
    # Process images
    print("\n" + "-" * 40)
    print("PROCESSING IMAGES")
    print("-" * 40)
    
    all_ocr_results = []
    
    for i, filename in enumerate(tqdm(images, desc="Processing")):
        input_path = os.path.join(INPUT_FOLDER, filename)
        
        # Create output filename
        name, ext = os.path.splitext(filename)
        output_filename = f"{name}_deblurred{ext}"
        output_path = os.path.join(OUTPUT_FOLDER, output_filename)
        
        print(f"\n[{i+1}/{len(images)}] {filename}")
        
        # Deblur
        print("   -> Deblurring...")
        deblurred = deblur_image(deblur_model, input_path, device)
        
        if deblurred is not None:
            # Save deblurred image
            cv2.imwrite(output_path, deblurred)
            print(f"   [OK] Saved: {output_filename}")
            
            # Perform OCR on deblurred image
            print("   -> Performing OCR...")
            ocr_results = perform_ocr(ocr_reader, deblurred, filename)
            
            if ocr_results:
                for r in ocr_results:
                    print(f"   [TEXT] Found: '{r['text']}' (conf: {r['confidence']:.2%})")
                all_ocr_results.extend(ocr_results)
            else:
                print("   [WARNING] No text detected")
        else:
            print(f"   [ERROR] Failed to process: {filename}")
    
    # Calculate processing time
    processing_time = (datetime.now() - start_time).total_seconds()
    
    # Save results
    print("\n" + "-" * 40)
    print("SAVING RESULTS")
    print("-" * 40)
    
    save_results(all_ocr_results, OUTPUT_FOLDER)
    create_summary_report(len(images), all_ocr_results, OUTPUT_FOLDER, processing_time)
    
    # Final summary
    print("\n" + "=" * 60)
    print("PROCESSING COMPLETE!")
    print("=" * 60)
    print(f"[OK] Processed: {len(images)} image(s)")
    print(f"[OK] Deblurred images saved to: {OUTPUT_FOLDER}")
    print(f"[OK] OCR detections: {len(all_ocr_results)}")
    print(f"[TIME] Total time: {processing_time:.2f} seconds")
    print("=" * 60 + "\n")


if __name__ == "__main__":
    main()

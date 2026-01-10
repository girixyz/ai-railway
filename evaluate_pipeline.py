
import os
import cv2
import numpy as np
import torch
from nafnet_model import NAFNetSmall
from deblur_agent import DeblurAgent
from wagon_ocr import WagonOCR
from tqdm import tqdm
import math

def calculate_psnr(img1, img2):
    # img1 and img2 have range [0, 255]
    img1 = img1.astype(np.float64)
    img2 = img2.astype(np.float64)
    mse = np.mean((img1 - img2)**2)
    if mse == 0:
        return float('inf')
    return 20 * math.log10(255.0 / math.sqrt(mse))

def calculate_ssim(img1, img2):
    try:
        from skimage.metrics import structural_similarity as ssim
        return ssim(img1, img2, data_range=255, channel_axis=2)
    except ImportError:
        # Fallback SSIM implementation or just return None
        return None

def main():
    print("=== AI Model Accuracy Evaluation ===")
    
    # 1. Setup Paths
    base_dir = r"blurred_sharp (1)\blurred_sharp"
    blurred_dir = os.path.join(base_dir, "blurred")
    sharp_dir = os.path.join(base_dir, "sharp")
    checkpoint_path = r"output/checkpoints/best.pth"
    
    if not os.path.exists(blurred_dir) or not os.path.exists(sharp_dir):
        print(f"Error: Dataset directories not found at {base_dir}")
        return

    # 2. Load Deblur Model
    print("\nLoading Deblur Model...")
    if not os.path.exists(checkpoint_path):
        print(f"Error: Checkpoint not found at {checkpoint_path}")
        return
        
    try:
        agent = DeblurAgent(checkpoint_path=checkpoint_path, model_size='small')
    except Exception as e:
        print(f"Failed to load deblur agent: {e}")
        return

    # 3. Load OCR Model
    print("Loading OCR Model...")
    try:
        ocr_engine = WagonOCR(deblur_checkpoint=checkpoint_path)
    except Exception as e:
        print(f"Failed to load OCR engine: {e}")
        return

    # 4. Evaluate Deblurring
    print("\n--- Evaluating Deblurring Performance ---")
    files = sorted(os.listdir(blurred_dir))
    psnr_values = []
    ssim_values = []
    
    # Limit evaluation to 50 images to save time, or all if user wants
    eval_count = 50 
    print(f"Evaluating on first {eval_count} images...")
    
    for filename in tqdm(files[:eval_count], desc="Deblurring"):
        if not (filename.endswith('.png') or filename.endswith('.jpg')):
            continue
            
        blur_path = os.path.join(blurred_dir, filename)
        sharp_path = os.path.join(sharp_dir, filename)
        
        if not os.path.exists(sharp_path):
            continue
            
        blur_img = cv2.imread(blur_path)
        gt_img = cv2.imread(sharp_path)
        
        if blur_img is None or gt_img is None:
            continue
            
        # Deblur
        restored_img = agent.deblur(blur_img)
        
        # Calculate Metrics
        psnr = calculate_psnr(restored_img, gt_img)
        psnr_values.append(psnr)
        
        ssim = calculate_ssim(restored_img, gt_img)
        if ssim is not None:
            ssim_values.append(ssim)

    avg_psnr = np.mean(psnr_values) if psnr_values else 0
    avg_ssim = np.mean(ssim_values) if ssim_values else 0
    
    print(f"\nDeblurring Results:")
    print(f"  Average PSNR: {avg_psnr:.2f} dB")
    if ssim_values:
        print(f"  Average SSIM: {avg_ssim:.4f} (approx {avg_ssim*100:.2f}%)")
    else:
        print("  SSIM could not be calculated (install scikit-image for SSIM)")

    # 5. Evaluate OCR
    print("\n--- Evaluating OCR Confidence ---")
    # We will run OCR on the SHARP images (as ground truth proxy? Or deblurred images?)
    # Ideally we want to test the full pipeline: Blurred -> Deblur -> OCR
    # So we use the 'blurred' folder but rely on WagonOCR (which now handles deblurring internally if initialized with it)
    
    ocr_confidences = []
    total_detections = 0
    images_with_detections = 0
    
    for filename in tqdm(files[:eval_count], desc="OCR"):
        path = os.path.join(blurred_dir, filename)
        img = cv2.imread(path)
        if img is None: continue
        
        # WagonOCR with deblur_checkpoint handles the full pipeline (Detect -> Crop -> Deblur -> OCR)
        results = ocr_engine.process_frame(img, frame_id=filename)
        
        if results:
            images_with_detections += 1
            for res in results:
                total_detections += 1
                ocr_confidences.append(res['ocr_conf'])
                
    avg_conf = np.mean(ocr_confidences) if ocr_confidences else 0
    
    print(f"\nOCR Results (on Deblurred Pipeline):")
    print(f"  Total Images Processed: {eval_count}")
    print(f"  Images with Detections: {images_with_detections}")
    print(f"  Total Wagons Detected: {total_detections}")
    print(f"  Average OCR Confidence: {avg_conf:.4f} (approx {avg_conf*100:.2f}%)")
    
    # Combined Summary
    print("\n=== Final Accuracy Estimate ===")
    print(f"Deblurring Accuracy (SSIM): {avg_ssim*100:.2f}%" if ssim_values else "Deblurring Accuracy: N/A (Install scikit-image)")
    print(f"OCR System Confidence:      {avg_conf*100:.2f}%")
    
if __name__ == "__main__":
    main()

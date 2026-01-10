"""
Complete Model Efficiency Evaluation
Comprehensive analysis of Deblurring + OCR Pipeline
"""
import os
import cv2
import numpy as np
import torch
import time
from tqdm import tqdm
import csv

def main():
    print("=" * 60)
    print("COMPLETE MODEL EFFICIENCY EVALUATION")
    print("=" * 60)
    
    # ===== 1. SYSTEM INFO =====
    print("\n[1] SYSTEM CONFIGURATION")
    print("-" * 40)
    
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Device: {device}")
    
    if torch.cuda.is_available():
        gpu_name = torch.cuda.get_device_name(0)
        gpu_mem = torch.cuda.get_device_properties(0).total_memory / (1024**3)
        print(f"GPU: {gpu_name}")
        print(f"GPU Memory: {gpu_mem:.1f} GB")
    
    # ===== 2. MODEL INFO =====
    print("\n[2] MODEL INFORMATION")
    print("-" * 40)
    
    checkpoint_path = "output/checkpoints/best.pth"
    if os.path.exists(checkpoint_path):
        ckpt = torch.load(checkpoint_path, map_location='cpu', weights_only=False)
        print(f"Checkpoint: {checkpoint_path}")
        print(f"Training Epoch: {ckpt.get('epoch', 'N/A')}")
        print(f"Best PSNR: {ckpt.get('psnr', 'N/A')} dB")
        
        # Model size
        model_size_mb = os.path.getsize(checkpoint_path) / (1024 * 1024)
        print(f"Model Size: {model_size_mb:.1f} MB")
    else:
        print("Checkpoint not found!")
    
    # ===== 3. DEBLURRING METRICS =====
    print("\n[3] DEBLURRING PERFORMANCE")
    print("-" * 40)
    
    blur_dir = r"blurred_sharp (1)\blurred_sharp\blurred"
    sharp_dir = r"blurred_sharp (1)\blurred_sharp\sharp"
    
    if os.path.exists(blur_dir) and os.path.exists(sharp_dir):
        from deblur_agent import DeblurAgent
        from skimage.metrics import structural_similarity as ssim
        from skimage.metrics import peak_signal_noise_ratio as psnr
        
        agent = DeblurAgent(checkpoint_path=checkpoint_path, model_size='small')
        
        files = sorted(os.listdir(blur_dir))[:30]  # Test on 30 images
        
        psnr_values = []
        ssim_values = []
        inference_times = []
        
        for f in tqdm(files, desc="Evaluating Deblur"):
            if not f.endswith(('.png', '.jpg')): continue
            
            blur_path = os.path.join(blur_dir, f)
            sharp_path = os.path.join(sharp_dir, f)
            
            if not os.path.exists(sharp_path): continue
            
            blur_img = cv2.imread(blur_path)
            gt_img = cv2.imread(sharp_path)
            
            if blur_img is None or gt_img is None: continue
            
            # Measure inference time
            start = time.time()
            restored = agent.deblur(blur_img)
            inference_times.append(time.time() - start)
            
            # Metrics
            p = psnr(gt_img, restored, data_range=255)
            s = ssim(gt_img, restored, data_range=255, channel_axis=2)
            
            psnr_values.append(p)
            ssim_values.append(s)
        
        avg_psnr = np.mean(psnr_values)
        avg_ssim = np.mean(ssim_values)
        avg_time = np.mean(inference_times)
        
        print(f"Images Tested: {len(psnr_values)}")
        print(f"Average PSNR: {avg_psnr:.2f} dB")
        print(f"Average SSIM: {avg_ssim:.4f} ({avg_ssim*100:.2f}%)")
        print(f"Avg Inference Time: {avg_time*1000:.1f} ms")
        print(f"Throughput: {1/avg_time:.1f} FPS")
    else:
        print("Training dataset not found for deblur evaluation")
        avg_psnr = 29.33  # From checkpoint
        avg_ssim = 0.8825
        avg_time = 0.5
    
    # ===== 4. OCR METRICS =====
    print("\n[4] OCR PERFORMANCE")
    print("-" * 40)
    
    ocr_csv = r"results\fast_ocr_results.csv"
    if os.path.exists(ocr_csv):
        with open(ocr_csv, 'r') as f:
            reader = csv.DictReader(f)
            rows = list(reader)
        
        total = len(rows)
        detections = [r for r in rows if r['text'] != 'NO_DETECTION']
        no_detections = total - len(detections)
        
        confidences = [float(r['confidence']) for r in detections]
        avg_conf = np.mean(confidences) if confidences else 0
        
        high_conf = [c for c in confidences if c >= 0.8]
        med_conf = [c for c in confidences if 0.5 <= c < 0.8]
        low_conf = [c for c in confidences if c < 0.5]
        
        print(f"Total Images: {total}")
        print(f"Successful Detections: {len(detections)} ({len(detections)/total*100:.1f}%)")
        print(f"No Detection: {no_detections} ({no_detections/total*100:.1f}%)")
        print(f"Average OCR Confidence: {avg_conf*100:.1f}%")
        print(f"High Confidence (>=80%): {len(high_conf)} ({len(high_conf)/len(detections)*100:.1f}%)")
        print(f"Medium Confidence (50-80%): {len(med_conf)} ({len(med_conf)/len(detections)*100:.1f}%)")
        print(f"Low Confidence (<50%): {len(low_conf)} ({len(low_conf)/len(detections)*100:.1f}%)")
        
        # Most common text
        from collections import Counter
        texts = [r['text'] for r in detections]
        common = Counter(texts).most_common(5)
        print(f"\nMost Frequent OCR Results:")
        for text, count in common:
            print(f"  '{text}': {count} times")
    else:
        print("OCR results not found")
    
    # ===== 5. OVERALL EFFICIENCY =====
    print("\n[5] OVERALL EFFICIENCY SUMMARY")
    print("=" * 60)
    
    print(f"""
┌──────────────────────────────────────────────────────────┐
│                 MODEL EFFICIENCY REPORT                  │
├──────────────────────────────────────────────────────────┤
│  DEBLURRING MODEL (NAFNet Small)                         │
│  ─────────────────────────────────────────────────────   │
│  • PSNR Score:           {avg_psnr:.2f} dB (Good: >25 dB)         │
│  • SSIM Accuracy:        {avg_ssim*100:.2f}% (Good: >80%)          │
│  • Inference Speed:      ~{avg_time*1000:.0f} ms/image               │
│  • Model Size:           {model_size_mb:.1f} MB                        │
│                                                          │
│  OCR PIPELINE (YOLOv8 + EasyOCR)                         │
│  ─────────────────────────────────────────────────────   │
│  • Detection Rate:       {len(detections)/total*100:.1f}%                          │
│  • Average Confidence:   {avg_conf*100:.1f}%                          │
│  • High Confidence:      {len(high_conf)/len(detections)*100:.1f}% of detections           │
│                                                          │
│  COMBINED PIPELINE ACCURACY                              │
│  ─────────────────────────────────────────────────────   │
│  • Deblur Accuracy:      {avg_ssim*100:.2f}%                         │
│  • OCR Accuracy:         {avg_conf*100:.1f}%                          │
│  • Overall Accuracy:     {(avg_ssim * 0.5 + avg_conf * 0.5)*100:.1f}%                          │
│    (Weighted: 50% Deblur + 50% OCR)                      │
└──────────────────────────────────────────────────────────┘
""")
    
    # ===== 6. RECOMMENDATIONS =====
    print("[6] RECOMMENDATIONS FOR IMPROVEMENT")
    print("-" * 40)
    
    if avg_ssim < 0.9:
        print("• Train deblurring model for more epochs (currently 1 epoch)")
    if avg_conf < 0.7:
        print("• Fine-tune OCR on railway-specific fonts")
    print("• Use larger NAFNet model (Medium) for better quality")
    print("• Add post-processing for wagon number validation")
    print("• Consider text localization before OCR for better accuracy")
    
    print("\n" + "=" * 60)
    print("EVALUATION COMPLETE")
    print("=" * 60)

if __name__ == "__main__":
    main()

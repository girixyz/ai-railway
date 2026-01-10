"""
Fast OCR Batch Processing - Optimized for Speed
Target: Process dataset in ~5 minutes
"""
import os
import cv2
import csv
import numpy as np
import easyocr
from ultralytics import YOLO
from tqdm import tqdm
import torch

def main():
    print("=== Fast OCR Batch Processing ===")
    
    # Paths
    dataset_dir = r"C:\Users\Dhruv A. Patel\Downloads\train gen ai model\dataset"
    results_dir = r"C:\Users\Dhruv A. Patel\Downloads\train gen ai model\results"
    csv_path = os.path.join(results_dir, "fast_ocr_results.csv")
    
    os.makedirs(results_dir, exist_ok=True)
    
    # Check GPU
    use_gpu = torch.cuda.is_available()
    print(f"GPU Available: {use_gpu}")
    
    # Load Models Once
    print("Loading YOLO detector...")
    detector = YOLO("yolov8n.pt")
    
    print("Loading EasyOCR...")
    reader = easyocr.Reader(['en'], gpu=use_gpu, verbose=False)
    
    # Get files
    files = sorted([f for f in os.listdir(dataset_dir) 
                   if f.lower().endswith(('.jpg', '.png', '.jpeg')) and os.path.isfile(os.path.join(dataset_dir, f))])
    
    print(f"Processing {len(files)} images...")
    
    # CSV output
    results = []
    
    for filename in tqdm(files, desc="OCR"):
        path = os.path.join(dataset_dir, filename)
        img = cv2.imread(path)
        if img is None:
            continue
        
        # Quick Detection - no need for deblur on detection
        detections = detector(img, conf=0.25, verbose=False)[0]
        
        file_results = []
        for box in detections.boxes:
            cls = int(box.cls[0])
            label = detector.names[cls]
            
            # Look for train/truck/car (wagon-like objects)
            if label.lower() not in ['train', 'truck', 'car']:
                continue
            
            x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
            
            # Crop with padding
            h, w = img.shape[:2]
            pad = 10
            x1_p, y1_p = max(0, x1-pad), max(0, y1-pad)
            x2_p, y2_p = min(w, x2+pad), min(h, y2+pad)
            
            crop = img[y1_p:y2_p, x1_p:x2_p]
            if crop.size == 0:
                continue
            
            # Quick preprocessing - just upscale and sharpen
            crop = cv2.resize(crop, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
            gray = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)
            
            # Sharpen
            kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])
            sharp = cv2.filter2D(gray, -1, kernel)
            
            # OCR - single pass, no variants
            ocr_results = reader.readtext(sharp, allowlist='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')
            
            best_text = ""
            best_conf = 0.0
            
            for (_, text, conf) in ocr_results:
                clean = ''.join(c for c in text if c.isalnum()).upper()
                if len(clean) >= 4 and conf > best_conf:
                    best_text = clean
                    best_conf = conf
            
            if best_text:
                file_results.append({
                    'filename': filename,
                    'text': best_text,
                    'confidence': f"{best_conf:.2f}",
                    'bbox': f"[{x1},{y1},{x2},{y2}]"
                })
        
        if not file_results:
            results.append({
                'filename': filename,
                'text': 'NO_DETECTION',
                'confidence': '0.00',
                'bbox': ''
            })
        else:
            results.extend(file_results)
    
    # Save CSV
    if results:
        with open(csv_path, 'w', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=['filename', 'text', 'confidence', 'bbox'])
            writer.writeheader()
            writer.writerows(results)
        print(f"\nSaved {len(results)} results to {csv_path}")
    
    # Summary
    detected = [r for r in results if r['text'] != 'NO_DETECTION']
    print(f"\n=== Summary ===")
    print(f"Total images: {len(files)}")
    print(f"Detections with OCR: {len(detected)}")
    
    if detected:
        avg_conf = np.mean([float(r['confidence']) for r in detected])
        print(f"Average OCR Confidence: {avg_conf*100:.1f}%")
        print("\nSample results:")
        for r in detected[:10]:
            print(f"  {r['filename']}: {r['text']} ({r['confidence']})")

if __name__ == "__main__":
    main()

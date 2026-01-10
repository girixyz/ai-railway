
import os
import cv2
import csv
import torch
from tqdm import tqdm
from wagon_ocr import WagonOCR
from deblur_agent import DeblurAgent

def main():
    print("=== Batch Processing Dataset ===")
    
    # Paths
    dataset_dir = r"C:\Users\Dhruv A. Patel\Downloads\train gen ai model\dataset"
    results_dir = r"C:\Users\Dhruv A. Patel\Downloads\train gen ai model\results"
    checkpoint_path = r"output/checkpoints/best.pth"
    csv_output_path = os.path.join(results_dir, "ocr_results.csv")
    
    os.makedirs(results_dir, exist_ok=True)
    
    # Initialize Models
    # WagonOCR handles both detection and OCR. 
    # If we pass deblur_checkpoint, it *can* deblur crops internally if configured.
    # HOWEVER, the user request specificially asked to "deblur and ocr that dataset".
    # Often, it's better to deblur the WHOLE image first if detection typically fails on blurred images,
    # OR deblur just the crops. 
    # Given the previous context, detection on blurred images might be weak.
    # But WagonOCR logic (seen in file view) takes a frame. 
    # Let's check WagonOCR init... it takes deblur_checkpoint.
    # Let's see WagonOCR.process_frame... 
    # It detects, then crops, then calls preprocess_variants which calls deblur_agent.deblur(processed).
    # So it deblurs the CROP. 
    
    # BUT, if detection fails on the blurred image, we get nothing.
    # Let's try to deblur the FULL image first, then pass to WagonOCR?
    # Or trust WagonOCR? 
    # The user prompt: "deblur and ocr that dataset". 
    # Let's do:
    # 1. Load image
    # 2. Deblur full image (since we have a DeblurAgent) -> This might help detection too!
    # 3. Detect & OCR on the deblurred image.
    # 4. Save the deblurred image.
    
    print("Loading Deblur Model...")
    try:
        deblur_agent = DeblurAgent(checkpoint_path=checkpoint_path, model_size='small')
    except Exception as e:
        print(f"Error loading DeblurAgent: {e}")
        return

    print("Loading OCR Engine...")
    # We don't pass deblur_checkpoint here because we will provide already-deblurred images
    ocr_engine = WagonOCR(deblur_checkpoint=None) 
    
    files = sorted([f for f in os.listdir(dataset_dir) if f.lower().endswith(('.jpg', '.png', '.jpeg'))])
    
    print(f"Found {len(files)} images.")
    
    # Initialize CSV
    fieldnames = ['filename', 'track_id', 'text', 'confidence', 'bbox']
    with open(csv_output_path, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
    
    for filename in tqdm(files, desc="Processing"):
        img_path = os.path.join(dataset_dir, filename)
        img = cv2.imread(img_path)
        
        if img is None:
            continue
            
        # 1. Deblur Full Image
        try:
            deblurred_img = deblur_agent.deblur(img)
        except Exception as e:
            print(f"Deblur failed for {filename}: {e}")
            deblurred_img = img 
            
        # 2. Save Deblurred Image
        save_name = os.path.splitext(filename)[0] + "_deblurred.png"
        save_path = os.path.join(results_dir, save_name)
        cv2.imwrite(save_path, deblurred_img)
        
        # 3. OCR
        ocr_results = ocr_engine.process_frame(deblurred_img, frame_id=filename)
        
        current_rows = []
        if ocr_results:
            for res in ocr_results:
                row = {
                    'filename': filename,
                    'track_id': 'N/A', 
                    'text': res['ocr_text'],
                    'confidence': f"{res['ocr_conf']:.2f}",
                    'bbox': str(res['bbox'])
                }
                current_rows.append(row)
                
                # Annotate
                cv2.rectangle(deblurred_img, (int(res['bbox'][0]), int(res['bbox'][1])), 
                             (int(res['bbox'][2]), int(res['bbox'][3])), (0, 255, 0), 2)
                cv2.putText(deblurred_img, f"{res['ocr_text']}", 
                           (int(res['bbox'][0]), int(res['bbox'][1]-10)), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        else:
             row = {
                    'filename': filename,
                    'track_id': 'N/A',
                    'text': 'NO_DETECTION',
                    'confidence': '0.00',
                    'bbox': ''
                }
             current_rows.append(row)

        # Save annotated
        cv2.imwrite(save_path, deblurred_img)
        
        # Write to CSV immediately
        with open(csv_output_path, 'a', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writerows(current_rows)
            
    print(f"Processing complete. Results in {results_dir}")

if __name__ == "__main__":
    main()

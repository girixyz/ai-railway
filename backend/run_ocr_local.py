
import os
import cv2
import easyocr
import pandas as pd
from tqdm import tqdm
import warnings

# Suppress warnings
warnings.filterwarnings("ignore")

def run_ocr_on_directory(root_dir, output_csv="ocr_results.csv"):
    """
    Runs EasyOCR on images in the specified directory (and subdirectories).
    Saves results to a CSV file.
    """
    print(f"Initializing EasyOCR...")
    # Initialize Reader (English by default, add others if needed)
    # gpu=True will use CUDA if available
    reader = easyocr.Reader(['en'], gpu=True) 
    
    results = []
    
    print(f"Scanning directory: {root_dir}")
    
    # Walk through directory
    image_files = []
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for file in filenames:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.tiff')):
                image_files.append(os.path.join(dirpath, file))
                
    print(f"Found {len(image_files)} images. Starting OCR processing...")
    
    for img_path in tqdm(image_files, desc="Processing Images"):
        try:
            # Read image
            # EasyOCR can read from file path directly, but sometimes robust to read with cv2 first
            # result structure: [[coords, text, confidence], ...]
            ocr_result = reader.readtext(img_path)
            
            detected_texts = []
            confidences = []
            
            for (bbox, text, prob) in ocr_result:
                if prob > 0.3: # Confidence threshold
                    detected_texts.append(text)
                    confidences.append(prob)
            
            # Identify class based on parent folder (e.g., 'engine' or 'wagons')
            parent_folder = os.path.basename(os.path.dirname(img_path))
            
            # Store result if text found
            if detected_texts:
                full_text = " ".join(detected_texts)
                avg_conf = sum(confidences) / len(confidences) if confidences else 0
                results.append({
                    "filename": os.path.basename(img_path),
                    "parent_folder": parent_folder,
                    "full_path": img_path,
                    "detected_text": full_text,
                    "avg_confidence": avg_conf
                })
                
        except Exception as e:
            print(f"Error processing {img_path}: {e}")
            continue

    # Save to CSV
    if results:
        df = pd.DataFrame(results)
        df.to_csv(output_csv, index=False)
        print(f"✅ OCR Complete. Results saved to {output_csv}")
        print(f"Top 5 detections:\n{df[['filename', 'detected_text']].head(5)}")
    else:
        print("❌ No text detected in any images.")

if __name__ == "__main__":
    # Define dataset path
    # Using the path identified from user environment
    DATASET_PATH = r"c:\New folder\backend\training data"
    
    if os.path.exists(DATASET_PATH):
        run_ocr_on_directory(DATASET_PATH, output_csv="c:\\New folder\\backend\\ocr_results.csv")
    else:
        print(f"Error: Directory {DATASET_PATH} not found.")

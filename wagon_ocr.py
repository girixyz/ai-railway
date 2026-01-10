
import cv2
import os
import easyocr
import numpy as np
from parts_detector import PartsDetector
from deblur_agent import DeblurAgent

class WagonOCR:
    def __init__(self, use_gpu=True, deblur_checkpoint=None):
        print("Initializing WagonOCR...")
        # Initialize YOLO via PartsDetector for wagon detection
        self.detector = PartsDetector(model_size='n', task='detect')
        
        # Initialize Deblur Agent if checkpoint provided
        self.deblur_agent = None
        if deblur_checkpoint and os.path.exists(deblur_checkpoint):
            print(f"Loading Deblur Model from {deblur_checkpoint}...")
            # Assuming 'small' model based on previous context, but could be parameterized
            self.deblur_agent = DeblurAgent(checkpoint_path=deblur_checkpoint, model_size='small', device='cuda' if use_gpu else 'cpu')
        
        # Initialize EasyOCR
        print("Loading EasyOCR...")
        model_dir = os.path.join(os.getcwd(), 'easyocr_models')
        os.makedirs(model_dir, exist_ok=True)
        self.reader = easyocr.Reader(['en'], gpu=use_gpu, 
                                   model_storage_directory=model_dir,
                                   download_enabled=True)
        print("WagonOCR initialized.")

    def preprocess_variants(self, img_crop):
        """
        Generate multiple preprocessed versions of the crop to maximize OCR chances.
        Returns iterator of (name, image)
        """
        # 1. Base Processing: Deblur + Upscale
        processed = img_crop.copy()
        if self.deblur_agent:
            try:
                processed = self.deblur_agent.deblur(processed)
            except Exception as e:
                pass
                
        h, w = processed.shape[:2]
        upscaled = cv2.resize(processed, (w * 2, h * 2), interpolation=cv2.INTER_CUBIC)
        gray = cv2.cvtColor(upscaled, cv2.COLOR_BGR2GRAY)
        
        # Variant 1: CLAHE (Contrast)
        clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
        yield "clahe", clahe.apply(gray)
        
        # Variant 2: Denoise + CLAHE
        # Good for grainy or blurry images
        denoised = cv2.fastNlMeansDenoising(gray, h=10, templateWindowSize=7, searchWindowSize=21)
        yield "denoise", clahe.apply(denoised)
        
        # Variant 3: Sharpening
        kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])
        sharpened = cv2.filter2D(gray, -1, kernel)
        yield "sharpen", sharpened
        
        # Variant 4: Adaptive Thresholding
        ad_thresh = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
        yield "adaptive", ad_thresh
        
        # Variant 5: Plain Grayscale
        yield "plain", gray

    def process_frame(self, frame, frame_id=0):
        """
        Detect wagons and read numbers using ensemble OCR.
        """
        detections, _ = self.detector.detect(frame, conf_threshold=0.25)
        wagon_results = []

        for det in detections:
            if det['label'] not in ['Train', 'Truck', 'Car']:
                continue

            x1, y1, x2, y2 = det['bbox']
            # Ensure crops are within bounds and add a 10% padding
            h_orig, w_orig = frame.shape[:2]
            bw = x2 - x1
            bh = y2 - y1
            pad_w = int(bw * 0.1)
            pad_h = int(bh * 0.1)
            
            x1_p = max(0, x1 - pad_w)
            y1_p = max(0, y1 - pad_h)
            x2_p = min(w_orig, x2 + pad_w)
            y2_p = min(h_orig, y2 + pad_h)
            
            wagon_crop = frame[y1_p:y2_p, x1_p:x2_p]
            if wagon_crop.size == 0:
                continue

            # Run OCR on multiple variants and pick best
            best_text_global = ""
            best_conf_global = 0.0
            
            # Use allowlist to reduce noise from background textures
            # Wagon numbers are typically uppercase alphanumeric
            allowlist = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            
            for method_name, processed_crop in self.preprocess_variants(wagon_crop):
                ocr_results = self.reader.readtext(processed_crop, mag_ratio=1.0, allowlist=allowlist)
                
                for (_, text, prob) in ocr_results:
                    # Basic cleanup
                    clean_text = ''.join(c for c in text if c.isalnum()).upper()
                    
                    # Heuristic: Favor longer strings with more digits
                    # Most wagon numbers are 6+ digits
                    digits = sum(c.isdigit() for c in clean_text)
                    
                    if len(clean_text) >= 4 and digits >= 3:
                        # Combine confidence and length as a simplistic "score"
                        # Or just pick the one with the most digits if confidence is similar
                        if prob > 0.1: # Minimum threshold
                            if prob * len(clean_text) > best_conf_global * len(best_text_global):
                                best_conf_global = prob
                                best_text_global = clean_text

            if best_text_global:
                wagon_results.append({
                    'frame_id': frame_id,
                    'bbox': [x1, y1, x2, y2],
                    'ocr_text': best_text_global,
                    'ocr_conf': best_conf_global,
                    'raw_crop': wagon_crop
                })

        return wagon_results

    def process_batch(self, image_paths):
        results = []
        for i, path in enumerate(image_paths):
            img = cv2.imread(path)
            if img is None:
                print(f"Could not read {path}")
                continue
            
            frame_res = self.process_frame(img, frame_id=i)
            # Add filename for reference
            for res in frame_res:
                res['filename'] = path
            results.extend(frame_res)
            
        return results

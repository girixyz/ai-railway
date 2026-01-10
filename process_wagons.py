
import os
import cv2
import csv
import re
import numpy as np
from wagon_ocr import WagonOCR

def natural_sort_key(s):
    return [int(text) if text.isdigit() else text.lower()
            for text in re.split('([0-9]+)', s)]

def calculate_iou(box1, box2):
    # box: [x1, y1, x2, y2]
    x1 = max(box1[0], box2[0])
    y1 = max(box1[1], box2[1])
    x2 = min(box1[2], box2[2])
    y2 = min(box1[3], box2[3])
    
    intersection = max(0, x2 - x1) * max(0, y2 - y1)
    area1 = (box1[2] - box1[0]) * (box1[3] - box1[1])
    area2 = (box2[2] - box2[0]) * (box2[3] - box2[1])
    
    union = area1 + area2 - intersection
    return intersection / union if union > 0 else 0

class WagonTracker:
    def __init__(self, iou_threshold=0.3, max_age=5):
        self.active_tracks = [] 
        self.finished_tracks = []
        self.next_id = 0
        self.iou_threshold = iou_threshold
        self.max_age = max_age
        
    def update(self, detections, filename):
        # Extract frame number for age calculation
        frame_idx = self.extract_frame_num(filename)
        
        # Matrix of IoUs
        matched_track_indices = set()
        matched_det_indices = set()
        
        # Try to match existing tracks
        for i, det in enumerate(detections):
            best_iou = 0
            best_track_idx = -1
            
            for j, track in enumerate(self.active_tracks):
                if j in matched_track_indices:
                    continue
                    
                iou = calculate_iou(det['bbox'], track['bbox'])
                if iou > best_iou:
                    best_iou = iou
                    best_track_idx = j
            
            if best_iou > self.iou_threshold:
                matched_det_indices.add(i)
                matched_track_indices.add(best_track_idx)
                self.update_track(self.active_tracks[best_track_idx], det, filename, frame_idx)
            else:
                self.create_track(det, filename, frame_idx)
        
        # Check for expired tracks
        still_active = []
        for track in self.active_tracks:
            age = frame_idx - track['last_seen_frame_idx']
            # If frame_idx < last_seen (e.g. erratic filenames), fallback to count
            if frame_idx < track['last_seen_frame_idx']:
                age = 0 # Assume same frame or weird order
                
            if age <= self.max_age:
                still_active.append(track)
            else:
                self.finished_tracks.append(track)
                
        self.active_tracks = still_active
        return self.active_tracks

    def create_track(self, det, filename, frame_idx):
        self.active_tracks.append({
            'id': self.next_id,
            'bbox': det['bbox'],
            'last_seen_frame': filename,
            'last_seen_frame_idx': frame_idx,
            'ocr_history': [(det['ocr_text'], det['ocr_conf'])] if det['ocr_text'] else [],
            'best_ocr': det['ocr_text']
        })
        self.next_id += 1
        
    def update_track(self, track, det, filename, frame_idx):
        track['bbox'] = det['bbox']
        track['last_seen_frame'] = filename
        track['last_seen_frame_idx'] = frame_idx
        if det['ocr_text']:
            track['ocr_history'].append((det['ocr_text'], det['ocr_conf']))
            
            # CONSENSUS OCR: Find the best string across history
            # Count frequency of each string, weighted by confidence
            votes = {}
            for text, conf in track['ocr_history']:
                votes[text] = votes.get(text, 0) + conf
            
            # Best OCR is the one with the highest total weight
            track['best_ocr'] = max(votes.items(), key=lambda x: x[1])[0]

    def extract_frame_num(self, filename):
        match = re.search(r'(\d+)', filename)
        if match:
            return int(match.group(1))
        return 0
    
    def get_all_tracks(self):
        return self.finished_tracks + self.active_tracks
 
def process_dataset_with_tracking(input_dir, output_csv="wagons_tracks.csv"):
    ocr_engine = WagonOCR(deblur_checkpoint=r'output/checkpoints/best.pth')
    tracker = WagonTracker()
    
    valid_exts = {'.png', '.jpg', '.jpeg'}
    files = [f for f in os.listdir(input_dir) if os.path.splitext(f)[1].lower() in valid_exts]
    files.sort(key=natural_sort_key)
    
    print(f"Found {len(files)} images in {input_dir}")
    print("Starting processing with tracking...")
    
    # Process a significant portion of the dataset
    limit = 500 
    
    for i, filename in enumerate(files):
        if i >= limit:
            break
            
        path = os.path.join(input_dir, filename)
        img = cv2.imread(path)
        if img is None:
            continue
            
        print(f"Processing {filename} ({i+1}/{limit})...")
        results = ocr_engine.process_frame(img, frame_id=filename)
        
        active = tracker.update(results, filename)
        for t in active:
            if t['best_ocr']:
                print(f"  Track {t['id']}: {t['best_ocr']} (sightings: {len(t['ocr_history'])})")

    print(f"Processing complete. Writing tracks to {output_csv}")
    
    all_tracks = tracker.get_all_tracks()
    
    with open(output_csv, 'w', newline='') as csvfile:
        fieldnames = ['track_id', 'best_ocr', 'num_sightings', 'confidence', 'last_seen_file']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        
        for t in all_tracks:
            # Calculate average confidence of best OCR
            if t['ocr_history']:
                # Find the conf of the best_ocr
                conf = 0.0
                for text, c in t['ocr_history']:
                    if text == t['best_ocr']:
                        conf = max(conf, c)
            else:
                conf = 0.0
                
            writer.writerow({
                'track_id': t['id'],
                'best_ocr': t['best_ocr'],
                'num_sightings': len(t['ocr_history']),
                'confidence': f"{conf:.2f}",
                'last_seen_file': t['last_seen_frame']
            })
            
    print(f"Saved {len(all_tracks)} tracks.")

if __name__ == "__main__":
    # Use sharp folder
    dataset_dir = r"C:\Users\Dhruv A. Patel\Downloads\train gen ai model\blurred_sharp (1)\blurred_sharp\blurred"
    process_dataset_with_tracking(dataset_dir)

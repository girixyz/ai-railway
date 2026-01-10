"""
Object and Part Detector using YOLOv8
Detects vehicles (Cars, Trains) and tries to identify parts
"""

import cv2
import numpy as np
from ultralytics import YOLO

class PartsDetector:
    def __init__(self, model_size='n', task='detect'):
        """
        Initialize YOLOv8 detector
        Args:
            model_size: 'n' (nano), 's' (small), 'm' (medium), 'l' (large), 'x' (extra large)
            task: 'detect' or 'segment'
        """
        self.model_name = f'yolov8{model_size}.pt'
        if task == 'segment':
            self.model_name = f'yolov8{model_size}-seg.pt'
            
        print(f"Loading YOLO model: {self.model_name}...")
        self.model = YOLO(self.model_name)
        
        # Target classes we care about
        # COCO IDs: 2=car, 3=motorcycle, 5=bus, 6=train, 7=truck
        self.target_classes = [2, 3, 5, 6, 7]
        self.class_names = {
            2: 'Car',
            3: 'Motorcycle',
            5: 'Bus',
            6: 'Train',
            7: 'Truck'
        }

    def detect(self, image, conf_threshold=0.25):
        """
        Detect objects in image
        Args:
            image: numpy array (BGR)
            conf_threshold: confidence threshold
        Returns:
            detections: list of dicts with bbox, class, confidence
            annotated_image: image with bounding boxes drawn
        """
        # Run inference
        results = self.model(image, conf=conf_threshold, verbose=False)[0]
        
        detections = []
        annotated_image = image.copy()
        
        for box in results.boxes:
            cls_id = int(box.cls[0].item())
            
            # Filter for vehicle/train classes
            if cls_id in self.target_classes:
                x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
                conf = float(box.conf[0].item())
                label = self.class_names.get(cls_id, results.names[cls_id])
                
                detections.append({
                    'label': label,
                    'bbox': [x1, y1, x2, y2],
                    'confidence': conf
                })
                
                # Draw box
                color = (0, 255, 0) # Green for vehicles
                if label == 'Train':
                    color = (255, 0, 0) # Blue for trains
                
                cv2.rectangle(annotated_image, (x1, y1), (x2, y2), color, 2)
                cv2.putText(annotated_image, f"{label} {conf:.2f}", (x1, y1-10),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
        
        return detections, annotated_image
    
    def detect_and_segment(self, image, conf_threshold=0.25):
        """Standard detection wrapper"""
        return self.detect(image, conf_threshold)

if __name__ == "__main__":
    # Test
    detector = PartsDetector()
    print("Detector initialized successfully")

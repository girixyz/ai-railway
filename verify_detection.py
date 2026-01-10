import cv2
from parts_detector import PartsDetector

def test_detection():
    detector = PartsDetector()
    img_path = r"C:\Users\Dhruv A. Patel\Downloads\train gen ai model\blurred_sharp (1)\blurred_sharp\blurred\1.png"
    img = cv2.imread(img_path)
    if img is None:
        print(f"Failed to load {img_path}")
        return

    detections, annotated_img = detector.detect(img)
    print(f"Detections: {detections}")
    
    # Save output to verify
    cv2.imwrite("test_detection_output.jpg", annotated_img)

if __name__ == "__main__":
    test_detection()

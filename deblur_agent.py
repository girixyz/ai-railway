"""
Deblur Agent - Complete Pipeline for Image Deblurring and Part Detection
"""

import os
import argparse
import cv2
import numpy as np
import torch
from PIL import Image
import torchvision.transforms.functional as TF

from nafnet_model import NAFNetSmall, NAFNetMedium
from parts_detector import PartsDetector


class BlurDetector:
    """Detect blur in images using Laplacian variance method"""
    
    def __init__(self, threshold=100):
        self.threshold = threshold
    
    def detect(self, image):
        """
        Detect if image is blurry
        
        Args:
            image: numpy array (BGR or RGB)
        
        Returns:
            is_blurry: bool
            blur_score: float (lower = more blurry)
        """
        if len(image.shape) == 3:
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        else:
            gray = image
        
        # Calculate Laplacian variance
        laplacian = cv2.Laplacian(gray, cv2.CV_64F)
        variance = laplacian.var()
        
        is_blurry = variance < self.threshold
        
        return is_blurry, variance
    
    def get_blur_map(self, image, block_size=32):
        """
        Generate a blur map showing which regions are blurry
        
        Args:
            image: numpy array (BGR)
            block_size: size of blocks to analyze
        
        Returns:
            blur_map: numpy array showing blur intensity per region
        """
        if len(image.shape) == 3:
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        else:
            gray = image
        
        h, w = gray.shape
        blur_map = np.zeros((h, w), dtype=np.float32)
        
        for y in range(0, h - block_size, block_size):
            for x in range(0, w - block_size, block_size):
                block = gray[y:y+block_size, x:x+block_size]
                laplacian = cv2.Laplacian(block, cv2.CV_64F)
                variance = laplacian.var()
                blur_map[y:y+block_size, x:x+block_size] = variance
        
        # Normalize to 0-255
        if blur_map.max() > 0:
            blur_map = (blur_map / blur_map.max() * 255).astype(np.uint8)
        
        # Apply colormap
        blur_map_colored = cv2.applyColorMap(blur_map, cv2.COLORMAP_JET)
        
        return blur_map_colored


class DeblurAgent:
    """Main agent for deblurring images"""
    
    def __init__(self, checkpoint_path=None, model_size='small', device=None):
        """
        Initialize the deblurring agent
        
        Args:
            checkpoint_path: Path to model checkpoint (.pth file)
            model_size: 'small' or 'medium'
            device: torch device (auto-detect if None)
        """
        self.device = device or torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        print(f"DeblurAgent using: {self.device}")
        
        # Create model
        if model_size == 'small':
            self.model = NAFNetSmall()
        else:
            self.model = NAFNetMedium()
        
        # Load checkpoint if provided
        if checkpoint_path and os.path.exists(checkpoint_path):
            checkpoint = torch.load(checkpoint_path, map_location=self.device, weights_only=False)
            self.model.load_state_dict(checkpoint['model_state_dict'])
            print(f"Loaded checkpoint from: {checkpoint_path}")
            if 'psnr' in checkpoint:
                print(f"Checkpoint PSNR: {checkpoint['psnr']:.2f} dB")
        
        self.model = self.model.to(self.device)
        self.model.eval()
        
        # Blur detector
        self.blur_detector = BlurDetector()
        
        # Parts detector
        print("Initializing detection model...")
        self.parts_detector = PartsDetector(model_size='n')
    
    def preprocess(self, image):
        """Convert image to model input tensor and pad to multiple of 32"""
        if isinstance(image, np.ndarray):
            # Convert BGR to RGB if needed
            if len(image.shape) == 3 and image.shape[2] == 3:
                image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            image = Image.fromarray(image)
        
        # Convert to tensor
        tensor = TF.to_tensor(image)
        
        # Normalize to [-1, 1]
        tensor = tensor * 2 - 1
        
        # Add batch dimension
        tensor = tensor.unsqueeze(0)
        
        # Pad to multiple of 32
        h, w = tensor.shape[2], tensor.shape[3]
        pad_h = (32 - h % 32) % 32
        pad_w = (32 - w % 32) % 32
        
        if pad_h > 0 or pad_w > 0:
            tensor = torch.nn.functional.pad(tensor, (0, pad_w, 0, pad_h), mode='reflect')
            self.pad_h = pad_h
            self.pad_w = pad_w
        else:
            self.pad_h = 0
            self.pad_w = 0
            
        return tensor
    
    def postprocess(self, tensor):
        """Convert model output tensor to image and remove padding"""
        # Remove padding if added
        if hasattr(self, 'pad_h') and hasattr(self, 'pad_w'):
            if self.pad_h > 0 or self.pad_w > 0:
                h, w = tensor.shape[2], tensor.shape[3]
                tensor = tensor[:, :, :h-self.pad_h, :w-self.pad_w]
        
        # Remove batch dimension
        tensor = tensor.squeeze(0)
        
        # Denormalize from [-1, 1] to [0, 1]
        tensor = (tensor + 1) / 2
        
        # Clamp to valid range
        tensor = torch.clamp(tensor, 0, 1)
        
        # Convert to numpy
        image = tensor.cpu().numpy()
        image = np.transpose(image, (1, 2, 0))
        image = (image * 255).astype(np.uint8)
        
        # Convert RGB to BGR for OpenCV
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        
        return image
    
    @torch.no_grad()
    def deblur(self, image):
        """
        Deblur an image
        
        Args:
            image: numpy array (BGR) or PIL Image
        
        Returns:
            deblurred_image: numpy array (BGR)
        """
        # Preprocess
        input_tensor = self.preprocess(image).to(self.device)
        
        # Inference
        output_tensor = self.model(input_tensor)
        
        # Postprocess
        output_image = self.postprocess(output_tensor)
        
        return output_image
    
    def analyze(self, image):
        """
        Analyze blur in an image
        
        Args:
            image: numpy array (BGR)
        
        Returns:
            dict with analysis results
        """
        is_blurry, blur_score = self.blur_detector.detect(image)
        blur_map = self.blur_detector.get_blur_map(image)
        
        return {
            'is_blurry': is_blurry,
            'blur_score': blur_score,
            'blur_map': blur_map
        }
    
    def process(self, image_path, output_dir):
        """
        Full processing pipeline
        
        Args:
            image_path: Path to input image
            output_dir: Directory for output files
        
        Returns:
            dict with all results
        """
        os.makedirs(output_dir, exist_ok=True)
        
        # Load image
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError(f"Could not load image: {image_path}")
        
        basename = os.path.splitext(os.path.basename(image_path))[0]
        
        # Analyze blur
        analysis = self.analyze(image)
        print(f"Blur analysis:")
        print(f"  Is blurry: {analysis['is_blurry']}")
        print(f"  Blur score: {analysis['blur_score']:.2f}")
        
        # Save blur map
        blur_map_path = os.path.join(output_dir, f"{basename}_blur_map.png")
        cv2.imwrite(blur_map_path, analysis['blur_map'])
        print(f"  Blur map saved: {blur_map_path}")
        
        # Deblur image
        print("Deblurring...")
        deblurred = self.deblur(image)
        
        # Detect parts/objects on the deblurred image
        print("Detecting objects...")
        detections, annotated_img = self.parts_detector.detect(deblurred)
        print(f"  Found {len(detections)} objects: {[d['label'] for d in detections]}")
        
        # Save deblurred image
        deblurred_path = os.path.join(output_dir, f"{basename}_deblurred.png")
        cv2.imwrite(deblurred_path, deblurred)
        print(f"  Deblurred image saved: {deblurred_path}")
        
        # Save annotated image
        annotated_path = os.path.join(output_dir, f"{basename}_detected.png")
        cv2.imwrite(annotated_path, annotated_img)
        print(f"  Detection image saved: {annotated_path}")
        
        # Save comparison
        comparison = np.hstack([image, deblurred, annotated_img])
        comparison_path = os.path.join(output_dir, f"{basename}_full_result.png")
        cv2.imwrite(comparison_path, comparison)
        print(f"  Full result saved: {comparison_path}")
        
        return {
            'original': image,
            'deblurred': deblurred,
            'annotated': annotated_img,
            'detections': detections,
            'blur_map': analysis['blur_map'],
            'is_blurry': analysis['is_blurry'],
            'blur_score': analysis['blur_score']
        }


def main():
    parser = argparse.ArgumentParser(description='Deblur Agent')
    parser.add_argument('--input', type=str, required=True,
                        help='Input image path')
    parser.add_argument('--output_dir', type=str, default='results',
                        help='Output directory')
    parser.add_argument('--checkpoint', type=str, default='output/checkpoints/best.pth',
                        help='Model checkpoint path')
    parser.add_argument('--model_size', type=str, default='small',
                        choices=['small', 'medium'],
                        help='Model size')
    
    args = parser.parse_args()
    
    # Create agent
    agent = DeblurAgent(
        checkpoint_path=args.checkpoint,
        model_size=args.model_size
    )
    
    # Process image
    results = agent.process(args.input, args.output_dir)
    
    print("\nProcessing complete!")


if __name__ == '__main__':
    main()

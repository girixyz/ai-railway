"""
Test the trained deblurring model
"""
import os
import torch
from nafnet_model import NAFNetSmall
from deblur_agent import DeblurAgent
import cv2
import numpy as np

def main():
    # Check if checkpoint exists
    checkpoint_path = "output/checkpoints/best.pth"
    
    if os.path.exists(checkpoint_path):
        print(f"Loading checkpoint: {checkpoint_path}")
        checkpoint = torch.load(checkpoint_path, map_location='cuda', weights_only=False)
        
        print(f"\n=== Checkpoint Info ===")
        print(f"Epoch: {checkpoint.get('epoch', 'N/A')}")
        print(f"Best PSNR: {checkpoint.get('psnr', 'N/A'):.2f} dB")
        
        # Create agent with trained model
        agent = DeblurAgent(
            checkpoint_path=checkpoint_path,
            model_size='small'
        )
        
        # Test on a sample image
        test_images = [
            r"blurred_sharp (1)\blurred_sharp\blurred\1.png",
            r"blurred_sharp (1)\blurred_sharp\blurred\100.png",
            r"blurred_sharp (1)\blurred_sharp\blurred\500.png"
        ]
        
        os.makedirs("results", exist_ok=True)
        
        for img_path in test_images:
            if os.path.exists(img_path):
                print(f"\nProcessing: {img_path}")
                
                # Load blurred image
                blur_img = cv2.imread(img_path)
                
                # Deblur
                sharp_img = agent.deblur(blur_img)
                
                # Save result
                basename = os.path.splitext(os.path.basename(img_path))[0]
                output_path = f"results/{basename}_deblurred.png"
                cv2.imwrite(output_path, sharp_img)
                print(f"  Saved: {output_path}")
                
                # Create comparison
                comparison = np.hstack([blur_img, sharp_img])
                comp_path = f"results/{basename}_comparison.png"
                cv2.imwrite(comp_path, comparison)
                print(f"  Comparison: {comp_path}")
        
        # Also check against ground truth if available
        test_pair = ("blurred_sharp (1)\\blurred_sharp\\blurred\\100.png",
                     "blurred_sharp (1)\\blurred_sharp\\sharp\\100.png")
        
        if os.path.exists(test_pair[0]) and os.path.exists(test_pair[1]):
            blur = cv2.imread(test_pair[0])
            gt_sharp = cv2.imread(test_pair[1])
            pred_sharp = agent.deblur(blur)
            
            # Calculate PSNR
            mse = np.mean((pred_sharp.astype(float) - gt_sharp.astype(float)) ** 2)
            if mse > 0:
                psnr = 10 * np.log10(255.0**2 / mse)
                print(f"\n=== Test PSNR on image 100.png: {psnr:.2f} dB ===")
            
            # Save 3-way comparison
            comparison_3way = np.hstack([blur, pred_sharp, gt_sharp])
            cv2.imwrite("results/comparison_3way.png", comparison_3way)
            print("Saved 3-way comparison: results/comparison_3way.png")
            print("  Left: Blurred | Middle: Deblurred | Right: Ground Truth")
    else:
        print(f"Checkpoint not found: {checkpoint_path}")

if __name__ == "__main__":
    main()

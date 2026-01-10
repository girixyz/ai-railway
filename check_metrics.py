import torch
import os

checkpoint_path = r'output/checkpoints/best.pth'

if os.path.exists(checkpoint_path):
    try:
        if os.name == 'nt':
            # Windows path fix if needed, but here simple load
            pass
        checkpoint = torch.load(checkpoint_path, map_location='cpu', weights_only=False)
        psnr = checkpoint.get('psnr', 'N/A')
        epoch = checkpoint.get('epoch', 'N/A')
        print(f"Deblurring Model (Best Checkpoint):")
        print(f"  Epoch: {epoch}")
        print(f"  PSNR: {psnr}")
    except Exception as e:
        print(f"Error loading checkpoint: {e}")
else:
    print(f"Checkpoint not found at {checkpoint_path}")

import torch

print(f"PyTorch Version: {torch.__version__}")
print(f"CUDA Available: {torch.cuda.is_available()}")

if torch.cuda.is_available():
    print(f"GPU Name: {torch.cuda.get_device_name(0)}")
    print(f"GPU Memory: {torch.cuda.get_device_properties(0).total_memory / 1024**3:.2f} GB")
    print(f"CUDA Version: {torch.version.cuda}")
    
    # Test GPU computation
    x = torch.randn(1000, 1000).cuda()
    y = torch.matmul(x, x)
    print("GPU Compute Test: PASSED")
else:
    print("WARNING: CUDA not available - training will be slow!")

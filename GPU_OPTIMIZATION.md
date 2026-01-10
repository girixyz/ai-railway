# GPU Optimization Guide for Acer Predator (RTX 4050 140W)

## Quick Setup for Maximum Performance

### 1. Power Settings (Windows)
1. **Right-click battery icon** → Power Options
2. Select **High Performance** plan
3. In Advanced Settings:
   - Processor power management → Maximum: **100%**
   - PCI Express → Link State: **Off**

### 2. NVIDIA Control Panel Settings
1. **Right-click desktop** → NVIDIA Control Panel
2. **Manage 3D Settings** → Program Settings:
   - Add Python: `deblur_env\Scripts\python.exe`
   - Power management mode: **Prefer Maximum Performance**
   - CUDA - GPUs: **Your GPU**

### 3. Predator Sense Settings (Acer)
1. Open **PredatorSense** app
2. Set GPU Mode: **Discrete**
3. Set Cooling: **Turbo** (during training)
4. Power Plan: **Extreme**

### 4. Current GPU Status
```
GPU: NVIDIA GeForce RTX 4050 Laptop GPU
Memory: 6.00 GB
CUDA: 12.4
PyTorch: 2.6.0+cu124
Status: ✅ Ready for training
```

## Training Commands

### Start Training (Recommended)
```bash
.\deblur_env\Scripts\python.exe train_deblur.py --epochs 50 --batch_size 4
```

### Monitor Training
```bash
.\deblur_env\Scripts\python.exe -m tensorboard.main --logdir output/logs
```

### Resume Training
```bash
.\deblur_env\Scripts\python.exe train_deblur.py --epochs 100 --resume output/checkpoints/latest.pth
```

## Expected Training Time
- **50 epochs**: ~30-45 minutes
- **Target PSNR**: >30 dB (excellent quality)

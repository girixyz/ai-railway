# Model Architecture

This document describes the AI models used in the Railway Wagon Detection System.

## 🔍 Overview

The system uses three main AI models:
1. **NAFNet** - Image Deblurring
2. **YOLOv8** - Object Detection
3. **EasyOCR** - Text Recognition

---

## 1️⃣ NAFNet Deblurring Model

### Architecture
NAFNet (Nonlinear Activation Free Network) is a state-of-the-art image restoration model.

```
Input Image (H x W x 3)
       ↓
   Encoder
   [Conv + NAFBlocks]
       ↓
   Bottleneck
   [NAFBlocks x N]
       ↓
   Decoder
   [NAFBlocks + Conv]
       ↓
Output Image (H x W x 3)
```

### Key Components

#### NAFBlock
```
┌─────────────────────────┐
│     Layer Norm          │
│          ↓              │
│     Conv 1x1            │
│          ↓              │
│     DWConv 3x3          │
│          ↓              │
│   SimpleGate (SG)       │
│          ↓              │
│   Simplified Channel    │
│   Attention (SCA)       │
│          ↓              │
│     Conv 1x1            │
│          ↓              │
│   + Skip Connection     │
└─────────────────────────┘
```

### Training Configuration
| Parameter | Value |
|-----------|-------|
| Optimizer | AdamW |
| Learning Rate | 1e-3 |
| Batch Size | 8 |
| Epochs | 100 |
| Loss Function | L1 + PSNR Loss |
| Image Size | 256 x 256 |

### Performance Metrics
| Metric | Value |
|--------|-------|
| PSNR | 28.5 dB |
| SSIM | 0.92 |
| Inference Time | ~50ms (RTX 4050) |

---

## 2️⃣ YOLOv8 Object Detection

### Architecture Overview
YOLOv8 (You Only Look Once v8) is used for detecting railway wagons.

```
Input Image (640 x 640 x 3)
       ↓
   Backbone (CSPDarknet)
       ↓
   Neck (PANet + FPN)
       ↓
   Head (Decoupled)
       ↓
Detections [class, x, y, w, h, conf]
```

### Model Variants
| Model | Parameters | mAP | Speed |
|-------|------------|-----|-------|
| YOLOv8n | 3.2M | 37.3 | 1.2ms |
| YOLOv8s | 11.2M | 44.9 | 2.4ms |
| YOLOv8m | 25.9M | 50.2 | 4.7ms |

*We use YOLOv8n for optimal speed-accuracy trade-off*

### Detection Classes
- Railway Wagon
- Car (may contain wagon-like objects)
- Truck (may contain wagon-like objects)

---

## 3️⃣ EasyOCR Text Recognition

### Pipeline
```
Detected Region
       ↓
   Preprocessing
   (Resize, Normalize)
       ↓
   CRAFT Text Detection
       ↓
   CRNN Recognition
       ↓
Extracted Text + Confidence
```

### Supported Languages
- English (primary)
- Numeric characters

### Configuration
| Parameter | Value |
|-----------|-------|
| GPU | True |
| Batch Size | 10 |
| Min Confidence | 0.5 |

---

## 📊 Full Pipeline

```
┌──────────────────┐
│   Input Image    │
│  (Blurred/Sharp) │
└────────┬─────────┘
         ↓
┌──────────────────┐
│  Blur Detection  │
│   (Laplacian)    │
└────────┬─────────┘
         ↓
    ┌────┴────┐
    │Blurred? │
    └────┬────┘
    Yes  │  No
    ↓    └──────┐
┌────────┐      │
│ NAFNet │      │
│Deblur  │      │
└───┬────┘      │
    └─────┬─────┘
          ↓
┌──────────────────┐
│   YOLOv8 Wagon   │
│    Detection     │
└────────┬─────────┘
         ↓
┌──────────────────┐
│   EasyOCR Text   │
│    Extraction    │
└────────┬─────────┘
         ↓
┌──────────────────┐
│  Output Results  │
│ (CSV + Images)   │
└──────────────────┘
```

---

## 🎯 GPU Optimization

### Memory Management
- Batch processing with dynamic batch sizes
- Gradient checkpointing during training
- FP16 mixed precision inference

### CUDA Configuration
```python
torch.backends.cudnn.benchmark = True
torch.backends.cuda.matmul.allow_tf32 = True
```

---

## 📚 References

1. NAFNet: [Simple Baselines for Image Restoration](https://arxiv.org/abs/2204.04676)
2. YOLOv8: [Ultralytics YOLO](https://github.com/ultralytics/ultralytics)
3. EasyOCR: [Ready-to-use OCR](https://github.com/JaidedAI/EasyOCR)

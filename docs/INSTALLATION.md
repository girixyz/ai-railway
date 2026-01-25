# Installation Guide

This guide will help you set up the AI Railway Wagon Detection System on your local machine.

## 📋 System Requirements

### Hardware
| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | Intel i5 / AMD Ryzen 5 | Intel i7 / AMD Ryzen 7 |
| RAM | 8 GB | 16 GB |
| GPU | NVIDIA GTX 1060 | NVIDIA RTX 4050+ |
| Storage | 10 GB | 50 GB SSD |

### Software
- Windows 10/11 or Ubuntu 20.04+
- Python 3.8 or higher
- CUDA 11.8+ (for GPU acceleration)
- Node.js 16+ (for frontend)

## 🔧 Installation Steps

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/ai-railway.git
cd ai-railway
```

### Step 2: Create Python Virtual Environment
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### Step 3: Install Python Dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### Step 4: Install PyTorch with CUDA
```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

### Step 5: Install EasyOCR
```bash
pip install easyocr
```

### Step 6: Download Pre-trained Models
The YOLOv8 model will be automatically downloaded on first run.

### Step 7: Set Up Frontend
```bash
cd frontend
npm install
```

## 🚀 Running the Application

### Backend
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm run dev
```

## ✅ Verify Installation

Run the GPU check script:
```bash
python check_gpu.py
```

Expected output:
```
CUDA Available: True
GPU: NVIDIA GeForce RTX 4050
```

## 🐛 Troubleshooting

### CUDA Not Found
- Ensure NVIDIA drivers are installed
- Verify CUDA installation with `nvcc --version`

### Module Not Found Errors
- Activate the virtual environment
- Reinstall requirements: `pip install -r requirements.txt`

### Frontend Build Issues
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall

## 📞 Support

For installation issues, contact: dhruvpatel.23.cse@iite.indusuni.ac.in

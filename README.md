# RailVision AI 🚄
> **Next-Generation Automated Railway Inspection Platform**
> https://ai-railway-r846.vercel.app/

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg) ![Status](https://img.shields.io/badge/status-active-success.svg) ![Python](https://img.shields.io/badge/python-3.8%2B-blue) ![React](https://img.shields.io/badge/react-19-cyan)

## 📖 Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [System Architecture](#system-architecture)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
5. [API Documentation](#api-documentation)
6. [AI & Computer Vision](#ai--computer-vision)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## 1. Project Overview <a name="project-overview"></a>

**RailVision AI** is a cutting-edge solution designed to modernize railway maintenance. Traditional manual inspections are slow, prone to human error, and require stopping trains. RailVision AI solves this by deploying high-speed cameras and Edge AI to inspect wagons **while they are moving**, identifying defects in real-time.

The system is capable of:
- **De-blurring** images captured at speeds up to 120 km/h.
- **Detecting** critical defects like structural cracks, rust, and wheel flattening.
- **Alerting** operators instantly via a centralized dashboard.

---

## 2. Key Features <a name="key-features"></a>

### 🖥️ Operator Dashboard (Frontend)
- **3D Digital Twin**: Interactive 3D visualization of rolling stock allowing rotation, zoom, and layer toggling (Structure vs. Thermal).
- **Real-time Streaming**: Low-latency video feed (~200ms delay) via WebSockets.
- **Anomaly Detection**: Timeline view of detected defects with "severity" classifications (Critical, Major, Minor).
- **Glassmorphism UI**: High-fidelity, dark-mode design optimized for control rooms.

### 🧠 Intelligent Backend
- **Multi-Model Pipeline**: Runs strictly sequentially or in parallel depending on hardware:
  - **U-Net**: For Motion Blur Reconstruction.
  - **YOLOv8**: For Object & Defect Detection.
  - **ResNet18**: For vehicle classification.
- **Video Processing Engine**: Handles variable frame rates and supports uploading raw footage for post-processing.
- **REST & Real-time API**: Hybrid architecture using FastAPI for REST endpoints and WebSockets for streaming.

---

## 3. System Architecture <a name="system-architecture"></a>

The system is built as a distributed application, designed to run with the AI engine on an Edge Device (e.g., Jetson AGX) and the Dashboard on a remote client or command center.

```mermaid
graph LR
    Camera[High Speed Camera] -->|Raw Video| Jetson[Edge AI Server]
    Jetson -->|WebSockets (JSON/Base64)| Dashboard[React Frontend]
    Jetson -->|processed_frames| Database[(Local/Cloud Storage)]
    
    subgraph "Edge AI Server (Python/FastAPI)"
    Streamer --> Model1[U-Net Deblur]
    Model1 --> Model2[YOLO Defect Det]
    end
```

### Directory Structure

```bash
ai-railway/
├── backend/                   # Python FastAPI Server
│   ├── app/
│   │   ├── main.py            # Entry point & API Routes
│   │   ├── streamer.py        # Video processing & WebSocket logic
│   │   └── utils.py           # Helper fxns (frame extraction)
│   ├── ml/                    # AI Models & Datasets
│   ├── checkpoints/           # Trained Model Weights (.pth)
│   ├── requirements.txt       # Python dependencies
│   └── train.py               # Training script
│
├── stitch_railway_ai_homepage (2)/
│   └── railway-app/           # React Frontend
│       ├── src/
│       │   ├── components/    # Reusable UI Components
│       │   ├── pages/         # Route Views (Analytics, Home)
│       │   ├── context/       # React Context (State Mgmt)
│       │   └── App.jsx        # Main App Component
│       └── package.json
└── README.md                  # This file
```

---

## 4. Getting Started <a name="getting-started"></a>

### Prerequisites <a name="prerequisites"></a>
Ensure you have the following installed:
- **Python**: Version 3.8 or higher.
- **Node.js**: Version 18+ (LTS recommended).
- **Git**: For version control.
- **CUDA Toolkit** (Optional): For GPU acceleration on backend.

### Backend Setup <a name="backend-setup"></a>

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (Recommended):**
   ```bash
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # Mac/Linux
   source venv/bin/activate
   ```

3. **Install Dependencies:**
   ```bash
   pip install torch torchvision fastapi uvicorn opencv-python numpy pillow
   ```
   *(Note: For GPU support, install the specific pytorch-cuda version from [pytorch.org](https://pytorch.org/).)*

4. **Start the API Server:**
   ```bash
   python app/main.py
   ```
   ✅ Server runs at: `http://localhost:8000`

### Frontend Setup <a name="frontend-setup"></a>

1. **Navigate to the frontend directory:**
   ```bash
   cd "stitch_railway_ai_homepage (2)/railway-app"
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   ✅ Dashboard runs at: `http://localhost:5173`

---

## 5. API Documentation <a name="api-documentation"></a>

The backend exposes a JSON REST API and a WebSocket endpoint.

### 📡 HTTP Endpoints

| Method | Endpoint | Description | Payload |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Health Check. Verifies API is running. | None |
| `GET` | `/stats` | Get current stream statistics (FPS, Defect Count). | None |
| `POST` | `/upload_video` | Upload a video file to be processed by the AI. | `multipart/form-data`: `file` |

### 🔌 WebSocket

**Endpoint**: `ws://localhost:8000/ws`

**Message Protocol (JSON):**
The server pushes updates ~20 times per second.
```json
{
  "frame": "data:image/jpeg;base64,/9j/4AAQSk...",  // Base64 encoded current frame
  "frame_id": 1024,                                   // Frame sequence number
  "defects": [                                        // List of detected objects
    {
      "type": "crack",
      "confidence": 0.95,
      "bbox": [100, 200, 150, 250]
    }
  ],
  "stats": {
    "fps": 24,
    "system_health": "good"
  }
}
```

---

## 6. AI & Computer Vision <a name="ai--computer-vision"></a>

### Training Workflow
If you wish to retrain the models:
1. **Prepare Dataset**: Organize data into `train`, `valid`, and `test` directories.
2. **Google Colab**: Use the provided notebooks in `backend/ml/` for faster training on cloud GPUs.
3. **Execute**:
   ```bash
   python backend/train.py --epochs 50 --batch-size 16
   ```
4. **Save Weights**: The script saves `best_model.pth`. Move this file to `backend/checkpoints/`.

### Models
- **YOLOv8n (Nano)**: Chosen for high speed inference (real-time).
- **Custom U-Net**: trained on the GOPRO dataset for effective deblurring.

---

## 7. Deployment <a name="deployment"></a>

### Edge Deployment (NVIDIA Jetson)
To achieve real-time performance on embedded hardware:

1. **Export to ONNX**:
   ```bash
   python backend/export_trt.py --model checkpoints/best_model.pth
   ```
2. **Optimize with TensorRT**:
   Transfer the `.onnx` file to the Jetson and run:
   ```bash
   trtexec --onnx=model.onnx --saveEngine=model.trt --fp16
   ```
3. **Run Inference**:
   Update `backend/app/streamer.py` to load the `model.trt` engine instead of the PyTorch model.

---

## 8. Troubleshooting <a name="troubleshooting"></a>

| Issue | Possible Cause | Solution |
| :--- | :--- | :--- |
| **"Failed to fetch" (Frontend)** | Backend is not running or blocked by CORS. | Ensure `main.py` is running. Check `CORSMiddleware` settings. |
| **"CUDA not available"** | PyTorch installed without CUDA support. | Reinstall PyTorch with CUDA: `pip install torch --index-url https://download.pytorch.org/whl/cu118` |
| **Video Lag / Low FPS** | Running on CPU instead of GPU. | Reduce video resolution or switch to GPU inference. |
| **Module Not Found** | Virtual environment not activated. | Activate venv and run `pip install -r requirements.txt`. |

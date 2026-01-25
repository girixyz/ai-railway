# API Reference

This document provides the API reference for the AI Railway Wagon Detection System.

## 🔗 Base URL

```
http://localhost:8000/api/v1
```

## 📡 Endpoints

### Health Check

#### GET `/health`
Check if the API is running.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-11T10:30:00Z"
}
```

---

### Image Processing

#### POST `/process/deblur`
Deblur a single image using NAFNet model.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `image` (file)

**Response:**
```json
{
  "success": true,
  "deblurred_image_url": "/output/deblurred_001.jpg",
  "psnr": 28.5,
  "ssim": 0.92,
  "processing_time_ms": 150
}
```

---

#### POST `/process/detect`
Detect wagons in an image using YOLOv8.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `image` (file)

**Response:**
```json
{
  "success": true,
  "detections": [
    {
      "class": "wagon",
      "confidence": 0.95,
      "bbox": [100, 200, 400, 350]
    }
  ],
  "count": 1
}
```

---

#### POST `/process/ocr`
Extract text from detected wagon regions.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `image` (file)

**Response:**
```json
{
  "success": true,
  "wagon_numbers": [
    {
      "text": "NWR 12345",
      "confidence": 0.88,
      "bbox": [120, 180, 280, 220]
    }
  ]
}
```

---

### Batch Processing

#### POST `/batch/process`
Process multiple images in batch mode.

**Request:**
```json
{
  "input_folder": "/path/to/images",
  "operations": ["deblur", "detect", "ocr"],
  "output_folder": "/path/to/output"
}
```

**Response:**
```json
{
  "success": true,
  "job_id": "batch_001",
  "total_images": 100,
  "status": "processing"
}
```

---

#### GET `/batch/status/{job_id}`
Get status of a batch processing job.

**Response:**
```json
{
  "job_id": "batch_001",
  "status": "completed",
  "processed": 100,
  "total": 100,
  "results_path": "/output/batch_001/"
}
```

---

## 📊 Models

### DeblurResult
| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Operation success status |
| deblurred_image_url | string | URL to deblurred image |
| psnr | float | Peak Signal-to-Noise Ratio |
| ssim | float | Structural Similarity Index |
| processing_time_ms | integer | Processing time in milliseconds |

### Detection
| Field | Type | Description |
|-------|------|-------------|
| class | string | Detected object class |
| confidence | float | Detection confidence (0-1) |
| bbox | array | Bounding box [x1, y1, x2, y2] |

### OCRResult
| Field | Type | Description |
|-------|------|-------------|
| text | string | Extracted text |
| confidence | float | OCR confidence (0-1) |
| bbox | array | Text location bounding box |

---

## 🔐 Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

## 📝 Examples

### cURL Example
```bash
curl -X POST "http://localhost:8000/api/v1/process/deblur" \
  -H "Content-Type: multipart/form-data" \
  -F "image=@/path/to/image.jpg"
```

### Python Example
```python
import requests

url = "http://localhost:8000/api/v1/process/deblur"
files = {"image": open("image.jpg", "rb")}
response = requests.post(url, files=files)
print(response.json())
```

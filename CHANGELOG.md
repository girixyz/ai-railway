# Changelog

All notable changes to the AI Railway Wagon Detection System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-11

### Added
- 🚀 Initial release of AI Railway Wagon Detection System
- 🔍 NAFNet-based image deblurring model
- 🎯 YOLOv8 object detection for railway wagons
- 📝 EasyOCR integration for wagon number extraction
- 🖥️ React frontend with modern UI
- 🔧 FastAPI backend with REST endpoints
- 📊 Batch processing capabilities for large datasets
- 📈 PSNR and SSIM metrics for deblurring evaluation
- 🎨 GPU optimization with CUDA support

### Features
- **Deblurring Pipeline**: Synthetic motion blur generation and NAFNet-based restoration
- **Object Detection**: YOLOv8n model for detecting railway wagons
- **OCR System**: EasyOCR for extracting wagon identification numbers
- **Batch Processing**: Efficient processing of multiple images
- **Real-time Processing**: Support for video frame extraction and processing

### Technical Details
- Python 3.8+ support
- NVIDIA RTX 4050 GPU optimized
- React + Vite frontend
- FastAPI backend

## [Unreleased]

### Planned
- Multi-GPU support
- Improved OCR accuracy
- Real-time video stream processing
- Mobile application support

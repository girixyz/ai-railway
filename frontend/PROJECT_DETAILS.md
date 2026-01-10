# RailVision AI: Project Documentation

## 1. Project Overview
**RailVision AI** is a state-of-the-art automated railway inspection platform designed to revolutionize safety and maintenance through artificial intelligence. By leveraging high-speed cameras, edge computing, and advanced computer vision, RailVision AI detects critical defects (like cracks, rust, and wheel wear) in real-time, eliminating the need for slow, manual inspections.

The web application serves as the central command dashboard for railway operators, providing live 3D visualization of rolling stock, instant defect alerts, and comprehensive analytics.

---

## 2. Key Features

### 🚄 **Analytics Dashboard (`/analytics`)**
The heart of the application, featuring a high-fidelity control center:
- **Interactive 3D Viewer**: 
  - View diverse angles of railway wagons.
  - **Controls**: 3D Rotation, Zoom (with pan drag), and Layer toggles (Thermal/Structure).
  - **Hotspots**: Interactive pulse markers indicating detected defects.
- **Defect Detection Panel ("Flagged Anomalies")**:
  - Horizontal scroll of detected issues (Rust, Wheel Wear, Scratches).
  - **Detailed Modal**: Clicking an anomaly opens a high-res inspection view with severity levels (Critical/Major), confidence scores, and maintenance recommendations.
- **KPI Grid**: Real-time stats on "Wagons Scanned", "Defects Detected", and "Blur Correction" rates.

### 🧩 **Platform Solutions (`/solution`)**
Showcases the technical challenges solved by the system:
- **Motion Blur Calibration**: interactive "Drag to Reveal" comparison slider demonstrating how the AI reconstructs clear images from high-speed, blurred footage (>300km/h).
- **Architecture Visualization**: Diagrams explaining the Edge-to-Cloud data flow.

### 🛠 **Demo & Lead Generation**
- **Demo Mode**: A global state (`DemoContext`) simulating a "Freemium" experience.
- **Restricted Access**: Critical features (like deep historical reports) are locked behind a "Request Demo" paywall/modal to drive business inquiries.
- **Interactive Modals**: Polished "Contact Sales" and "Login" workflows.

---

## 3. Technology Stack

### **Frontend**
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: 
  - [Tailwind CSS v4](https://tailwindcss.com/) (Utility-first styling)
  - **Glassmorphism**: Heavy use of backdrop-blur, semi-transparent backgrounds, and gradients for a futuristic "Dark UI" aesthetic.
- **Routing**: [React Router v6+](https://reactrouter.com/)
- **Icons**: 
  - Material Symbols Outlined (via Google Fonts links)
  - Lucide React (`lucide-react`)

### **Artificial Intelligence (Backend/Training)**
- **Object Detection**: [YOLOv8](https://github.com/ultralytics/ultralytics) (You Only Look Once) for detecting specific defects like cracks or flat spots.
- **Classification**: [ResNet18](https://pytorch.org/) (PyTorch) for distinguishing between rolling stock types (Engine vs. Wagons).
- **Training Environment**: Google Colab compatible scripts for cloud-based model training.

---

## 4. Project Structure

```
railway-app/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── analytics/      # Dashboard components (MainViewer, KPIGrid)
│   │   ├── home/           # Landing page sections (Hero, ProblemSolution)
│   │   ├── layout/         # Navbar, Footer, MainLayout
│   │   ├── solution/       # Platform feature demos
│   │   └── ui/             # Reusable UI elements (Buttons)
│   ├── context/            # Global State (DemoContext for modal logic)
│   ├── pages/              # Main Route Views (Home, Analytics, Solutions)
│   ├── App.jsx             # Main App entry & Routing config
│   └── index.css           # Global styles & Tailwind directives
├── package.json            # Dependencies & Scripts
└── vite.config.js          # Build configuration
```

---

## 5. Deployment & Setup

### **Prerequisites**
- Node.js (Latest LTS recommended)
- npm or yarn

### **Installation**
1. Navigate to the project directory:
   ```bash
   cd railway-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will typically launch at `http://localhost:5173`.

---

## 6. AI Model Training (Google Colab)

A specialized script (`message.txt` / `message_fixed.txt`) is provided to train the AI models. 

**Workflow:**
1. **Prepare Data**: Organize data into a `dataset.zip` with `train`, `valid`, and `test` folders.
2. **Upload**: Upload the zip to your Google Colab session.
3. **Execute Script**: Run the provided Python script to:
   - Auto-install `ultralytics` and dependencies.
   - Extract the dataset.
   - Train the **ResNet18 Classifier** for vehicle identification.
   - Train the **YOLOv8 Detector** for finding defects.
4. **Download**: The script saves `classifier_resnet18.pth` and YOLO `best.pt` weights for download.

---

## 7. Recent Updates
- **Enhanced Analytics UI**: Fixed layout overlaps and improved spacing for better readability on large screens.
- **Functional Anomaly Viewer**: "Flagged Anomalies" are now interactive; clicking them opens a detailed inspection modal.
- **"Motion Blur" Demo**: Refined the "Speed vs. Clarity" slider on the Home/Platform page to use realistic horizontal motion blur (SVG Filters) and improved drag interaction.
- **Colab Compatibility**: Updated training scripts to be robust and plug-and-play for cloud environments.
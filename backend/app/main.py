from fastapi import FastAPI, WebSocket, WebSocketDisconnect, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.streamer import VideoStreamer
from app.utils import extract_frames_from_video, process_video_with_yolo
from samples import mod_train
import asyncio
import os
import shutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Streamer
# path to dataset
DATASET_PATH = r"c:\New folder\blurred_sharp"
MODEL_PATH = r"c:\New folder\best.pth" 
DEVICE = "cpu" # Default to CPU for safer demo on mixed hardware

# Mount static files
if not os.path.exists("backend/static"):
    os.makedirs("backend/static/processed_videos", exist_ok=True)
app.mount("/static", StaticFiles(directory="backend/static"), name="static")

streamer = VideoStreamer(DATASET_PATH, MODEL_PATH, DEVICE)

@app.on_event("startup")
async def startup_event():
    # Start streamer in background
    asyncio.create_task(streamer.start_stream())

@app.get("/")
def read_root():
    return {"status": "Railway Inspection AI Online"}

@app.get("/stats")
def get_stats():
    return streamer.stats

@app.post("/upload_video")
async def upload_video(file: UploadFile = File(...)):
    try:
        # Define paths
        temp_video_path = f"temp_{file.filename}"
        output_dir = os.path.join(os.getcwd(), "uploaded_frames")
        
        # Define processed video path
        processed_filename = f"processed_{file.filename}"
        processed_video_path = os.path.join("backend/static/processed_videos", processed_filename)
        # Ensure directory exists
        os.makedirs(os.path.dirname(processed_video_path), exist_ok=True)
        
        # Save uploaded video
        with open(temp_video_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # 1. Process with YOLO
        print("Processing video with YOLO model...")
        try:
             # Using absolute path for output to ensure cv2 writes correctly
            abs_processed_path = os.path.abspath(processed_video_path)
            process_video_with_yolo(temp_video_path, abs_processed_path, MODEL_PATH)
            video_url = f"http://localhost:8000/static/processed_videos/{processed_filename}"
        except Exception as e:
            print(f"Error processing video: {e}")
            video_url = None

        # 2. Extract frames (keeping existing logic for legacy/compatibility)
        if os.path.exists(output_dir):
            shutil.rmtree(output_dir)
        os.makedirs(output_dir)
        
        num_frames = extract_frames_from_video(temp_video_path, output_dir)
        
        # Cleanup video file
        os.remove(temp_video_path)
        
        # Send frames to mod_train.py
        try:
            print("Sending frames to mod_train.py...")
            mod_train.process_frames(output_dir)
        except Exception as e:
             print(f"Error processing frames in mod_train: {e}")

        # Update Streamer
        success = streamer.reload_images(output_dir)
        
        if not success:
             print("Warning: Failed to load images from extracted video into streamer")
             # Don't raise error, as video processing might have succeeded

        return {
            "message": "Video processed successfully",
            "frames_extracted": num_frames,
            "status": "Stream updated",
            "video_url": video_url
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            if streamer.latest_frame_data:
                await websocket.send_json(streamer.latest_frame_data)
            await asyncio.sleep(0.05) # Send at approx 20fps
    except WebSocketDisconnect:
        print("Client disconnected")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

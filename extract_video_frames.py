import cv2
import os

video_path = r"c:\New folder\Indian_Railways_FREIGHT_Trains_Diesel_and_Electric_Powerful_DIESEL_vs_Powerful_ELECTRIC_IR_720P.mp4"
output_dir = r"c:\New folder\ai-railway\extracted_frames"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print(f"Error: Could not open video file {video_path}")
    exit()

fps = cap.get(cv2.CAP_PROP_FPS)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
if fps > 0:
    duration = total_frames / fps
else:
    duration = 0

print(f"Video FPS: {fps}")
print(f"Total Frames: {total_frames}")
print(f"Duration: {duration:.2f} seconds")

# We want 16 frames per second
target_fps = 16
if fps > 0:
    interval = fps / target_fps
else:
    interval = 1 # Fallback

print(f"Target extraction rate: {target_fps} fps")
print(f"Frame interval: {interval:.2f}")

current_frame_index = 0
saved_count = 0
next_save_frame_index = 0.0

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Check if current frame index has passed the next save point
    if current_frame_index >= next_save_frame_index:
        output_filename = os.path.join(output_dir, f"frame_{saved_count:05d}.jpg")
        cv2.imwrite(output_filename, frame)
        saved_count += 1
        
        # Advance the target
        next_save_frame_index += interval
    
    current_frame_index += 1

cap.release()
print(f"Extracted {saved_count} frames to {output_dir}")

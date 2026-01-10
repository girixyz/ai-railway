import cv2
import yt_dlp
import os
import glob
import math

def extract_frames(url, output_folder, duration=1, num_frames=16):
    if not os.path.join(output_folder):
        os.makedirs(output_folder, exist_ok=True)
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Options for yt-dlp to download the clip
    ydl_opts = {
        'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
        'outtmpl': 'temp_clip.%(ext)s',
        'overwrites': True,
        # 'download_ranges': callback would be needed for non-clip URLs, but clip URLs are handled automatically by newer yt-dlp
    }

    print(f"Downloading clip from {url}...")
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
    except Exception as e:
        print(f"Error downloading video: {e}")
        return

    # Find the downloaded file
    video_files = glob.glob('temp_clip.*')
    if not video_files:
        print("Could not find downloaded video file.")
        return
    
    video_path = video_files[0]
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print("Error opening video file.")
        return

    fps = cap.get(cv2.CAP_PROP_FPS)
    if fps == 0:
        print("Error: FPS is 0")
        return

    print(f"Video FPS: {fps}")
    
    # We want 16 frames from the first 'duration' seconds
    max_frames_to_check = int(fps * duration)
    
    # Calculate indices to capture
    # We want 'num_frames' indices between 0 and max_frames_to_check
    indices = [int(i * (max_frames_to_check / num_frames)) for i in range(num_frames)]
    
    print(f"Extracting {num_frames} frames from first {duration} second(s). Target indices: {indices}")

    count = 0
    saved_count = 0
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        if count in indices:
            frame_name = os.path.join(output_folder, f"frame_{saved_count:02d}.jpg")
            cv2.imwrite(frame_name, frame)
            print(f"Saved {frame_name}")
            saved_count += 1
            
        count += 1
        
        if saved_count >= num_frames:
            break
            
        # If we exceed the duration bound but somehow haven't found all frames (unlikely with this logic), we stop checking significantly past
        if count > max_frames_to_check + 10: 
             break

    cap.release()
    
    # Cleanup
    try:
        os.remove(video_path)
    except:
        pass
        
    print(f"Done. Extracted {saved_count} frames to '{output_folder}'.")

if __name__ == "__main__":
    url = "https://www.youtube.com/clip/UgkxDEuYCBOoERBerZQ2LWmhX51y1lI_9O-O"
    output_dir = "extracted_frames"
    extract_frames(url, output_dir, duration=1, num_frames=16)

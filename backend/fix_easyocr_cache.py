import os
import shutil

# Hardcode the path since we know the user path roughly but expanduser is safer
user_home = os.path.expanduser('~')
easyocr_dir = os.path.join(user_home, '.EasyOCR', 'model')

print(f"Checking {easyocr_dir}...")

if os.path.exists(easyocr_dir):
    try:
        files = os.listdir(easyocr_dir)
        print(f"Found {len(files)} files: {files}")
        # Delete the contents
        for file in files:
            file_path = os.path.join(easyocr_dir, file)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)
                    print(f"Deleted file: {file_path}")
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)
                    print(f"Deleted directory: {file_path}")
            except Exception as e:
                print(f"Failed to delete {file_path}. Reason: {e}")
    except Exception as e:
        print(f"Error listing/accessing directory: {e}")
else:
    print(f"{easyocr_dir} does not exist.")

print("Done. EasyOCR should re-download models on next run.")

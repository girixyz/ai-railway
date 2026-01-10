
import os
import torch
import csv
import numpy as np

def generate_report():
    print("Generating Report...")
    report_lines = []
    report_lines.append("# Processing Report")
    report_lines.append("")
    
    # 1. Model Accuracy (PSNR from Checkpoint)
    checkpoint_path = r"output/checkpoints/best.pth"
    report_lines.append("## Model Accuracy")
    if os.path.exists(checkpoint_path):
        try:
            checkpoint = torch.load(checkpoint_path, map_location='cpu', weights_only=False)
            psnr = checkpoint.get('psnr', 'N/A')
            epoch = checkpoint.get('epoch', 'N/A')
            report_lines.append(f"- **Check Point Path**: `{checkpoint_path}`")
            report_lines.append(f"- **Training Epoch**: {epoch}")
            report_lines.append(f"- **Best Training PSNR**: {psnr:.2f} dB" if isinstance(psnr, (int, float)) else f"- **Best Training PSNR**: {psnr}")
            
            if isinstance(psnr, (int, float)):
                 report_lines.append(f"  > Note: This PSNR indicates the model's ability to restore synthetic blurred images during training.")
        except Exception as e:
            report_lines.append(f"- Error loading checkpoint: {e}")
    else:
        report_lines.append(f"- Checkpoint not found at `{checkpoint_path}`.")
        
    report_lines.append("")

    # 2. Dataset Stats
    dataset_dir = r"C:\Users\Dhruv A. Patel\Downloads\train gen ai model\dataset"
    report_lines.append("## Dataset Information")
    if os.path.exists(dataset_dir):
        files = [f for f in os.listdir(dataset_dir) if f.lower().endswith(('.jpg', '.png'))]
        report_lines.append(f"- **Input Directory**: `{dataset_dir}`")
        report_lines.append(f"- **Total Images Found**: {len(files)}")
    else:
        report_lines.append(f"- Dataset directory not found: `{dataset_dir}`")
    report_lines.append("")

    # 3. Processing Results (OCR)
    csv_path = r"C:\Users\Dhruv A. Patel\Downloads\train gen ai model\results\ocr_results.csv"
    report_lines.append("## Processing Results")
    
    if os.path.exists(csv_path):
        try:
            detections = []
            confidences = []
            with open(csv_path, 'r') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    if row['text'] != 'NO_DETECTION':
                        detections.append(row)
                        try:
                            confidences.append(float(row['confidence']))
                        except:
                            pass
            
            report_lines.append(f"- **Results File**: `{csv_path}`")
            report_lines.append(f"- **Total Wagons Detected**: {len(detections)}")
            if confidences:
                avg_conf = np.mean(confidences)
                report_lines.append(f"- **Average OCR Confidence**: {avg_conf:.2f}")
            else:
                report_lines.append("- **Average OCR Confidence**: N/A")
                
        except Exception as e:
             report_lines.append(f"- Error reading CSV: {e}")
    else:
        report_lines.append("- No results CSV found.")
    
    # Write Report
    output_filename = "processing_report.md"
    with open(output_filename, "w") as f:
        f.write("\n".join(report_lines))
        
    print(f"Report saved to {os.path.abspath(output_filename)}")

if __name__ == "__main__":
    generate_report()

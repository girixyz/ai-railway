import torch
import torch.nn.functional as F
from torch.utils.data import DataLoader, random_split
from ml.dataset import DeblurDataset
from ml.model import DeblurUNet
import os
import math
from tqdm import tqdm
import cv2
import numpy as np
from sklearn.metrics import f1_score, accuracy_score

# Configuration
BATCH_SIZE = 1
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
DATASET_PATH = r"c:\New folder\blurred_sharp\blurred_sharp"
MODEL_PATH = "checkpoints/best_model.pth"

def gaussian(window_size, sigma):
    gauss = torch.Tensor([math.exp(-(x - window_size // 2) ** 2 / float(2 * sigma ** 2)) for x in range(window_size)])
    return gauss / gauss.sum()

def create_window(window_size, channel):
    _1D_window = gaussian(window_size, 1.5).unsqueeze(1)
    _2D_window = _1D_window.mm(_1D_window.t()).float().unsqueeze(0).unsqueeze(0)
    window = _2D_window.expand(channel, 1, window_size, window_size).contiguous()
    return window

def ssim(img1, img2, window_size=11, size_average=True):
    channel = img1.size(1)
    window = create_window(window_size, channel)
    if img1.is_cuda:
        window = window.cuda(img1.get_device())
    window = window.type_as(img1)
    mu1 = F.conv2d(img1, window, padding=window_size // 2, groups=channel)
    mu2 = F.conv2d(img2, window, padding=window_size // 2, groups=channel)
    mu1_sq = mu1.pow(2)
    mu2_sq = mu2.pow(2)
    mu1_mu2 = mu1 * mu2
    sigma1_sq = F.conv2d(img1 * img1, window, padding=window_size // 2, groups=channel) - mu1_sq
    sigma2_sq = F.conv2d(img2 * img2, window, padding=window_size // 2, groups=channel) - mu2_sq
    sigma12 = F.conv2d(img1 * img2, window, padding=window_size // 2, groups=channel) - mu1_mu2
    C1 = 0.01 ** 2
    C2 = 0.03 ** 2
    ssim_map = ((2 * mu1_mu2 + C1) * (2 * sigma12 + C2)) / ((mu1_sq + mu2_sq + C1) * (sigma1_sq + sigma2_sq + C2))
    return ssim_map.mean() if size_average else ssim_map.mean(1).mean(1).mean(1)

def psnr(img1, img2):
    mse = torch.mean((img1 - img2) ** 2)
    if mse == 0:
        return 100
    return 10 * torch.log10(1.0 / mse)

def get_variance(tensor_img):
    img = tensor_img.squeeze(0).permute(1, 2, 0).cpu().numpy()
    img = (img * 255).astype(np.uint8)
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    return cv2.Laplacian(gray, cv2.CV_64F).var()

def evaluate():
    print(f"Using device: {DEVICE}")
    full_dataset = DeblurDataset(root_dir=DATASET_PATH)
    train_size = int(0.9 * len(full_dataset))
    val_size = len(full_dataset) - train_size
    _, val_ds = random_split(full_dataset, [train_size, val_size], generator=torch.Generator().manual_seed(42))
    
    data_loader = DataLoader(val_ds, batch_size=BATCH_SIZE, shuffle=False)
    
    model = DeblurUNet().to(DEVICE)
    if os.path.exists(MODEL_PATH):
        model.load_state_dict(torch.load(MODEL_PATH, map_location=DEVICE))
        print(f"Loaded model from {MODEL_PATH}")
    else:
        print("Model checkpoint not found! Please run train.py first.")
        return

    model.eval()
    
    avg_psnr = 0.0
    avg_ssim = 0.0
    y_true = []
    y_pred = []

    print("Determining sharpness threshold...")
    # 1. Determine Threshold from subset of dataset
    sharp_vars = []
    blur_vars = []
    # We'll stick to the validation loader for speed
    for blur_imgs, sharp_imgs in data_loader:
        for i in range(blur_imgs.size(0)):
            blur_vars.append(get_variance(blur_imgs[i].unsqueeze(0)))
            sharp_vars.append(get_variance(sharp_imgs[i].unsqueeze(0)))
            
    avg_sharp_var = np.mean(sharp_vars)
    avg_blur_var = np.mean(blur_vars)
    threshold = (avg_sharp_var + avg_blur_var) / 2
    
    print(f"Avg Sharp Var: {avg_sharp_var:.2f}, Avg Blur Var: {avg_blur_var:.2f}")
    print(f"Dynamic Threshold: {threshold:.2f}")

    print("Running Evaluation with Strict Threshold Metric...")

    with torch.no_grad():
        loop = tqdm(data_loader, desc="Evaluating")
        for blur_imgs, sharp_imgs in loop:
            blur_imgs = blur_imgs.to(DEVICE)
            sharp_imgs = sharp_imgs.to(DEVICE)
            
            outputs = model(blur_imgs)
            
            # Metrics
            batch_psnr = psnr(outputs, sharp_imgs)
            batch_ssim = ssim(outputs, sharp_imgs)
            
            avg_psnr += batch_psnr.item()
            avg_ssim += batch_ssim.item()
            
            # Classification: Strict Thresholding
            # We use the dynamic threshold calculated earlier.
            # If Variance > Threshold, it is classified as "Sharp" (1).
            
            for i in range(outputs.size(0)):
                var = get_variance(outputs[i].unsqueeze(0))
                
                if var > threshold:
                    pred = 1
                else:
                    pred = 0
                
                y_pred.append(pred)
                y_true.append(1) # We expect success
            
            loop.set_postfix(psnr=batch_psnr.item(), ssim=batch_ssim.item())
    
    avg_psnr /= len(data_loader)
    avg_ssim /= len(data_loader)
    
    f1 = f1_score(y_true, y_pred, zero_division=0)
    acc = accuracy_score(y_true, y_pred)
    
    print("\n" + "="*30)
    print("EVALUATION RESULTS")
    print("="*30)
    print(f"Average PSNR: {avg_psnr:.2f} dB")
    print(f"Average SSIM: {avg_ssim:.4f}")
    print("-"*30)
    print("SHARPNESS IMPROVEMENT METRIC")
    print(f"Criteria: Output Variance > Dynamic Threshold ({threshold:.2f})")
    print(f"Model Accuracy (Success Rate): {acc*100:.2f}%")
    print(f"Model F1 Score: {f1:.4f}")
    print("="*30)
    
    with open("evaluation_results.txt", "w") as f:
        f.write(f"PSNR: {avg_psnr:.2f}\n")
        f.write(f"SSIM: {avg_ssim:.4f}\n")
        f.write(f"Accuracy: {acc*100:.2f}\n")
        f.write(f"F1: {f1:.4f}\n")

if __name__ == "__main__":
    evaluate()

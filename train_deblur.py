"""
Training Script for Image Deblurring with NAFNet
Optimized for RTX 4050 with mixed precision training
"""

import os
import argparse
import time
from datetime import datetime

import torch
import torch.nn as nn
import torch.optim as optim
from torch.cuda.amp import GradScaler, autocast
from torch.utils.tensorboard import SummaryWriter
from tqdm import tqdm

from data_loader import get_dataloaders
from nafnet_model import NAFNetSmall, NAFNetMedium, count_parameters


class CharbonnierLoss(nn.Module):
    """Charbonnier Loss - better than MSE for image restoration"""
    def __init__(self, eps=1e-6):
        super().__init__()
        self.eps = eps
    
    def forward(self, pred, target):
        diff = pred - target
        loss = torch.sqrt(diff * diff + self.eps * self.eps)
        return loss.mean()


class PSNRMeter:
    """Calculate PSNR (Peak Signal-to-Noise Ratio)"""
    def __init__(self):
        self.reset()
    
    def reset(self):
        self.sum = 0
        self.count = 0
    
    def update(self, pred, target):
        # Denormalize from [-1, 1] to [0, 1]
        pred = (pred + 1) / 2
        target = (target + 1) / 2
        
        # Clamp to valid range
        pred = torch.clamp(pred, 0, 1)
        target = torch.clamp(target, 0, 1)
        
        # Calculate MSE
        mse = torch.mean((pred - target) ** 2, dim=[1, 2, 3])
        
        # Calculate PSNR
        psnr = 10 * torch.log10(1.0 / (mse + 1e-10))
        
        self.sum += psnr.sum().item()
        self.count += pred.size(0)
    
    def compute(self):
        return self.sum / max(self.count, 1)


class Trainer:
    def __init__(self, args):
        self.args = args
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        print(f"Training on: {self.device}")
        
        # Create output directory
        self.output_dir = args.output_dir
        os.makedirs(self.output_dir, exist_ok=True)
        os.makedirs(os.path.join(self.output_dir, 'checkpoints'), exist_ok=True)
        
        # Setup tensorboard
        self.writer = SummaryWriter(os.path.join(self.output_dir, 'logs'))
        
        # Create model
        if args.model_size == 'small':
            self.model = NAFNetSmall().to(self.device)
        else:
            self.model = NAFNetMedium().to(self.device)
        
        print(f"Model parameters: {count_parameters(self.model):,}")
        
        # Loss function
        self.criterion = CharbonnierLoss()
        
        # Optimizer
        self.optimizer = optim.AdamW(
            self.model.parameters(),
            lr=args.lr,
            betas=(0.9, 0.9),
            weight_decay=args.weight_decay
        )
        
        # Learning rate scheduler
        self.scheduler = optim.lr_scheduler.CosineAnnealingLR(
            self.optimizer,
            T_max=args.epochs,
            eta_min=1e-7
        )
        
        # Mixed precision training
        self.scaler = GradScaler()
        self.use_amp = args.use_amp
        
        # Data loaders
        self.train_loader, self.val_loader = get_dataloaders(
            args.blur_dir,
            args.sharp_dir,
            batch_size=args.batch_size,
            patch_size=args.patch_size,
            num_workers=args.num_workers
        )
        
        # Metrics
        self.psnr_meter = PSNRMeter()
        self.best_psnr = 0
    
    def train_epoch(self, epoch):
        self.model.train()
        total_loss = 0
        self.psnr_meter.reset()
        
        pbar = tqdm(self.train_loader, desc=f'Epoch {epoch+1}/{self.args.epochs}')
        
        for blur, sharp in pbar:
            blur = blur.to(self.device)
            sharp = sharp.to(self.device)
            
            self.optimizer.zero_grad()
            
            # Forward pass with mixed precision
            if self.use_amp:
                with autocast():
                    output = self.model(blur)
                    loss = self.criterion(output, sharp)
                
                # Backward pass
                self.scaler.scale(loss).backward()
                self.scaler.step(self.optimizer)
                self.scaler.update()
            else:
                output = self.model(blur)
                loss = self.criterion(output, sharp)
                loss.backward()
                self.optimizer.step()
            
            # Update metrics
            total_loss += loss.item()
            with torch.no_grad():
                self.psnr_meter.update(output, sharp)
            
            pbar.set_postfix({
                'loss': f'{loss.item():.4f}',
                'psnr': f'{self.psnr_meter.compute():.2f}'
            })
        
        avg_loss = total_loss / len(self.train_loader)
        avg_psnr = self.psnr_meter.compute()
        
        return avg_loss, avg_psnr
    
    @torch.no_grad()
    def validate(self, epoch):
        self.model.eval()
        total_loss = 0
        self.psnr_meter.reset()
        
        for blur, sharp in tqdm(self.val_loader, desc='Validating'):
            blur = blur.to(self.device)
            sharp = sharp.to(self.device)
            
            if self.use_amp:
                with autocast():
                    output = self.model(blur)
                    loss = self.criterion(output, sharp)
            else:
                output = self.model(blur)
                loss = self.criterion(output, sharp)
            
            total_loss += loss.item()
            self.psnr_meter.update(output, sharp)
        
        avg_loss = total_loss / max(len(self.val_loader), 1)
        avg_psnr = self.psnr_meter.compute()
        
        return avg_loss, avg_psnr
    
    def save_checkpoint(self, epoch, psnr, is_best=False):
        checkpoint = {
            'epoch': epoch,
            'model_state_dict': self.model.state_dict(),
            'optimizer_state_dict': self.optimizer.state_dict(),
            'scheduler_state_dict': self.scheduler.state_dict(),
            'psnr': psnr,
            'args': self.args
        }
        
        # Save latest
        path = os.path.join(self.output_dir, 'checkpoints', 'latest.pth')
        torch.save(checkpoint, path)
        
        # Save best
        if is_best:
            path = os.path.join(self.output_dir, 'checkpoints', 'best.pth')
            torch.save(checkpoint, path)
            print(f"  New best model saved! PSNR: {psnr:.2f} dB")
    
    def train(self):
        print("\n" + "="*60)
        print("Starting Training")
        print("="*60)
        
        start_time = time.time()
        
        for epoch in range(self.args.epochs):
            # Training
            train_loss, train_psnr = self.train_epoch(epoch)
            
            # Validation
            val_loss, val_psnr = self.validate(epoch)
            
            # Update scheduler
            self.scheduler.step()
            
            # Log to tensorboard
            self.writer.add_scalar('Loss/train', train_loss, epoch)
            self.writer.add_scalar('Loss/val', val_loss, epoch)
            self.writer.add_scalar('PSNR/train', train_psnr, epoch)
            self.writer.add_scalar('PSNR/val', val_psnr, epoch)
            self.writer.add_scalar('LR', self.scheduler.get_last_lr()[0], epoch)
            
            # Print epoch summary
            print(f"\nEpoch {epoch+1}/{self.args.epochs}")
            print(f"  Train Loss: {train_loss:.4f} | Train PSNR: {train_psnr:.2f} dB")
            print(f"  Val Loss: {val_loss:.4f} | Val PSNR: {val_psnr:.2f} dB")
            print(f"  LR: {self.scheduler.get_last_lr()[0]:.2e}")
            
            # Save checkpoint
            is_best = val_psnr > self.best_psnr
            if is_best:
                self.best_psnr = val_psnr
            
            self.save_checkpoint(epoch, val_psnr, is_best)
        
        total_time = time.time() - start_time
        print("\n" + "="*60)
        print(f"Training Complete!")
        print(f"Total time: {total_time/60:.1f} minutes")
        print(f"Best PSNR: {self.best_psnr:.2f} dB")
        print("="*60)
        
        self.writer.close()


def main():
    parser = argparse.ArgumentParser(description='Train Deblurring Model')
    
    # Data arguments
    parser.add_argument('--blur_dir', type=str, 
                        default=r'blurred_sharp (1)\blurred_sharp\blurred',
                        help='Directory with blurred images')
    parser.add_argument('--sharp_dir', type=str,
                        default=r'blurred_sharp (1)\blurred_sharp\sharp',
                        help='Directory with sharp images')
    
    # Training arguments
    parser.add_argument('--epochs', type=int, default=50,
                        help='Number of training epochs')
    parser.add_argument('--batch_size', type=int, default=4,
                        help='Batch size for training')
    parser.add_argument('--patch_size', type=int, default=256,
                        help='Patch size for random crops')
    parser.add_argument('--lr', type=float, default=1e-3,
                        help='Learning rate')
    parser.add_argument('--weight_decay', type=float, default=1e-4,
                        help='Weight decay for optimizer')
    
    # Model arguments
    parser.add_argument('--model_size', type=str, default='small',
                        choices=['small', 'medium'],
                        help='Model size: small (faster) or medium (better)')
    
    # Performance arguments
    parser.add_argument('--use_amp', action='store_true', default=True,
                        help='Use automatic mixed precision')
    parser.add_argument('--num_workers', type=int, default=4,
                        help='Number of data loading workers')
    
    # Output arguments
    parser.add_argument('--output_dir', type=str, default='output',
                        help='Output directory for checkpoints and logs')
    
    args = parser.parse_args()
    
    # Print configuration
    print("="*60)
    print("Training Configuration")
    print("="*60)
    for key, value in vars(args).items():
        print(f"  {key}: {value}")
    print("="*60 + "\n")
    
    # Start training
    trainer = Trainer(args)
    trainer.train()


if __name__ == '__main__':
    main()

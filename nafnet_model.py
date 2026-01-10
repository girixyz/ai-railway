"""
NAFNet - Nonlinear Activation Free Network for Image Deblurring
Simplified but effective architecture for fast training
"""

import torch
import torch.nn as nn
import torch.nn.functional as F


class LayerNorm2d(nn.Module):
    """Layer normalization for 2D inputs"""
    def __init__(self, channels):
        super().__init__()
        self.norm = nn.GroupNorm(1, channels)
    
    def forward(self, x):
        return self.norm(x)


class SimpleGate(nn.Module):
    """Simple gating mechanism - splits channels and multiplies"""
    def forward(self, x):
        x1, x2 = x.chunk(2, dim=1)
        return x1 * x2


class NAFBlock(nn.Module):
    """
    NAF Block - Core building block without traditional activations
    Uses SimpleGate instead of ReLU/GELU for faster and better training
    """
    def __init__(self, channels, expansion=2, dropout_rate=0.0):
        super().__init__()
        
        hidden_channels = channels * expansion
        
        self.norm1 = LayerNorm2d(channels)
        self.norm2 = LayerNorm2d(channels)
        
        # Spatial mixing (depthwise conv)
        self.conv1 = nn.Conv2d(channels, hidden_channels * 2, 1)
        self.conv2 = nn.Conv2d(hidden_channels, hidden_channels * 2, 3, padding=1, groups=hidden_channels)
        self.conv3 = nn.Conv2d(hidden_channels, channels, 1)
        
        # Channel attention
        self.sca = nn.Sequential(
            nn.AdaptiveAvgPool2d(1),
            nn.Conv2d(hidden_channels, hidden_channels, 1),
        )
        
        self.gate = SimpleGate()
        
        # Feedforward
        self.ff_conv1 = nn.Conv2d(channels, hidden_channels * 2, 1)
        self.ff_conv2 = nn.Conv2d(hidden_channels, channels, 1)
        
        self.dropout = nn.Dropout2d(dropout_rate) if dropout_rate > 0 else nn.Identity()
        
        # Learnable scaling
        self.beta = nn.Parameter(torch.zeros(1, channels, 1, 1))
        self.gamma = nn.Parameter(torch.zeros(1, channels, 1, 1))
    
    def forward(self, x):
        identity = x
        
        # Spatial mixing branch
        out = self.norm1(x)
        out = self.conv1(out)
        out = self.gate(out)
        out = self.conv2(out)
        out = self.gate(out)
        
        # Channel attention
        out = out * self.sca(out)
        out = self.conv3(out)
        out = self.dropout(out)
        
        x = identity + out * self.beta
        
        # Feedforward branch
        identity = x
        out = self.norm2(x)
        out = self.ff_conv1(out)
        out = self.gate(out)
        out = self.ff_conv2(out)
        out = self.dropout(out)
        
        return identity + out * self.gamma


class NAFNet(nn.Module):
    """
    NAFNet - Nonlinear Activation Free Network
    Encoder-Decoder architecture with skip connections
    """
    def __init__(self, 
                 in_channels=3, 
                 out_channels=3,
                 width=32,
                 enc_blocks=[2, 2, 4, 8],
                 middle_blocks=12,
                 dec_blocks=[2, 2, 2, 2]):
        super().__init__()
        
        self.intro = nn.Conv2d(in_channels, width, 3, padding=1)
        self.outro = nn.Conv2d(width, out_channels, 3, padding=1)
        
        # Encoder
        self.encoders = nn.ModuleList()
        self.downs = nn.ModuleList()
        
        chan = width
        for num_blocks in enc_blocks:
            self.encoders.append(
                nn.Sequential(*[NAFBlock(chan) for _ in range(num_blocks)])
            )
            self.downs.append(
                nn.Conv2d(chan, chan * 2, 2, stride=2)
            )
            chan *= 2
        
        # Middle
        self.middle = nn.Sequential(*[NAFBlock(chan) for _ in range(middle_blocks)])
        
        # Decoder
        self.decoders = nn.ModuleList()
        self.ups = nn.ModuleList()
        
        for num_blocks in dec_blocks:
            self.ups.append(
                nn.Sequential(
                    nn.Conv2d(chan, chan * 2, 1),
                    nn.PixelShuffle(2)
                )
            )
            chan //= 2
            self.decoders.append(
                nn.Sequential(*[NAFBlock(chan) for _ in range(num_blocks)])
            )
        
        # Initialize weights
        self._init_weights()
    
    def _init_weights(self):
        for m in self.modules():
            if isinstance(m, nn.Conv2d):
                nn.init.kaiming_normal_(m.weight, mode='fan_out', nonlinearity='relu')
                if m.bias is not None:
                    nn.init.zeros_(m.bias)
    
    def forward(self, x):
        # Store input for residual learning
        inp = x
        
        x = self.intro(x)
        
        # Encoder path with skip connections
        skips = []
        for encoder, down in zip(self.encoders, self.downs):
            x = encoder(x)
            skips.append(x)
            x = down(x)
        
        # Middle
        x = self.middle(x)
        
        # Decoder path
        for decoder, up, skip in zip(self.decoders, self.ups, reversed(skips)):
            x = up(x)
            x = x + skip  # Skip connection
            x = decoder(x)
        
        x = self.outro(x)
        
        # Residual learning: predict the difference
        return x + inp


class NAFNetSmall(NAFNet):
    """Smaller NAFNet for faster training - good for starting"""
    def __init__(self, in_channels=3, out_channels=3):
        super().__init__(
            in_channels=in_channels,
            out_channels=out_channels,
            width=32,
            enc_blocks=[1, 1, 1, 8],
            middle_blocks=1,
            dec_blocks=[1, 1, 1, 1]
        )


class NAFNetMedium(NAFNet):
    """Medium NAFNet - balance between speed and quality"""
    def __init__(self, in_channels=3, out_channels=3):
        super().__init__(
            in_channels=in_channels,
            out_channels=out_channels,
            width=32,
            enc_blocks=[2, 2, 4, 8],
            middle_blocks=12,
            dec_blocks=[2, 2, 2, 2]
        )


def count_parameters(model):
    """Count trainable parameters"""
    return sum(p.numel() for p in model.parameters() if p.requires_grad)


if __name__ == "__main__":
    # Test the model
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"Testing on: {device}")
    
    # Create small model for testing
    model = NAFNetSmall().to(device)
    print(f"NAFNetSmall parameters: {count_parameters(model):,}")
    
    # Test forward pass
    x = torch.randn(1, 3, 256, 256).to(device)
    with torch.no_grad():
        y = model(x)
    
    print(f"Input shape: {x.shape}")
    print(f"Output shape: {y.shape}")
    print("Model test passed!")
    
    # Test medium model
    model_med = NAFNetMedium().to(device)
    print(f"NAFNetMedium parameters: {count_parameters(model_med):,}")

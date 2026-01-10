import React, { useState } from 'react';

const SolutionChallenge = () => {
    const [sliderValue, setSliderValue] = useState(50);

    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
    };

    return (
        <section className="py-24 relative bg-background-dark">
            <div className="container mx-auto px-6">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-white">The Challenge: Speed vs. Clarity</h2>
                    <p className="text-slate-400 max-w-2xl text-lg">Traditional cameras fail at high speeds, resulting in motion blur that hides critical defects. Our AI reconstructs visual data in real-time.</p>
                </div>
                <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 group select-none shadow-2xl">
                    {/* Background Layer: Blurred (Represents "Motion Blur" - Visible on the Right) */}
                    {/* Background Layer Group: Blurred (Represents "Motion Blur" - Visible on the Right) */}
                    {/* 1. The Image (Blurred) */}
                    <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{
                        backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCCfjrMdebKZmvV0GRrx_gkEk0F8QQfHQZdoUpwxFhpnyPfcgy7NidV-frHPSHbi3uiyw6wh_4UHOUj4o2LVYZtX_k72sWdlsgT-RNPDwl4mO8LIMhvmLpaJruZif5oXatUK4mLJ5fCjCjZ945ZAj28mJZoxgTtUv9B9aPIDJeO6tWOjPYfcRaNVLOKs2r9uxvcwOJQcYaeko5sM6PqUBv3YFi58rWC0Unu_xUxKDX30VB6-NYXBVU_1w0bCltvjXMov0FD3sLVoloD')",
                        filter: "blur(3px) brightness(0.9) contrast(1.1)"
                    }}></div>

                    {/* 2. The Label (Sharp, on top of blur) */}
                    <div className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-md text-white px-3 py-1 rounded text-xs font-bold border border-red-500/50 z-10 shadow-[0_0_15px_rgba(239,68,68,0.6)] uppercase tracking-wider">
                        Standard Capture
                    </div>

                    {/* Overlay Layer: Clear (Represents "AI Clarity" - Visible on the Left) */}
                    <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{
                        backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCCfjrMdebKZmvV0GRrx_gkEk0F8QQfHQZdoUpwxFhpnyPfcgy7NidV-frHPSHbi3uiyw6wh_4UHOUj4o2LVYZtX_k72sWdlsgT-RNPDwl4mO8LIMhvmLpaJruZif5oXatUK4mLJ5fCjCjZ945ZAj28mJZoxgTtUv9B9aPIDJeO6tWOjPYfcRaNVLOKs2r9uxvcwOJQcYaeko5sM6PqUBv3YFi58rWC0Unu_xUxKDX30VB6-NYXBVU_1w0bCltvjXMov0FD3sLVoloD')",
                        clipPath: `polygon(0 0, ${sliderValue}% 0, ${sliderValue}% 100%, 0 100%)`
                    }}>
                        <div className="absolute top-4 left-4 bg-primary/90 text-white px-3 py-1 rounded text-xs font-bold border border-primary/50 z-30 shadow-[0_0_15px_rgba(19,91,236,0.6)] uppercase tracking-wider">
                            AI Restored
                        </div>
                    </div>

                    {/* Slider Handle */}
                    <div className="absolute inset-y-0 w-1 bg-white z-20 shadow-[0_0_20px_white]" style={{ left: `${sliderValue}%` }}>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg cursor-ew-resize hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-black text-sm">code</span>
                        </div>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderValue}
                        onChange={handleSliderChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
                    />
                </div>
            </div>
        </section>
    );
};
export default SolutionChallenge;

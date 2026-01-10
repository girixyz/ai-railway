import React, { useState, useRef } from 'react';

const ProblemSolution = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef(null);

    const handleMove = (clientX) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percent);
    };

    return (
        <section className="py-24 bg-[#101622] relative">
            <div className="max-w-[1200px] mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Motion Blur?<br />
                            <span className="text-primary">Obsolete.</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 font-body leading-relaxed">
                            Traditional cameras fail at high speeds. Our proprietary AI algorithms mitigate motion blur and low-light issues instantly, turning unusable footage into actionable data.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-white font-bold">
                                    <span className="material-symbols-outlined text-primary">speed</span>
                                    80 km/h
                                </div>
                                <p className="text-sm text-gray-500">Capture speed supported</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-white font-bold">
                                    <span className="material-symbols-outlined text-primary">exposure</span>
                                    &lt; 0.1 lux
                                </div>
                                <p className="text-sm text-gray-500">Low-light performance</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-white font-bold">
                                    <span className="material-symbols-outlined text-primary">memory</span>
                                    &lt; 50ms
                                </div>
                                <p className="text-sm text-gray-500">Processing latency</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-white font-bold">
                                    <span className="material-symbols-outlined text-primary">grid_view</span>
                                    4K
                                </div>
                                <p className="text-sm text-gray-500">Resolution per frame</p>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Comparison Card */}
                    {/* Interactive Comparison Card */}
                    <div className="lg:w-1/2 w-full">
                        <div
                            ref={containerRef}
                            className="relative aspect-video rounded-xl overflow-hidden border border-[#232f48] shadow-2xl group select-none"
                        >
                            {/* Background Image (Blurred - Right Side) */}
                            <div className="absolute inset-0 bg-cover bg-center z-0" style={{
                                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQmzX2v-JO3lxEv_DvHLhYIED7-CiQbkTy1MlZsIvxyBt2DlyZq3aWtTRUQ2NLJ1WlTqO6oiwtdYY_KPqEePAqkpVlbLa9i2v83eC39LDTo4YnsWWy9H9DG0e-dE2eHdhAdkCidgeVxOkoCve_7lsz34FfzvHafOx8vI8ZYvU0tJCCHrOj1LHXZfB6Sp-ZIBm3mvjj9TMmWZYuQGVW2Pr7vCE29jFtq49Ls0iZ_fmQySsDf5Bd780fnWPql_nGKrxIJmT64J2uWLW5")',
                                filter: 'blur(5px) brightness(0.7)'
                            }}>
                                <div className="absolute inset-0 flex items-center justify-end pr-10">
                                    <div className="bg-black/50 p-2 rounded text-white text-xs font-mono">RAW INPUT</div>
                                </div>
                            </div>

                            {/* Foreground Image (Clear - Left Side) */}
                            <div className="absolute inset-0 bg-cover bg-center z-10" style={{
                                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQmzX2v-JO3lxEv_DvHLhYIED7-CiQbkTy1MlZsIvxyBt2DlyZq3aWtTRUQ2NLJ1WlTqO6oiwtdYY_KPqEePAqkpVlbLa9i2v83eC39LDTo4YnsWWy9H9DG0e-dE2eHdhAdkCidgeVxOkoCve_7lsz34FfzvHafOx8vI8ZYvU0tJCCHrOj1LHXZfB6Sp-ZIBm3mvjj9TMmWZYuQGVW2Pr7vCE29jFtq49Ls0iZ_fmQySsDf5Bd780fnWPql_nGKrxIJmT64J2uWLW5")',
                                filter: 'contrast(1.2) saturate(1.1)'
                            }}>
                                {/* Mock AI Bounding Boxes - Only Visible on Clear Side */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <div className="absolute top-[40%] left-[30%] w-[100px] h-[80px] border-2 border-primary bg-primary/10 flex items-start justify-start">
                                        <span className="bg-primary text-white text-[10px] px-1">Wheelset OK</span>
                                    </div>
                                    <div className="absolute top-[35%] right-[20%] w-[80px] h-[60px] border-2 border-red-500 bg-red-500/10 flex items-start justify-start animate-pulse">
                                        <span className="bg-red-500 text-white text-[10px] px-1">Wear Detected</span>
                                    </div>
                                </div>
                            </div>

                            {/* Drag Handle Visual */}
                            <div className="absolute inset-y-0 z-20 flex items-center justify-center pointer-events-none" style={{ left: `${sliderPosition}%` }}>
                                <div className="absolute top-0 bottom-0 w-0.5 bg-primary/50"></div>
                                <div className="w-8 h-8 -ml-4 bg-white rounded-full flex items-center justify-center shadow-lg text-black z-10">
                                    <span className="material-symbols-outlined text-sm">compare_arrows</span>
                                </div>
                            </div>

                            {/* Range Input for Interaction */}
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={sliderPosition}
                                onChange={(e) => setSliderPosition(e.target.value)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                            />
                        </div>
                        <p className="text-center text-gray-500 text-sm mt-4 font-mono">DRAG TO REVEAL AI ENHANCEMENT</p>
                    </div>
                </div>
            </div>
            {/* SVG Filter for Motion Blur */}
            <svg className="absolute w-0 h-0" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="motionBlur">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2 0" />
                    </filter>
                </defs>
            </svg>
        </section >
    );
};


export default ProblemSolution;

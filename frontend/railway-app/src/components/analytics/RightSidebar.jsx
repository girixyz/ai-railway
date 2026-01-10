import React from 'react';

const RightSidebar = () => {
    const [sliderPosition, setSliderPosition] = React.useState(50);
    const [isDragging, setIsDragging] = React.useState(false);
    const containerRef = React.useRef(null);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        updateSliderPosition(e.clientX);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            updateSliderPosition(e.clientX);
        }
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        updateSliderPosition(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (isDragging) {
            updateSliderPosition(e.touches[0].clientX);
        }
    }

    const handleTouchEnd = () => {
        setIsDragging(false);
    }

    const updateSliderPosition = (clientX) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = clientX - rect.left;
            const width = rect.width;
            const percentage = Math.min(Math.max((x / width) * 100, 0), 100);
            setSliderPosition(percentage);
        }
    };

    React.useEffect(() => {
        if (isDragging) {
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('touchend', handleTouchEnd);
            window.addEventListener('touchmove', handleTouchMove);
        } else {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('touchmove', handleTouchMove);
        }
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [isDragging]);

    return (
        <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Trend Chart */}
            <div className="bg-[#161e2e]/70 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col h-1/2">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h4 className="text-white font-bold text-lg">Defect Trends</h4>
                        <p className="text-xs text-gray-400">Last 30 Days</p>
                    </div>
                    <div className="bg-primary/20 p-2 rounded-lg text-primary">
                        <span className="material-symbols-outlined">analytics</span>
                    </div>
                </div>
                <div className="flex-1 w-full relative">
                    {/* SVG Chart */}
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 150">
                        <defs>
                            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#135bec" stopOpacity="0.5"></stop>
                                <stop offset="100%" stopColor="#135bec" stopOpacity="0"></stop>
                            </linearGradient>
                        </defs>
                        <path d="M0,150 L0,100 Q30,120 60,90 T120,80 T180,110 T240,40 T300,80 L300,150 Z" fill="url(#chartGradient)"></path>
                        <path className="drop-shadow-[0_0_8px_rgba(19,91,236,0.8)]" d="M0,100 Q30,120 60,90 T120,80 T180,110 T240,40 T300,80" fill="none" stroke="#135bec" strokeLinecap="round" strokeWidth="3"></path>
                        {/* Data Points */}
                        <circle cx="60" cy="90" fill="#111722" r="4" stroke="#fff" strokeWidth="2"></circle>
                        <circle cx="240" cy="40" fill="#111722" r="4" stroke="#fff" strokeWidth="2"></circle>
                    </svg>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
                    <span>Day 1</span>
                    <span>Day 15</span>
                    <span>Day 30</span>
                </div>
            </div>

            {/* Blur Correction Demo */}
            <div className="bg-[#161e2e]/70 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col h-1/2 relative overflow-hidden">
                <h4 className="text-white font-bold text-lg mb-4">Blur Correction</h4>
                <div
                    ref={containerRef}
                    className="relative flex-1 rounded-lg overflow-hidden border border-[#324467] group cursor-col-resize select-none"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                >
                    {/* Blurred Image (Background) */}
                    <div className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGzaO5S0Qu2qz02yn33RIU2lePAW3jOZxuJI2meVSBdqJmzRLZtjZiw5StdtNEOK1sofgfE8heCGylLDXf6ugwCUQyT99ek4eQLWjVxNfgVOVAqBtVQ-aR1VJxk6DRP-lmeoO-pSmUVZwsXtk2pJ9Sx528B_YAwhcQ-tKD_Oo8JNjkG4o4srlkx1NXkZTppG933k-_24pNiLAB95aILrLhr-QPqkQJXlRBf7EQBpqqfvsbxfhqHdFIaEEywnVyZGjwp8IZbsnaHHeN')" }}></div>
                    {/* Clear Image (Clipped overlay) */}
                    <div className="absolute inset-0 bg-cover bg-center border-r-2 border-primary shadow-[0_0_15px_rgba(19,91,236,0.8)]" style={{ width: `${sliderPosition}%`, backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCg3zTYwnATmnukU9CLkhBoL4kYjOgunqYPvM_GBIAvPyW94ufigZs9wJnfRJTTxh38Z_a0eIvmhEplRhT9KQO3U5dyfYIksgrj4Yt032GkuEfgPBnMXSrIss4H_Qeyyyc5Z1Vr_wC04e2c5MK4swnGyEOu-qkIQS9O_XfuunKZEPuIJUETR-ilvIPEPVJUxm-ulMia9xG39ntXvGyRG4Xua46ljWt_YTkhlV_MPIK5_jK38y49sJiqrXDiy_j9YBMkwGYUuap1BOPi')" }}>
                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-primary">ENHANCED</div>
                    </div>
                    {/* Drag Handle Simulation */}
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-8 bg-white rounded-full shadow-lg flex items-center justify-center z-10" style={{ left: `${sliderPosition}%` }}>
                        <span className="material-symbols-outlined text-primary text-sm">unfold_more_double</span>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-gray-400">ORIGINAL</div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <div>
                        <p className="text-xs text-gray-400">Correction Strength</p>
                        <p className="text-lg font-bold text-primary font-mono">240Hz</p>
                    </div>
                    <button className="bg-[#232f48] hover:bg-primary text-white p-2 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-sm">tune</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RightSidebar;

import React from 'react';

const VisualComparison = () => {
    return (
        <div className="w-full bg-[#0b0f17] py-20 px-6 md:px-12 lg:px-20 border-y border-slate-800">
            <div className="max-w-[1280px] mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-4">
                    <div>
                        <h2 className="text-white text-3xl font-bold mb-2">Restoration Quality</h2>
                        <p className="text-slate-400">Comparing raw sensor input vs. AI-enhanced output.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-slate-800 text-white text-sm rounded hover:bg-slate-700 transition">Micro-Cracks</button>
                        <button className="px-4 py-2 bg-transparent text-slate-400 border border-slate-700 text-sm rounded hover:bg-slate-800 transition">Thermal Hotspots</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Before Card */}
                    <div className="group relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
                        <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur px-3 py-1 rounded text-slate-300 text-xs font-bold border border-slate-600">
                            RAW INPUT (80km/h)
                        </div>
                        <div className="aspect-[4/3] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuASEOvxd1zbo1HQ1DVq7Il5h-zhHwNitr1CXiB59zkD6VZlTACPZ3X7UuiykXiBfQ8SzqmVVfztoUnJLqzjXtFwZXoSk4QWHhcmxGHwt6wVVnzRg5Mxmy03T1g-MMb6zet_7V0dHxlJ2SEf643CYINSTuFVDtMZEQKiMj5_mPnKa5ygGdpngd9VbZ1Oi2qxjj5FDjT6d7ilekSreRM0F-RENXz0Au61OluB_pxGxDTzZ9-pOik-W08wscLQEOUgBXZ1yImo3PtMZrVw')", filter: "blur(3px) brightness(0.6)" }}>
                        </div>
                        {/* Analysis Overlay (Hidden but hinting presence) */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-red-500 font-mono text-sm opacity-50 bg-black/40 px-2">Low Confidence</div>
                        </div>
                    </div>
                    {/* After Card */}
                    <div className="group relative rounded-xl overflow-hidden border border-primary/50 bg-slate-900 shadow-[0_0_30px_rgba(19,91,236,0.15)]">
                        <div className="absolute top-4 left-4 z-10 bg-primary/90 backdrop-blur px-3 py-1 rounded text-white text-xs font-bold shadow-lg">
                            AI ENHANCED OUTPUT
                        </div>
                        <div className="aspect-[4/3] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCm_NGTLqBYANRHE36qL3Tfi1JLuyXvs0AXeyg3xdTjk4VhmiVYxYGlRUJPERVlBACEfLe8bORa0h_m0H_soYuUjveHqcJOLy90f0LPxA1qvMdtS3wiXGzWSZT0zDRtI7s_rUXWH_kX4T4OXHAmWVaNpYv7C6xQKxpSedQQNCiOnj6TDzE8lokAF8PHiwC5f7CSQ2AmcfiQuyTao_XaosP8lS1oMLvx_2aCvHvsS63CkFXoxi2N8mo-qpk6LwUrhPnb7sQBvzAvsBh5')", filter: "contrast(1.2)" }}>
                        </div>
                        {/* AI Detection Overlays */}
                        <div className="absolute top-[30%] left-[40%] w-[20%] h-[20%] border-2 border-red-500 rounded-sm shadow-[0_0_10px_red]">
                            <div className="absolute -top-6 left-0 bg-red-500 text-white text-[10px] font-bold px-1 uppercase">Crack Detected</div>
                            <div className="absolute -bottom-5 right-0 text-red-500 text-[10px] font-mono bg-black/80 px-1">98.4%</div>
                        </div>
                        {/* Grid Overlay */}
                        <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisualComparison;

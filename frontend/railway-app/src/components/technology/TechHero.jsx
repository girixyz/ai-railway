import React from 'react';

import { Link } from 'react-router-dom';

const TechHero = () => {
    return (
        <div className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-background-dark">
            {/* Abstract Grid Background simulating 3D space */}
            <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "radial-gradient(#135bec 1px, transparent 1px)", backgroundSize: "40px 40px", perspective: "1000px", transform: "rotateX(20deg) scale(1.5)" }}>
            </div>
            {/* Glow effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]"></div>
            <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 lg:px-20 pt-20 pb-10 flex flex-col items-center">
                <div className="max-w-[960px] text-center flex flex-col items-center gap-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        System Online • v4.2.0
                    </div>
                    <h1 className="text-white text-5xl md:text-7xl font-bold leading-tight tracking-[-0.033em]">
                        Precision at <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">80km/h</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl font-normal leading-relaxed max-w-[720px]">
                        Our proprietary GAN-based pipeline reconstructs high-fidelity visuals from motion-blurred feeds in real-time. Explore the layers of our edge inspection architecture.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <Link to="/demo">
                            <button className="flex items-center justify-center gap-2 rounded-lg h-12 px-8 bg-primary text-white text-base font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(19,91,236,0.5)]">
                                <span className="material-symbols-outlined text-[20px]">play_circle</span>
                                Start Simulation
                            </button>
                        </Link>
                        <button className="flex items-center justify-center gap-2 rounded-lg h-12 px-8 bg-white/5 border border-white/10 text-white text-base font-bold hover:bg-white/10 transition-all">
                            <span className="material-symbols-outlined text-[20px]">download</span>
                            Technical Whitepaper
                        </button>
                    </div>
                    {/* Decorative schematic visualization */}
                    <div className="mt-16 w-full max-w-4xl p-1 bg-gradient-to-b from-slate-700/50 to-transparent rounded-xl">
                        <div className="relative w-full aspect-[2/1] bg-black/40 rounded-lg overflow-hidden border border-slate-700/50 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-screen" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC8euSnzIR-3xJ9DwSpC8isG_YL4qkXDg5rjEKN49IDzSK7GPAxPDtSJPz2Ey6Svmu8oMqD88W9SZ5cEKmwtUk3a2pWO-rcS8pSBQbCEQfckgQtjnsB-GovGKI46lfppRyGo_yu5vxmnIYYrEb07SJueUC84QWMe5nFi5UxcBs7OFGbXENouMOr4bRa4S7KV0U7OKojirMegH2Z21oLObFuqlIGthlD5nfgsL_CCJ1-04GeV3hv7hHqwguD95CCOHSI7HpNDVLv8DZQ')" }}>
                            </div>
                            {/* Overlay UI elements simulating HUD */}
                            <div className="absolute top-4 left-4 flex gap-4">
                                <div className="px-2 py-1 bg-black/60 border border-primary/50 text-primary text-xs font-mono rounded">CAM_01: ACTIVE</div>
                                <div className="px-2 py-1 bg-black/60 border border-slate-600 text-slate-300 text-xs font-mono rounded">ISO: 12800</div>
                                <div className="px-2 py-1 bg-black/60 border border-slate-600 text-slate-300 text-xs font-mono rounded">SHUTTER: 1/8000s</div>
                            </div>
                            <div className="absolute bottom-4 right-4 text-right">
                                <div className="text-primary font-mono text-xl font-bold">99.8%</div>
                                <div className="text-slate-400 text-xs uppercase tracking-widest">Confidence Score</div>
                            </div>
                            {/* Center focus reticle */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-64 h-64 border border-primary/30 rounded-full flex items-center justify-center relative">
                                    <div className="absolute w-full h-[1px] bg-primary/30"></div>
                                    <div className="absolute h-full w-[1px] bg-primary/30"></div>
                                    <div className="w-56 h-56 border border-dashed border-primary/50 rounded-full animate-[spin_10s_linear_infinite]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechHero;

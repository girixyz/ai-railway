import React from 'react';

import { Link } from 'react-router-dom';

const UseCasesHero = () => {
    return (
        <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-background-dark">
            {/* Background Grid Effect */}
            <div className="absolute inset-0 pointer-events-none z-0" style={{
                backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                maskImage: "radial-gradient(circle at center, black 40%, transparent 100%)"
            }}></div>
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/50 to-background-dark z-0 pointer-events-none"></div>
            {/* Content Container */}
            <div className="relative z-10 container max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Text Content */}
                <div className="flex flex-col gap-6 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="text-xs font-bold text-primary tracking-wide uppercase">Live System Status: Active</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white">
                        Precision at <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">80 km/h</span>
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed max-w-md">
                        Our edge-based AI eliminates motion blur and detects critical structural defects in real-time, even in low-light conditions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Link to="/analytics" className="h-12 px-6 rounded-lg bg-primary hover:bg-blue-600 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(19,91,236,0.3)]">
                            <span className="material-symbols-outlined">view_in_ar</span>
                            Explore Interactive Model
                        </Link>
                        <Link to="/solution" className="h-12 px-6 rounded-lg bg-slate-800/50 hover:bg-white/5 text-white font-medium flex items-center justify-center gap-2 transition-all border border-white/10 backdrop-blur">
                            <span className="material-symbols-outlined">play_circle</span>
                            Watch Methodology
                        </Link>
                    </div>
                    {/* Mini Stats */}
                    <div className="grid grid-cols-3 gap-6 mt-8 border-t border-slate-700/50 pt-8">
                        <div>
                            <div className="text-2xl font-bold text-white">&lt;10ms</div>
                            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Latency</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">99.8%</div>
                            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Accuracy</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">24/7</div>
                            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Uptime</div>
                        </div>
                    </div>
                </div>
                {/* Right: Visual Simulation */}
                <div className="relative h-[500px] w-full flex items-center justify-center perspective-1000">
                    {/* This simulates the 3D Train Container */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-700 bg-[#0a0f18] shadow-2xl group">
                        {/* Simulated 3D Image */}
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBVVflWfYbYd8s-JXrbja_XlIb3CaRGtfTOqz0rWhjXxVGCPaKYLd9z8ZqSjsgpn_HYiTMwcpzfFwmbmU4XgDIo62AGEYetIABUE1H4VZ4iJK7tqKJ5Tq3v3d8yNiJ4vOrXsuPoUbFyMokmGUDJ_YmAr3mwJlgG2NLddm8y1KpW11Ctj4FpXjjhaxsnMc5gd7lWeyUJP56HsQW99yqv2W2WO4l7Ac1eNBNVCKbT0_Bkyv3KySVNNnwKhPc8oqEp2krSUX1Ti7ZzJujl')" }}>
                            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                        </div>
                        {/* AR Overlay UI inside the visual */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                            <div className="flex justify-between items-start">
                                <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded text-xs font-mono text-primary border border-primary/30">
                                    CAM-04 [ACTIVE]
                                </div>
                                <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded text-xs font-mono text-white border border-white/10 flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-red-500 animate-pulse"></span>
                                    REC
                                </div>
                            </div>
                            {/* Bounding Boxes (Simulated AI Detection) */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 border-2 border-primary/80 rounded bg-primary/5 flex items-end justify-between p-2">
                                <div className="absolute -top-6 left-0 text-xs font-mono bg-primary text-white px-2 py-0.5 rounded-sm">WHEELSET_04</div>
                                <div className="absolute -bottom-1 -right-1 size-2 bg-primary"></div>
                                <div className="absolute -top-1 -left-1 size-2 bg-primary"></div>
                                <span className="text-[10px] font-mono text-primary/80">CONFIDENCE: 99.2%</span>
                            </div>
                            {/* Scanning Line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-b from-primary/50 to-transparent shadow-[0_0_15px_rgba(19,91,236,0.8)] animate-[scan_3s_linear_infinite] opacity-50"></div>
                        </div>
                    </div>
                    {/* Floating Card: Blur Comparison */}
                    <div className="absolute -bottom-6 -left-6 bg-[#1a2332]/70 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/10 w-64 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Motion De-Blur</span>
                            <span className="material-symbols-outlined text-primary text-sm">blur_off</span>
                        </div>
                        <div className="flex gap-2 h-16">
                            <div className="flex-1 bg-cover bg-center rounded opacity-50 grayscale" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD1Zc7BJBY09YClk53nglf0vUXndeMSDh6KUfgzhzEORyKmVEbGVdScZ1M52qKgWTzxNeSgp6iGCdrYu5wDNc94aswMQl-4rUqpeQgJ5xc-j-aLbSlslBOSIqWcyKpXy6kghOpRJ7SixmxjeWcaf8nrotChLb26Kc51ngUJIPLDKRLAvroLd2x1OsCZm6_4ykdflpgNpG8rExqP_seif4yeQYO26eGD3B-lh5RLdEOe-4iXpw9rFcQF9ndqmlVQXqmj2FgqpcoYKj0S')" }}></div>
                            <div className="flex-1 bg-cover bg-center rounded border border-primary" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAiSXwjNQjZX11U3N7ZyY2EoYDRc579JbguROzJzCUIbI3sdY-zpRZ1gcFLTrn9WHoI-M2B3BVgfmX3hyD0xkw7ThiO_fs-2UuZS5aFsy_dlz4eB7RfWvSrju0IB8vFemyBToi21jXmSW-g6HY9gANNG7HTh2DvsOkQMVis8_DqiyyJptQ3h9YiyfWELkBXIk5eF6DdeDLTHCZ3OPVQPN0Ays9RKC5BNYgPIF-ep7tMPbKyVdS0uSuo7oDa-w7HUcp9d0nocHLwynHq')" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default UseCasesHero;

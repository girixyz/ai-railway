import React from 'react';

const TechCapabilities = () => {
    return (
        <section className="py-24 px-6 bg-background-dark">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4 text-white">Technical Capabilities</h2>
                            <p className="text-slate-400">Built for the harshest environments and the highest speeds.</p>
                        </div>
                        {/* Feature 1 */}
                        <div className="flex gap-4">
                            <div className="mt-1">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary border border-primary/20">
                                    <span className="material-symbols-outlined">blur_off</span>
                                </span>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white">Motion De-blurring GANs</h4>
                                <p className="text-slate-400 text-sm mt-1">Generative Adversarial Networks trained on high-speed footage to reconstruct lost texture details instantly.</p>
                            </div>
                        </div>
                        {/* Feature 2 */}
                        <div className="flex gap-4">
                            <div className="mt-1">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary border border-primary/20">
                                    <span className="material-symbols-outlined">nights_stay</span>
                                </span>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white">Low-Light ISP Pipeline</h4>
                                <p className="text-slate-400 text-sm mt-1">Custom Image Signal Processing pipeline amplifies signal in low-light conditions without introducing ISO noise.</p>
                            </div>
                        </div>
                        {/* Feature 3 */}
                        <div className="flex gap-4">
                            <div className="mt-1">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary border border-primary/20">
                                    <span className="material-symbols-outlined">developer_board</span>
                                </span>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white">NVIDIA Jetson Optimized</h4>
                                <p className="text-slate-400 text-sm mt-1">Fully optimized for Jetson Orin modules using TensorRT for maximum inference throughput.</p>
                            </div>
                        </div>
                    </div>
                    {/* Visual Representation of Dashboard */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-[#161e2e]/80 backdrop-blur-md border border-white/10 rounded-xl p-4 overflow-hidden shadow-2xl">
                            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="text-xs text-slate-500 font-mono">dashboard_v2.0.exe</div>
                            </div>
                            {/* Mock Dashboard Content */}
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="col-span-2 bg-background-dark/50 rounded-lg h-32 relative overflow-hidden">
                                    {/* Graph line simulated */}
                                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary/20 to-transparent"></div>
                                    <svg className="absolute bottom-0 left-0 right-0 h-24 w-full" preserveAspectRatio="none">
                                        <path d="M0,80 Q30,70 60,75 T120,50 T180,40 T240,60 T300,20 V100 H0 Z" fill="none" stroke="#135bec" strokeWidth="2"></path>
                                    </svg>
                                </div>
                                <div className="bg-background-dark/50 rounded-lg h-32 p-3 flex flex-col justify-between">
                                    <span className="text-xs text-slate-400">Defects Found</span>
                                    <span className="text-3xl font-bold text-white">14</span>
                                    <span className="text-xs text-red-400 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[10px]">arrow_upward</span> +2 today
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-slate-700 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2OzJkAeWgPrlcXLPISZuIZOUZvADiTVGlA1EGpGGE4aFPW8I4BNqa5dSkBMUBLgZMhpLUmoRHDVsm0r2JWSZ4JovmOdbhzFa7JeR2l6DOxIZuGgsGStFSc2XF6XtrRhaad3bVc55DkK6qVPjoi1QEBXco3NT6Eo5oliERwCxGdYaYb3wMMqN-15wLzhXdSSfPTxxZdGGe8Hl5bCj1HV6ofOXA7vKbifzsfAkq2E6pQyDyNvnPQqRONxqTbAz29dPk1y_7MIr3bL0A')" }}></div>
                                        <div>
                                            <div className="text-xs font-bold text-white">Crack Detected</div>
                                            <div className="text-[10px] text-slate-400">Wagon #4421 - Axle 2</div>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-[10px] font-bold">CRITICAL</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-slate-700 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUd66BYdLhk8HBOckndCG0OrCiqGfD-i1wtxdlxtTuicCfS-2qDIEd9fqx5H-KdvEJKWYWelKyhT51BNT7FAhkJ5g2Ioo1K10cEf-gmILwjj_7W3tECPAccxS_IIlc5uz-tCsrek-e_G5HxO769xUvB4eYo95651TNIVmU9dqS9BKkGwCprnPiXoNLjesJzYFo6pTYWbwvcDOpw-Uia8IhKp9Wc6Z7R6WqvhspZ8l01VvuRt0lB_XqgKUtaZR5soxFwVPB-Rxlfbr4')" }}></div>
                                        <div>
                                            <div className="text-xs font-bold text-white">Wheel Flat Spot</div>
                                            <div className="text-[10px] text-slate-400">Wagon #4421 - Axle 4</div>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 text-[10px] font-bold">WARNING</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default TechCapabilities;

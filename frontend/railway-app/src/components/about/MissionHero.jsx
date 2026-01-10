import React from 'react';

const MissionHero = () => {
    return (
        <section className="relative w-full max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                        Mission Critical Intelligence
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                        Seeing the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">Unseen</span> at 80km/h
                    </h1>
                    <p className="text-lg text-slate-400 max-w-xl leading-relaxed font-body">
                        We are redefining railway safety through edge-computing AI. Our systems process visual data in real-time, mitigating motion blur and identifying micro-fractures before they become critical failures.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <div className="flex flex-col gap-1 border-l-2 border-primary/50 pl-4">
                            <span className="text-2xl font-bold text-white">0.02ms</span>
                            <span className="text-xs text-slate-400 uppercase tracking-wider">Latency</span>
                        </div>
                        <div className="flex flex-col gap-1 border-l-2 border-primary/50 pl-4">
                            <span className="text-2xl font-bold text-white">80%</span>
                            <span className="text-xs text-slate-400 uppercase tracking-wider">Accuracy</span>
                        </div>
                        <div className="flex flex-col gap-1 border-l-2 border-primary/50 pl-4">
                            <span className="text-2xl font-bold text-white">24/7</span>
                            <span className="text-xs text-slate-400 uppercase tracking-wider">Edge Uptime</span>
                        </div>
                    </div>
                </div>
                {/* 3D Abstract Representation */}
                <div className="relative h-[400px] lg:h-[500px] w-full perspective-container flex items-center justify-center">
                    <div className="relative w-full h-full max-w-md mx-auto">
                        {/* Background glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
                        {/* Main Visual Card */}
                        <div className="absolute inset-0 rounded-2xl overflow-hidden border border-primary/30 glass-panel card-3d shadow-2xl shadow-primary/10 group">
                            <div className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-fhOHsgLf1IX6NjBny246IrOw0nv2C6rhAKAuO_DLx4O_dXPXlLF0MEI2D7iG8HUwJCO72ALJ0NUQCsXY-P5tBnqKAv108gvj3s0BIw66sskIqJS5UQ71n_VBk5Xb-8mIB4zCF0NPkV6iIlVKZeCKnALWkCCzNnt-8io_N2Qy2_9KSsEUXVb8yTeEE_02fh_jKGfRPPC1DR0esU0t4tB1jLLuhnxXAxEBT_1iDUuGh0-B2BvHA8eWl6hg3V4hZNn_gUv_rmaZQ3KE')" }}>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                            {/* Scanning Line Effect */}
                            <div className="scanning-line"></div>
                            {/* Overlay UI Elements */}
                            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-surface-dark/90 border border-primary/20 backdrop-blur-md">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2 text-xs font-mono text-primary">
                                        <span className="material-symbols-outlined text-[16px]">radar</span>
                                        <span>SCANNING_ACTIVE</span>
                                    </div>
                                    <span className="text-xs font-mono text-white">ID: WGN-8492</span>
                                </div>
                                <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full w-[76%]"></div>
                                </div>
                                <div className="mt-2 flex justify-between text-[10px] text-slate-400 font-mono uppercase">
                                    <span>Analysis Complete</span>
                                    <span>No Defects Found</span>
                                </div>
                            </div>
                        </div>
                        {/* Floating Elements */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-xl bg-surface-dark border border-border-dark p-4 shadow-xl floating-element z-20 hidden sm:block">
                            <div className="flex flex-col h-full justify-between">
                                <span className="material-symbols-outlined text-primary">memory</span>
                                <div>
                                    <p className="text-xs text-slate-400">Edge Node</p>
                                    <p className="text-sm font-bold text-white">Active</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionHero;

import React from 'react';

const ArchitectureDiagram = () => {
    return (
        <section className="py-24 bg-background-dark relative overflow-hidden">
            {/* Decorative Grid Background */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundSize: "40px 40px",
                maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
                backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)"
            }}></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Edge-First Architecture</h2>
                    <p className="text-slate-400">Processing happens where the data lives, minimizing latency and bandwidth usage.</p>
                </div>
                {/* Process Flow */}
                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-slate-700 via-primary to-slate-700 -z-10"></div>

                    {/* Step 1 */}
                    <div className="bg-[#161e2e]/70 backdrop-blur-md p-8 rounded-2xl flex flex-col items-center text-center border border-white/10 hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center mb-6 shadow-lg relative group">
                            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className="material-symbols-outlined text-4xl text-white">videocam</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">High-Speed Capture</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Multi-spectrum cameras capture imagery at up to 120 FPS, synchronized with train velocity sensors.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-[#161e2e]/70 backdrop-blur-md p-8 rounded-2xl flex flex-col items-center text-center relative border-primary/30 border hover:-translate-y-1 transition-transform duration-300">
                        <div className="absolute -top-3 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">CORE ENGINE</div>
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-blue-700 border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(19,91,236,0.4)]">
                            <span className="material-symbols-outlined text-4xl text-white">memory</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Edge AI Processing</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">On-device neural networks instantly correct motion blur, enhance low-light areas, and identify defects.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-[#161e2e]/70 backdrop-blur-md p-8 rounded-2xl flex flex-col items-center text-center border border-white/10 hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center mb-6 shadow-lg relative group">
                            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className="material-symbols-outlined text-4xl text-white">analytics</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Cloud Analytics</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Only critical metadata and defect imagery are transmitted to the cloud dashboard for human review.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ArchitectureDiagram;

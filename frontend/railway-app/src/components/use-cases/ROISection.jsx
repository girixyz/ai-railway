import React from 'react';

const ROISection = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-background-dark">
            <div className="absolute inset-0 bg-primary/5 z-0"></div>
            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Interactive ROI Text */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Tangible ROI from Day One</h2>
                        <p className="text-slate-400 text-lg mb-8">Move from reactive repairs to predictive maintenance. Our dashboard provides actionable insights that directly impact your bottom line.</p>
                        <div className="space-y-6">
                            {/* Metric 1 */}
                            <div className="bg-[#1a2332]/70 backdrop-blur-md p-5 rounded-xl border border-slate-700 flex gap-4 items-center">
                                <div className="size-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                    <span className="material-symbols-outlined">trending_up</span>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">40%</div>
                                    <div className="text-sm text-slate-400">Reduction in manual inspection costs</div>
                                </div>
                            </div>
                            {/* Metric 2 */}
                            <div className="bg-[#1a2332]/70 backdrop-blur-md p-5 rounded-xl border border-slate-700 flex gap-4 items-center">
                                <div className="size-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                                    <span className="material-symbols-outlined">timer</span>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">6x Faster</div>
                                    <div className="text-sm text-slate-400">Turnaround time for safety clearance</div>
                                </div>
                            </div>
                        </div>
                        {/* Calculator */}
                        <div className="mt-10 p-6 rounded-2xl bg-[#1a2332] border border-slate-700">
                            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">calculate</span>
                                ROI Estimator
                            </h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-slate-400 mb-2 block">Number of Wagons</label>
                                    <input className="w-full accent-primary bg-slate-800 h-2 rounded-lg appearance-none cursor-pointer" max="5000" min="100" type="range" defaultValue="1200" />
                                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                                        <span>100</span>
                                        <span className="text-primary font-bold">1,200</span>
                                        <span>5,000</span>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
                                    <span className="text-sm text-slate-400">Estimated Annual Savings:</span>
                                    <span className="text-2xl font-bold text-white shadow-[0_0_20px_rgba(19,91,236,0.5)]">$2.4M</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right: Dashboard Preview */}
                    <div className="relative">
                        <div className="absolute -top-10 -right-10 size-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none"></div>
                        <div className="relative bg-[#1a2332] border border-slate-700 rounded-xl shadow-2xl overflow-hidden p-6">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-700">
                                <div>
                                    <h3 className="text-white font-bold text-lg">Fleet Status: East Coast Line</h3>
                                    <p className="text-xs text-slate-400">Last updated: Just now</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="flex size-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                                    <span className="text-xs font-mono text-green-500">SYSTEM ONLINE</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-background-dark p-4 rounded-lg border border-slate-700">
                                    <p className="text-xs text-slate-400 mb-1">Total Scanned</p>
                                    <p className="text-2xl font-mono text-white">14,203</p>
                                    <div className="w-full bg-gray-700 h-1 rounded-full mt-2 overflow-hidden">
                                        <div className="bg-primary h-full w-[70%]"></div>
                                    </div>
                                </div>
                                <div className="bg-background-dark p-4 rounded-lg border border-slate-700">
                                    <p className="text-xs text-slate-400 mb-1">Defects Found</p>
                                    <p className="text-2xl font-mono text-red-400">23</p>
                                    <div className="w-full bg-gray-700 h-1 rounded-full mt-2 overflow-hidden">
                                        <div className="bg-red-500 h-full w-[12%]"></div>
                                    </div>
                                </div>
                            </div>
                            {/* Graph Placeholder */}
                            <div className="bg-background-dark p-4 rounded-lg border border-slate-700 h-40 flex items-end gap-2 px-2 pb-2 relative overflow-hidden">
                                <div className="absolute top-4 left-4 text-xs text-slate-400">Defect Trends (Last 7 Days)</div>
                                <div className="w-full bg-slate-700/30 h-[30%] rounded-sm"></div>
                                <div className="w-full bg-slate-700/30 h-[50%] rounded-sm"></div>
                                <div className="w-full bg-slate-700/30 h-[40%] rounded-sm"></div>
                                <div className="w-full bg-primary/40 h-[60%] rounded-sm"></div>
                                <div className="w-full bg-primary/60 h-[80%] rounded-sm"></div>
                                <div className="w-full bg-primary h-[45%] rounded-sm"></div>
                                <div className="w-full bg-primary h-[20%] rounded-sm"></div>
                            </div>
                            {/* Floating Element */}
                            <div className="absolute bottom-8 right-8 bg-black/80 backdrop-blur border border-primary/30 p-3 rounded-lg shadow-xl max-w-[200px]">
                                <div className="flex items-start gap-3">
                                    <div className="size-8 rounded bg-red-500/20 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-red-500 text-sm">warning</span>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-white">Critical Alert</div>
                                        <div className="text-[10px] text-slate-400 leading-tight mt-1">Wagon #88432 axle stress fracture detected.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ROISection;

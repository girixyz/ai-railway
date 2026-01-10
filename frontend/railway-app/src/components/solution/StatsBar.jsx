import React from 'react';

const StatsBar = () => {
    return (
        <section className="border-y border-white/5 bg-background-dark/50 backdrop-blur-sm z-20 relative">
            <div className="container mx-auto px-6 py-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">Processing Speed</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-white">60</span>
                            <span className="text-primary font-bold">FPS</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">Latency</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-white">12</span>
                            <span className="text-primary font-bold">ms</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">Blur Reduction</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-white">98</span>
                            <span className="text-primary font-bold">%</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">Uptime</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-white">99.9</span>
                            <span className="text-primary font-bold">%</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default StatsBar;

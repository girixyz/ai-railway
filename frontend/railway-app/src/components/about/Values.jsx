import React from 'react';

const Values = () => {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Value Card 1 */}
                <div className="group relative p-8 rounded-2xl bg-surface-dark border border-border-dark hover:border-primary/50 transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined">speed</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Extreme Velocity</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-body">Processing visual data at 80km/h without compromising detail or frame integrity.</p>
                </div>
                {/* Value Card 2 */}
                <div className="group relative p-8 rounded-2xl bg-surface-dark border border-border-dark hover:border-primary/50 transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined">center_focus_strong</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Pixel Precision</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-body">Detecting micro-fractures under 2mm with our proprietary de-blurring algorithms.</p>
                </div>
                {/* Value Card 3 */}
                <div className="group relative p-8 rounded-2xl bg-surface-dark border border-border-dark hover:border-primary/50 transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined">security</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Safety First</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-body">Ensuring the structural integrity of every wagon to protect passengers and cargo worldwide.</p>
                </div>
            </div>
        </section>
    );
};

export default Values;

import React from 'react';

const EdgeSection = () => {
    return (
        <section className="py-20 bg-[#0b0f17] border-t border-[#1a2332]">
            <div className="max-w-[960px] mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-xs font-bold mb-6">
                    <span className="material-symbols-outlined text-sm">router</span>
                    EDGE ARCHITECTURE
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Processing at the Speed of Travel</h2>
                <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
                    Our ruggedized edge units process terabytes of visual data locally, ensuring safety decisions are made in milliseconds, not minutes.
                </p>
                <div className="relative rounded-xl overflow-hidden bg-[#151c29] border border-[#232f48] aspect-[21/9]">
                    <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAr92iRWuzwcVwVNTr7hRclTOsDH5zSqewZ1Dw3oglHIz2bIqc7LhxFlkBxLGv3YuYMiEBFZtVrJNR3PN18IzecsX2xkMRjeis_f68LYpAiwv4WqeoEu4Q0M8b_yjH4kmDfnp2BF8zCnjmGHFR0edYeKe0bwWJ-4QiroIEMH4_rIHQ3bOZkGGRNVi24V81egGXT9Jf56QbtKXlBJtfWvfVtY4FDuH5S5wwAVyBPbCQeOCarbBUOQ-lbQWzEVO_xrEdJ6T0pZ4zjHSVE")' }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f17] via-transparent to-[#0b0f17]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-12 text-center">
                            <div>
                                <div className="text-4xl font-bold text-white font-mono">4.2<span className="text-primary text-xl">TB</span></div>
                                <div className="text-xs text-gray-500 uppercase tracking-widest mt-2">Daily Data</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-white font-mono">99.9<span className="text-primary text-xl">%</span></div>
                                <div className="text-xs text-gray-500 uppercase tracking-widest mt-2">Uptime</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-white font-mono">IP67</div>
                                <div className="text-xs text-gray-500 uppercase tracking-widest mt-2">Rated</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EdgeSection;

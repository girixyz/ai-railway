import React from 'react';

import { Link } from 'react-router-dom';

const SolutionHero = () => {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-background-dark pt-16">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-background-dark">
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundSize: "40px 40px",
                    maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
                    backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)"
                }}></div>
                {/* Glowing Orb */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"></div>
            </div>
            <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-6 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        <span className="text-xs font-bold text-primary tracking-wide uppercase">System Operational</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white">
                        See clearly at <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">80 km/h</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                        Mitigate motion blur and low-light issues instantly with our edge-native AI. Inspect wagons in real-time with sub-millimeter precision.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-4">
                        <Link to="/analytics" className="bg-white text-background-dark px-6 py-3 rounded-lg font-bold hover:bg-slate-200 transition-colors flex items-center gap-2">
                            <span className="material-symbols-outlined">view_in_ar</span>
                            Start Interactive Tour
                        </Link>
                        <Link to="/technology" className="px-6 py-3 rounded-lg font-medium text-white border border-white/10 hover:bg-white/5 transition-colors">
                            View Specs
                        </Link>
                    </div>
                </div>
                {/* Abstract 3D Visualization Placeholder */}
                <div className="relative h-[400px] lg:h-[500px] w-full perspective-[1000px]">
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Central Card */}
                        <div className="relative w-64 h-80 bg-gradient-to-b from-slate-800 to-background-dark border border-primary/50 rounded-xl shadow-[0_0_50px_rgba(19,91,236,0.3)] transform rotate-y-12 rotate-x-6 z-20 flex flex-col p-4 overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                            <div className="flex-1 bg-slate-900/50 rounded-lg mb-3 overflow-hidden relative">
                                <img className="w-full h-full object-cover opacity-80 mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvK7DSvVjIC5uD1e7VXD_iQh6RiRZnidnoyfKciQeV-MuFpHfzhN9kVzijt3jZObaKBPyM_upKBS1YAb5jyUVwCQMgEn1RijwzqZNri_1e7fwizePwAHlv9BvZRtvsXZfk-zXlfms8scqVxlPvi3IDl88HCMXFMWk3_N2f-BuiGzSamOEM8AbV3tRrMqVRUgp5eGJGiscV-nayI_dtK9XBpd7Y2iH6oFf0XrDuClHg-DF3JYH3WS2Yo0VOAoz-aB1Y7--LyHWDTb06" alt="Wheel" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-primary animate-pulse">qr_code_scanner</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-2/3 bg-slate-700 rounded animate-pulse"></div>
                                <div className="h-2 w-1/2 bg-slate-700 rounded animate-pulse"></div>
                            </div>
                            <div className="mt-4 flex justify-between items-end">
                                <span className="text-xs text-slate-400 font-mono">ID: WGN-8842</span>
                                <span className="text-xs text-primary font-bold">99.8% Match</span>
                            </div>
                        </div>
                        {/* Background Layer 1 */}
                        <div className="absolute w-60 h-72 bg-slate-800/40 border border-white/5 rounded-xl transform -translate-x-12 translate-y-8 -rotate-y-12 -z-10 blur-[1px]"></div>
                        {/* Background Layer 2 */}
                        <div className="absolute w-56 h-64 bg-slate-800/20 border border-white/5 rounded-xl transform translate-x-16 -translate-y-8 rotate-y-6 -z-20 blur-[2px]"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SolutionHero;

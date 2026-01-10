import React from 'react';

import { useDemo } from '@/context/DemoContext';

const KPIGrid = () => {
    const { isDemoMode } = useDemo();
    return (
        <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Wagons Scanned */}
            <div className="bg-[#161e2e]/70 backdrop-blur-md border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 hover:rotate-x-2 transition-transform duration-500 perspective-1000">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-6xl">train</span>
                </div>
                <p className="text-[#92a4c9] text-sm font-medium uppercase tracking-wider mb-1">Total Wagons Scanned</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-4xl font-bold text-white">1700+</h3>
                    <span className="text-[#0bda5e] text-sm font-bold flex items-center">
                        <span className="material-symbols-outlined text-base">trending_up</span> 12%
                    </span>
                </div>
                <div className="mt-4 h-1 w-full bg-[#232f48] rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[75%] shadow-[0_0_10px_rgba(19,91,236,0.5)]"></div>
                </div>
            </div>

            {/* Defects detected */}
            <div className="bg-[#161e2e]/70 backdrop-blur-md border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 hover:rotate-x-2 transition-transform duration-500 perspective-1000">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-6xl">warning</span>
                </div>
                <p className="text-[#92a4c9] text-sm font-medium uppercase tracking-wider mb-1">Defects Detected</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-4xl font-bold text-white">400+</h3>
                    <span className="text-[#0bda5e] text-sm font-bold flex items-center">
                        <span className="material-symbols-outlined text-base">trending_up</span> 5%
                    </span>
                </div>
                <div className="flex gap-2 mt-4">
                    <div className="flex-1 bg-[#232f48] rounded px-2 py-1 text-center relative overflow-hidden">
                        <span className="text-xs text-gray-400 block">Critical</span>
                        {isDemoMode ? (
                            <div className="flex justify-center items-center mt-0.5">
                                <span className="material-symbols-outlined text-sm text-gray-500">lock</span>
                            </div>
                        ) : (
                            <span className="text-sm font-bold text-red-400">42</span>
                        )}
                    </div>
                    <div className="flex-1 bg-[#232f48] rounded px-2 py-1 text-center relative overflow-hidden">
                        <span className="text-xs text-gray-400 block">Major</span>
                        {isDemoMode ? (
                            <div className="flex justify-center items-center mt-0.5">
                                <span className="material-symbols-outlined text-sm text-gray-500">lock</span>
                            </div>
                        ) : (
                            <span className="text-sm font-bold text-orange-400">156</span>
                        )}
                    </div>
                    <div className="flex-1 bg-[#232f48] rounded px-2 py-1 text-center">
                        <span className="text-xs text-gray-400 block">Minor</span>
                        <span className="text-sm font-bold text-yellow-400">645</span>
                    </div>
                </div>
            </div>

            {/* Blur Correction */}
            <div className="bg-[#161e2e]/70 backdrop-blur-md border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 hover:rotate-x-2 transition-transform duration-500 perspective-1000">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-6xl">lens_blur</span>
                </div>
                <p className="text-[#92a4c9] text-sm font-medium uppercase tracking-wider mb-1">Avg. Blur Correction</p>
                {isDemoMode ? (
                    <div className="flex items-center justify-center h-12 bg-white/5 rounded-lg border border-white/10 my-1">
                        <span className="material-symbols-outlined text-gray-400">lock</span>
                        <span className="text-xs text-gray-400 ml-2 uppercase font-bold tracking-wider">Premium Feature</span>
                    </div>
                ) : (
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-4xl font-bold text-white">80%</h3>
                        <span className="text-[#0bda5e] text-sm font-bold flex items-center">
                            <span className="material-symbols-outlined text-base">trending_up</span> 2%
                        </span>
                    </div>
                )}
                <p className="text-xs text-gray-500 mt-2">Motion compensation active at speeds &gt; 120km/h</p>
            </div>

            {/* Health */}
            <div className="bg-[#161e2e]/70 backdrop-blur-md border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 hover:rotate-x-2 transition-transform duration-500 perspective-1000 flex-1 min-h-[140px]">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-[#92a4c9] text-sm font-medium uppercase tracking-wider">Edge Device Health</p>
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400 flex items-center gap-2"><span className="material-symbols-outlined text-base text-green-500">check_circle</span> Node Alpha</span>
                        <span className="text-white font-mono">12ms</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400 flex items-center gap-2"><span className="material-symbols-outlined text-base text-green-500">check_circle</span> Node Beta</span>
                        <span className="text-white font-mono">14ms</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400 flex items-center gap-2"><span className="material-symbols-outlined text-base text-green-500">check_circle</span> Node Gamma</span>
                        <span className="text-white font-mono">11ms</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default KPIGrid;

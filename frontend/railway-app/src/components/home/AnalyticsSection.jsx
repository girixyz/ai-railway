import React from 'react';

const AnalyticsSection = () => {
    return (
        <section className="py-24 bg-[#101622] relative overflow-hidden">
            {/* Abstract Background shapes */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="max-w-[1200px] mx-auto px-4">
                <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            From Pixel to <span className="text-primary">Insight</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 font-body">
                            A powerful analytics dashboard that transforms raw visual data into fleet maintenance intelligence.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-[#151c29] border border-[#232f48] hover:border-[#324467] transition-colors">
                                <div className="mt-1 text-primary">
                                    <span className="material-symbols-outlined">notifications_active</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-base">Real-time Alerts</h4>
                                    <p className="text-sm text-gray-400">Instant notifications via SMS/Email for critical defects detected on the line.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-[#151c29] border border-[#232f48] hover:border-[#324467] transition-colors">
                                <div className="mt-1 text-purple-400">
                                    <span className="material-symbols-outlined">trending_up</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-base">Predictive Maintenance</h4>
                                    <p className="text-sm text-gray-400">Trend analysis to predict component failures weeks before they happen.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-[#151c29] border border-[#232f48] hover:border-[#324467] transition-colors">
                                <div className="mt-1 text-emerald-400">
                                    <span className="material-symbols-outlined">dataset</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-base">Fleet Analytics</h4>
                                    <p className="text-sm text-gray-400">Comprehensive reporting on wagon health across the entire network.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Dashboard Preview */}
                    <div className="lg:w-1/2 w-full perspective-1000">
                        <div className="relative transform rotate-y-6 rotate-x-6 hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out shadow-2xl">
                            <div className="bg-[#111722] rounded-xl border border-[#232f48] overflow-hidden p-1">
                                {/* Mock Dashboard Header */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-[#232f48] bg-[#0d121c]">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="text-xs text-gray-500 font-mono">railway_ai_dashboard.exe</div>
                                </div>
                                {/* Mock Dashboard Content */}
                                <div className="p-6 bg-[#0d121c] grid grid-cols-2 gap-4">
                                    <div className="col-span-2 bg-[#151c29] rounded-lg p-4 border border-[#232f48]">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="text-sm text-gray-400">Fleet Health Overview</div>
                                            <div className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded">98.2% Operational</div>
                                        </div>
                                        {/* Fake Chart */}
                                        <div className="flex items-end justify-between h-24 gap-1">
                                            <div className="w-full bg-primary/20 h-[40%] rounded-sm"></div>
                                            <div className="w-full bg-primary/40 h-[60%] rounded-sm"></div>
                                            <div className="w-full bg-primary/30 h-[30%] rounded-sm"></div>
                                            <div className="w-full bg-primary/60 h-[80%] rounded-sm"></div>
                                            <div className="w-full bg-primary/50 h-[50%] rounded-sm"></div>
                                            <div className="w-full bg-primary h-[90%] rounded-sm relative group">
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Peak Efficiency</div>
                                            </div>
                                            <div className="w-full bg-primary/40 h-[60%] rounded-sm"></div>
                                        </div>
                                    </div>
                                    <div className="bg-[#151c29] rounded-lg p-4 border border-[#232f48]">
                                        <div className="text-xs text-gray-400 mb-2">Critical Defects</div>
                                        <div className="text-3xl font-bold text-white">03</div>
                                        <div className="text-xs text-red-400 mt-1">Requires Action</div>
                                    </div>
                                    <div className="bg-[#151c29] rounded-lg p-4 border border-[#232f48]">
                                        <div className="text-xs text-gray-400 mb-2">Scanned Wagons</div>
                                        <div className="text-3xl font-bold text-white">1,248</div>
                                        <div className="text-xs text-green-400 mt-1">+12% vs Yesterday</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnalyticsSection;

import React from 'react';

const Challenge = () => {
    return (
        <div className="w-full bg-background-dark py-20 px-6 md:px-12 lg:px-20 border-t border-slate-800">
            <div className="w-full max-w-[1280px] mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
                            <span className="w-8 h-[2px] bg-primary"></span>
                            The Challenge
                        </div>
                        <h2 className="text-white text-4xl font-bold leading-tight">Motion Blur &amp; <br />Low Light Conditions</h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Standard industrial cameras fail at 80km/h. The relative velocity creates significant motion blur, while tunnel environments introduce severe low-light noise.
                        </p>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Our initial stage captures raw data, but it's often unusable for precise defect detection like micro-cracks on wheel flanges. This is where our AI pipeline begins.
                        </p>
                        <div className="grid grid-cols-2 gap-6 mt-4">
                            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                                <span className="material-symbols-outlined text-primary text-3xl mb-2">speed</span>
                                <div className="text-white font-bold text-xl">80 km/h</div>
                                <div className="text-slate-400 text-sm">Train Velocity</div>
                            </div>
                            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                                <span className="material-symbols-outlined text-primary text-3xl mb-2">shutter_speed</span>
                                <div className="text-white font-bold text-xl">&lt; 0.2ms</div>
                                <div className="text-slate-400 text-sm">Exposure Time</div>
                            </div>
                        </div>
                    </div>
                    {/* Visual Representation of Blur */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-900 border border-slate-700">
                            <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD6WM0ZRGgjn5NgeM16TVWLP2OONuKiPI97UAWI9Unh6s55H-lrumrX4s3LPT7-U8qyLhHqogsPFozOtJmBGXw2T_EFM84Q0TxYKAuicdbOnPWxzjhzbZCbBwPXdxlH-upwgTfFJ_ogl-DQ-axGXxKUMKt0RxGpJutncl1_krDx-J3mBs5H4A0slD7YhH17H-7VmciiBjentffFXdiM_mmD8tFAdq7k12G377j3kweTnJCwjsGnUd23PbPAkYQYZH-Hdlpyss5IL8Df')" }}>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                                <div className="flex items-center gap-2 text-red-400 font-mono text-sm bg-black/50 w-fit px-2 py-1 rounded border border-red-500/30">
                                    <span className="material-symbols-outlined text-sm">warning</span>
                                    RAW INPUT: BLUR DETECTED
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Challenge;

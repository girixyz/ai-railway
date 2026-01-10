import React from 'react';

const ProcessingPipeline = () => {
    return (
        <div className="w-full bg-background-dark py-20 px-6 md:px-12 lg:px-20 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(30deg, #135bec 12%, transparent 12.5%, transparent 87%, #135bec 87.5%, #135bec), linear-gradient(150deg, #135bec 12%, transparent 12.5%, transparent 87%, #135bec 87.5%, #135bec), linear-gradient(30deg, #135bec 12%, transparent 12.5%, transparent 87%, #135bec 87.5%, #135bec), linear-gradient(150deg, #135bec 12%, transparent 12.5%, transparent 87%, #135bec 87.5%, #135bec), linear-gradient(60deg, #135bec77 25%, transparent 25.5%, transparent 75%, #135bec77 75%, #135bec77), linear-gradient(60deg, #135bec77 25%, transparent 25.5%, transparent 75%, #135bec77 75%, #135bec77)", backgroundSize: "80px 140px", backgroundPosition: "0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px" }}>
            </div>
            <div className="w-full max-w-[960px] mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">The Processing Pipeline</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">From sensor to insight in under 400 milliseconds. Our edge architecture handles the heavy lifting locally.</p>
                </div>
                <div className="grid grid-cols-[60px_1fr] gap-x-8 px-4">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center gap-1 pt-2">
                        <div className="size-10 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center z-10 shadow-[0_0_15px_rgba(19,91,236,0.3)]">
                            <span className="material-symbols-outlined text-[20px]">camera_enhance</span>
                        </div>
                        <div className="w-[2px] bg-gradient-to-b from-primary to-slate-800 h-full grow min-h-[120px]"></div>
                    </div>
                    <div className="flex flex-col pb-12">
                        <h3 className="text-white text-xl font-bold mb-2">01. High-Speed Capture &amp; Sync</h3>
                        <p className="text-slate-400 text-base mb-4">
                            Strobe lights triggered at microsecond precision sync with the camera shutter. This ensures the wheelset is illuminated exactly when it aligns with the sensor, minimizing initial motion blur.
                        </p>
                        <div className="flex gap-2">
                            <span className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700 font-mono">Hardware Trigger</span>
                            <span className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700 font-mono">15000 Lumens</span>
                        </div>
                    </div>
                    {/* Step 2 */}
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-[2px] bg-gradient-to-b from-slate-800 to-primary h-8"></div>
                        <div className="size-10 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center z-10 shadow-[0_0_15px_rgba(19,91,236,0.3)]">
                            <span className="material-symbols-outlined text-[20px]">blur_off</span>
                        </div>
                        <div className="w-[2px] bg-gradient-to-b from-primary to-slate-800 h-full grow min-h-[120px]"></div>
                    </div>
                    <div className="flex flex-col py-4 pb-12">
                        <h3 className="text-white text-xl font-bold mb-2">02. GAN Restoration (Deblur)</h3>
                        <p className="text-slate-400 text-base mb-4">
                            Our generative adversarial network estimates the motion kernel and reverses the blur. It hallucinates missing high-frequency details based on a trained dataset of pristine wheel components.
                        </p>
                        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 w-full md:w-2/3 shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-slate-500 uppercase font-mono">Kernel Estimation</span>
                                <span className="text-xs text-green-400 font-mono">Active</span>
                            </div>
                            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[85%] rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                    {/* Step 3 */}
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-[2px] bg-gradient-to-b from-slate-800 to-primary h-8"></div>
                        <div className="size-10 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center z-10 shadow-[0_0_15px_rgba(19,91,236,0.3)]">
                            <span className="material-symbols-outlined text-[20px]">memory</span>
                        </div>
                        <div className="w-[2px] bg-gradient-to-b from-primary to-slate-800 h-full grow min-h-[120px]"></div>
                    </div>
                    <div className="flex flex-col py-4 pb-12">
                        <h3 className="text-white text-xl font-bold mb-2">03. Edge Inference (TensorRT)</h3>
                        <p className="text-slate-400 text-base mb-4">
                            Optimized for NVIDIA Jetson modules. We use FP16 quantization to run defect detection models at 60 FPS directly on the gantry, eliminating cloud latency costs.
                        </p>
                    </div>
                    {/* Step 4 */}
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-[2px] bg-gradient-to-b from-slate-800 to-primary h-8"></div>
                        <div className="size-10 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center z-10 shadow-[0_0_15px_rgba(19,91,236,0.3)]">
                            <span className="material-symbols-outlined text-[20px]">analytics</span>
                        </div>
                    </div>
                    <div className="flex flex-col py-4">
                        <h3 className="text-white text-xl font-bold mb-2">04. Analytics &amp; Alerts</h3>
                        <p className="text-slate-400 text-base mb-4">
                            Only critical metadata and defect snippets are transmitted. The system flags thermal anomalies, cracks, and missing bolts, populating the dashboard instantly.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcessingPipeline;

import React from 'react';

const EdgeComputing = () => {
    return (
        <div className="w-full bg-background-dark py-20 px-6 md:px-12 lg:px-20">
            <div className="max-w-[1080px] mx-auto flex flex-col md:flex-row gap-12 items-center">
                {/* Text Content */}
                <div className="flex-1 flex flex-col gap-6">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
                        <span className="material-symbols-outlined text-lg">memory</span>
                        Edge Processing
                    </div>
                    <h2 className="text-white text-3xl font-bold leading-tight">Optimized for <br />Embedded Hardware</h2>
                    <p className="text-slate-400 leading-relaxed">
                        We utilize TensorRT optimization to prune neural network weights, allowing heavy inference models to run on compact devices like the NVIDIA Jetson Orin.
                    </p>
                    <ul className="flex flex-col gap-3 mt-2">
                        <li className="flex items-center gap-3 text-slate-300">
                            <span className="material-symbols-outlined text-green-400">check_circle</span>
                            <span>FP16 Mixed Precision</span>
                        </li>
                        <li className="flex items-center gap-3 text-slate-300">
                            <span className="material-symbols-outlined text-green-400">check_circle</span>
                            <span>&lt; 15ms Inference Latency</span>
                        </li>
                        <li className="flex items-center gap-3 text-slate-300">
                            <span className="material-symbols-outlined text-green-400">check_circle</span>
                            <span>On-device Kernel Fusion</span>
                        </li>
                    </ul>
                </div>
                {/* Terminal Visual */}
                <div className="flex-1 w-full">
                    <div className="w-full rounded-lg bg-[#0d1117] border border-slate-700 shadow-2xl overflow-hidden font-mono text-xs md:text-sm leading-relaxed">
                        {/* Terminal Header */}
                        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="text-slate-400 text-xs">root@edge-node-04:~</div>
                        </div>
                        {/* Terminal Body */}
                        <div className="p-4 h-[320px] overflow-y-auto custom-scrollbar flex flex-col gap-1 text-slate-300">
                            <div><span className="text-green-400">➜</span> <span className="text-blue-400">~</span> ./start_inference.sh --model=yolo_v8_rail_custom</div>
                            <div className="text-slate-500">Loading TensorRT engine... Done (0.42s)</div>
                            <div className="text-slate-500">Allocating GPU memory... 4096MB allocated</div>
                            <br />
                            <div>[INFO] <span className="text-white">Stream 01 connected (RTSP://192.168.1.104:554)</span></div>
                            <div>[INFO] <span class="text-white">Resolution: 4096x2160 @ 60fps</span></div>
                            <div>[WARN] <span className="text-yellow-400">Motion Blur detected in Frame 1024. Starting GAN restoration.</span></div>
                            <div>[PROC] <span className="text-blue-400">Restoration complete (12ms).</span></div>
                            <div>[INF]  <span className="text-green-400">Object Detected: Wheel_Flange (Conf: 0.98)</span></div>
                            <div>[INF]  <span className="text-green-400">Object Detected: Bolt_Assembly (Conf: 0.99)</span></div>
                            <div>[ALRT] <span className="text-red-500 font-bold">DEFECT FOUND: Micro_Fracture_Class_A @ bbox[204, 550, 240, 580]</span></div>
                            <div>[POST] Uploading snippet to cloud...</div>
                            <div className="animate-pulse">_</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EdgeComputing;

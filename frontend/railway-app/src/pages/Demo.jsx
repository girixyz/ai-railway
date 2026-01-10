import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/layout/Navbar';
import { getRandomDefect } from '@/lib/DefectKnowledgeBase';

const Demo = () => {
    const [step, setStep] = useState('upload'); // upload, processing, result
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [resultData, setResultData] = useState(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const startProcessing = () => {
        if (!file) return;
        setStep('processing');
        // Simulate processing time (train buffer)
        setTimeout(() => {
            const defect = getRandomDefect();
            setResultData(defect);
            setStep('result');
        }, 3000);
    };

    const resetDemo = () => {
        setFile(null);
        setStep('upload');
        setResultData(null);
    };

    const triggerUpsell = () => {
        alert("This is an Enterprise feature. Contact sales to unlock.");
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-primary/30">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            <div className="relative z-10 animate-in fade-in duration-700">
                {/* Main Content Container */}
                <div className="max-w-4xl mx-auto px-6 py-24">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold mb-4">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            LIVE DEMO ENVIRONMENT
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-400 mb-4">
                            Live Defect Detection
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Upload footage to experience our military-grade computer vision in action.
                        </p>
                    </div>

                    <div className="bg-[#131b2c]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden min-h-[600px] flex flex-col items-center justify-center">

                        {/* Lighting effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5" />

                        {step === 'upload' && (
                            <div className="w-full max-w-lg relative z-10 animate-in fade-in zoom-in duration-500">
                                <form
                                    className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${dragActive ? "border-primary bg-primary/5 scale-[1.02]" : "border-white/10 hover:border-white/20 hover:bg-white/5"}`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    onClick={() => document.getElementById('file-upload').click()}
                                >
                                    <input
                                        type="file"
                                        id="file-upload"
                                        className="hidden"
                                        onChange={handleChange}
                                        accept="image/*,video/*"
                                    />

                                    {!file ? (
                                        <div className="flex flex-col items-center gap-4 cursor-pointer">
                                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                                                <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-white">Upload Media</h3>
                                            <p className="text-slate-400 text-sm">Drag & drop or click to browse</p>
                                            <div className="text-xs text-slate-500 mt-4 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                                                Supports MP4, JPG, PNG
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-2">
                                                <span className="material-symbols-outlined text-3xl">check_circle</span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-white">{file.name}</h3>
                                            <p className="text-slate-400 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            <Button
                                                onClick={(e) => { e.stopPropagation(); startProcessing(); }}
                                                className="mt-4 w-full bg-primary hover:bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] h-12 text-lg"
                                            >
                                                Analyze Media
                                            </Button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                                className="text-sm text-slate-400 hover:text-white transition-colors underline"
                                            >
                                                Remove file
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>
                        )}

                        {step === 'processing' && (
                            <div className="w-full flex flex-col items-center justify-center text-center z-10 animate-in fade-in duration-500">
                                {/* Train Buffer Animation */}
                                <div className="relative w-32 h-32 mb-8">
                                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-4xl text-primary animate-pulse">train</span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Processing Footage</h3>
                                <p className="text-slate-400">Running Computer Vision Models...</p>
                                <div className="flex items-center gap-4 mt-6 text-xs text-slate-500 font-mono">
                                    <span>DETECTING ANOMALIES</span>
                                    <span className="w-px h-3 bg-slate-700"></span>
                                    <span>CALCULATING SEVERITY</span>
                                </div>
                                <div className="w-64 h-1 bg-white/10 rounded-full mt-8 overflow-hidden">
                                    <div className="h-full bg-primary animate-[progress_2s_ease-in-out_infinite] w-[50%]"></div>
                                </div>
                            </div>
                        )}

                        {step === 'result' && resultData && (
                            <div className="w-full h-full flex flex-col items-center z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="w-full flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded bg-red-500/20 flex items-center justify-center text-red-500 border border-red-500/30">
                                            <span className="material-symbols-outlined text-xl">warning</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white leading-none">{resultData.name}</h3>
                                            <p className="text-sm text-slate-400 mt-1">{resultData.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={resetDemo} className="border-white/10 hover:bg-white/5 text-slate-300">
                                            New Analysis
                                        </Button>
                                    </div>
                                </div>

                                <div className="relative w-full aspect-video bg-black/50 rounded-lg overflow-hidden border border-white/10 group mb-6">
                                    {/* Mock Result View */}
                                    <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                                        {file && file.type.startsWith('image/') ? (
                                            <img src={URL.createObjectURL(file)} alt="Analyzed" className="w-full h-full object-contain opacity-50" />
                                        ) : (
                                            <div className="text-slate-600">Video Playback Placeholder</div>
                                        )}
                                    </div>

                                    {/* Overlay UI */}
                                    <div className="absolute inset-0 p-6 pointer-events-none">
                                        <div
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 rounded-lg shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-pulse flex items-start justify-start"
                                            style={{ borderColor: resultData.color }}
                                        >
                                            <div className="text-white text-[10px] font-bold px-1.5 py-0.5" style={{ backgroundColor: resultData.color }}>
                                                {resultData.code}
                                            </div>
                                        </div>

                                        {/* Tech Overlay Lines */}
                                        <svg className="absolute inset-0 w-full h-full opacity-30">
                                            <path d="M 50 50 L 100 50 L 100 100" fill="none" stroke="white" strokeWidth="1" />
                                            <path d="M 50 50 L 50 100" fill="none" stroke="white" strokeWidth="1" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Metrics Grid - With LOCKED Features */}
                                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {/* Unlocked Basic Metrics */}
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                                        <div className="text-xs text-slate-500 mb-1">INTENSITY</div>
                                        <div className="text-2xl font-bold" style={{ color: resultData.color }}>{resultData.intensity}%</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                                        <div className="text-xs text-slate-500 mb-1">SEVERITY</div>
                                        <div className="text-xl font-bold text-white">{resultData.alertLevel.toUpperCase()}</div>
                                    </div>

                                    {/* LOCKED Advanced Metrics */}
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/5 relative overflow-hidden group hover:border-primary/50 transition-colors cursor-not-allowed" onClick={triggerUpsell}>
                                        <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] z-10 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                                            <span className="material-symbols-outlined text-white mb-1">lock</span>
                                        </div>
                                        <div className="text-xs text-slate-500 mb-1">THERMAL VARIANCE</div>
                                        <div className="text-xl font-bold text-white blur-sm">42.5°C</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/5 relative overflow-hidden group hover:border-primary/50 transition-colors cursor-not-allowed" onClick={triggerUpsell}>
                                        <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] z-10 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                                            <span className="material-symbols-outlined text-white mb-1">lock</span>
                                        </div>
                                        <div className="text-xs text-slate-500 mb-1">STRESS LOAD</div>
                                        <div className="text-xl font-bold text-white blur-sm">1200 MPa</div>
                                    </div>
                                </div>

                                {/* Upsell Banner */}
                                <div className="w-full mt-6 bg-gradient-to-r from-primary/20 to-blue-600/10 border border-primary/20 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div>
                                        <h4 className="text-white font-bold text-sm">Deploy to your fleet</h4>
                                        <p className="text-slate-400 text-xs">Get real-time analysis on edge devices.</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="ghost" className="hover:text-white" onClick={triggerUpsell}>Download Report</Button>
                                        <Button size="sm" className="bg-primary hover:bg-blue-600 shadow-lg shadow-primary/20" onClick={triggerUpsell}>Start Pilot</Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Demo;

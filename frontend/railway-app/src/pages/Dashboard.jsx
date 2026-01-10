import React, { useState } from 'react';
import { Upload, FileVideo, Play, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState(null);
    const [processedVideoUrl, setProcessedVideoUrl] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            setStatus(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setUploading(true);
        setStatus('Uploading and Extracting Frames...');

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            // Updated to point to the backend server (ensure FastAPI is running on port 8000)
            const response = await fetch('http://localhost:8000/upload_video', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const result = await response.json();

            setStatus(`Success! ${result.frames_extracted} frames extracted. Stream Updated.`);
            if (result.video_url) {
                setProcessedVideoUrl(result.video_url);
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.message && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
                setStatus('Error: Cannot connect to backend server. Make sure it is running on port 8000.');
            } else {
                setStatus(`Error: ${error.message}`);
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white pt-24 px-6 mb-20">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-indigo-500">
                        Control Dashboard
                    </h1>
                    <p className="text-slate-400 max-w-2xl">
                        Upload inspection footage to run the AI detection model.
                    </p>
                </div>

                {/* Upload Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-[#101622] border border-[#232f48] rounded-2xl p-8 space-y-6 shadow-2xl">
                        <div className="flex items-center gap-3 text-xl font-semibold text-white">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                <Upload size={24} />
                            </div>
                            <h3>Upload Logic / Video Source</h3>
                        </div>

                        <div className="border-2 border-dashed border-[#232f48] hover:border-blue-500/50 rounded-xl p-8 transition-colors text-center group cursor-pointer relative">
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            />
                            <div className="space-y-2 pointer-events-none">
                                <div className="mx-auto w-12 h-12 bg-[#161e2e] rounded-full flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:scale-110 transition-all">
                                    <FileVideo size={24} />
                                </div>
                                <p className="text-slate-300 font-medium">Click to select video</p>
                                <p className="text-slate-500 text-sm">Supports .ts, .mp4, .mkv</p>
                            </div>
                        </div>

                        {selectedFile && (
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-center justify-between">
                                <span className="text-sm font-medium text-blue-200 truncate max-w-[200px]">
                                    {selectedFile.name}
                                </span>
                                <Button
                                    onClick={handleUpload}
                                    disabled={uploading}
                                    className="bg-blue-600 hover:bg-blue-500 text-white"
                                >
                                    {uploading ? 'Processing...' : 'Start Extraction'}
                                </Button>
                            </div>
                        )}

                        {status && (
                            <div className={`p-4 rounded-lg text-sm font-medium flex items-center gap-2 ${status.startsWith('Success')
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : status.startsWith('Error')
                                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                    : 'bg-[#161e2e] text-slate-300'
                                }`}>
                                {status.startsWith('Success') && <CheckCircle size={16} />}
                                {status}
                            </div>
                        )}
                    </div>

                    {/* Quick Stats / Processed Video */}
                    <div className={`bg-[#101622] border border-[#232f48] rounded-2xl p-8 space-y-6 shadow-2xl flex flex-col items-center justify-center text-center ${!processedVideoUrl ? 'opacity-60' : ''}`}>
                        {processedVideoUrl ? (
                            <div className="w-full space-y-4">
                                <h3 className="text-xl font-semibold text-green-400">Detection Complete</h3>
                                <div className="rounded-xl overflow-hidden border border-[#232f48] shadow-lg bg-black">
                                    <video src={processedVideoUrl} controls className="w-full h-auto" />
                                </div>
                                <Button onClick={() => window.open(processedVideoUrl, '_blank')} variant="outline" className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10">
                                    Download Processed Video
                                </Button>
                            </div>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-4xl text-slate-500 mb-2">analytics</span>
                                <h3 className="text-xl font-semibold">Live Analytics Preview</h3>
                                <p className="text-slate-400">Upload a video to see extraction stats & AI detection results here.</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

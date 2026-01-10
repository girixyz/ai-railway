import React from 'react';

import { useDemo } from '@/context/DemoContext';

import scratchImage from '@/assets/scratch_detected.png';

const MainViewer = () => {

    const { isDemoMode, openDemoModal } = useDemo();
    const [viewMode, setViewMode] = React.useState('2d'); // '2d' or '3d'
    const [zoomLevel, setZoomLevel] = React.useState(1);
    const [showLayers, setShowLayers] = React.useState(false);
    const [selectedAnomaly, setSelectedAnomaly] = React.useState(null);

    const toggleViewMode = () => setViewMode(prev => prev === '2d' ? '3d' : '2d');
    const toggleZoom = () => setZoomLevel(prev => prev === 1 ? 1.5 : 1);
    const toggleLayers = () => setShowLayers(prev => !prev);

    const [panPosition, setPanPosition] = React.useState({ x: 0, y: 0 });
    const [isPanDragging, setIsPanDragging] = React.useState(false);
    const panStartRef = React.useRef({ x: 0, y: 0 });

    const handlePanStart = (e) => {
        if (zoomLevel <= 1) return;
        e.preventDefault();
        setIsPanDragging(true);
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        panStartRef.current = { x: clientX - panPosition.x, y: clientY - panPosition.y };
    };

    const handlePanMove = (e) => {
        if (!isPanDragging) return;
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        setPanPosition({
            x: clientX - panStartRef.current.x,
            y: clientY - panStartRef.current.y
        });
    };

    const handlePanEnd = () => {
        setIsPanDragging(false);
    };

    React.useEffect(() => {
        if (isPanDragging) {
            window.addEventListener('mouseup', handlePanEnd);
            window.addEventListener('mousemove', handlePanMove);
            window.addEventListener('touchend', handlePanEnd);
            window.addEventListener('touchmove', handlePanMove);
        } else {
            window.removeEventListener('mouseup', handlePanEnd);
            window.removeEventListener('mousemove', handlePanMove);
            window.removeEventListener('touchend', handlePanEnd);
            window.removeEventListener('touchmove', handlePanMove);
        }
        return () => {
            window.removeEventListener('mouseup', handlePanEnd);
            window.removeEventListener('mousemove', handlePanMove);
            window.removeEventListener('touchend', handlePanEnd);
            window.removeEventListener('touchmove', handlePanMove);
        };
    }, [isPanDragging]);

    // Reset panning when zoom is reset to 1
    React.useEffect(() => {
        if (zoomLevel === 1) {
            setPanPosition({ x: 0, y: 0 });
        }
    }, [zoomLevel]);
    return (
        <div className="lg:col-span-6 flex flex-col gap-6">
            {/* 3D Viewer Container */}
            <div className="bg-[#161e2e]/70 backdrop-blur-md border border-white/10 rounded-2xl p-1 relative flex-1 min-h-[400px] flex flex-col shadow-[0_0_10px_rgba(19,91,236,0.3)] group">
                {/* Header of the 3D Card */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-bold border border-primary/30 backdrop-blur-md">LIVE FEED</span>
                    <span className="text-xs text-gray-400 font-mono">ID: WGN-8842-X</span>
                </div>
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                    <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                        <button
                            onClick={toggleViewMode}
                            className={`size-8 rounded text-white flex items-center justify-center backdrop-blur transition-colors ${viewMode === '3d' ? 'bg-primary' : 'bg-[#161e2e]/80 hover:bg-primary'}`}
                            title="Toggle 3D View"
                        >
                            <span className="material-symbols-outlined text-lg">3d_rotation</span>
                        </button>
                        <button
                            onClick={toggleZoom}
                            className={`size-8 rounded text-white flex items-center justify-center backdrop-blur transition-colors ${zoomLevel > 1 ? 'bg-primary' : 'bg-[#161e2e]/80 hover:bg-primary'}`}
                            title="Toggle Zoom"
                        >
                            <span className="material-symbols-outlined text-lg">zoom_in</span>
                        </button>
                        <button
                            onClick={toggleLayers}
                            className={`size-8 rounded text-white flex items-center justify-center backdrop-blur transition-colors ${showLayers ? 'bg-primary' : 'bg-[#161e2e]/80 hover:bg-primary'}`}
                            title="Toggle Layers"
                        >
                            <span className="material-symbols-outlined text-lg">layers</span>
                        </button>
                    </div>
                </div>
                {/* The 3D Object Representation */}
                <div className="relative w-full h-full bg-gradient-to-b from-[#1c2638] to-[#111722] rounded-xl overflow-hidden flex items-center justify-center">
                    {/* Simulated 3D Grid Floor */}
                    <div className="absolute bottom-0 w-full h-1/2 transform perspective-[500px] rotateX(60deg) scale-150 origin-bottom" style={{ backgroundImage: "linear-gradient(transparent 0%, rgba(19,91,236,0.1) 100%)" }}></div>

                    {/* The Train Image */}
                    <div
                        className={`relative w-[90%] max-w-[500px] z-10 ${zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
                        style={{
                            transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel}) ${viewMode === '3d' ? 'rotateY(15deg) rotateX(5deg)' : 'rotateY(0deg)'}`,
                            filter: showLayers ? 'sepia(100%) hue-rotate(190deg) saturate(500%)' : 'none',
                            transition: isPanDragging ? 'none' : 'transform 0.3s ease-out'
                        }}
                        onMouseDown={handlePanStart}
                        onTouchStart={handlePanStart}
                    >
                        <img className="w-full h-auto object-contain drop-shadow-2xl mix-blend-lighten opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCfjrMdebKZmvV0GRrx_gkEk0F8QQfHQZdoUpwxFhpnyPfcgy7NidV-frHPSHbi3uiyw6wh_4UHOUj4o2LVYZtX_k72sWdlsgT-RNPDwl4mO8LIMhvmLpaJruZif5oXatUK4mLJ5fCjCjZ945ZAj28mJZoxgTtUv9B9aPIDJeO6tWOjPYfcRaNVLOKs2r9uxvcwOJQcYaeko5sM6PqUBv3YFi58rWC0Unu_xUxKDX30VB6-NYXBVU_1w0bCltvjXMov0FD3sLVoloD" alt="Side profile view of a high speed train wagon" />

                        {/* Hotspot Markers Overlay */}
                        {isDemoMode ? (
                            <div className="absolute top-[45%] left-[20%] size-8 flex items-center justify-center cursor-not-allowed z-20">
                                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-md"></div>
                                <span className="material-symbols-outlined text-white text-sm drop-shadow-[0_0_2px_rgba(239,68,68,0.8)]">lock</span>
                            </div>
                        ) : (
                            <div className="absolute top-[45%] left-[20%] size-6 flex items-center justify-center cursor-pointer group/marker">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
                                {/* Tooltip */}
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-[#161e2e]/90 backdrop-blur border border-red-500/50 p-2 rounded hidden group-hover/marker:block z-50">
                                    <p className="text-xs text-red-400 font-bold uppercase">Crack Detected</p>
                                    <p className="text-[10px] text-gray-300">Confidence: 98.5%</p>
                                    <p className="text-[10px] text-gray-300">Surface abrasion on panel 4.</p>
                                </div>
                            </div>
                        )}
                        <div className="absolute top-[60%] right-[25%] size-6 flex items-center justify-center cursor-pointer group/marker">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500 border-2 border-white"></span>
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-[#161e2e]/90 backdrop-blur border border-yellow-500/50 p-2 rounded hidden group-hover/marker:block z-50">
                                <p className="text-xs text-yellow-400 font-bold uppercase">Minor Dent</p>
                                <p className="text-[10px] text-gray-300">Confidence: 82.1%</p>
                            </div>
                        </div>
                    </div>
                    {/* Scanning Beam Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent w-full h-full animate-[scan_3s_ease-in-out_infinite] pointer-events-none border-r border-primary/20"></div>
                </div>
            </div>

            {/* Recent Anomalies Strip */}
            <div className="h-40 bg-[#161e2e]/70 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-3 border border-white/10">
                <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Flagged Anomalies</h4>
                    <button onClick={openDemoModal} className="text-xs text-primary hover:text-white transition-colors">View All Report</button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {/* Anomaly Item */}
                    {/* Anomaly Item - Rust (Critical) */}
                    {isDemoMode ? (
                        <div onClick={openDemoModal} className="min-w-[140px] h-full bg-[#111722] rounded-lg border border-[#324467] relative overflow-hidden flex items-center justify-center shadow-inner cursor-pointer hover:border-red-500/50 transition-colors">
                            <img className="w-full h-full object-cover opacity-20 blur-sm grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_mUMU3ozyNx7KSVVA_o-Pk1D7-O2LiGK_xJHmuYqwaIb7Qs0dCk4ynxnzEj-3mIAlCkldke0_f9dSB389HRX71Dm3IXTRQnCcrmGG9BfInWSv_3O2Ts_xL_n1sx2QsNw901mAU5QG8GG2B5aYJ9oefM5Dc5Dl6Q_hKxokvj-0XlquZdU5us4T0Zqbt39TZyJU_8O3bBWHEYq97knrMlVOiLZqNUbTcGMF4X8FHL31oU-sKGhInVCbZUUkz4FPuZbIe6xOR0_03Gku" alt="Rust" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 z-10">
                                <span className="material-symbols-outlined text-slate-400 text-2xl">lock</span>
                                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Restricted</span>
                            </div>
                        </div>
                    ) : (
                        <div onClick={() => setSelectedAnomaly({ id: '442', type: 'Rust', severity: 'Critical', time: '09:42 AM', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_mUMU3ozyNx7KSVVA_o-Pk1D7-O2LiGK_xJHmuYqwaIb7Qs0dCk4ynxnzEj-3mIAlCkldke0_f9dSB389HRX71Dm3IXTRQnCcrmGG9BfInWSv_3O2Ts_xL_n1sx2QsNw901mAU5QG8GG2B5aYJ9oefM5Dc5Dl6Q_hKxokvj-0XlquZdU5us4T0Zqbt39TZyJU_8O3bBWHEYq97knrMlVOiLZqNUbTcGMF4X8FHL31oU-sKGhInVCbZUUkz4FPuZbIe6xOR0_03Gku', description: 'Advanced surface oxidation detected on undercarriage panel B.' })} className="min-w-[140px] h-full bg-[#111722] rounded-lg border border-[#324467] relative overflow-hidden group cursor-pointer hover:border-primary transition-colors">
                            <img className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_mUMU3ozyNx7KSVVA_o-Pk1D7-O2LiGK_xJHmuYqwaIb7Qs0dCk4ynxnzEj-3mIAlCkldke0_f9dSB389HRX71Dm3IXTRQnCcrmGG9BfInWSv_3O2Ts_xL_n1sx2QsNw901mAU5QG8GG2B5aYJ9oefM5Dc5Dl6Q_hKxokvj-0XlquZdU5us4T0Zqbt39TZyJU_8O3bBWHEYq97knrMlVOiLZqNUbTcGMF4X8FHL31oU-sKGhInVCbZUUkz4FPuZbIe6xOR0_03Gku" alt="Rust" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2">
                                <p className="text-xs font-bold text-white">Rust #442</p>
                                <p className="text-[10px] text-gray-400">09:42 AM</p>
                            </div>
                        </div>
                    )}
                    {/* Anomaly Item - Wheel (Major) */}
                    {isDemoMode ? (
                        <div onClick={openDemoModal} className="min-w-[140px] h-full bg-[#111722] rounded-lg border border-[#324467] relative overflow-hidden flex items-center justify-center shadow-inner cursor-pointer hover:border-red-500/50 transition-colors">
                            <img className="w-full h-full object-cover opacity-20 blur-sm grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpbrkIQZKBlE8UFqe_wHjXa5XSsVv__l_uVOyulSe_fdnXtKs9PFnWdFlSRwFhEMvYfpbFgEIm6dezp0WtbpBOvqmV4D7H1dOSJVPE7X_IM6DxVQOFypntPF085bezreils_3BJPbwzLWYVgCDkHpVNJ857mAVGgPeuZuMeT_7BoyEb888bUoOqS0QZc7OSDtu4d83DpTpA0kr3DpLWnX-5N1JUfSHVcuB1t4HO-o0NuamFVeBwkpbuH-yfkDHvTgQFzSqAgnbEVMZ" alt="Wheel" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 z-10">
                                <span className="material-symbols-outlined text-slate-400 text-2xl">lock</span>
                                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Restricted</span>
                            </div>
                        </div>
                    ) : (
                        <div onClick={() => setSelectedAnomaly({ id: '12A', type: 'Wheel', severity: 'Major', time: '09:40 AM', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpbrkIQZKBlE8UFqe_wHjXa5XSsVv__l_uVOyulSe_fdnXtKs9PFnWdFlSRwFhEMvYfpbFgEIm6dezp0WtbpBOvqmV4D7H1dOSJVPE7X_IM6DxVQOFypntPF085bezreils_3BJPbwzLWYVgCDkHpVNJ857mAVGgPeuZuMeT_7BoyEb888bUoOqS0QZc7OSDtu4d83DpTpA0kr3DpLWnX-5N1JUfSHVcuB1t4HO-o0NuamFVeBwkpbuH-yfkDHvTgQFzSqAgnbEVMZ', description: 'Significant wear on wheel flange detected.' })} className="min-w-[140px] h-full bg-[#111722] rounded-lg border border-[#324467] relative overflow-hidden group cursor-pointer hover:border-primary transition-colors">
                            <img className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpbrkIQZKBlE8UFqe_wHjXa5XSsVv__l_uVOyulSe_fdnXtKs9PFnWdFlSRwFhEMvYfpbFgEIm6dezp0WtbpBOvqmV4D7H1dOSJVPE7X_IM6DxVQOFypntPF085bezreils_3BJPbwzLWYVgCDkHpVNJ857mAVGgPeuZuMeT_7BoyEb888bUoOqS0QZc7OSDtu4d83DpTpA0kr3DpLWnX-5N1JUfSHVcuB1t4HO-o0NuamFVeBwkpbuH-yfkDHvTgQFzSqAgnbEVMZ" alt="Wheel" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2">
                                <p className="text-xs font-bold text-white">Wheel #12A</p>
                                <p className="text-[10px] text-gray-400">09:40 AM</p>
                            </div>
                        </div>
                    )}
                    <div onClick={() => setSelectedAnomaly({ id: '09', type: 'Scratch', severity: 'Minor', time: '09:35 AM', image: scratchImage, description: 'Minor surface scratch on exterior paint.' })} className="min-w-[140px] h-full bg-[#111722] rounded-lg border border-[#324467] relative overflow-hidden group cursor-pointer hover:border-primary transition-colors">
                        <img className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" src={scratchImage} alt="Scratch" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2">
                            <p className="text-xs font-bold text-white">Scratch #09</p>
                            <p className="text-[10px] text-gray-400">09:35 AM</p>
                        </div>
                    </div>
                    <div className="min-w-[140px] h-full bg-[#111722] rounded-lg border border-[#324467] relative overflow-hidden group cursor-pointer hover:border-primary transition-colors">
                        <div className="w-full h-full flex items-center justify-center bg-[#161e2e]">
                            <span className="material-symbols-outlined text-gray-600">add_photo_alternate</span>
                        </div>
                    </div>
                </div>
            </div>


            {
                selectedAnomaly && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
                        <div className="bg-[#101622] rounded-xl border border-white/10 w-full max-w-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
                            <button
                                onClick={() => setSelectedAnomaly(null)}
                                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors z-10"
                            >
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>

                            <div className="h-64 relative bg-black/50">
                                <img src={selectedAnomaly.image} alt={selectedAnomaly.type} className="w-full h-full object-contain" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#101622] to-transparent"></div>
                                <div className="absolute bottom-4 left-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${selectedAnomaly.severity === 'Critical' ? 'bg-red-500/20 text-red-500 border border-red-500/30' : selectedAnomaly.severity === 'Major' ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30' : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'}`}>
                                            {selectedAnomaly.severity}
                                        </span>
                                        <span className="text-xs text-gray-400 font-mono">{selectedAnomaly.time}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">{selectedAnomaly.type} #{selectedAnomaly.id}</h3>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Analysis Result</h4>
                                    <p className="text-gray-300 leading-relaxed">{selectedAnomaly.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Confidence Score</div>
                                        <div className="text-lg font-mono font-bold text-primary">98.2%</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Recommended Action</div>
                                        <div className="text-sm font-medium text-white">Schedule Maintenance</div>
                                    </div>
                                </div>

                                <button onClick={() => setSelectedAnomaly(null)} className="w-full py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-colors mt-2">
                                    Acknowledge & Archive
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    )
}
export default MainViewer;

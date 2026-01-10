import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";


const Hero = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
            {/* Background with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#101622] via-[#101622]/80 to-transparent z-10"></div>
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCiIAn81_UaFBnEKBxZslvoT_FUZHJYGYIkhOQUFDuIGUuT11FGfGL1G8SVIHqHZ5wSbhAbsEaTw5RgHZgQ8XDeiRhJyVqabs_xFQg9_WHWtb7eKUt_Kebs_Hg63gw8bMdCN0EU6x_sk_1mFEvbRA57aMLFDD-vkuunqR_9Qrhs-ChTpruMFXrWrgny4gLOxAJ8RJUx_S_4HBM16FMYxVroZ3EHHp01Q3_7GvlDcgkoK8k3Yt2gw0qrSBXVdLoLpSUSSPOlKarPuXGI")' }}></div>
                <div className="absolute inset-0 bg-[#101622]/40 scanlines z-10 mix-blend-overlay"></div>
            </div>

            <div className="relative z-20 max-w-[1200px] mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold mb-6 animate-glow">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    LIVE SYSTEM ACTIVE
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tighter mb-6 drop-shadow-2xl">
                    SEE THE UNSEEN<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">AT 80 KM/H</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body">
                    Next-Gen Visual Inspection for High-Speed Rail operating on edge devices. Detect anomalies in real-time with military-grade precision.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/demo">
                        <Button className="h-12 px-8 rounded-lg bg-primary hover:bg-blue-600 text-white font-bold text-base transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(19,91,236,0.4)]">
                            <span className="material-symbols-outlined text-[20px]">play_circle</span>
                            Watch System Demo
                        </Button>
                    </Link>
                    <Button variant="secondary" className="h-12 px-8 rounded-lg border border-[#232f48] bg-[#1a2332] hover:bg-[#232f48] text-white font-medium text-base transition-all">
                        Explore Technology
                    </Button>
                </div>
            </div>

            {/* Decorative Grid at bottom */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#101622] to-transparent z-20 flex items-end justify-center pb-8">
                <span className="material-symbols-outlined text-white/20 text-4xl animate-bounce">keyboard_arrow_down</span>
            </div>
        </div>
    );
};

export default Hero;

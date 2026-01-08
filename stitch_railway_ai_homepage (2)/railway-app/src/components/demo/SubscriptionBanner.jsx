import React from 'react';
import { Button } from '@/components/ui/button';

const SubscriptionBanner = () => {
    return (
        <div className="fixed bottom-0 left-0 w-full z-[60] bg-[#101622]/95 backdrop-blur-lg border-t border-primary/50 shadow-[0_-5px_20px_rgba(19,91,236,0.2)] animate-in slide-in-from-bottom duration-500">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary animate-pulse">
                        <span className="material-symbols-outlined text-lg">lock</span>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm md:text-base">Unlock full insights</h4>
                        <p className="text-slate-400 text-xs hidden md:block">You are viewing a limited demo version.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-white text-sm font-medium mr-2 hidden md:block">Subscribe now to access real-time critical data.</p>
                    <Button className="font-bold shadow-[0_0_15px_rgba(19,91,236,0.5)] hover:shadow-[0_0_25px_rgba(19,91,236,0.6)]">
                        Buy Plan
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionBanner;

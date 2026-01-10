import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDemo } from '@/context/DemoContext';

const DemoModal = ({ isOpen, onClose }) => {
    const { setIsDemoMode } = useDemo();
    const [formData, setFormData] = useState({
        fullName: '',
        email: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate validation/API call
        setTimeout(() => {
            setIsDemoMode(true);
            setIsLoading(false);
            onClose();
        }, 800);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="relative w-full max-w-md bg-[#101622] border border-[#232f48] rounded-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"
                >
                    <X size={20} />
                </button>

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center size-12 rounded-xl bg-primary/10 text-primary mb-4 border border-primary/20">
                        <span className="material-symbols-outlined text-2xl">rocket_launch</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Request a Demo</h2>
                    <p className="text-slate-400 text-sm mt-2">Get instant access to our limited demo environment.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 block">Full Name</label>
                        <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="John Doe"
                            className="w-full bg-[#161e2e] border border-[#232f48] rounded-lg h-11 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 block">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@company.com"
                            className="w-full bg-[#161e2e] border border-[#232f48] rounded-lg h-11 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="w-full h-11 border-slate-600 text-slate-300 hover:text-white hover:bg-slate-800"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                        </Button>
                        <Button
                            type="submit"
                            className="w-full h-11 font-bold shadow-[0_0_20px_rgba(19,91,236,0.3)] hover:shadow-[0_0_30px_rgba(19,91,236,0.5)] transition-all"
                        >
                            {isLoading ? 'Processing...' : 'Proceed'} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DemoModal;

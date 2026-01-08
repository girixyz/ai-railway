import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LoginModal from '@/components/auth/LoginModal';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleLoginClick = () => {
        setLoginOpen(true);
        if (mobileMenuOpen) setMobileMenuOpen(false); // Close mobile menu if open
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 bg-[#101622]/80 backdrop-blur-md border-b border-[#232f48]">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 text-white">
                        <div className="size-8 rounded bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                            <span className="material-symbols-outlined text-xl">train</span>
                        </div>
                        <h2 className="text-white text-lg font-bold tracking-tight">RailVision AI</h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/solution" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Platform</Link>
                        <Link to="/use-cases" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Use Cases</Link>
                        <Link to="/technology" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Technology</Link>
                        <Link to="/about" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Company</Link>
                        <Link to="/analytics" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Analytics</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLoginClick}
                            className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                        >
                            <span>Log In</span>
                        </button>
                        <Button className="font-bold shadow-[0_0_15px_rgba(19,91,236,0.5)]">
                            Request Demo
                        </Button>
                        <div className="md:hidden text-white cursor-pointer" onClick={toggleMobileMenu}>
                            <span className="material-symbols-outlined">menu</span>
                        </div>
                    </div>
                </div>
                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 w-full bg-[#101622] border-b border-[#232f48] py-4 px-6 flex flex-col gap-4">
                        <Link to="/solution" className="text-slate-400 hover:text-white text-sm font-medium">Platform</Link>
                        <Link to="/use-cases" className="text-slate-400 hover:text-white text-sm font-medium">Use Cases</Link>
                        <Link to="/technology" className="text-slate-400 hover:text-white text-sm font-medium">Technology</Link>
                        <Link to="/about" className="text-slate-400 hover:text-white text-sm font-medium">Company</Link>
                        <Link to="/analytics" className="text-slate-400 hover:text-white text-sm font-medium">Analytics</Link>
                        <div className="h-px bg-[#232f48] w-full my-2"></div>
                        <button
                            onClick={handleLoginClick}
                            className="text-left text-slate-400 hover:text-white text-sm font-medium"
                        >
                            Log In
                        </button>
                        <Button className="w-full font-bold">Request Demo</Button>
                    </div>
                )}
            </header>

            <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
        </>
    );
};

export default Navbar;

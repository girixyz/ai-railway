import React, { useState } from 'react';
import { useDemo } from '@/context/DemoContext';

import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LoginModal from '@/components/auth/LoginModal';
import DemoModal from '@/components/demo/DemoModal';

const Navbar = () => {
    const { openDemoModal, closeDemoModal, isDemoModalOpen, user, logout } = useDemo();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

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
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center gap-3 text-white">
                            <div className="size-8 rounded bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                                <span className="material-symbols-outlined text-xl">train</span>
                            </div>
                            <h2 className="text-white text-lg font-bold tracking-tight">RailVision AI</h2>
                        </Link>

                        {location.pathname === '/' && (
                            <div className="hidden lg:flex flex-col justify-center border-l border-white/10 pl-6 h-8">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                    </span>
                                    <span className="text-[10px] leading-none font-bold tracking-widest text-emerald-500">LIVE SYSTEM ACTIVE</span>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[9px] leading-none tracking-widest text-slate-400 font-medium">SEE THE UNSEEN</span>
                                    <span className="text-[9px] leading-none tracking-widest text-slate-400 font-medium">AT 80 KM/H</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            to="/"
                            className={`text-sm font-medium transition-all duration-300 ${isActive('/') ? 'text-primary drop-shadow-[0_0_8px_rgba(19,91,236,0.6)]' : 'text-slate-400 hover:text-white'}`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/solution"
                            className={`text-sm font-medium transition-all duration-300 ${isActive('/solution') ? 'text-primary drop-shadow-[0_0_8px_rgba(19,91,236,0.6)]' : 'text-slate-400 hover:text-white'}`}
                        >
                            Platform
                        </Link>
                        <Link
                            to="/use-cases"
                            className={`text-sm font-medium transition-all duration-300 ${isActive('/use-cases') ? 'text-primary drop-shadow-[0_0_8px_rgba(19,91,236,0.6)]' : 'text-slate-400 hover:text-white'}`}
                        >
                            Use Cases
                        </Link>
                        <Link
                            to="/technology"
                            className={`text-sm font-medium transition-all duration-300 ${isActive('/technology') ? 'text-primary drop-shadow-[0_0_8px_rgba(19,91,236,0.6)]' : 'text-slate-400 hover:text-white'}`}
                        >
                            Technology
                        </Link>
                        <Link
                            to="/about"
                            className={`text-sm font-medium transition-all duration-300 ${isActive('/about') ? 'text-primary drop-shadow-[0_0_8px_rgba(19,91,236,0.6)]' : 'text-slate-400 hover:text-white'}`}
                        >
                            Company
                        </Link>
                        <Link
                            to="/analytics"
                            className={`text-sm font-medium transition-all duration-300 ${isActive('/analytics') ? 'text-primary drop-shadow-[0_0_8px_rgba(19,91,236,0.6)]' : 'text-slate-400 hover:text-white'}`}
                        >
                            Analytics
                        </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <span className="text-slate-400 text-sm hidden md:block">
                                    {user.email}
                                </span>
                                <Link to="/dashboard">
                                    <Button className="font-bold shadow-[0_0_15px_rgba(19,91,236,0.5)]">
                                        Main Control Dashboard
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleLoginClick}
                                    className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                                >
                                    <span>Log In</span>
                                </button>
                                <Button onClick={openDemoModal} className="font-bold shadow-[0_0_15px_rgba(19,91,236,0.5)]">
                                    Request Demo
                                </Button>
                            </>
                        )}
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
                        {user ? (
                            <>
                                <span className="text-slate-400 text-sm font-medium">{user.email}</span>
                                <Link to="/dashboard">
                                    <Button className="w-full font-bold mt-2">Main Control Dashboard</Button>
                                </Link>
                                <button onClick={logout} className="text-left text-red-400 hover:text-red-300 text-sm font-medium mt-2">
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleLoginClick}
                                    className="text-left text-slate-400 hover:text-white text-sm font-medium"
                                >
                                    Log In
                                </button>
                                <Button onClick={openDemoModal} className="w-full font-bold">Request Demo</Button>
                            </>
                        )}
                    </div>
                )}
            </header>

            <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
            <DemoModal isOpen={isDemoModalOpen} onClose={closeDemoModal} />
        </>
    );
};

export default Navbar;

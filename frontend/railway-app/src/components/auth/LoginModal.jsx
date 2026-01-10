import React, { useState } from 'react';
import { X, User, Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDemo } from '@/context/DemoContext';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('member'); // 'member' or 'admin'
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useDemo();
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged in successfully");
            login({ email, role }); // Set global user state
            onClose();
            navigate('/dashboard');
        } catch (err) {
            console.error("Login error:", err);
            setError("Failed to login. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        if (provider === 'google') {
            try {
                const googleProvider = new GoogleAuthProvider();
                await signInWithPopup(auth, googleProvider);
                login({ email: auth.currentUser?.email || 'Google User', role: 'member' });
                onClose();
                navigate('/dashboard');
            } catch (err) {
                console.error("Social login error:", err);
                setError("Failed to sign in with Google.");
            }
        } else {
            console.log(`Logging in with ${provider}`);
        }
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
                        <span className="material-symbols-outlined text-2xl">lock_open</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h2>
                    <p className="text-slate-400 text-sm mt-2">Sign in to access your analytics dashboard</p>
                </div>

                {error && (
                    <div className="text-red-500 text-sm text-center mb-4 bg-red-500/10 p-2 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 block">Email Address</label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full bg-[#161e2e] border border-[#232f48] rounded-lg h-11 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 block">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full bg-[#161e2e] border border-[#232f48] rounded-lg h-11 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 block">Select Role</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setRole('member')}
                                className={`relative flex items-center justify-center gap-2 h-11 rounded-lg border transition-all ${role === 'member'
                                    ? 'bg-primary/20 border-primary text-white'
                                    : 'bg-[#161e2e] border-[#232f48] text-slate-400 hover:border-primary/50 hover:text-white'
                                    }`}
                            >
                                <User size={16} />
                                <span className="text-sm font-medium">Member</span>
                                {role === 'member' && <div className="absolute top-1 right-1 size-2 bg-primary rounded-full"></div>}
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('admin')}
                                className={`relative flex items-center justify-center gap-2 h-11 rounded-lg border transition-all ${role === 'admin'
                                    ? 'bg-primary/20 border-primary text-white'
                                    : 'bg-[#161e2e] border-[#232f48] text-slate-400 hover:border-primary/50 hover:text-white'
                                    }`}
                            >
                                <Shield size={16} />
                                <span className="text-sm font-medium">Admin</span>
                                {role === 'admin' && <div className="absolute top-1 right-1 size-2 bg-primary rounded-full"></div>}
                            </button>
                        </div>
                    </div>

                    <Button className="w-full h-11 font-bold shadow-[0_0_20px_rgba(19,91,236,0.3)] hover:shadow-[0_0_30px_rgba(19,91,236,0.5)] transition-all">
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>

                {/* DEV ONLY: Bypass Login Button */}
                <div className="mt-2 text-center">
                    <button type="button" onClick={() => {
                        login({ email: 'demo@railway.ai', role: 'admin' });
                        onClose();
                        navigate('/dashboard');
                    }} className="text-xs text-blue-500 underline">
                        (Dev) Bypass Login
                    </button>
                </div>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#232f48]"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#101622] px-2 text-slate-500">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => handleSocialLogin('google')}
                        className="flex items-center justify-center gap-2 h-11 bg-white hover:bg-slate-100 text-black rounded-lg transition-colors font-medium text-sm"
                    >
                        <svg className="size-4" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Google
                    </button>
                    <button
                        onClick={() => handleSocialLogin('apple')}
                        className="flex items-center justify-center gap-2 h-11 bg-[#1a2332] border border-[#232f48] hover:bg-[#232f48] text-white rounded-lg transition-colors font-medium text-sm"
                    >
                        <svg className="size-4 fill-white" viewBox="0 0 384 512">
                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                        </svg>
                        Apple
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;

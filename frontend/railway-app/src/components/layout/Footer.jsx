import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#0b0f17] border-t border-[#1a2332] py-12">
            <div className="max-w-[1200px] mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary text-2xl">train</span>
                            <span className="text-white text-lg font-bold">Railway AI</span>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Advancing railway safety through computer vision and edge intelligence.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/features" className="hover:text-primary transition-colors">Features</Link></li>
                            <li><Link to="/hardware" className="hover:text-primary transition-colors">Hardware</Link></li>
                            <li><Link to="/integrations" className="hover:text-primary transition-colors">Integrations</Link></li>
                            <li><Link to="/security" className="hover:text-primary transition-colors">Security</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link to="/press" className="hover:text-primary transition-colors">Press</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded bg-[#1a2332] flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all">
                                <span className="material-symbols-outlined text-sm">mail</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded bg-[#1a2332] flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all">
                                <span className="material-symbols-outlined text-sm">public</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="pt-8 border-t border-[#1a2332] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
                    <p>© 2023 Railway AI Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-gray-400">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

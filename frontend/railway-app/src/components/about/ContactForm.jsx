import React from 'react';

const ContactForm = () => {
    return (
        <section className="relative w-full px-4 py-24 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Left: Info & Map */}
                <div className="space-y-10">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-4">Deploy Intelligence on Your Rails</h2>
                        <p className="text-slate-400 font-body text-lg">Ready to upgrade your infrastructure? Contact our deployment team for a consultation on edge-integration.</p>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-surface-dark border border-border-dark flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">location_on</span>
                            </div>
                            <div>
                                <h4 className="text-white font-bold">Global HQ</h4>
                                <p className="text-slate-400 text-sm">12 Innovation Drive, Tech Park<br />San Francisco, CA 94107</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-surface-dark border border-border-dark flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">mail</span>
                            </div>
                            <div>
                                <h4 className="text-white font-bold">Email Us</h4>
                                <p className="text-slate-400 text-sm">hello@railai.tech</p>
                                <p className="text-slate-400 text-sm">support@railai.tech</p>
                            </div>
                        </div>
                    </div>
                    {/* Stylized Map Placeholder */}
                    <div className="relative w-full h-48 rounded-xl overflow-hidden border border-border-dark bg-surface-dark group">
                        <img className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 transition-all duration-500" data-alt="Stylized map showing San Francisco bay area" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhCtCXKB_ddhvs4qL6ya_4rRidlRijMZbb4af-papN0NvB9B6uGybfXiOTVUVuLzxf39wZ2te46btBQSEEvnwOp-U__fLn2RdpHXu3K86E2jmYn1UzAeFA0Yyo3EoehewA5yVGkTlVWmN6HpmAuhIdULbJJ-wBx9kzm45kh3WAGzvXVPHmJ60b9pHbJq-_LWtIl0Sk9uWZOAyP7a9YwGIqtFc_3lioDI3Vis4k4ZfrJ52MeP96HncEHlg66WMZ9IGHLnaek1kQYg1f" />
                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                        {/* Map Pin Animation */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="relative">
                                <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary/30 rounded-full animate-ping"></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right: HUD Contact Form */}
                <div className="relative">
                    {/* Form Decoration */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-primary/30 rounded-bl-3xl"></div>
                    <form className="bg-surface-dark border border-border-dark p-8 rounded-2xl shadow-2xl relative z-10">
                        <div className="mb-8 flex justify-between items-center border-b border-border-dark pb-4">
                            <h3 class="text-xl font-bold text-white uppercase tracking-wider">Secure Transmission</h3>
                            <div className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider" htmlFor="name">Operative Name</label>
                                    <input className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none hud-input transition-all font-body" id="name" placeholder="John Doe" type="text" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider" htmlFor="email">Contact Frequency</label>
                                    <input className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none hud-input transition-all font-body" id="email" placeholder="email@company.com" type="email" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider" htmlFor="company">Organization</label>
                                <input className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none hud-input transition-all font-body" id="company" placeholder="Railway Corp." type="text" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider" htmlFor="message">Mission Brief</label>
                                <textarea className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none hud-input transition-all font-body resize-none" id="message" placeholder="Tell us about your infrastructure needs..." rows="4"></textarea>
                            </div>
                            <button className="w-full group relative overflow-hidden rounded-lg bg-primary px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-blue-600" type="button">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    INITIATE UPLINK
                                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">send</span>
                                </span>
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/20 transition-transform duration-500 skew-x-12"></div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;

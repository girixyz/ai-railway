import React from 'react';

const Team = () => {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-white tracking-tight">Engineers behind the Edge</h2>
                <p className="text-slate-400 mt-2">The minds building the future of autonomous rail inspection.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Team Member 1 */}
                <div className="group relative rounded-xl bg-surface-dark border border-border-dark overflow-hidden hover:-translate-y-2 transition-transform duration-300">
                    <div className="aspect-[4/5] w-full overflow-hidden bg-slate-800 relative">
                        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" src="/profile/v.jpg" alt="Portrait of Varad Vekariya, Chief Vision Architect" />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent opacity-90"></div>
                        <div className="absolute bottom-4 left-4">
                            <p className="text-primary text-xs font-bold uppercase tracking-wider mb-1">Chief Vision Architect</p>
                            <h3 className="text-lg font-bold text-white">Varad Vekariya</h3>
                        </div>
                    </div>
                </div>
                {/* Team Member 2 */}
                <div className="group relative rounded-xl bg-surface-dark border border-border-dark overflow-hidden hover:-translate-y-2 transition-transform duration-300">
                    <div className="aspect-[4/5] w-full overflow-hidden bg-slate-800 relative">
                        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" src="/profile/1732591651887.jpg" alt="Portrait of Kunj Shah, Lead Systems Engineer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent opacity-90"></div>
                        <div className="absolute bottom-4 left-4">
                            <p className="text-primary text-xs font-bold uppercase tracking-wider mb-1">Lead Systems Engineer</p>
                            <h3 className="text-lg font-bold text-white">Kunj Shah</h3>
                        </div>
                    </div>
                </div>
                {/* Team Member 3 */}
                <div className="group relative rounded-xl bg-surface-dark border border-border-dark overflow-hidden hover:-translate-y-2 transition-transform duration-300">
                    <div className="aspect-[4/5] w-full overflow-hidden bg-slate-800 relative">
                        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" src="/profile/g.jpg" alt="Portrait of Girishan B, Head of AI Research" />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent opacity-90"></div>
                        <div className="absolute bottom-4 left-4">
                            <p className="text-primary text-xs font-bold uppercase tracking-wider mb-1">Head of AI Research</p>
                            <h3 className="text-lg font-bold text-white">Girishan B</h3>
                        </div>
                    </div>
                </div>
                {/* Team Member 4 */}
                <div className="group relative rounded-xl bg-surface-dark border border-border-dark overflow-hidden hover:-translate-y-2 transition-transform duration-300">
                    <div className="aspect-[4/5] w-full overflow-hidden bg-slate-800 relative">
                        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" src="/profile/dh.jpg" alt="Portrait of Dhruv Patel, Operations Director" />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent opacity-90"></div>
                        <div className="absolute bottom-4 left-4">
                            <p className="text-primary text-xs font-bold uppercase tracking-wider mb-1">Operations Director</p>
                            <h3 className="text-lg font-bold text-white">Dhruv Patel</h3>
                        </div>
                    </div>
                </div>
                {/* Team Member 5 */}
                <div className="group relative rounded-xl bg-surface-dark border border-border-dark overflow-hidden hover:-translate-y-2 transition-transform duration-300">
                    <div className="aspect-[4/5] w-full overflow-hidden bg-slate-800 relative">
                        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" src="/profile/k.jpeg" alt="Portrait of Kuldeep Thakkar, Hardware Integration Lead" />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent opacity-90"></div>
                        <div className="absolute bottom-4 left-4">
                            <p className="text-primary text-xs font-bold uppercase tracking-wider mb-1">Hardware Integration Lead</p>
                            <h3 className="text-lg font-bold text-white">Kuldeep Thakkar</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Team;

import React from 'react';

const Features = () => {
    return (
        <section className="py-20 bg-[#0d121c]">
            <div className="max-w-[1200px] mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Core Capabilities</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Built for the extreme demands of modern railway infrastructure.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Feature 1 */}
                    <div className="group bg-[#151c29] p-1 rounded-xl border border-[#232f48] hover:border-primary/50 transition-all duration-300">
                        <div className="bg-[#111722] rounded-lg p-6 h-full flex flex-col">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-2xl">blur_off</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Motion Deblur</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                                Restores clarity to images captured at speeds up to 300km/h using proprietary GANs trained on millions of railway assets.
                            </p>
                            <div className="h-32 rounded-lg bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBdxeMqx_4gfkb-n82jZU4e9WK_mBaFyTKN3Z-GOnmdCxt4nHj6YehBnpTb02RwpoNBdUbTkeIBtK-pk9OUBomae5amhvbAjbIwcgKfONUG4x-N_dLZ7osGj5Y1SVkFVM8XlaFb8IV4Vibyz7qLt8cD7XBSHXuCmlbM8Y8BoKzhvQDLZGH-2pIa5pDhA-zwslBybBeQdjMICsLzLf6iDLtaQv8ly8DaNKj8GqSq-mU4no6nnnBkAf-HOJgY9bGeHQCeZLOMmWVks1C8")' }}></div>
                        </div>
                    </div>
                    {/* Feature 2 */}
                    <div className="group bg-[#151c29] p-1 rounded-xl border border-[#232f48] hover:border-primary/50 transition-all duration-300">
                        <div className="bg-[#111722] rounded-lg p-6 h-full flex flex-col">
                            <div className="w-12 h-12 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-2xl">visibility</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Low-Light Vision</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                                Crystal clear inspection data even in zero-light tunnel environments. Our algorithms enhance contrast without adding noise.
                            </p>
                            <div className="h-32 rounded-lg bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAa0KiqsT_209l-O3DlzDdbZ8rqCDtdx9ngG7uTCD__MUfSMbOfPVns7OBHsV2BEmK-0hOW1j_LzqtwcsTLplaJN0JXQEc_2zXPXdhi4su0W01ISlJBvfQFdFio1W1otqIsmvsGrZ_rFtQiTRyRID4zilclFWAaECZRpGTvvESJHyM8tiEC32403yVFcs1itQsNunq_EcZ9wVEQ4isNq2yDysUZztJ6_7KEJK3d1WNw0OCLlUAfNDHK4dY1NBZrzt4GjGGNEDr3RKJV")' }}></div>
                        </div>
                    </div>
                    {/* Feature 3 */}
                    <div className="group bg-[#151c29] p-1 rounded-xl border border-[#232f48] hover:border-primary/50 transition-all duration-300">
                        <div className="bg-[#111722] rounded-lg p-6 h-full flex flex-col">
                            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-2xl">select_check_box</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Defect Detection</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                                Automated bounding box detection for structural anomalies, identifying cracks, wear, and missing components instantly.
                            </p>
                            <div className="h-32 rounded-lg bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCSXizGmSvNQHwReCwSe6ijTzSBomjNq_igk0NI0dpcRqayDWDj5c9-ArVjhnQCWfxKROfMeXP8BR7Rh1S-5-ahXzx-4pLHV-Av1niPAoI8vDac-OdXapbRXXV7OQ1geMNZwBs3uhoBjhVNlK8fNF4maN9U7l-0ZWKwXPNx1YiRNXOf3B5uPdjNq3elRwly_lgPKRApgMGuHH6gFybSCK_LeIrfVurhiQxk_2WjTCAdDZwxY0CyDv6PjSGN6Gm5UvLkZCKfZmBP_tOy")' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Features;

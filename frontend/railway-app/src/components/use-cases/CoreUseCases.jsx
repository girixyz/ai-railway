import React from 'react';

const CoreUseCases = () => {
    return (
        <section className="py-24 relative bg-background-dark">
            <div className="container max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Core Use Cases</h2>
                        <p className="text-slate-400 max-w-lg">Designed for the most rigorous railway environments, our system handles multiple inspection points simultaneously.</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="group relative rounded-2xl overflow-hidden bg-[#1a2332] border border-slate-700 hover:border-primary/50 transition-all duration-300">
                        <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDF1-t2M_FqbePrbXzKZS3XU7feolaPQZKYL4G3rg5ThZ-p82ZtDGEtYkMPOBHoUOkHQgrpSmTnD3skxXmxtjJNmwy10M5HkxGqTk8mZZLBEWOHHzqU6jldpIHbg_G7nT4AoV5fdhAVquHZ_cj7V8xxcPgXCn1dggX7DTHgM3IAbTCKRVmuL__ee5mzCsuZyPzPam8BJLXDXUYPil8yFrKU2GwRxCrKz6v5BeQGlKK2Nn-B3r5DPsjCacRFNkoNHaL36klpug_Tk1wH')" }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2332] to-transparent"></div>
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur rounded-lg px-3 py-1 text-xs font-mono text-primary border border-primary/30">
                                SAFETY CRITICAL
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="mb-4 size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-2xl">broken_image</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Crack &amp; Defect Detection</h3>
                            <p className="text-slate-400 text-sm mb-6">Identifies micro-fractures in wheelsets, bogies, and couplers before they become critical failures.</p>
                            <ul className="space-y-2 mb-6">
                                <li className="flex items-center gap-2 text-xs text-gray-400">
                                    <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                                    Thermal crack analysis
                                </li>
                                <li className="flex items-center gap-2 text-xs text-gray-400">
                                    <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                                    Missing bolt detection
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="group relative rounded-2xl overflow-hidden bg-[#1a2332] border border-slate-700 hover:border-primary/50 transition-all duration-300">
                        <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBJCSyDivEFAJokSxXDUjrsIOgxwVGuwK5GKjNRXz5EUw0rOZMejB5nGwiGjbQ__75QOuo4NMaOnRFhMzAniFOmRqy_fcPbPrh6FHBlC7rJPjBZMEFhwx81yQCAocGFLTfv2RFBkvUzCXD2dbSiEpdjcAFOyvK4R08Qfp7aWjD_SUL5UnR1sAM9m0KBb6fCHxdtGwQOFYsGblfcz5XUp5MxTqjz6sPtRwwGOe1MTjhdv1YVliGQum-J6cF-cpOO525nnIhvq_PA4J9I')" }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2332] to-transparent"></div>
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur rounded-lg px-3 py-1 text-xs font-mono text-primary border border-primary/30">
                                HIGH SPEED
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="mb-4 size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-2xl">shutter_speed</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Motion Blur Mitigation</h3>
                            <p className="text-slate-400 text-sm mb-6">Proprietary GANs reconstruct sharp imagery from trains moving at speeds up to 80km/h.</p>
                            <ul className="space-y-2 mb-6">
                                <li className="flex items-center gap-2 text-xs text-gray-400">
                                    <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                                    Edge-based processing
                                </li>
                                <li className="flex items-center gap-2 text-xs text-gray-400">
                                    <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                                    Zero latency pipeline
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="group relative rounded-2xl overflow-hidden bg-[#1a2332] border border-slate-700 hover:border-primary/50 transition-all duration-300">
                        <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDpv7sOvwc5qQ6c5m5GVD83qS8hD_tbgERxK81YJQqeK6-VQfyM_LtBZYDVARHsf7LxsgGzoY14ANysLRP1e5-ScEk6Lb1e1vL2EgfTu1YC0P6-o9uu4wB73ZIQogI3NClPc-fDEjh2cLRULuYDMhyav7xEFjYah5SyjDVzR4etqXrGagM3uMRVHd3_Hq26Ie5jiY70pVJYwOv1KcngvxxsPdOc67_0hs3uUAVa8AobFsHz0kqQkujSEsF3U3k-zpYfmG380AY-FqPB')" }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2332] to-transparent"></div>
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur rounded-lg px-3 py-1 text-xs font-mono text-primary border border-primary/30">
                                LOW LIGHT
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="mb-4 size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-2xl">night_sight_auto</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Low-Light Operation</h3>
                            <p className="text-slate-400 text-sm mb-6">Advanced sensor fusion allows for 24/7 autonomous monitoring regardless of ambient lighting.</p>
                            <ul className="space-y-2 mb-6">
                                <li className="flex items-center gap-2 text-xs text-gray-400">
                                    <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                                    IR spectrum analysis
                                </li>
                                <li className="flex items-center gap-2 text-xs text-gray-400">
                                    <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                                    ISO adaptive scaling
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default CoreUseCases;

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const CTASection = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-[#101622] to-[#0d121c]">
            <div className="max-w-[960px] mx-auto px-4 text-center">
                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-12 md:p-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -ml-32 -mb-32"></div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">Ready to modernize your fleet?</h2>
                    <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto relative z-10">
                        Join the leading railway operators using AI to prevent accidents and optimize maintenance.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                        <Link to="/demo">
                            <Button className="h-14 px-8 rounded-lg bg-primary hover:bg-blue-600 text-white font-bold text-lg transition-all shadow-lg shadow-primary/30">
                                Request a Demo
                            </Button>
                        </Link>
                        <Button variant="outline" className="h-14 px-8 rounded-lg border border-[#324467] bg-[#192233] hover:bg-[#232f48] text-white font-bold text-lg transition-all">
                            Contact Sales
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;

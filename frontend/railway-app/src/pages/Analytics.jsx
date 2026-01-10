import React from 'react';
import KPIGrid from '@/components/analytics/KPIGrid';
import MainViewer from '@/components/analytics/MainViewer';
import RightSidebar from '@/components/analytics/RightSidebar';

const Analytics = () => {
    return (
        <div className="bg-background-dark min-h-screen text-white font-display relative overflow-x-hidden selection:bg-primary selection:text-white pb-20">
            {/* Background Grid Effect */}
            <div className="fixed inset-0 pointer-events-none z-0" style={{
                backgroundImage: "linear-gradient(rgba(19, 91, 236, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 91, 236, 0.05) 1px, transparent 1px)",
                backgroundSize: "40px 40px"
            }}></div>

            {/* Main Content Area */}
            <main className="relative z-10 flex-1 flex flex-col p-4 md:p-8 max-w-[1440px] mx-auto w-full gap-8 perspective-2000" style={{ paddingTop: '180px' }}>
                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
                    <KPIGrid />
                    <MainViewer />
                    <RightSidebar />
                </div>
            </main>
        </div>
    );
};

export default Analytics;

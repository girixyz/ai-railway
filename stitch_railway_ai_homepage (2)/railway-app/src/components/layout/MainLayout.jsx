import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { useDemo } from '@/context/DemoContext';
import SubscriptionBanner from '@/components/demo/SubscriptionBanner';

const MainLayout = () => {
    const { isDemoMode } = useDemo();

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
            {isDemoMode && <SubscriptionBanner />}
        </div>
    );
};

export default MainLayout;

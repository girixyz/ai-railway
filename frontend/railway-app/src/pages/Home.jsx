import React from 'react';
import Hero from '@/components/home/Hero';
import ProblemSolution from '@/components/home/ProblemSolution';
import Features from '@/components/home/Features';
import AnalyticsSection from '@/components/home/AnalyticsSection';
import EdgeSection from '@/components/home/EdgeSection';
import CTASection from '@/components/home/CTASection';

const Home = () => {
    return (
        <>
            <Hero />
            <ProblemSolution />
            <Features />
            <AnalyticsSection />
            <EdgeSection />
            <CTASection />
        </>
    );
};

export default Home;

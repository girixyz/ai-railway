import React from 'react';
import SolutionHero from '@/components/solution/SolutionHero';
import StatsBar from '@/components/solution/StatsBar';
import SolutionChallenge from '@/components/solution/SolutionChallenge';
import ArchitectureDiagram from '@/components/solution/ArchitectureDiagram';
import TechCapabilities from '@/components/solution/TechCapabilities';
import CTASection from '@/components/home/CTASection';

const Solution = () => {
    return (
        <div className="bg-background-dark min-h-screen">
            <SolutionHero />
            <StatsBar />
            <SolutionChallenge />
            <ArchitectureDiagram />
            <TechCapabilities />
            <CTASection />
        </div>
    );
};

export default Solution;

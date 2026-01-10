import React from 'react';
import UseCasesHero from '@/components/use-cases/UseCasesHero';
import CoreUseCases from '@/components/use-cases/CoreUseCases';
import ROISection from '@/components/use-cases/ROISection';
import CTASection from '@/components/home/CTASection';

const UseCases = () => {
    return (
        <div className="bg-background-dark min-h-screen">
            <UseCasesHero />
            <CoreUseCases />
            <ROISection />
            <CTASection />
        </div>
    );
};

export default UseCases;

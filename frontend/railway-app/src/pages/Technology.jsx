import React from 'react';
import TechHero from '@/components/technology/TechHero';
import Challenge from '@/components/technology/Challenge';
import ProcessingPipeline from '@/components/technology/ProcessingPipeline';
import VisualComparison from '@/components/technology/VisualComparison';
import EdgeComputing from '@/components/technology/EdgeComputing';

const Technology = () => {
    return (
        <div className="bg-background-dark min-h-screen">
            <TechHero />
            <Challenge />
            <ProcessingPipeline />
            <VisualComparison />
            <EdgeComputing />
        </div>
    );
};

export default Technology;

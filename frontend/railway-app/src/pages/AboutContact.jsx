import React from 'react';
import MissionHero from '@/components/about/MissionHero';
import Values from '@/components/about/Values';
import Team from '@/components/about/Team';
import ContactForm from '@/components/about/ContactForm';

const AboutContact = () => {
    return (
        <div className="bg-background-dark min-h-screen relative">
            {/* Background Grid Effect */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern hero-bg-anim"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark"></div>
            </div>

            <div className="relative z-10 pt-20">
                <MissionHero />
                <Values />
                <Team />
                <ContactForm />
            </div>
        </div>
    );
};

export default AboutContact;

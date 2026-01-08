import React, { createContext, useContext, useState } from 'react';

const DemoContext = createContext();

export const DemoProvider = ({ children }) => {
    const [isDemoMode, setIsDemoMode] = useState(false);
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

    const openDemoModal = () => setIsDemoModalOpen(true);
    const closeDemoModal = () => setIsDemoModalOpen(false);

    return (
        <DemoContext.Provider value={{ isDemoMode, setIsDemoMode, isDemoModalOpen, openDemoModal, closeDemoModal }}>
            {children}
        </DemoContext.Provider>
    );
};

export const useDemo = () => {
    const context = useContext(DemoContext);
    if (!context) {
        throw new Error('useDemo must be used within a DemoProvider');
    }
    return context;
};

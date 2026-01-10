import React, { createContext, useContext, useState } from 'react';

const DemoContext = createContext();

export const DemoProvider = ({ children }) => {
    const [isDemoMode, setIsDemoMode] = useState(false);
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
    const [user, setUser] = useState(null); // Add user state

    const openDemoModal = () => setIsDemoModalOpen(true);
    const closeDemoModal = () => setIsDemoModalOpen(false);

    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <DemoContext.Provider value={{
            isDemoMode, setIsDemoMode,
            isDemoModalOpen, openDemoModal, closeDemoModal,
            user, login, logout // Export user and auth functions
        }}>
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

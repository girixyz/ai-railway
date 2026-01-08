import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DemoProvider } from '@/context/DemoContext';
import MainLayout from '@/components/layout/MainLayout';
import Home from '@/pages/Home';
import AboutContact from '@/pages/AboutContact';
import Technology from '@/pages/Technology';
import Analytics from '@/pages/Analytics';
import UseCases from '@/pages/UseCases';
import Solution from '@/pages/Solution';

function App() {
  return (
    <DemoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutContact />} />
            <Route path="technology" element={<Technology />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="use-cases" element={<UseCases />} />
            <Route path="solution" element={<Solution />} />
            <Route path="*" element={<div className="min-h-screen flex items-center justify-center text-white">404 - Not Found</div>} />
          </Route>
        </Routes>
      </Router>
    </DemoProvider>
  );
}

export default App;

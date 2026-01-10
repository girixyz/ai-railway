import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Home from '@/pages/Home';
import AboutContact from '@/pages/AboutContact';
import Technology from '@/pages/Technology';
import Analytics from '@/pages/Analytics';
import UseCases from '@/pages/UseCases';
import Solution from '@/pages/Solution';
<<<<<<< HEAD:stitch_railway_ai_homepage (2)/railway-app/src/App.jsx
import Demo from '@/pages/Demo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutContact />} />
          <Route path="technology" element={<Technology />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="use-cases" element={<UseCases />} />
          <Route path="solution" element={<Solution />} />
          <Route path="demo" element={<Demo />} />
          <Route path="*" element={<div className="min-h-screen flex items-center justify-center text-white">404 - Not Found</div>} />
        </Route>
      </Routes>
    </Router>

=======
import Dashboard from '@/pages/Dashboard';

import ScrollToTop from '@/components/layout/ScrollToTop';

function App() {
  return (
    <DemoProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutContact />} />
            <Route path="technology" element={<Technology />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="use-cases" element={<UseCases />} />
            <Route path="solution" element={<Solution />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<div className="min-h-screen flex items-center justify-center text-white">404 - Not Found</div>} />
          </Route>
        </Routes>
      </Router>
    </DemoProvider>
>>>>>>> 60445cc583d09c8dbf54e692ad4e7bc78356b272:frontend/railway-app/src/App.jsx
  );
}

export default App;

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Logo from '../assets/branding/Logo';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800/50 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <Logo iconSize={24} fontSize="text-lg" />
          </div>
          <div className="flex gap-10 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-primary-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Support</a>
          </div>
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">© 2026 CareerPilot AI. Built for the future.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;

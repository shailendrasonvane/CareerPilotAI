import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Placeholder pages
const HomePage = () => (
  <div className="relative isolate pt-14">
    {/* Background Glow */}
    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
      <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-200 to-primary-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
        <div className="flex">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-slate-600 ring-1 ring-slate-900/10 hover:ring-slate-900/20">
            Announcing our AI Resume Builder v2.0.{' '}
            <a href="#" className="font-semibold text-primary-600">
              <span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <h1 className="mt-10 text-4xl font-black tracking-tight text-slate-900 sm:text-7xl">
          Navigate Your Career with <span className="text-primary-600 bg-clip-text">AI precision</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600 max-w-xl">
          Build optimized resumes, track your applications, and land your dream job with our comprehensive AI-powered career platform. Professional, ATS-friendly, and simple.
        </p>
        <div className="mt-10 flex items-center gap-x-6">
          <button className="btn-primary px-8 py-4 text-lg">Start Building for Free</button>
          <a href="#" className="text-sm font-semibold leading-6 text-slate-900">
            View Templates <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      
      <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { title: 'AI Resume Builder', desc: 'Craft professional resumes in minutes with AI assistance.' },
            { title: 'ATS Analyzer', desc: 'Ensure your resume passes through applicant tracking systems.' },
            { title: 'Smart Job Matching', desc: 'Get personalized job recommendations based on your profile.' },
            { title: 'Cover Letter AI', desc: 'Generate tailored cover letters for every application.' },
          ].map((feature, i) => (
            <div key={i} className="card hover:border-primary-200 transition-colors cursor-default group">
              <h3 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{feature.title}</h3>
              <p className="text-sm text-slate-500 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const DashboardHome = () => (
  <div className="space-y-8">
    <header>
      <h1 className="text-3xl font-bold text-slate-900">Welcome to your Dashboard</h1>
      <p className="text-slate-500 mt-1">Here's what's happening with your job search today.</p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: 'Resumes Created', value: '4', trend: '+2 this week' },
        { label: 'Applications Sent', value: '12', trend: '+5 this week' },
        { label: 'Interview Invites', value: '2', trend: 'Keep it up!' },
      ].map((stat, i) => (
        <div key={i} className="card">
          <p className="text-sm font-medium text-slate-500">{stat.label}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{stat.trend}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="card h-64 flex items-center justify-center border-dashed border-2 bg-slate-50/50">
      <p className="text-slate-400 font-medium">Coming Soon: Recent Activity Feed</p>
    </div>
  </div>
);

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/resumes" element={<div className="p-8">My Resumes Page</div>} />
        <Route path="/jobs" element={<div className="p-8">Job Tracker Page</div>} />
        <Route path="/profile" element={<div className="p-8">Profile Page</div>} />
        <Route path="/settings" element={<div className="p-8">Settings Page</div>} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ResumeDashboard from './pages/ResumeDashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import ResumePrintView from './pages/ResumePrintView';
import ResumeExportView from './pages/ResumeExportView';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ProfilePage from './pages/ProfilePage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import AdminRoute from './components/AdminRoute';
import { Plus } from 'lucide-react';

// Placeholder pages
const HomePage = () => (
  <div className="relative isolate pt-14 bg-white dark:bg-slate-950 min-h-screen">
    {/* Background Glow */}
    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
      <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-200 to-primary-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
        <div className="flex">
          <div className="relative rounded-full px-4 py-1 text-xs font-black uppercase tracking-widest leading-6 text-slate-500 ring-1 ring-slate-900/10 dark:ring-white/10 hover:ring-slate-900/20 dark:hover:ring-white/20 transition-all">
            Announcing our AI Resume Builder v2.0.{' '}
            <a href="/register" className="font-black text-primary-600 ml-2">
              <span className="absolute inset-0" aria-hidden="true"></span>Join Now <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <h1 className="mt-10 text-5xl font-black tracking-tight text-slate-900 dark:text-white sm:text-7xl">
          Navigate Your Career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">AI Precision</span>
        </h1>
        <p className="mt-8 text-xl leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl font-medium">
          Build optimized resumes, track your applications, and land your dream job with our comprehensive AI-powered career platform. Professional, ATS-friendly, and powerful.
        </p>
        <div className="mt-12 flex items-center gap-x-6">
          <Link to="/register" className="btn-primary px-10 py-5 text-xl shadow-indigo">Start Building for Free</Link>
          <a href="#" className="text-sm font-black uppercase tracking-widest leading-6 text-slate-900 dark:text-white hover:text-primary-600 transition-colors">
            View Templates <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      
      <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[
            { title: 'AI Resume Builder', desc: 'Craft professional resumes in minutes with AI assistance.' },
            { title: 'ATS Analyzer', desc: 'Ensure your resume passes through applicant tracking systems.' },
            { title: 'Smart Job Matching', desc: 'Get personalized job recommendations based on your profile.' },
            { title: 'Cover Letter AI', desc: 'Generate tailored cover letters for every application.' },
          ].map((feature, i) => (
            <div key={i} className="glass-card p-8 hover:border-primary-500/50 transition-all duration-500 cursor-default group hover:shadow-indigo">
              <h3 className="font-black text-xl text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors tracking-tight">{feature.title}</h3>
              <p className="text-base text-slate-500 dark:text-slate-400 mt-3 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const DashboardHome = () => (
  <div className="space-y-10 animate-in fade-in duration-500">
    <header>
      <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Dashboard Overview</h1>
      <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium text-lg">Here's what's happening with your job search today.</p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { label: 'Resumes Created', value: '4', trend: '+2 this week' },
        { label: 'Applications Sent', value: '12', trend: '+5 this week' },
        { label: 'Interview Invites', value: '2', trend: 'Keep it up!' },
      ].map((stat, i) => (
        <div key={i} className="glass-card p-8 group hover:shadow-indigo transition-all duration-500">
          <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
          <div className="flex items-baseline gap-4 mt-4">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.value}</h3>
            <span className="text-xs font-black text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-3 py-1 rounded-full border border-green-100 dark:border-green-800/50 uppercase tracking-widest">{stat.trend}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="glass-card h-80 flex flex-col items-center justify-center border-dashed border-2 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-4 shadow-sm border border-slate-100 dark:border-slate-700">
        <Plus size={32} className="text-slate-400" />
      </div>
      <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Recent Activity Feed Coming Soon</p>
    </div>
  </div>
);

const AdminDashboard = () => (
  <div className="p-10 animate-in fade-in duration-500">
    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Admin Dashboard</h1>
    <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg font-medium">Welcome to the CareerPilot AI administrative control center.</p>
    
    <div className="mt-12 glass-card p-8 bg-primary-50/50 dark:bg-primary-900/10 border-primary-100 dark:border-primary-900/30">
        <p className="text-primary-600 dark:text-primary-400 font-black uppercase tracking-widest text-xs">System Status: Operational</p>
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
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/resumes" element={<ResumeDashboard />} />
        <Route path="/jobs" element={<div className="p-8">Job Tracker Page</div>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        
        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* Resume Editor & Print/Export */}
      <Route path="/resume/builder/:id" element={<ResumeBuilder />} />
      <Route path="/resume/print/:id" element={<ResumePrintView />} />
      <Route path="/resume/export/:id" element={<ResumeExportView />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

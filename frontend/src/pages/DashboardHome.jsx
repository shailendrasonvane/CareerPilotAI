import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Plus, FileText, Send, CalendarCheck, AlertCircle } from 'lucide-react';
import { fetchDashboardOverview } from '../redux/slices/dashboardSlice';

const StatCardSkeleton = () => (
  <div className="glass-card p-8 animate-pulse">
    <div className="h-3 w-28 bg-slate-200 dark:bg-slate-700 rounded" />
    <div className="flex items-baseline gap-4 mt-4">
      <div className="h-10 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
      <div className="h-6 w-24 bg-slate-100 dark:bg-slate-800 rounded-full" />
    </div>
  </div>
);

const DashboardHome = () => {
  const dispatch = useDispatch();
  const { overview, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardOverview());
  }, [dispatch]);

  const resumeCount = overview?.totalResumes ?? 0;
  const resumeTrend =
    resumeCount === 0
      ? 'Create your first resume'
      : resumeCount === 1
        ? '1 resume in your library'
        : `${resumeCount} resumes in your library`;

  const stats = [
    {
      id: 'resumes',
      label: 'Resumes Created',
      icon: FileText,
      loading,
      comingSoon: false,
      value: loading ? null : String(resumeCount),
      trend: resumeTrend,
      trendTone: 'green',
      link: '/resumes',
    },
    {
      id: 'applications',
      label: 'Applications Sent',
      icon: Send,
      loading,
      comingSoon: true,
      value: 'Coming Soon',
      trend: 'Job tracker launching soon',
      trendTone: 'muted',
    },
    {
      id: 'interviews',
      label: 'Interview Invites',
      icon: CalendarCheck,
      loading,
      comingSoon: true,
      value: 'Coming Soon',
      trend: 'Interview tracker launching soon',
      trendTone: 'muted',
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium text-lg">
          Here&apos;s what&apos;s happening with your job search today.
        </p>
      </header>

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800/50 px-4 py-3 text-amber-800 dark:text-amber-300">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {loading
          ? [1, 2, 3].map((i) => <StatCardSkeleton key={i} />)
          : stats.map((stat) => {
              const Icon = stat.icon;
              const trendClasses =
                stat.trendTone === 'green'
                  ? 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 border-green-100 dark:border-green-800/50'
                  : 'text-slate-500 bg-slate-100 dark:bg-slate-800/50 dark:text-slate-400 border-slate-200 dark:border-slate-700';

              const cardContent = (
                <div
                  className={`glass-card p-8 group transition-all duration-500 h-full flex flex-col ${
                    stat.comingSoon
                      ? 'opacity-90 border-dashed'
                      : 'hover:shadow-indigo cursor-pointer'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                      {stat.label}
                    </p>
                    <div
                      className={`p-2 rounded-xl ${
                        stat.comingSoon
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                          : 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mt-4 flex-1">
                    <h3
                      className={`font-black tracking-tighter ${
                        stat.comingSoon
                          ? 'text-2xl text-slate-400 dark:text-slate-500'
                          : 'text-4xl text-slate-900 dark:text-white'
                      }`}
                    >
                      {stat.value}
                    </h3>
                    <span
                      className={`self-start text-xs font-black px-3 py-1 rounded-full border uppercase tracking-widest leading-snug ${trendClasses}`}
                    >
                      {stat.trend}
                    </span>
                  </div>
                </div>
              );

              return stat.link && !stat.comingSoon ? (
                <Link key={stat.id} to={stat.link} className="block min-w-0">
                  {cardContent}
                </Link>
              ) : (
                <div key={stat.id} className="min-w-0" aria-disabled={stat.comingSoon}>
                  {cardContent}
                </div>
              );
            })}
      </div>

      <div className="glass-card h-80 flex flex-col items-center justify-center border-dashed border-2 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-4 shadow-sm border border-slate-100 dark:border-slate-700">
          <Plus size={32} className="text-slate-400" />
        </div>
        <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">
          Recent Activity Feed Coming Soon
        </p>
      </div>
    </div>
  );
};

export default DashboardHome;

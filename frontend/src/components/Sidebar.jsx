import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  UserCircle, 
  Settings, 
  BarChart3,
  HelpCircle,
  Lock
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'My Resumes', path: '/resumes' },
    { icon: Briefcase, label: 'Job Tracker', path: '/jobs' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: UserCircle, label: 'Profile', path: '/profile' },
    { icon: Lock, label: 'Change Password', path: '/change-password' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-72 bg-white dark:bg-slate-950 h-[calc(100vh-64px)] fixed left-0 top-16 hidden md:flex flex-col border-r border-slate-100 dark:border-slate-900 z-40">
      <div className="p-8 flex-1 space-y-2 overflow-y-auto custom-scrollbar">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6 ml-4">Main Navigation</p>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
          >
            {({ isActive }) => (
              <div className={`
                flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 shadow-sm shadow-primary-500/5 border border-primary-100 dark:border-primary-900/30' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'}
              `}>
                <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                <span className="font-bold tracking-tight text-sm">{item.label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </div>

      <div className="p-8 border-t border-slate-100 dark:border-slate-900 bg-slate-50/30 dark:bg-slate-900/20">
        <button className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white dark:hover:bg-slate-900 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 w-full text-left group border border-transparent hover:border-slate-100 dark:hover:border-slate-800 hover:shadow-sm">
          <HelpCircle className="w-5 h-5 text-slate-400 group-hover:text-primary-500 transition-colors" />
          <span className="font-bold tracking-tight text-sm text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white">Help Center</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

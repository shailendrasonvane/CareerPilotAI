import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  UserCircle, 
  Settings, 
  BarChart3,
  HelpCircle
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'My Resumes', path: '/resumes' },
    { icon: Briefcase, label: 'Job Tracker', path: '/jobs' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: UserCircle, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-400 h-[calc(100vh-64px)] fixed left-0 top-16 hidden md:block border-r border-slate-800">
      <div className="p-6 space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Main Menu</p>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive 
                ? 'bg-primary-600/10 text-primary-400 border border-primary-600/20' 
                : 'hover:bg-slate-800 hover:text-slate-200'}
            `}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="absolute bottom-0 w-full p-6 border-t border-slate-800">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-slate-200 transition-all w-full text-left">
          <HelpCircle className="w-5 h-5" />
          <span className="font-medium">Support</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

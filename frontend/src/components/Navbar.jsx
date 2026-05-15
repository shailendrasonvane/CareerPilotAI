import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { LogOut } from 'lucide-react';
import Logo from '../assets/branding/Logo';

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 h-16 flex items-center px-6 sticky top-0 z-50">
      <Link to="/dashboard">
        <Logo iconSize={32} fontSize="text-xl" />
      </Link>

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-700">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-slate-500">{user.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold border-2 border-white shadow-sm">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <button 
              onClick={() => dispatch(logout())}
              className="p-2 text-slate-500 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-slate-600 font-medium hover:text-primary-600 transition-colors">
              Login
            </Link>
            <Link to="/register" className="btn-primary">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

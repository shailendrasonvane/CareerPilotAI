import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, clearError } from '../redux/slices/authSlice';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

import Logo from '../assets/branding/Logo';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    return () => dispatch(clearError());
  }, [isAuthenticated, navigate, dispatch]);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-8">
          <Logo iconSize={48} fontSize="text-3xl" />
        </div>
        
        <div className="glass-card overflow-hidden">
          <div className="p-8 pb-0 text-center">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Welcome Back</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Continue your professional journey</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-2xl text-sm font-bold border border-red-100 dark:border-red-900/30 animate-in shake-in duration-300">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                <input
                  {...register('email')}
                  type="email"
                  className={`input-field pl-12 ${errors.email ? 'border-red-500 ring-red-500/10' : ''}`}
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 font-bold mt-1 ml-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
                <Link to="/forgot-password" name="forgot-password" className="text-xs font-bold text-primary-600 hover:text-primary-700">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                <input
                  {...register('password')}
                  type="password"
                  className={`input-field pl-12 ${errors.password ? 'border-red-500 ring-red-500/10' : ''}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-xs text-red-500 font-bold mt-1 ml-1">{errors.password.message}</p>}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="btn-primary w-full py-4 flex items-center justify-center gap-2 group text-lg"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="p-8 pt-0 text-center border-t border-slate-50 dark:border-slate-800/50 mt-4 bg-slate-50/50 dark:bg-slate-900/50">
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-6 font-medium">
              Don't have an account?{' '}
              <Link to="/register" name="register-link" className="font-black text-primary-600 hover:text-primary-700">
                Sign Up Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

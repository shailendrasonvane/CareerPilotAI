import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerUser, clearError } from '../redux/slices/authSlice';
import { User, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name is too short'),
  lastName: z.string().min(2, 'Last name is too short'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

import Logo from '../assets/branding/Logo';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
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
    dispatch(registerUser(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <div className="w-full max-w-lg animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-8">
          <Logo iconSize={48} fontSize="text-3xl" />
        </div>

        <div className="glass-card overflow-hidden">
          <div className="p-8 pb-0 text-center">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Create Account</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Join thousands of professionals today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-2xl text-sm font-bold border border-red-100 dark:border-red-900/30 animate-in shake-in duration-300">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">First Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    {...register('firstName')}
                    type="text"
                    className={`input-field pl-12 ${errors.firstName ? 'border-red-500 ring-red-500/10' : ''}`}
                    placeholder="John"
                  />
                </div>
                {errors.firstName && <p className="text-xs text-red-500 font-bold mt-1 ml-1">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Last Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    {...register('lastName')}
                    type="text"
                    className={`input-field pl-12 ${errors.lastName ? 'border-red-500 ring-red-500/10' : ''}`}
                    placeholder="Doe"
                  />
                </div>
                {errors.lastName && <p className="text-xs text-red-500 font-bold mt-1 ml-1">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                <input
                  {...register('email')}
                  type="email"
                  className={`input-field pl-12 ${errors.email ? 'border-red-500 ring-red-500/10' : ''}`}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 font-bold mt-1 ml-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Password</label>
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
              className="btn-primary w-full py-4 flex items-center justify-center gap-2 group text-lg mt-2"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="p-8 pt-0 text-center border-t border-slate-50 dark:border-slate-800/50 mt-4 bg-slate-50/50 dark:bg-slate-900/50">
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-6 font-medium">
              Already have an account?{' '}
              <Link to="/login" name="login-link" className="font-black text-primary-600 hover:text-primary-700">
                Sign In Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

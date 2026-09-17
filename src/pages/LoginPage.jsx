import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Stethoscope, ArrowRight, Sparkles, AlertCircle, Loader2, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (email && password) {
        await login(email, password);
        navigate('/dashboard');
      } else {
        setError('Please enter both email and password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.message === 'Failed to fetch' || err.message?.includes('fetch')) {
        setError('Unable to connect to Supabase project URL (Network / DNS Error). Please check VITE_SUPABASE_URL in .env.local.');
      } else {
        setError(err.message || 'Invalid email or password. Please check your credentials and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = () => {
    loginAsDemo();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-6 relative font-serif">
      {/* TOP WATERMARK BANNER */}
      <div className="absolute top-4 left-0 right-0 z-30 flex justify-center px-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 backdrop-blur-md px-5 py-2 rounded-full shadow-xs text-center flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-serif">
          <span className="font-bold text-blue-700 dark:text-blue-400">Made by:</span>
          <span className="font-bold text-slate-900 dark:text-slate-100">chandukancheti</span>
          <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-600 dark:text-slate-400">For bug reports:</span>
          <a
            href="mailto:chandukancheti785@gmail.com"
            className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-bold flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5 inline" />
            <span>chandukancheti785@gmail.com</span>
          </a>
        </div>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-md relative z-10 space-y-6 mt-8 sm:mt-0 font-serif">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-blue-700 flex items-center justify-center text-white font-bold mx-auto shadow-xs">
            🩺
          </div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">Welcome Back</h1>
          <p className="text-xs font-serif text-slate-500 dark:text-slate-400">Log in to your Rotation Companion account</p>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-xl text-xs font-serif font-bold text-rose-800 dark:text-rose-300 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-700 dark:text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Demo Fast Login Banner */}
        <button
          onClick={handleDemo}
          className="w-full p-3.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-800 rounded-xl flex items-center justify-center space-x-2 text-xs font-serif font-bold text-emerald-900 dark:text-emerald-300 transition-all shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          <span>Continue as Guest Student (Offline / LocalStorage Mode)</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          <span className="bg-white dark:bg-slate-900 px-3 text-[10px] uppercase font-serif tracking-wider text-slate-500 dark:text-slate-400 font-bold">Or Email Login</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-serif">
          <div>
            <label className="block text-xs font-serif font-bold text-slate-700 dark:text-slate-300 mb-1">Medical Student Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex.rivera@medschool.edu"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-serif text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-serif font-bold text-slate-700 dark:text-slate-300">Password</label>
              <NavLink to="/forgot-password" className="text-xs text-blue-700 dark:text-blue-400 font-serif font-bold hover:underline">
                Forgot password?
              </NavLink>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-serif text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-serif font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center space-x-2 transition-all"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            <span>{loading ? 'Logging in...' : 'Log In to Dashboard'}</span>
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <p className="text-center text-xs font-serif text-slate-500 dark:text-slate-400">
          Don't have an account?{' '}
          <NavLink to="/signup" className="text-blue-700 dark:text-blue-400 font-serif font-bold hover:underline">
            Sign Up
          </NavLink>
        </p>

        {/* Footer Credit Watermark */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[10px] font-serif text-slate-500 dark:text-slate-400">
            Made by <strong className="text-slate-900 dark:text-slate-100 font-bold">chandukancheti</strong> • Bug reports:{' '}
            <a href="mailto:chandukancheti785@gmail.com" className="text-blue-700 dark:text-blue-400 hover:underline">
              chandukancheti785@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

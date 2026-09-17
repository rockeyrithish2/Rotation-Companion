import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowRight, KeyRound, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Email & New Password, 2: Success
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { resetPasswordForEmail, updateUserPassword } = useAuth();
  const navigate = useNavigate();

  // Handle direct password reset & update
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email) {
      setError('Please enter your medical student email address.');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please retype carefully.');
      setLoading(false);
      return;
    }

    try {
      await resetPasswordForEmail(email);
      await updateUserPassword(newPassword);
      setStep(2);
    } catch (err) {
      console.error('Password reset error:', err);
      if (err.message === 'Failed to fetch' || err.message?.includes('fetch')) {
        setError('Unable to connect to Supabase project (Network / DNS Error). Please check VITE_SUPABASE_URL.');
      } else {
        setError(err.message || 'Unable to reset password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-6 relative font-serif">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-md relative z-10 space-y-6 font-serif">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-blue-700 flex items-center justify-center text-white font-bold mx-auto shadow-xs">
            {step === 2 ? <CheckCircle2 className="w-6 h-6 text-white" /> : <KeyRound className="w-6 h-6 text-white" />}
          </div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">
            {step === 1 ? 'Reset Your Password' : 'Password Reset Complete!'}
          </h1>
          <p className="text-xs font-serif text-slate-500 dark:text-slate-400">
            {step === 1
              ? 'Enter your registered email and choose a new password'
              : 'Your account password has been updated successfully.'}
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-xl text-xs font-serif font-bold text-rose-800 dark:text-rose-300 flex items-start space-x-2 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 text-rose-700 dark:text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: Reset Password Form */}
        {step === 1 && (
          <form onSubmit={handleResetPassword} className="space-y-4 font-serif">
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
              <label className="block text-xs font-serif font-bold text-slate-700 dark:text-slate-300 mb-1">New Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-serif text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-bold text-slate-700 dark:text-slate-300 mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-serif text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-serif font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center space-x-2 transition-all"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              <span>{loading ? 'Updating Password...' : 'Reset & Update Password'}</span>
            </button>
          </form>
        )}

        {/* STEP 2: Success */}
        {step === 2 && (
          <div className="space-y-4 text-center font-serif">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-xl text-xs text-emerald-900 dark:text-emerald-300">
              <p className="font-serif font-bold text-sm text-emerald-950 dark:text-emerald-200">Password Updated Successfully!</p>
              <p className="mt-1">You can now sign in to Rotation Companion using your new password.</p>
            </div>

            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-serif font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center space-x-2 transition-colors"
            >
              <span>Go to Login Page</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom Link */}
        <p className="text-center text-xs font-serif text-slate-500 dark:text-slate-400 pt-2">
          Remembered your password?{' '}
          <NavLink to="/login" className="text-blue-700 dark:text-blue-400 font-serif font-bold hover:underline">
            Log In
          </NavLink>
        </p>
      </div>
    </div>
  );
}


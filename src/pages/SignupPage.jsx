import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Stethoscope, ArrowRight, AlertCircle, Loader2, ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Human CAPTCHA state
  const [captchaNum1, setCaptchaNum1] = useState(7);
  const [captchaNum2, setCaptchaNum2] = useState(5);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  // Generate new Human Security CAPTCHA
  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 9) + 2;
    const n2 = Math.floor(Math.random() * 8) + 1;
    setCaptchaNum1(n1);
    setCaptchaNum2(n2);
    setCaptchaAnswer('');
    setIsCaptchaValid(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Validate Human CAPTCHA input
  useEffect(() => {
    if (parseInt(captchaAnswer, 10) === (captchaNum1 + captchaNum2)) {
      setIsCaptchaValid(true);
      setError(null);
    } else {
      setIsCaptchaValid(false);
    }
  }, [captchaAnswer, captchaNum1, captchaNum2]);

  // Handle direct account creation
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid medical email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (!isCaptchaValid) {
      setError('Please solve the Human Security Challenge correctly to prove you are not a bot.');
      return;
    }

    setLoading(true);
    try {
      await signup(name, email, password);
      navigate('/onboarding');
    } catch (err) {
      console.error('Signup Error:', err);
      setError(err.message || 'Unable to create account. Please try again.');
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
            🩺
          </div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">
            Create Account
          </h1>
          <p className="text-xs font-serif text-slate-500 dark:text-slate-400">
            Enter your details below to set up your Rotation Companion account
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-xl text-xs font-serif font-bold text-rose-800 dark:text-rose-300 flex items-start space-x-2 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 text-rose-700 dark:text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4 font-serif">
          <div>
            <label className="block text-xs font-serif font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Rivera"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-serif text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

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
            <label className="block text-xs font-serif font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-serif text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* HUMAN SECURITY VERIFICATION (CAPTCHA) BLOCK */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5 font-serif">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs font-serif font-bold text-slate-800 dark:text-slate-200">
                <ShieldCheck className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                <span>Human Verification Check</span>
              </div>
              <button
                type="button"
                onClick={generateCaptcha}
                className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Generate new puzzle"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <div className="px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono font-bold text-blue-700 dark:text-blue-400 shrink-0">
                {captchaNum1} + {captchaNum2} = ?
              </div>
              <input
                type="number"
                required
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                placeholder="Answer"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-serif font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {isCaptchaValid && (
              <div className="flex items-center space-x-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 pt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Human Verification Passed</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !isCaptchaValid}
            className="w-full py-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-serif font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center space-x-2 transition-all"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            <span>{loading ? 'Creating Account...' : 'Create Account & Start Onboarding'}</span>
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <p className="text-center text-xs font-serif text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
          Already have an account?{' '}
          <NavLink to="/login" className="text-blue-700 dark:text-blue-400 font-serif font-bold hover:underline">
            Log In
          </NavLink>
        </p>
      </div>
    </div>
  );
}


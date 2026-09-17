import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Stethoscope, Sparkles, ArrowRight, Check, Sun, Moon, BookOpen, ShieldCheck, Cpu, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Footer } from '../components/layout/Footer';

export function LandingPage() {
  const { loginAsDemo } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleGuestLaunch = () => {
    loginAsDemo();
    navigate('/dashboard');
  };

  const sampleModules = [
    {
      id: 'general-surgery',
      title: 'Acute General Surgery & Abdominal Emergencies',
      subtitle: 'Acute Appendicitis, Small Bowel Obstruction, Cholecystitis & Post-op Monitoring',
      badge: 'Full Schematics & AI Coach Included',
      tag: 'TURNKEY MODULE • Surgery & Board Review',
      actionText: 'Explore Surgery Module →'
    },
    {
      id: 'internal-medicine',
      title: 'Inpatient General Internal Medicine & Cardiology',
      subtitle: 'Heart Failure, Acute Kidney Injury, Sepsis Protocols & Electrolyte Disorders',
      badge: 'Full Schematics & AI Coach Included',
      tag: 'TURNKEY MODULE • Inpatient Wards',
      actionText: 'Explore Medicine Module →'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-serif selection:bg-blue-700 selection:text-white flex flex-col justify-between">
      {/* Header Navigation (Craftory Style Top Nav) */}
      <header className="sticky top-0 z-40 bg-[#111827] text-white border-b border-slate-800 px-6 lg:px-12 py-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            🩺
          </div>
          <span className="font-serif font-bold text-lg tracking-tight text-white">
            ROTATION <span className="text-amber-400">COMPANION</span>
          </span>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-serif font-semibold text-slate-300">
          <NavLink to="/" className="text-white hover:text-amber-400 transition-colors border-b-2 border-amber-400 pb-0.5">Home</NavLink>
          <NavLink to="/dashboard" className="hover:text-amber-400 transition-colors">Dashboard</NavLink>
          <NavLink to="/rotation" className="hover:text-amber-400 transition-colors">Rotations</NavLink>
          <NavLink to="/skills" className="hover:text-amber-400 transition-colors">Skill Matrix</NavLink>
          <NavLink to="/ai-coach" className="hover:text-amber-400 transition-colors">AI Coach</NavLink>
          <NavLink to="/settings" className="hover:text-amber-400 transition-colors">Contact</NavLink>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all text-xs"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
          </button>

          <button
            onClick={handleGuestLaunch}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-serif font-bold text-xs rounded-full transition-all shadow-xs"
          >
            Guest Demo
          </button>

          <NavLink
            to="/login"
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-serif font-bold text-xs rounded-full transition-all shadow-xs"
          >
            Login
          </NavLink>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-16 space-y-12 font-serif flex-1">
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300 text-xs font-serif font-bold rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
            <span>01 // International Clinical Rotation System</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-tight text-slate-900 dark:text-slate-100">
            Clinical Precision <br />
            <span className="text-blue-700 dark:text-blue-400">Workstation</span> & AI Guide
          </h1>

          <p className="text-base sm:text-lg font-serif text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
            An objective clinical companion built for medical students, residents, and scholars to answer the daily rounds directive:
            <strong className="text-slate-900 dark:text-slate-100 font-serif font-bold text-lg sm:text-xl mt-3 block border-l-4 border-amber-500 pl-4 py-1 bg-slate-100 dark:bg-slate-900 rounded-r-lg">
              "What should I know, what should I do, and what should I learn today?"
            </strong>
          </p>
        </div>

        {/* Feature Cards Grid (Matching Craftory Screenshot Card Style) */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-700 dark:text-blue-400" />
              <span>Featured Rotation Modules</span>
            </h2>
            <span className="text-xs font-serif font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">15 Blocks Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sampleModules.map((m) => (
              <div key={m.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-sm hover:shadow-md transition-all font-serif flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-full h-40 bg-slate-100 dark:bg-slate-800/80 rounded-xl flex items-center justify-center border border-slate-200/80 dark:border-slate-700/60 p-4 text-center">
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-xl bg-blue-700/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold text-xl mx-auto">
                        🩺
                      </div>
                      <span className="text-xs font-serif font-bold text-slate-700 dark:text-slate-300 block">{m.title}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {m.subtitle}
                  </p>

                  <div className="flex items-center space-x-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-bold pt-1">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>{m.badge}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
                  <div className="text-[10px] font-serif uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                    {m.tag}
                  </div>
                  <button
                    onClick={handleGuestLaunch}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-serif font-bold rounded-full transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <span>Request Access</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Craftory Style Dark Footer */}
      <Footer />
    </div>
  );
}


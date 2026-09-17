import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { TrendingUp, BookOpen, ClipboardList, Activity, HelpCircle, Brain, Sparkles, CheckCircle2 } from 'lucide-react';
import { useRotation } from '../context/RotationContext';
import { useAuth } from '../context/AuthContext';

export function ProgressPage() {
  const { progress } = useRotation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [revisionBuilt, setRevisionBuilt] = useState(false);

  const handleBuildRevisionPlan = () => {
    setRevisionBuilt(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1200);
  };

  const percent = progress?.progressPercent || 67;

  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto space-y-8 font-serif animate-in fade-in duration-150 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-1">
        <span className="text-xs font-serif font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">10 // Objective Competency Metrics</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-blue-700 dark:text-blue-400" />
          <span>Clinical Competency Analytics</span>
        </h1>
        <p className="text-xs sm:text-sm font-serif text-slate-600 dark:text-slate-400">
          Quantitative milestone progression & automated weak area detection.
        </p>
      </div>

      {/* Main Overall Progress Banner */}
      <div className="border border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs font-serif">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-serif font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">OVERALL ROTATION MILESTONE</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold uppercase text-slate-900 dark:text-slate-100 tracking-tight">
            {progress?.rotation?.name || 'GENERAL SURGERY'} BLOCK
          </h2>
          <p className="text-xs font-serif text-slate-600 dark:text-slate-400 max-w-md">
            Day {progress?.currentDay || 12} of {progress?.totalDays || 28}. System metrics indicate optimal trajectory towards final evaluation.
          </p>
        </div>

        {/* Big Percentage Box */}
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-700/60 p-6 text-center shrink-0 min-w-[200px] shadow-xs">
          <div className="text-5xl font-serif font-bold text-blue-700 dark:text-blue-400 tracking-tight">{percent}%</div>
          <p className="text-[10px] font-serif font-bold text-slate-700 dark:text-slate-300 uppercase mt-1">ROTATION COMPLETED</p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 font-serif">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center space-y-1 shadow-xs">
          <BookOpen className="w-5 h-5 text-blue-700 mx-auto" />
          <div className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">32 / 50</div>
          <p className="text-[10px] font-serif font-bold text-slate-500 uppercase">TOPICS</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center space-y-1 shadow-xs">
          <ClipboardList className="w-5 h-5 text-emerald-700 mx-auto" />
          <div className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">18</div>
          <p className="text-[10px] font-serif font-bold text-slate-500 uppercase">CASES LOGGED</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center space-y-1 shadow-xs">
          <Activity className="w-5 h-5 text-amber-600 mx-auto" />
          <div className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">14 / 25</div>
          <p className="text-[10px] font-serif font-bold text-slate-500 uppercase">SKILLS</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center space-y-1 shadow-xs">
          <HelpCircle className="w-5 h-5 text-indigo-700 mx-auto" />
          <div className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">182</div>
          <p className="text-[10px] font-serif font-bold text-slate-500 uppercase">QUESTIONS</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center space-y-1 col-span-2 sm:col-span-1 shadow-xs">
          <Brain className="w-5 h-5 text-rose-600 mx-auto" />
          <div className="text-2xl font-serif font-bold text-rose-600 dark:text-rose-400">9</div>
          <p className="text-[10px] font-serif font-bold text-slate-500 uppercase">PRESENTATIONS</p>
        </div>
      </div>

      {/* WEAK AREAS SECTION */}
      <div className="border border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 p-6 space-y-6 shadow-xs font-serif">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
          <div>
            <span className="text-[10px] font-serif font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">Automated Detection</span>
            <h2 className="text-2xl font-serif font-bold uppercase text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Areas Requiring Revision</span>
            </h2>
            <p className="text-xs font-serif text-slate-600 dark:text-slate-400">Detected from quiz accuracy and rounds questioning reasoning</p>
          </div>

          <button
            onClick={handleBuildRevisionPlan}
            disabled={revisionBuilt}
            className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-serif font-semibold text-xs rounded-xl shadow-xs transition-all"
          >
            <span>{revisionBuilt ? 'Revision Plan Added!' : 'Build Revision Plan'}</span>
          </button>
        </div>

        <div className="space-y-3 font-serif">
          <div className="p-4 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600 flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-serif font-bold uppercase text-slate-900 dark:text-slate-100">01. Small Bowel Obstruction & Post-Op Complications</h3>
              <p className="text-xs font-serif font-semibold text-rose-600">Accuracy: 48%</p>
            </div>
            <span className="text-[10px] font-serif font-bold bg-rose-100 text-rose-800 border border-rose-200 px-3 py-1 rounded-full uppercase">High Priority</span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600 flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-serif font-bold uppercase text-slate-900 dark:text-slate-100">02. Renal & Electrolyte Disturbances</h3>
              <p className="text-xs font-serif font-semibold text-amber-700">Accuracy: 62%</p>
            </div>
            <span className="text-[10px] font-serif font-bold bg-amber-100 text-amber-900 border border-amber-200 px-3 py-1 rounded-full uppercase">Moderate Priority</span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600 flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-serif font-bold uppercase text-slate-900 dark:text-slate-100">03. Acute Appendicitis Pathophysiology</h3>
              <p className="text-xs font-serif font-semibold text-emerald-700">Accuracy: 87%</p>
            </div>
            <span className="text-[10px] font-serif font-bold bg-emerald-100 text-emerald-900 border border-emerald-200 px-3 py-1 rounded-full uppercase">Mastered ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}

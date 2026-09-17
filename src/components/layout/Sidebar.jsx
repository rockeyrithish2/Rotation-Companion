import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Stethoscope, 
  ClipboardList, 
  Activity, 
  Calendar, 
  History, 
  TrendingUp, 
  Sparkles, 
  Award,
  Settings,
  HelpCircle,
  Cpu
} from 'lucide-react';
import { useRotation } from '../../context/RotationContext';
import { useAuth } from '../../context/AuthContext';

export function Sidebar() {
  const { progress } = useRotation();
  const { user } = useAuth();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', prefix: '01', icon: Home },
    { to: '/rotation', label: 'Active Rotation', prefix: '02', icon: Stethoscope },
    { to: '/rotation/topics', label: 'Topics Curriculum', prefix: '03', icon: BookOpen },
    { to: '/cases', label: 'My Clinical Cases', prefix: '04', icon: ClipboardList },
    { to: '/skills', label: 'Skill Mastery Matrix', prefix: '05', icon: Activity },
    { to: '/questions', label: 'Attending Questions', prefix: '06', icon: HelpCircle },
    { to: '/quiz', label: 'Rounds Quiz System', prefix: '07', icon: Award },
    { to: '/presentation', label: 'Presentation Trainer', prefix: '08', icon: Cpu },
    { to: '/ai-coach', label: 'AI Rotation Coach', prefix: '09', icon: Sparkles, highlight: true },
    { to: '/progress', label: 'Progress Analytics', prefix: '10', icon: TrendingUp },
    { to: '/calendar', label: 'Rotation Schedule', prefix: '11', icon: Calendar },
    { to: '/history', label: 'Rotation Vault', prefix: '12', icon: History }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-white dark:bg-slate-900 border-r border-slate-200/90 dark:border-slate-800 h-screen sticky top-0 z-30 font-serif transition-all">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900">
        <NavLink to="/dashboard" className="block group">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-serif font-bold text-base shadow-xs">
              🩺
            </div>
            <span className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100 tracking-tight">
              ROTATION <span className="text-blue-700 dark:text-blue-400">COMPANION</span>
            </span>
          </div>
          <p className="text-xs font-serif text-slate-500 dark:text-slate-400 mt-1">
            Clinical Workstation & AI Guide
          </p>
        </NavLink>
      </div>

      {/* Active Rotation Widget */}
      {progress && (
        <div className="m-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 shadow-xs">
          <div className="flex items-center justify-between text-xs font-serif font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            <span>ACTIVE BLOCK</span>
            <span className="text-blue-700 dark:text-blue-400 font-bold">{progress.progressPercent}%</span>
          </div>
          <h2 className="text-sm font-serif font-bold truncate flex items-center gap-1.5 pt-0.5 text-slate-900 dark:text-slate-100">
            <span>{progress.rotation.icon}</span>
            <span className="truncate">{progress.rotation.name}</span>
          </h2>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 mt-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-700 dark:bg-blue-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress.progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1 no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex items-center justify-between px-3.5 py-2.5 rounded-lg font-serif text-sm transition-all duration-150
                ${item.highlight 
                  ? 'bg-blue-700 text-white hover:bg-blue-800 shadow-xs font-semibold' 
                  : isActive
                    ? 'bg-slate-900 text-white font-semibold shadow-xs dark:bg-slate-100 dark:text-slate-900'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/90 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }
              `}
            >
              <div className="flex items-center space-x-3 truncate">
                <span className="text-xs opacity-50 font-semibold">{item.prefix}.</span>
                <span className="truncate">{item.label}</span>
              </div>
              <Icon className="w-4 h-4 shrink-0 opacity-80" />
            </NavLink>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 flex items-center justify-between">
        <NavLink to="/profile" className="flex items-center space-x-3 group flex-1 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-serif font-bold text-sm flex items-center justify-center shrink-0">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-serif font-bold text-slate-900 dark:text-slate-100 truncate">{user?.name || 'Alex Rivera'}</p>
            <p className="text-[11px] font-serif text-blue-700 dark:text-blue-400 truncate">MS3 • Clinical Scholar</p>
          </div>
        </NavLink>

        <NavLink to="/settings" className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
          <Settings className="w-4 h-4" />
        </NavLink>
      </div>
    </aside>
  );
}

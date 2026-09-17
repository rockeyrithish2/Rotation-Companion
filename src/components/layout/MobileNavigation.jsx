import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, ClipboardList, Activity, TrendingUp, Sparkles } from 'lucide-react';

export function MobileNavigation() {
  const tabs = [
    { to: '/dashboard', label: 'Home', icon: Home },
    { to: '/rotation/topics', label: 'Learn', icon: BookOpen },
    { to: '/cases', label: 'Cases', icon: ClipboardList },
    { to: '/skills', label: 'Skills', icon: Activity },
    { to: '/progress', label: 'Progress', icon: TrendingUp }
  ];

  return (
    <>
      {/* Floating AI Coach Button */}
      <NavLink
        to="/ai-coach"
        className="lg:hidden fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-blue-700 text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        aria-label="Ask AI Rotation Coach"
      >
        <Sparkles className="w-5 h-5 text-amber-300" />
      </NavLink>

      {/* Bottom Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 px-2 py-2 flex items-center justify-around font-serif">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) => `
                flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-all duration-150
                ${isActive 
                  ? 'text-blue-700 dark:text-blue-400 font-bold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }
              `}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-serif font-semibold">{tab.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}

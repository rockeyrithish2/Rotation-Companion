import React, { useState } from 'react';
import { Settings, Sun, Moon, Bell, Key, Download, RefreshCw, LogOut, ShieldCheck, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { resetDemoData } from '../lib/db/storage';
import { getUserScopedData } from '../lib/db/storageUtils';
import { useNavigate } from 'react-router-dom';

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);
  const [apiKey, setApiKey] = useState(() => {
    try {
      const raw = localStorage.getItem('rc_settings');
      return raw ? JSON.parse(raw).apiKey || '' : '';
    } catch (e) {
      return '';
    }
  });

  const [savedKeyMsg, setSavedKeyMsg] = useState(false);

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    try {
      const raw = localStorage.getItem('rc_settings');
      const settings = raw ? JSON.parse(raw) : {};
      settings.apiKey = apiKey;
      localStorage.setItem('rc_settings', JSON.stringify(settings));
      setSavedKeyMsg(true);
      setTimeout(() => setSavedKeyMsg(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleExportData = () => {
    const data = getUserScopedData(user?.id);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rotation_companion_data_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleResetDemo = () => {
    if (window.confirm('Reset all rotation data back to default demo state?')) {
      resetDemoData();
      window.location.reload();
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200 font-serif text-slate-900 dark:text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Settings className="w-7 h-7 text-slate-700 dark:text-slate-300" />
            <span>Application Settings</span>
          </h1>
          <p className="text-xs sm:text-sm font-serif text-slate-600 dark:text-slate-400 mt-1">
            Manage your app theme, notification preferences, AI configuration, and local data.
          </p>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs font-serif">
        <h2 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sun className="w-5 h-5 text-amber-500" />
          <span>Appearance & Theme</span>
        </h2>

        <div className="grid grid-cols-3 gap-3 text-xs font-serif">
          <button
            onClick={() => setTheme('light')}
            className={`p-3 rounded-xl border font-serif font-semibold flex items-center justify-center space-x-2 transition-all ${
              theme === 'light' ? 'bg-blue-700 text-white border-blue-700 shadow-xs' : 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>Light</span>
          </button>

          <button
            onClick={() => setTheme('dark')}
            className={`p-3 rounded-xl border font-serif font-semibold flex items-center justify-center space-x-2 transition-all ${
              theme === 'dark' ? 'bg-blue-700 text-white border-blue-700 shadow-xs' : 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600'
            }`}
          >
            <Moon className="w-4 h-4" />
            <span>Dark</span>
          </button>
        </div>
      </div>

      {/* AI Key Configuration */}
      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs font-serif">
        <h2 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Key className="w-5 h-5 text-blue-700 dark:text-blue-400" />
          <span>AI Engine Configuration</span>
        </h2>

        <p className="text-xs font-serif text-slate-600 dark:text-slate-400">
          Rotation Companion includes a built-in medical clinical AI engine out of the box. You can optionally supply your own OpenAI API key for live GPT-4o-mini responses.
        </p>

        <form onSubmit={handleSaveApiKey} className="space-y-3 font-serif">
          <div>
            <label className="block text-xs font-serif font-bold text-slate-700 dark:text-slate-300 mb-1">OpenAI API Key (Optional)</label>
            <input
              type="password"
              placeholder="sk-proj-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-mono text-slate-900 dark:text-slate-100"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-serif font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
          >
            {savedKeyMsg ? <Check className="w-4 h-4 text-emerald-300" /> : <Key className="w-4 h-4" />}
            <span>{savedKeyMsg ? 'Saved API Key!' : 'Save Key'}</span>
          </button>
        </form>
      </div>

      {/* Data Management & Reset */}
      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs font-serif">
        <h2 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Download className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
          <span>Data Export & Management</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 font-serif">
          <button
            onClick={handleExportData}
            className="px-4 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-serif font-semibold text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-600"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON Data Backup</span>
          </button>

          <button
            onClick={handleResetDemo}
            className="px-4 py-2.5 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40 font-serif font-semibold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-rose-100"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="pt-2 font-serif">
        <button
          onClick={() => { logout(); navigate('/login'); }}
          className="w-full py-3.5 bg-rose-700 hover:bg-rose-800 text-white font-serif font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out of Rotation Companion</span>
        </button>
      </div>
    </div>
  );
}

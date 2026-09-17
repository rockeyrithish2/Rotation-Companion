import React, { useState, useEffect } from 'react';
import { Search, Sun, Moon, Bell, Sparkles, BookOpen, ClipboardList, HelpCircle, LogOut, User, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useRotation } from '../../context/RotationContext';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../ui/Modal';
import { getTopics, getCases, getQuestions } from '../../lib/db/storage';
import { useNavigate } from 'react-router-dom';

export function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const { progress } = useRotation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = async () => {
    setShowProfileMenu(false);
    await logout();
    navigate('/login');
  };

  const topics = getTopics();
  const cases = getCases();
  const questions = getQuestions();

  const filteredTopics = searchQuery.trim() 
    ? topics.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const filteredCases = searchQuery.trim()
    ? cases.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.typicalPresentation.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const filteredQuestions = searchQuery.trim()
    ? questions.filter(q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) || (q.explanation && q.explanation.toLowerCase().includes(searchQuery.toLowerCase())))
    : [];

  const handleSelectResult = (path) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(path);
  };

  return (
    <>
      <header className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 px-4 lg:px-8 py-3 flex items-center justify-between font-serif">
        {/* Left: Mobile Brand & Rotation Tag */}
        <div className="flex items-center space-x-3">
          <div className="lg:hidden flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-blue-700 text-white flex items-center justify-center font-serif font-bold text-xs shadow-xs">
              🩺
            </div>
            <span className="font-serif font-bold text-base text-slate-900 dark:text-slate-100 tracking-tight">ROTATION <span className="text-blue-700 dark:text-blue-400">COMPANION</span></span>
          </div>

          {progress && (
            <div className="hidden sm:flex items-center space-x-2 bg-slate-50 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-serif font-semibold text-slate-800 dark:text-slate-200 shadow-xs">
              <span>{progress.rotation.icon}</span>
              <span>{progress.rotation.name}</span>
              <span className="text-blue-700 dark:text-blue-400">•</span>
              <span className="text-blue-700 dark:text-blue-400 font-bold">DAY {progress.currentDay} / {progress.totalDays}</span>
            </div>
          )}
        </div>

        {/* Center: Command-K Search Trigger */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex-1 max-w-md mx-4 bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-100 border border-slate-200/80 dark:border-slate-700 text-xs font-serif text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg flex items-center justify-between transition-all group shadow-xs"
        >
          <div className="flex items-center space-x-2.5">
            <Search className="w-4 h-4 text-blue-700 dark:text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="truncate font-semibold">Search Knowledge Base (⌘K)...</span>
          </div>
          <kbd className="hidden md:inline-block px-2 py-0.5 font-serif text-[10px] font-bold bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 rounded">
            ⌘K
          </kbd>
        </button>

        {/* Right Controls */}
        <div className="flex items-center space-x-2.5">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all relative shadow-xs"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 z-50 shadow-xl font-serif text-slate-900 dark:text-slate-100 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                  <h4 className="text-xs font-serif font-bold tracking-wider text-slate-900 dark:text-slate-100">CLINICAL ALERTS</h4>
                  <span className="text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 px-2 py-0.5 font-bold rounded-full border border-blue-200 dark:border-blue-800">02 LIVE</span>
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-700/60 rounded-lg border border-slate-200/80 dark:border-slate-700">
                    <p className="font-serif font-bold text-slate-900 dark:text-slate-100">Surgery Day {progress?.currentDay} Plan Active</p>
                    <p className="text-slate-600 dark:text-slate-300 text-xs mt-0.5">Objective daily tasks are aligned with morning rounds requirements.</p>
                  </div>
                  <div className="p-3 bg-blue-50/80 dark:bg-blue-950/40 rounded-lg border border-blue-200/80 dark:border-blue-900/50">
                    <p className="font-serif font-bold text-blue-900 dark:text-blue-200">Spaced Revision Priority</p>
                    <p className="text-blue-800 dark:text-blue-300 text-xs mt-0.5">Small Bowel Obstruction is scheduled for a 5-min review.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all shadow-xs"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* USER PROFILE & LOGOUT DROPDOWN */}
          <div className="relative pl-1 border-l border-slate-200 dark:border-slate-700">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowNotifications(false);
                  }}
                  className="flex items-center space-x-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80 px-3 py-1.5 rounded-lg transition-all shadow-xs group"
                >
                  <div className="w-6 h-6 rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 flex items-center justify-center font-serif font-bold text-xs shrink-0">
                    {user.name ? user.name.charAt(0) : (user.email ? user.email.charAt(0).toUpperCase() : 'U')}
                  </div>
                  <div className="hidden md:block text-left text-xs leading-tight">
                    <p className="font-serif font-bold truncate max-w-[110px] text-slate-900 dark:text-slate-100">{user.name || 'Clinical Scholar'}</p>
                    <p className="text-[10px] font-serif opacity-70 truncate max-w-[110px] text-slate-700 dark:text-slate-300">{user.email || 'user@medschool.edu'}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70 text-slate-700 dark:text-slate-300" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 shadow-xl z-50 animate-in fade-in duration-150 space-y-3 text-left font-serif">
                    <div className="pb-2 border-b border-slate-200 dark:border-slate-700 text-xs space-y-0.5">
                      <p className="font-serif font-bold text-slate-900 dark:text-slate-100 truncate">{user.name || 'Clinical Scholar'}</p>
                      <p className="text-[11px] font-serif opacity-70 truncate text-slate-600 dark:text-slate-400">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-serif font-bold uppercase px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 rounded border border-blue-200 dark:border-blue-800">
                        {user.studentType === 'resident' ? 'RESIDENT' : (user.academicYear ? `YEAR ${user.academicYear.replace('year_', '')} MED STUDENT` : 'CLINICAL SCHOLAR')}
                      </span>
                    </div>

                    <div className="space-y-1 pt-1">
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate('/profile');
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-serif font-semibold flex items-center space-x-2 bg-slate-50 dark:bg-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg transition-all"
                      >
                        <User className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                        <span>Profile & Settings</span>
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-xs font-serif font-semibold flex items-center space-x-2 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 border border-rose-200 dark:border-rose-800/60 rounded-lg transition-all"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Logout Session</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-3.5 py-1.5 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 rounded-lg font-serif font-semibold text-xs hover:bg-slate-800 transition-all shadow-xs flex items-center space-x-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Global Command-K Search Modal */}
      <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} title="Search Knowledge Base (⌘K)" maxWidth="max-w-xl">
        <div className="space-y-4 font-serif">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-blue-700" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (Appendicitis), cases, questions..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-serif focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {searchQuery.trim() === '' ? (
            <div className="text-center py-8 text-slate-400 text-xs font-serif">
              Type clinical query (e.g. "Appendicitis", "Obstruction", "Fever")...
            </div>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {filteredTopics.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-serif font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Topics ({filteredTopics.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredTopics.map(t => (
                      <button
                        key={t.id}
                        onClick={() => handleSelectResult(`/rotation/topics/${t.id}`)}
                        className="w-full text-left p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-500 transition-all group shadow-xs"
                      >
                        <p className="font-serif font-bold text-xs text-slate-900 dark:text-slate-100 group-hover:text-blue-700">{t.title}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{t.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredCases.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-serif font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ClipboardList className="w-3.5 h-3.5" /> Clinical Cases ({filteredCases.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredCases.map(c => (
                      <button
                        key={c.id}
                        onClick={() => handleSelectResult(`/cases`)}
                        className="w-full text-left p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-500 transition-all group shadow-xs"
                      >
                        <p className="font-serif font-bold text-xs text-slate-900 dark:text-slate-100 group-hover:text-blue-700">{c.title}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{c.typicalPresentation}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredQuestions.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-serif font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" /> Attending Questions ({filteredQuestions.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredQuestions.map(q => (
                      <button
                        key={q.id}
                        onClick={() => handleSelectResult(`/questions`)}
                        className="w-full text-left p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-500 transition-all group shadow-xs"
                      >
                        <p className="font-serif font-bold text-xs text-slate-900 dark:text-slate-100 group-hover:text-blue-700">{q.question}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredTopics.length === 0 && filteredCases.length === 0 && filteredQuestions.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-xs font-serif">
                  No clinical matches for "{searchQuery}".
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

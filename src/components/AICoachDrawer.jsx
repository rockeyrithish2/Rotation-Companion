import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, ArrowRight, RotateCcw, Cpu } from 'lucide-react';
import { askRotationCoach } from '../lib/ai/coach';
import { useRotation } from '../context/RotationContext';

export function AICoachDrawer() {
  const { progress } = useRotation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Greetings Alex. I am your AI Rotation Coach for ${progress?.rotation?.name || 'General Surgery'}.\n\nWhat clinical topic or rounding prep shall we execute?`
    }
  ]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const promptSuggestions = [
    "Prepare me for tomorrow's rounds",
    "What should I revise today?",
    "Quiz me on today's topic",
    "I have 20 minutes. What should I study?"
  ];

  const handleSend = async (textToSend) => {
    const prompt = textToSend || query;
    if (!prompt.trim() || loading) return;

    setMessages(prev => [...prev, { role: 'user', content: prompt }]);
    setQuery('');
    setLoading(true);

    const res = await askRotationCoach(prompt);
    setMessages(prev => [...prev, { role: 'assistant', content: res }]);
    setLoading(false);
  };

  return (
    <>
      {/* Persistent Floating AI Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-blue-700 text-white border border-blue-800 rounded-full shadow-lg font-serif font-semibold text-xs tracking-wider flex items-center space-x-2 hover:bg-blue-800 transition-all hover:scale-105"
        aria-label="Ask AI Rotation Coach"
      >
        <Sparkles className="w-4 h-4 text-amber-300" />
        <span>AI Coach</span>
      </button>

      {/* Slide-Up Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150 font-serif">
          <div className="w-full sm:max-w-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[700px] animate-in slide-in-from-bottom duration-200">
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-700 text-white flex items-center justify-center font-bold text-xs rounded-xl shadow-xs">
                  AI
                </div>
                <div>
                  <h3 className="text-sm font-serif font-bold text-slate-900 dark:text-slate-100 tracking-tight">AI Clinical Assistant</h3>
                  <p className="text-[11px] font-serif font-semibold text-blue-700 dark:text-blue-400">System Online • {progress?.rotation?.name || 'Surgery'}</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Prompt Shortcuts */}
            <div className="px-4 py-2.5 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center space-x-2 overflow-x-auto no-scrollbar">
              {promptSuggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sug)}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-lg text-xs font-serif font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-slate-700 shrink-0 transition-colors"
                >
                  "{sug}"
                </button>
              ))}
            </div>

            {/* Chat Body */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex items-start space-x-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-7 h-7 bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 rounded-lg shadow-xs">
                      🩺
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-xl border text-xs font-serif leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-blue-700 text-white border-blue-700 font-semibold'
                        : 'bg-slate-50 dark:bg-slate-700/60 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center space-x-2 text-xs font-serif font-semibold text-blue-700 dark:text-blue-400">
                  <div className="w-3.5 h-3.5 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing clinical diagnostics...</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Query AI Coach..."
                className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-serif text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <button
                type="submit"
                disabled={!query.trim() || loading}
                className="px-4 py-2.5 bg-blue-700 disabled:opacity-50 text-white font-serif font-semibold text-xs rounded-xl hover:bg-blue-800 transition-colors shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

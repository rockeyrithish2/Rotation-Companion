import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, ArrowRight } from 'lucide-react';
import { askRotationCoach } from '../lib/ai/coach';
import { useRotation } from '../context/RotationContext';

export function AICoachPage() {
  const { progress } = useRotation();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello! I am your AI Rotation Coach for ${progress?.rotation?.name || 'General Surgery'} (Day ${progress?.currentDay || 12} of ${progress?.totalDays || 28}).\n\nHow can I help prepare you for rounds, clinical presentations, or upcoming quizzes today?`
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const promptShortcuts = [
    "I have rounds tomorrow. What should I revise?",
    "I haven't studied much this week. What should I prioritize?",
    "What questions could I be asked about appendicitis?",
    "I saw a patient with jaundice. What topics should I review?",
    "What should I know before starting pediatrics?"
  ];

  const handleSend = async (queryText) => {
    const text = queryText || inputQuery;
    if (!text.trim() || loading) return;

    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    const reply = await askRotationCoach(text);
    setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200 font-serif text-slate-900 dark:text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-blue-700 dark:text-blue-400" />
            <span>AI Rotation Coach</span>
          </h1>
          <p className="text-xs sm:text-sm font-serif text-slate-600 dark:text-slate-400 mt-1">
            Personalized, context-aware clinical rotation tutor & rounds advisor.
          </p>
        </div>
      </div>

      {/* Quick Prompt Shortcuts */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1 font-serif">
        {promptShortcuts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3.5 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-xs font-serif text-slate-700 dark:text-slate-300 whitespace-nowrap shrink-0 transition-colors shadow-xs"
          >
            "{prompt}"
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 min-h-[450px] flex flex-col justify-between shadow-xs font-serif">
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
              )}

              <div
                className={`p-4 rounded-xl max-w-2xl text-xs sm:text-sm leading-relaxed font-serif ${
                  m.role === 'user'
                    ? 'bg-blue-700 text-white font-semibold shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-700/60 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {m.content}
              </div>

              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 font-serif">
                  ME
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-xs font-serif font-semibold text-blue-700 dark:text-blue-400">
              <div className="w-4 h-4 rounded-full border-2 border-blue-700 border-t-transparent animate-spin" />
              <span>Rotation Coach is preparing personalized guidance...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2 font-serif">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask your Rotation Coach anything..."
            className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-serif text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || loading}
            className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-serif font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <span>Ask Coach</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

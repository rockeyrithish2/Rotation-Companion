import React, { useState } from 'react';
import { Sparkles, Send, Brain, Award, RotateCcw, ShieldCheck, CheckCircle2, ChevronRight, Cpu } from 'lucide-react';
import { ATTENDING_SCENARIOS, processAttendingTurn } from '../lib/ai/attending';
import { useRotation } from '../context/RotationContext';

export function AIAttendingPage() {
  const { progress } = useRotation();

  const [scenarioIndex, setScenarioIndex] = useState(0);
  const currentScenario = ATTENDING_SCENARIOS[scenarioIndex] || ATTENDING_SCENARIOS[0];

  const [turnCount, setTurnCount] = useState(1);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: currentScenario.initialPrompt
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    const updatedMsgs = [...messages, { role: 'user', content: userMsg }];
    setMessages(updatedMsgs);
    setLoading(true);

    const reply = await processAttendingTurn({
      scenarioId: currentScenario.id,
      conversationHistory: updatedMsgs,
      userResponse: userMsg,
      turnCount
    });

    setLoading(false);
    setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    setTurnCount(prev => prev + 1);
  };

  const handleRestart = () => {
    const nextIdx = (scenarioIndex + 1) % ATTENDING_SCENARIOS.length;
    setScenarioIndex(nextIdx);
    const newScen = ATTENDING_SCENARIOS[nextIdx];
    setTurnCount(1);
    setMessages([
      {
        role: 'assistant',
        content: newScen.initialPrompt
      }
    ]);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200 font-serif text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-serif font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">Socratic AI Rounds Engine</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mt-0.5">
            <Cpu className="w-6 h-6 text-blue-700 dark:text-blue-400" />
            <span>AI Attending Rounds Simulator</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-serif mt-1">
            Simulate high-stakes attending questioning during morning rounds.
          </p>
        </div>

        <button
          onClick={handleRestart}
          className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 font-serif font-semibold text-xs flex items-center gap-1.5 shadow-xs"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Next Scenario</span>
        </button>
      </div>

      {/* Main Chat Workspace */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-6 min-h-[500px] flex flex-col justify-between shadow-xs">
        {/* Chat History */}
        <div className="space-y-4 overflow-y-auto flex-1 max-h-[550px] pr-2 font-serif">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  👨‍⚕️
                </div>
              )}

              <div
                className={`p-4 rounded-xl max-w-xl text-xs sm:text-sm leading-relaxed font-serif ${
                  m.role === 'user'
                    ? 'bg-blue-700 text-white font-semibold shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-700/60 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex items-center space-x-3 text-blue-700 dark:text-blue-400 font-serif text-xs">
              <div className="w-7 h-7 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 flex items-center justify-center font-bold">
                ●
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-700 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-700 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="flex items-center gap-2 pt-2 font-serif">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="State your answer, differential, or next diagnostic step..."
            className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-serif text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-5 py-2.5 bg-blue-700 disabled:opacity-50 text-white font-serif font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5 hover:bg-blue-800 transition-colors"
          >
            <span>Submit</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HelpCircle, Filter, Sparkles, Check, ChevronDown, Award } from 'lucide-react';
import { getQuestions, saveQuizAttempt } from '../lib/db/storage';
import { QUESTION_DIFFICULTIES } from '../lib/db/schema';
import { useRotation } from '../context/RotationContext';

export function QuestionBankPage() {
  const { progress } = useRotation();
  const rotationId = progress?.rotation?.id || 'general-surgery';
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [revealedIds, setRevealedIds] = useState([]);
  const [ratings, setRatings] = useState({});

  const questions = getQuestions(rotationId, selectedDifficulty === 'ALL' ? null : selectedDifficulty);

  const toggleReveal = (id) => {
    setRevealedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleRating = (qId, level) => {
    setRatings(prev => ({ ...prev, [qId]: level }));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200 font-serif text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <HelpCircle className="w-7 h-7 text-amber-600" />
            <span>Attending Question Bank</span>
          </h1>
          <p className="text-xs sm:text-sm font-serif text-slate-600 dark:text-slate-400 mt-1">
            Practice questions commonly asked by attendings and senior residents during morning rounds.
          </p>
        </div>

        <NavLink
          to="/quiz"
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-700 text-white font-serif font-semibold text-xs shadow-xs hover:bg-blue-800 transition-all"
        >
          <Award className="w-4 h-4" />
          <span>Take Custom Quiz</span>
        </NavLink>
      </div>

      {/* Difficulty Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1 font-serif">
        <button
          onClick={() => setSelectedDifficulty('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-serif font-semibold transition-all ${
            selectedDifficulty === 'ALL'
              ? 'bg-blue-700 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          All Difficulties ({questions.length})
        </button>

        {QUESTION_DIFFICULTIES.map(diff => (
          <button
            key={diff.id}
            onClick={() => setSelectedDifficulty(diff.id)}
            className={`px-4 py-2 rounded-xl text-xs font-serif font-semibold transition-all ${
              selectedDifficulty === diff.id
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            {diff.badge}
          </button>
        ))}
      </div>

      {/* Questions Flashcards */}
      <div className="space-y-4 font-serif">
        {questions.map((q) => {
          const isRevealed = revealedIds.includes(q.id);
          const rating = ratings[q.id];
          const diffObj = QUESTION_DIFFICULTIES.find(d => d.id === q.difficulty) || QUESTION_DIFFICULTIES[0];

          return (
            <div
              key={q.id}
              className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs hover:border-blue-500 transition-all font-serif"
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-serif font-bold px-3 py-0.5 rounded-full border ${diffObj.color}`}>
                  {diffObj.badge}
                </span>
              </div>

              <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
                "{q.question}"
              </h3>

              {!isRevealed ? (
                <button
                  onClick={() => toggleReveal(q.id)}
                  className="px-4 py-2 bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-serif font-semibold text-xs rounded-lg hover:bg-blue-100 border border-blue-200 dark:border-blue-800 transition-colors"
                >
                  [Reveal Answer]
                </button>
              ) : (
                <div className="space-y-4 animate-in fade-in duration-200 font-serif">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 rounded-xl space-y-1">
                    <p className="text-xs font-serif font-bold text-emerald-900 dark:text-emerald-300">Attending Answer:</p>
                    <p className="text-xs font-serif text-slate-800 dark:text-slate-200 leading-relaxed">{q.answer}</p>
                    {q.explanation && (
                      <p className="text-[11px] font-serif text-slate-500 mt-2 italic">{q.explanation}</p>
                    )}
                  </div>

                  {/* Rating Feedback */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-700 font-serif">
                    <span className="text-xs font-serif font-semibold text-slate-600 dark:text-slate-400">Was this question easy for you?</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleRating(q.id, 'easy')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-serif font-semibold transition-all ${
                          rating === 'easy' ? 'bg-emerald-700 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        😎 Easy
                      </button>
                      <button
                        onClick={() => handleRating(q.id, 'okay')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-serif font-semibold transition-all ${
                          rating === 'okay' ? 'bg-amber-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        🙂 Okay
                      </button>
                      <button
                        onClick={() => handleRating(q.id, 'difficult')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-serif font-semibold transition-all ${
                          rating === 'difficult' ? 'bg-rose-700 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        😵 Difficult
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

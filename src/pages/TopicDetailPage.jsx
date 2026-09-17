import React, { useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  HelpCircle, 
  ClipboardList, 
  Sparkles, 
  Check 
} from 'lucide-react';
import { getTopicById } from '../lib/db/storage';
import { useRotation } from '../context/RotationContext';
import { useAuth } from '../context/AuthContext';

export function TopicDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const topic = getTopicById(id);
  const { handleTopicToggle } = useRotation();
  const { user } = useAuth();

  const [revealedQuestions, setRevealedQuestions] = useState([]);

  if (!topic) {
    return (
      <div className="p-8 text-center space-y-4 font-serif">
        <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">Topic Not Found</h2>
        <NavLink to="/rotation/topics" className="text-xs font-serif font-bold text-blue-700">Back to Topics Library</NavLink>
      </div>
    );
  }

  const isCompleted = (user?.completedTopicIds || []).includes(topic.id);
  const content = topic.content || {};

  const toggleQuestionReveal = (idx) => {
    setRevealedQuestions(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200 font-serif text-slate-900 dark:text-slate-100">
      {/* Navigation Top */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-1.5 text-xs font-serif font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Topics</span>
        </button>

        <button
          onClick={() => handleTopicToggle(topic.id)}
          className={`px-4 py-2 rounded-xl text-xs font-serif font-semibold transition-all flex items-center space-x-1.5 ${
            isCompleted 
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300' 
              : 'bg-blue-700 text-white hover:bg-blue-800 shadow-xs'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>{isCompleted ? 'Topic Completed ✓' : 'Mark Topic Complete'}</span>
        </button>
      </div>

      {/* Header Info */}
      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs font-serif">
        <div className="flex items-center space-x-3 text-xs font-serif font-bold text-slate-500">
          <span className="text-amber-600">Importance: {'★'.repeat(topic.importance)}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-blue-700" /> {topic.estimatedTimeMin} min read</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100">{topic.title}</h1>
        <p className="text-xs sm:text-sm font-serif text-slate-600 dark:text-slate-300 leading-relaxed">{topic.description}</p>
      </div>

      {/* MANDATORY Clinical Disclaimer */}
      <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 rounded-xl flex items-start space-x-3 text-xs font-serif text-amber-900 dark:text-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-serif font-bold">Medical Education Safety Notice</p>
          <p className="mt-0.5 opacity-90 font-serif">Verify clinical information against your institution's protocols and trusted medical references (e.g., UpToDate, Harrison's, Sabiston).</p>
        </div>
      </div>

      {/* 11 STRUCTURED CONTENT SECTIONS */}
      <div className="space-y-6 font-serif">
        {/* Section 1: What is it? */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 shadow-xs">
          <h2 className="text-xs font-serif font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">1. What is it?</h2>
          <p className="text-sm font-serif text-slate-800 dark:text-slate-200 leading-relaxed">{content.whatIsIt}</p>
        </div>

        {/* Section 2: Why it matters */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 shadow-xs">
          <h2 className="text-xs font-serif font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">2. Why it matters</h2>
          <p className="text-sm font-serif text-slate-800 dark:text-slate-200 leading-relaxed">{content.whyItMatters}</p>
        </div>

        {/* Section 3: Typical presentation */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 shadow-xs">
          <h2 className="text-xs font-serif font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">3. Typical presentation</h2>
          <p className="text-sm font-serif text-slate-800 dark:text-slate-200 leading-relaxed">{content.typicalPresentation}</p>
        </div>

        {/* Section 4: History Points */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 shadow-xs">
          <h2 className="text-xs font-serif font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">4. Important history points</h2>
          <p className="text-sm font-serif text-slate-800 dark:text-slate-200 leading-relaxed">{content.importantHistory}</p>
        </div>

        {/* Section 5: Examination Concepts */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 shadow-xs">
          <h2 className="text-xs font-serif font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">5. Important examination concepts</h2>
          <p className="text-sm font-serif text-slate-800 dark:text-slate-200 leading-relaxed">{content.importantExam}</p>
        </div>

        {/* Section 6: Investigations */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 shadow-xs">
          <h2 className="text-xs font-serif font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">6. Common investigation concepts</h2>
          <p className="text-sm font-serif text-slate-800 dark:text-slate-200 leading-relaxed">{content.investigations}</p>
        </div>

        {/* Section 7: Differential Diagnosis */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 shadow-xs">
          <h2 className="text-xs font-serif font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">7. Differential diagnosis</h2>
          <p className="text-sm font-serif text-slate-800 dark:text-slate-200 leading-relaxed">{content.differentialDiagnosis}</p>
        </div>

        {/* Section 8: Complications */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 shadow-xs">
          <h2 className="text-xs font-serif font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">8. Common complications</h2>
          <p className="text-sm font-serif text-slate-800 dark:text-slate-200 leading-relaxed">{content.complications}</p>
        </div>

        {/* Section 9: Key Learning Points */}
        {content.keyLearningPoints && (
          <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3 shadow-md font-serif">
            <h2 className="text-xs font-serif font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>9. Key Learning Points</span>
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm font-serif">
              {content.keyLearningPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Section 10: Common Questions */}
        {content.commonQuestions && (
          <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs font-serif">
            <h2 className="text-xs font-serif font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <span>10. Common Attending Questions</span>
            </h2>
            <div className="space-y-3 font-serif">
              {content.commonQuestions.map((q, idx) => {
                const isRevealed = revealedQuestions.includes(idx);
                return (
                  <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-700/60 rounded-xl space-y-2 border border-slate-200 dark:border-slate-600">
                    <p className="text-xs font-serif font-bold text-slate-900 dark:text-slate-100">Q: {q}</p>
                    <button
                      onClick={() => toggleQuestionReveal(idx)}
                      className="text-[11px] font-serif font-bold text-blue-700 dark:text-blue-400 hover:underline"
                    >
                      {isRevealed ? 'Hide Answer' : 'Reveal Answer'}
                    </button>
                    {isRevealed && (
                      <p className="text-xs font-serif text-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 p-2.5 rounded-lg border border-emerald-200">
                        {q}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Practice CTA */}
      <div className="p-6 bg-blue-700 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md font-serif">
        <div>
          <h3 className="text-lg font-serif font-bold">Ready to test your knowledge on {topic.title}?</h3>
          <p className="text-xs font-serif opacity-90">Practice attending questions or simulate Socratic rounds with AI.</p>
        </div>
        <NavLink
          to="/questions"
          className="px-6 py-2.5 bg-white text-blue-800 font-serif font-semibold text-xs rounded-xl hover:bg-slate-100 transition-colors shrink-0 shadow-xs"
        >
          Practice Questions Now
        </NavLink>
      </div>
    </div>
  );
}

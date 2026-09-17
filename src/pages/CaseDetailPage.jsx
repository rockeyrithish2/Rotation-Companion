import React, { useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { ClipboardList, ArrowLeft, Eye, HelpCircle, CheckCircle2, Sparkles, ChevronDown } from 'lucide-react';
import { getCaseById } from '../lib/db/storage';

export function CaseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const caseItem = getCaseById(id) || getCaseById('case-surg-1');

  // Progressive disclosure steps (0 to 4)
  const [step, setStep] = useState(0);

  if (!caseItem) {
    return (
      <div className="p-8 text-center space-y-4 font-serif">
        <h2 className="text-xl font-serif font-bold">Case Not Found</h2>
        <NavLink to="/cases" className="text-xs font-serif font-bold text-blue-700">Back to Cases</NavLink>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200 font-serif text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          onClick={() => navigate('/cases')}
          className="inline-flex items-center space-x-1.5 text-xs font-serif font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Clinical Cases</span>
        </button>

        <span className="text-xs font-serif font-bold text-blue-700 bg-blue-50 dark:bg-blue-950 dark:text-blue-300 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
          Progressive Case Study
        </span>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-6 shadow-xs">
        <div className="space-y-1">
          <span className="text-[10px] font-serif font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200">
            {caseItem.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 pt-1">{caseItem.title}</h1>
        </div>

        {/* STEP 1: INITIAL PRESENTATION */}
        <div className="p-5 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600 space-y-2">
          <h3 className="text-xs font-serif font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">Step 1: Patient Presentation</h3>
          <p className="text-sm font-serif font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">{caseItem.typicalPresentation}</p>
          
          {step === 0 && (
            <div className="pt-3">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-serif font-semibold text-xs rounded-lg shadow-xs flex items-center gap-1.5 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>[Think About It — What Would You Ask?]</span>
              </button>
            </div>
          )}
        </div>

        {/* STEP 2: IMPORTANT HISTORY */}
        {step >= 1 && (
          <div className="p-5 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600 space-y-2 animate-in fade-in duration-300">
            <h3 className="text-xs font-serif font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">Step 2: Key History Points</h3>
            <p className="text-xs sm:text-sm font-serif text-slate-800 dark:text-slate-200 leading-relaxed">{caseItem.importantHistory}</p>

            {step === 1 && (
              <div className="pt-3">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white font-serif font-semibold text-xs rounded-lg shadow-xs flex items-center gap-1.5 transition-all"
                >
                  <Eye className="w-4 h-4" />
                  <span>[Reveal Physical Exam Concepts]</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: PHYSICAL EXAM */}
        {step >= 2 && (
          <div className="p-5 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600 space-y-2 animate-in fade-in duration-300">
            <h3 className="text-xs font-serif font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Step 3: Physical Examination & Vitals</h3>
            <p className="text-xs sm:text-sm font-serif text-slate-800 dark:text-slate-200 leading-relaxed">{caseItem.examinationConcepts}</p>

            {step === 2 && (
              <div className="pt-3">
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-serif font-semibold text-xs rounded-lg shadow-xs flex items-center gap-1.5 transition-all"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>[Reveal Differential Diagnosis & Labs]</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 4: DIFFERENTIAL DIAGNOSIS & INVESTIGATIONS */}
        {step >= 3 && (
          <div className="p-5 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600 space-y-3 animate-in fade-in duration-300">
            <h3 className="text-xs font-serif font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Step 4: Differential Diagnosis & Investigations</h3>
            <div className="space-y-2 text-xs sm:text-sm font-serif">
              <p><strong>Differential:</strong> {caseItem.differentialDiagnosis}</p>
              <p><strong>Investigations:</strong> {caseItem.investigationConcepts}</p>
            </div>

            {step === 3 && (
              <div className="pt-3">
                <button
                  onClick={() => setStep(4)}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-serif font-semibold text-xs rounded-lg shadow-xs flex items-center gap-1.5 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>[Reveal Management & Rounds Questions]</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: MANAGEMENT PRINCIPLES & ROUNDS QUESTIONS */}
        {step >= 4 && (
          <div className="p-6 bg-slate-900 text-white rounded-xl space-y-4 animate-in fade-in duration-300 shadow-md font-serif">
            <h3 className="text-xs font-serif font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>Step 5: Definitive Management & Rounds Questions</span>
            </h3>

            <p className="text-xs sm:text-sm leading-relaxed">{caseItem.managementPrinciples}</p>

            {caseItem.commonQuestionsOnRounds && (
              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <p className="font-bold text-amber-300">Common Attending Questions on Rounds:</p>
                <ul className="space-y-1.5 text-slate-300">
                  {caseItem.commonQuestionsOnRounds.map((q, idx) => (
                    <li key={idx}>• {q}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Brain, Sparkles, Send, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { PRESENTATION_SECTIONS, evaluateCasePresentation } from '../lib/ai/presentation';

export function PresentationTrainerPage() {
  const [fieldValues, setFieldValues] = useState({
    intro: '45-year-old male with history of type 2 diabetes and hypertension',
    cc: '2 days of progressive right upper quadrant abdominal pain following fatty meal',
    hpi: 'Pain is colicky, 7/10 in severity, radiating to right scapula. Associated with nausea and 1 episode of bilious emesis. No fever or change in bowel habits.',
    pmh: 'Type 2 Diabetes (5 yrs), HTN (10 yrs), Hyperlipidemia',
    meds: 'Metformin 1000mg BID, Lisinopril 10mg daily, Atorvastatin 20mg daily',
    allergies: 'No Known Drug Allergies (NKDA)',
    fh: 'Mother had cholecystectomy at age 52. Father had CAD.',
    sh: 'Non-smoker, 1-2 glasses of wine weekly, works as high school teacher.',
    exam: 'Vitals: BP 138/84, HR 88, RR 16, Temp 37.8°C, SpO2 98% room air. Abdomen: Soft, tender in RUQ with inspiratory arrest on deep palpation (Positive Murphy sign).',
    investigations: 'CBC: WBC 12.8k. LFTs: Mild AST/ALT elevation, Alk Phos 140, Total Bili 1.2. RUQ Ultrasound: Gallbladder wall thickening (4mm), pericholecystic fluid, acoustic shadowing gallstones.',
    assessment: '45yo male with T2DM presenting with acute onset RUQ pain, positive Murphy sign, leukocytosis, and US findings diagnostic of Acute Cholecystitis.',
    ddx: '1. Acute Cholecystitis (leading), 2. Choledocholithiasis, 3. Peptic Ulcer Disease, 4. Acute Pancreatitis',
    plan: '1. Admit to General Surgery. 2. NPO, IV fluid resuscitation (LR). 3. IV Ceftriaxone + Metronidazole. 4. Schedule Laparoscopic Cholecystectomy within 24-48 hours.'
  });

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleInputChange = (id, val) => {
    setFieldValues(prev => ({ ...prev, [id]: val }));
  };

  const handleEvaluate = async (e) => {
    e.preventDefault();
    setIsEvaluating(true);
    const res = await evaluateCasePresentation(fieldValues);
    setFeedback(res);
    setIsEvaluating(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200 font-serif text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Brain className="w-7 h-7 text-blue-700 dark:text-blue-400" />
            <span>Case Presentation Trainer</span>
          </h1>
          <p className="text-xs sm:text-sm font-serif text-slate-600 dark:text-slate-400 mt-1">
            Rehearse 2-minute oral patient handoffs using our 13-part structured clinical template.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: 13-Part Form */}
        <form onSubmit={handleEvaluate} className="space-y-4">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs">
            <h2 className="text-sm font-serif font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Structured Handoff Template</h2>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {PRESENTATION_SECTIONS.map((sec) => (
                <div key={sec.id} className="space-y-1">
                  <label className="block text-xs font-serif font-bold text-slate-700 dark:text-slate-300">{sec.label}</label>
                  <textarea
                    rows={2}
                    value={fieldValues[sec.id] || ''}
                    onChange={(e) => handleInputChange(sec.id, e.target.value)}
                    placeholder={sec.placeholder}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-serif text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={isEvaluating}
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-serif font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center space-x-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isEvaluating ? 'Evaluating Presentation...' : 'Evaluate Case Presentation'}</span>
            </button>
          </div>
        </form>

        {/* Right: AI Feedback Report */}
        <div className="space-y-4">
          {!feedback && !isEvaluating && (
            <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
              <Brain className="w-12 h-12 text-blue-700 mx-auto" />
              <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">Ready to Evaluate</h3>
              <p className="text-xs font-serif text-slate-500">
                Fill out the 13 clinical presentation fields on the left and click Evaluate to receive instant AI feedback on structure, completeness, and reasoning.
              </p>
            </div>
          )}

          {isEvaluating && (
            <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs">
              <div className="w-10 h-10 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-serif font-semibold text-slate-700 dark:text-slate-300">Analyzing oral handoff structure & pertinent clinical data...</p>
            </div>
          )}

          {feedback && !isEvaluating && (
            <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs animate-in fade-in duration-200">
              <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed font-serif">
                {feedback}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

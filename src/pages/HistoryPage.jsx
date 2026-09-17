import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Award, CheckCircle2, Sparkles, ArrowRight, Save, Plus } from 'lucide-react';
import { getRotationHistory, completeCurrentRotation } from '../lib/db/storage';
import { DEFAULT_ROTATIONS } from '../lib/db/schema';
import { useRotation } from '../context/RotationContext';
import { useAuth } from '../context/AuthContext';
import { Modal } from '../components/ui/Modal';

export function HistoryPage() {
  const { user } = useAuth();
  const { progress, changeRotation } = useRotation();
  const navigate = useNavigate();
  const [history, setHistory] = useState(() => getRotationHistory(user?.id));
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showNextModal, setShowNextModal] = useState(false);
  const [nextRotationId, setNextRotationId] = useState('pediatrics');

  const handleFinishRotation = async () => {
    await completeCurrentRotation(user?.id);
    setHistory(getRotationHistory(user?.id));
    setShowCompletionModal(true);
  };

  const handleStartNext = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const endStr = new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    changeRotation(nextRotationId, todayStr, endStr);
    setShowNextModal(false);
    setShowCompletionModal(false);
    navigate('/dashboard');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200 font-serif text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <History className="w-7 h-7 text-blue-700 dark:text-blue-400" />
            <span>Rotation History & Timeline</span>
          </h1>
          <p className="text-xs sm:text-sm font-serif text-slate-600 dark:text-slate-400 mt-1">
            Preserve your clinical metrics, logged cases, and quiz records across completed rotation blocks.
          </p>
        </div>

        <button
          onClick={handleFinishRotation}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-700 text-white font-serif font-semibold text-xs shadow-xs hover:bg-emerald-800 transition-all"
        >
          <Award className="w-4 h-4" />
          <span>Complete Current Rotation</span>
        </button>
      </div>

      {/* Rotation Timeline */}
      <div className="space-y-6 font-serif">
        <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100">Clinical Rotation Timeline</h2>

        <div className="space-y-4 font-serif">
          {history.map((record) => (
            <div
              key={record.id}
              className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 text-2xl flex items-center justify-center font-bold">
                    {record.icon || '🩺'}
                  </div>
                  <div>
                    <span className="text-[10px] font-serif font-bold uppercase text-emerald-800 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      ✓ {record.status} ({record.totalDays} Days)
                    </span>
                    <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 mt-1">{record.rotationName}</h3>
                  </div>
                </div>

                <div className="text-xs font-serif text-slate-500">
                  Completed on {record.completedAt}
                </div>
              </div>

              {/* Summary Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 font-serif">
                <div className="p-3 bg-slate-50 dark:bg-slate-700/60 rounded-xl text-center border border-slate-200 dark:border-slate-600">
                  <p className="text-[10px] font-serif text-slate-500 uppercase font-bold">Topics</p>
                  <p className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">{record.topicsCompleted}</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-700/60 rounded-xl text-center border border-slate-200 dark:border-slate-600">
                  <p className="text-[10px] font-serif text-slate-500 uppercase font-bold">Cases Logged</p>
                  <p className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">{record.casesLogged}</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-700/60 rounded-xl text-center border border-slate-200 dark:border-slate-600">
                  <p className="text-[10px] font-serif text-slate-500 uppercase font-bold">Skills</p>
                  <p className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">{record.skillsMastered}</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-700/60 rounded-xl text-center border border-slate-200 dark:border-slate-600">
                  <p className="text-[10px] font-serif text-slate-500 uppercase font-bold">Questions</p>
                  <p className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">{record.questionsAnswered}</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-700/60 rounded-xl text-center col-span-2 sm:col-span-1 border border-slate-200 dark:border-slate-600">
                  <p className="text-[10px] font-serif text-slate-500 uppercase font-bold">Quiz Average</p>
                  <p className="text-base font-serif font-bold text-blue-700 dark:text-blue-400">{record.quizAverage}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROTATION COMPLETE CELEBRATION MODAL */}
      <Modal isOpen={showCompletionModal} onClose={() => setShowCompletionModal(false)} title="Rotation Complete 🎉">
        <div className="space-y-6 text-center py-4 font-serif">
          <div className="w-16 h-16 rounded-2xl bg-blue-700 text-white flex items-center justify-center text-3xl mx-auto shadow-xs">
            🎉
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">
              {progress?.rotation?.name} Completed!
            </h2>
            <p className="text-xs font-serif text-slate-500">28 Days of clinical learning and hospital rounds finalized.</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-xl text-left space-y-2 text-xs font-serif">
            <p className="font-serif font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[10px]">Your Strongest Areas:</p>
            <p className="text-slate-700 dark:text-slate-300">✓ Acute Abdominal Triage, Laparoscopic Surgical Concepts, Peritoneal Physical Exams</p>

            <p className="font-serif font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[10px] pt-2">Areas to Keep Reviewing:</p>
            <p className="text-slate-700 dark:text-slate-300">⚡ Small Bowel Obstruction air-fluid level thresholds & Post-Op Fever POD timeline</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setShowCompletionModal(false)}
              className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-serif font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Rotation</span>
            </button>

            <button
              onClick={() => setShowNextModal(true)}
              className="flex-1 py-2.5 bg-blue-700 text-white font-serif font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 hover:bg-blue-800 transition-colors"
            >
              <span>Start Next Rotation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Modal>

      {/* START NEXT ROTATION SELECTION MODAL */}
      <Modal isOpen={showNextModal} onClose={() => setShowNextModal(false)} title="Start Your Next Specialty Rotation">
        <div className="space-y-6 py-2 font-serif">
          <p className="text-xs font-serif text-slate-500">Select the specialty block for your next clinical rotation:</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[40vh] overflow-y-auto pr-1">
            {DEFAULT_ROTATIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setNextRotationId(r.id)}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  nextRotationId === r.id
                    ? 'bg-blue-50 border-blue-700 text-blue-900 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="text-xl mb-1">{r.icon}</span>
                <span className="text-xs font-serif font-bold truncate">{r.name}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setShowNextModal(false)}
              className="px-4 py-2 text-xs font-serif font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleStartNext}
              className="px-6 py-2 bg-blue-700 text-white font-serif font-semibold text-xs rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <span>Initialize Block</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

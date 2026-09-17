import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Clock, BookOpen, CheckCircle2 } from 'lucide-react';
import { useRotation } from '../context/RotationContext';
import { Modal } from '../components/ui/Modal';

export function CalendarPage() {
  const { progress } = useRotation();
  const [sessions, setSessions] = useState([
    { id: 1, date: '2026-08-12', topic: 'Acute Appendicitis & Alvarado Score', duration: '30 min', type: 'Study Session', notes: 'Review Alvarado score thresholds (≥7) for morning rounds.' },
    { id: 2, date: '2026-08-13', topic: 'Small Bowel Obstruction Plain Film Evaluation', duration: '20 min', type: 'Revision', notes: 'Look for >3cm dilated small bowel loops in step-ladder configuration.' },
    { id: 3, date: '2026-08-14', topic: 'Post-Op Fever 5 Ws & Wound Inspection', duration: '15 min', type: 'Skill Practice', notes: 'Practice inspecting dressings on POD 5 patients.' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newDuration, setNewDuration] = useState('20 min');
  const [newNotes, setNewNotes] = useState('');

  const handleAddSession = (e) => {
    e.preventDefault();
    if (!newTopic) return;

    setSessions(prev => [
      ...prev,
      { id: Date.now(), date: newDate, topic: newTopic, duration: newDuration, type: 'Study Session', notes: newNotes }
    ]);
    setIsModalOpen(false);
    setNewTopic('');
    setNewNotes('');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200 font-serif text-slate-900 dark:text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <CalendarIcon className="w-7 h-7 text-blue-700 dark:text-blue-400" />
            <span>Rotation Calendar & Planner</span>
          </h1>
          <p className="text-xs sm:text-sm font-serif text-slate-600 dark:text-slate-400 mt-1">
            Map out daily study sessions, scheduled revisions, and clinical notes for {progress?.rotation?.name || 'General Surgery'}.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-700 text-white font-serif font-semibold text-xs shadow-xs hover:bg-blue-800 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Learning Session</span>
        </button>
      </div>

      {/* Scheduled Sessions List */}
      <div className="space-y-4 font-serif">
        <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100">Scheduled Learning Sessions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sessions.map((s) => (
            <div key={s.id} className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-serif font-bold uppercase px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {s.type}
                </span>
                <span className="text-xs font-serif text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-700" /> {s.duration}
                </span>
              </div>

              <div>
                <span className="text-xs font-serif font-bold text-blue-700 dark:text-blue-400">{s.date}</span>
                <h3 className="text-sm font-serif font-bold text-slate-900 dark:text-slate-100 mt-0.5">{s.topic}</h3>
              </div>

              {s.notes && (
                <p className="text-xs font-serif text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/60 p-3 rounded-lg border border-slate-200 dark:border-slate-600">
                  {s.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Session Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Scheduled Learning Session">
        <form onSubmit={handleAddSession} className="space-y-4 font-serif">
          <div>
            <label className="block text-xs font-serif font-bold text-slate-700 dark:text-slate-300 mb-1">Topic Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Biliary Colic vs Acute Cholecystitis"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-serif text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-serif font-bold text-slate-700 dark:text-slate-300 mb-1">Date</label>
              <input
                type="date"
                required
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-serif text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-bold text-slate-700 dark:text-slate-300 mb-1">Duration</label>
              <input
                type="text"
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-serif text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-serif font-bold text-slate-700 dark:text-slate-300 mb-1">Personal Notes</label>
            <textarea
              rows={2}
              placeholder="e.g. Focus on Ultrasound acoustic shadowing findings..."
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-serif text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-serif font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-700 text-white font-serif font-semibold text-xs rounded-lg shadow-xs"
            >
              Add Session
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

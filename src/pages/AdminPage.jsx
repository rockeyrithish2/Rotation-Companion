import React, { useState } from 'react';
import { ShieldCheck, Plus, BookOpen, Stethoscope, Users, Award } from 'lucide-react';
import { getRotations, addCustomRotation, getTopics } from '../lib/db/storage';
import { Modal } from '../components/ui/Modal';

export function AdminPage() {
  const [rotations, setRotations] = useState(() => getRotations());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('🩺');
  const [days, setDays] = useState(28);
  const [category, setCategory] = useState('Subspecialty');
  const [description, setDescription] = useState('');

  const handleAddRotation = (e) => {
    e.preventDefault();
    if (!name) return;

    addCustomRotation({ name, icon, defaultDays: days, category, description });
    setRotations(getRotations());
    setIsModalOpen(false);
    setName('');
    setDescription('');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200 font-serif text-slate-900 dark:text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-blue-700 dark:text-blue-400" />
            <span>Administrator Hub</span>
          </h1>
          <p className="text-xs sm:text-sm font-serif text-slate-600 dark:text-slate-400 mt-1">
            Manage institutional rotations, educational topic libraries, and system curriculum.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-700 text-white font-serif font-semibold text-xs shadow-xs hover:bg-blue-800 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Rotation</span>
        </button>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-serif">
        <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1 shadow-xs">
          <Stethoscope className="w-5 h-5 text-blue-700" />
          <div className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">{rotations.length}</div>
          <p className="text-slate-500 font-serif font-semibold uppercase text-[10px]">Rotations</p>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1 shadow-xs">
          <BookOpen className="w-5 h-5 text-emerald-700" />
          <div className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">450+</div>
          <p className="text-slate-500 font-serif font-semibold uppercase text-[10px]">Total Topics</p>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1 shadow-xs">
          <Users className="w-5 h-5 text-indigo-700" />
          <div className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">1,240</div>
          <p className="text-slate-500 font-serif font-semibold uppercase text-[10px]">Active Students</p>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1 shadow-xs">
          <Award className="w-5 h-5 text-amber-700" />
          <div className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">94%</div>
          <p className="text-slate-500 font-serif font-semibold uppercase text-[10px]">Satisfaction</p>
        </div>
      </div>

      {/* Rotations Management Table */}
      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs font-serif">
        <h2 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">Configured Specialty Rotations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rotations.map(r => (
            <div key={r.id} className="p-4 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xl">{r.icon}</span>
                <span className="text-[10px] font-serif font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full">{r.category}</span>
              </div>
              <h3 className="text-sm font-serif font-bold text-slate-900 dark:text-slate-100">{r.name}</h3>
              <p className="text-xs font-serif text-slate-600 dark:text-slate-400 line-clamp-2">{r.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Rotation Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Institutional Rotation">
        <form onSubmit={handleAddRotation} className="space-y-4 font-serif">
          <div>
            <label className="block text-xs font-serif font-bold text-slate-700 dark:text-slate-300 mb-1">Rotation Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Vascular Surgery"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-serif text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-serif font-bold text-slate-700 dark:text-slate-300 mb-1">Icon (Emoji)</label>
              <input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-serif text-center text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-bold text-slate-700 dark:text-slate-300 mb-1">Default Days</label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-serif text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-serif text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-serif font-bold text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <textarea
              rows={2}
              placeholder="e.g. Master peripheral arterial disease, aortic aneurysms, and vascular access..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              Save Rotation
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

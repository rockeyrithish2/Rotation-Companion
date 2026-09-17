import React, { useState } from 'react';
import { Activity, ShieldAlert, Check } from 'lucide-react';
import { getSkills, updateSkillStatus } from '../lib/db/storage';
import { SKILL_CATEGORIES } from '../lib/db/schema';
import { useRotation } from '../context/RotationContext';

export function SkillsPage() {
  const { progress } = useRotation();
  const rotationId = progress?.rotation?.id || 'general-surgery';
  const [skills, setSkills] = useState(() => getSkills(rotationId));
  const [activeCategory, setActiveCategory] = useState('ALL');

  const journeyStages = [
    { id: 'NOT_STARTED', label: '01. Untouched' },
    { id: 'OBSERVED', label: '02. Observed' },
    { id: 'ASSISTED', label: '03. Assisted' },
    { id: 'SUPERVISED', label: '04. Supervised' },
    { id: 'CONFIDENT', label: '05. Confident' }
  ];

  const handleStageClick = (skillId, targetStageId) => {
    updateSkillStatus(skillId, targetStageId);
    setSkills(getSkills(rotationId));
  };

  const filteredSkills = activeCategory === 'ALL'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto space-y-8 font-serif animate-in fade-in duration-150 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
        <span className="text-xs font-serif font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">05 // Clinical Competency System</span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight flex items-center gap-3">
          <Activity className="w-8 h-8 text-blue-700 dark:text-blue-400" />
          <span>Skill Mastery Matrix</span>
        </h1>
        <p className="text-xs sm:text-sm font-serif text-slate-600 dark:text-slate-400 max-w-2xl">
          Progressive matrix across history taking, physical exams, and supervised procedures.
        </p>
      </div>

      {/* Safety Notice */}
      <div className="p-5 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40 rounded-xl space-y-1 font-serif">
        <div className="flex items-center space-x-2 font-serif font-bold text-xs uppercase">
          <ShieldAlert className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0" />
          <span>Supervision Safety Requirements</span>
        </div>
        <p className="text-xs font-serif opacity-95">
          Perform procedures only when authorized, trained, and directly supervised according to local hospital protocols.
        </p>
      </div>

      {/* Category Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1 font-serif">
        <button
          onClick={() => setActiveCategory('ALL')}
          className={`px-4 py-2 text-xs font-serif font-semibold rounded-xl border transition-colors whitespace-nowrap ${
            activeCategory === 'ALL'
              ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          All Skills ({skills.length})
        </button>

        {SKILL_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-serif font-semibold rounded-xl border transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skill Matrix List */}
      <div className="space-y-4 font-serif">
        {filteredSkills.map((skill) => {
          const currentStageIndex = journeyStages.findIndex(st => st.id === skill.status);

          return (
            <div
              key={skill.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xs font-serif"
            >
              <div className="space-y-1 max-w-md">
                <span className="text-[9px] font-serif font-bold text-blue-800 bg-blue-50 dark:bg-blue-950 dark:text-blue-300 px-2.5 py-0.5 rounded border border-blue-200">
                  {skill.category}
                </span>
                <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 pt-1">{skill.title}</h3>
                <p className="text-xs font-serif text-slate-600 dark:text-slate-400">{skill.description}</p>
              </div>

              {/* Horizontal Skill Stage Matrix Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-50 dark:bg-slate-700/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 font-serif">
                {journeyStages.map((stage, idx) => {
                  const isReached = idx <= currentStageIndex;
                  const isCurrent = idx === currentStageIndex;

                  return (
                    <button
                      key={stage.id}
                      onClick={() => handleStageClick(skill.id, stage.id)}
                      className={`p-2 rounded-lg border text-center font-serif font-semibold text-[10px] transition-colors ${
                        isCurrent
                          ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                          : isReached
                            ? 'bg-slate-900 text-white border-slate-900 dark:bg-slate-200 dark:text-slate-900'
                            : 'bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div>{stage.label}</div>
                      <div className="text-[9px] mt-0.5">{isCurrent ? '[ACTIVE]' : isReached ? '✓' : '—'}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

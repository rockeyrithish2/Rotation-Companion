import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ClipboardList, Search, ArrowRight, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { getCases } from '../lib/db/storage';
import { useRotation } from '../context/RotationContext';

export function CasesPage() {
  const { progress } = useRotation();
  const rotationId = progress?.rotation?.id || 'general-surgery';
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const cases = getCases(rotationId);

  const categories = ['ALL', 'Acute Abdomen', 'Abdominal Wall / Hernia', 'Pulmonology', 'Cardiology'];

  const filteredCases = cases.filter(c => {
    const matchesCat = selectedCategory === 'ALL' || c.category === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.typicalPresentation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200 font-serif text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ClipboardList className="w-7 h-7 text-blue-700 dark:text-blue-400" />
          <span>Clinical Cases Library</span>
        </h1>
        <p className="text-xs sm:text-sm font-serif text-slate-600 dark:text-slate-400 max-w-2xl">
          Learn from common clinical presentations you will encounter during hospital rounds and emergency triage.
        </p>

        {/* Search */}
        <div className="relative max-w-md pt-2">
          <Search className="absolute left-3.5 top-5 w-4 h-4 text-blue-700 dark:text-blue-400" />
          <input
            type="text"
            placeholder="Search clinical cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-serif text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1 font-serif">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-serif font-semibold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Case Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-serif">
        {filteredCases.map((c) => (
          <div key={c.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-3 group flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-serif font-bold uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {c.category}
                </span>
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-700 transition-colors">{c.title}</h3>
              <p className="text-xs font-serif text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                {c.typicalPresentation}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end">
              <NavLink
                to={`/rotation/cases/${c.id}`}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-serif font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
              >
                <span>Interactive Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

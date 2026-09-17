import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  ArrowRight,
  Search,
  Check,
  Flame,
  Zap
} from 'lucide-react';
import { useRotation } from '../context/RotationContext';
import { getTopics } from '../lib/db/storage';
import { useAuth } from '../context/AuthContext';

export function RotationHubPage() {
  const { progress, handleTopicToggle } = useRotation();
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchFilter, setSearchFilter] = useState('');

  const rotationId = progress?.rotation?.id || 'general-surgery';
  const topics = getTopics(rotationId);
  const completedTopicIds = user?.completedTopicIds || [];

  const categoryChips = [
    'ALL',
    'Gastroenterology',
    'Cardiology',
    'Respiratory',
    'Renal',
    'Neurology',
    'Endocrine'
  ];

  const filteredTopics = topics.filter(t => 
    t.title.toLowerCase().includes(searchFilter.toLowerCase()) || 
    t.description.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const recommendedTopic = topics.find(t => !completedTopicIds.includes(t.id)) || topics[0];

  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto space-y-8 font-serif animate-in fade-in duration-150 text-slate-900 dark:text-slate-100">
      {/* Top Header */}
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
        <span className="text-xs font-serif font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">03 // Knowledge System Repository</span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight">
          What Do You Want to Learn?
        </h1>
        <p className="text-xs sm:text-sm font-serif text-slate-600 dark:text-slate-400">
          Objective clinical modules & attending concept frameworks for {progress?.rotation?.name}.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl pt-4">
          <Search className="absolute left-4 top-7 w-4 h-4 text-blue-700 dark:text-blue-400" />
          <input
            type="text"
            placeholder="Search topics, symptoms, or surgical procedures..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-serif text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs"
          />
        </div>
      </div>

      {/* RECOMMENDED FOR YOU CARD */}
      {recommendedTopic && (
        <div className="border border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 p-6 sm:p-8 space-y-4 shadow-xs font-serif">
          <div className="flex items-center justify-between">
            <span className="text-xs font-serif font-bold text-blue-800 bg-blue-50 dark:bg-blue-950 dark:text-blue-300 px-3 py-1 rounded-full border border-blue-200">
              RECOMMENDED FOR DAY {progress?.currentDay || 12}
            </span>

            <span className="text-xs font-serif font-semibold text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-700" /> {recommendedTopic.estimatedTimeMin} MIN READ
            </span>
          </div>

          <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100 tracking-tight">{recommendedTopic.title}</h2>
          <p className="text-xs font-serif text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">{recommendedTopic.description}</p>

          <div className="pt-2">
            <NavLink
              to={`/rotation/topics/${recommendedTopic.id}`}
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-blue-700 text-white font-serif font-semibold text-xs rounded-xl shadow-xs hover:bg-blue-800 transition-all"
            >
              <span>Study Topic Module</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      )}

      {/* Category Chips */}
      <div className="space-y-3 font-serif">
        <h3 className="text-xs font-serif font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">Specialty Categories</h3>
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
          {categoryChips.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveCategory(chip)}
              className={`px-4 py-2 text-xs font-serif font-semibold rounded-xl border transition-all whitespace-nowrap ${
                activeCategory === chip
                  ? 'bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="space-y-4 font-serif">
        <h3 className="text-xs font-serif font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Topic Repository Grid ({filteredTopics.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTopics.map((topic) => {
            const isCompleted = completedTopicIds.includes(topic.id);
            return (
              <div 
                key={topic.id}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                    <span className="text-[10px] font-serif font-bold text-blue-800 bg-blue-50 dark:bg-blue-950 dark:text-blue-300 px-2 py-0.5 rounded border border-blue-200">
                      HIGH YIELD ★★★
                    </span>
                    <span className="text-xs font-serif text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-blue-700" /> {topic.estimatedTimeMin} MIN
                    </span>
                  </div>

                  <h4 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-700 transition-colors">
                    {topic.title}
                  </h4>
                  <p className="text-xs font-serif text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">{topic.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <button
                    onClick={() => handleTopicToggle(topic.id)}
                    className={`flex items-center space-x-1.5 text-xs font-serif font-semibold transition-colors ${
                      isCompleted ? 'text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Check className={`w-4 h-4 ${isCompleted ? 'text-blue-700' : ''}`} />
                    <span>{isCompleted ? 'Completed ✓' : 'Mark Done'}</span>
                  </button>

                  <NavLink
                    to={`/rotation/topics/${topic.id}`}
                    className="px-4 py-2 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:bg-blue-700 text-xs font-serif font-semibold rounded-lg flex items-center gap-1 transition-all"
                  >
                    <span>Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

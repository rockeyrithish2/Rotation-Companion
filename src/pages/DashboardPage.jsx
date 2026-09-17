import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Stethoscope, 
  HelpCircle, 
  ClipboardList, 
  Activity, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  ChevronRight,
  Zap,
  Play,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRotation } from '../context/RotationContext';
import { askRotationCoach } from '../lib/ai/coach';
import { Modal } from '../components/ui/Modal';
import { HandDrawnButton } from '../components/ui/HandDrawnButton';
import { HandDrawnCard } from '../components/ui/HandDrawnCard';

export function DashboardPage() {
  const { user } = useAuth();
  const { progress, dailyPlan, completedTaskIds, toggleTaskCompletion } = useRotation();
  const navigate = useNavigate();

  const [aiBriefing, setAiBriefing] = useState(null);
  const [loadingBrief, setLoadingBrief] = useState(false);

  // Focused Session Mode State
  const [isSessionModeOpen, setIsSessionModeOpen] = useState(false);
  const [sessionStep, setSessionStep] = useState(0);

  const iconMap = {
    Brain: Brain,
    Stethoscope: Stethoscope,
    MessageCircle: HelpCircle,
    Clipboard: ClipboardList,
    Activity: Activity
  };

  const handleGenerateBriefing = async () => {
    setLoadingBrief(true);
    const brief = await askRotationCoach('What should I know, what should I do, and what should I learn today during my rotation?');
    setAiBriefing(brief);
    setLoadingBrief(false);
  };

  const tasks = dailyPlan?.tasks || [];
  const activeTask = tasks[sessionStep] || tasks[0];

  const handleNextSessionStep = () => {
    if (activeTask) {
      toggleTaskCompletion(activeTask.id);
    }
    if (sessionStep < tasks.length - 1) {
      setSessionStep(prev => prev + 1);
    } else {
      setIsSessionModeOpen(false);
      setSessionStep(0);
    }
  };

  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto space-y-10 font-serif animate-in fade-in duration-150 text-slate-900 dark:text-slate-100">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-serif font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
            <span>01 // Clinical Workstation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            Good Morning, <span className="text-blue-700 dark:text-blue-400">{user?.name?.split(' ')[0] || 'Alex'}</span>
          </h1>
          <p className="text-sm font-serif text-slate-600 dark:text-slate-400 pt-0.5">
            Objective Clinical Rotation Framework • Day {progress?.currentDay || 12}
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <HandDrawnButton
            onClick={() => { setIsSessionModeOpen(true); setSessionStep(0); }}
            variant="accent"
            size="md"
            icon={Play}
          >
            Start Today Session
          </HandDrawnButton>

          <button
            onClick={handleGenerateBriefing}
            disabled={loadingBrief}
            className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-xs"
            title="Generate AI Briefing"
          >
            <Sparkles className="w-4 h-4 text-blue-700 dark:text-blue-400" />
          </button>
        </div>
      </div>

      {/* CURRENT ROTATION HERO CARD */}
      {progress && (
        <HandDrawnCard variant="default" className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center font-serif font-bold text-2xl shadow-xs">
                {progress.rotation.icon}
              </div>
              <div>
                <span className="text-xs font-serif font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">ACTIVE BLOCK</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 tracking-tight">{progress.rotation.name}</h2>
              </div>
            </div>

            <div className="flex items-center space-x-6 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl text-xs font-serif">
              <div>
                <p className="text-[10px] font-serif font-bold uppercase text-slate-500">STATUS</p>
                <p className="text-base font-serif font-bold text-blue-700 dark:text-blue-400">DAY {progress.currentDay} / {progress.totalDays}</p>
              </div>
              <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />
              <div>
                <p className="text-[10px] font-serif font-bold uppercase text-slate-500">REMAINING</p>
                <p className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">{progress.daysRemaining} DAYS</p>
              </div>
            </div>
          </div>

          {/* Interactive 4-Week Grid Roadmap */}
          <div className="space-y-3 pt-1">
            <div className="flex justify-between text-xs font-serif font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              <span>Rotation Roadmap Grid</span>
              <span className="text-blue-700 dark:text-blue-400">{progress.progressPercent}% Completed</span>
            </div>

            {/* Timeline Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-blue-700 dark:bg-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progress.progressPercent}%` }}
              />
            </div>

            {/* 4 Week Grid Milestones */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-serif font-semibold text-center">
              <div className="p-2.5 rounded-lg border border-slate-900 bg-slate-900 text-white shadow-xs">W1: Foundations ✓</div>
              <div className="p-2.5 rounded-lg border border-blue-700 bg-blue-700 text-white shadow-xs">W2: Cases (Active) ●</div>
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200">W3: Skills</div>
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200">W4: Review</div>
            </div>
          </div>
        </HandDrawnCard>
      )}

      {/* AI DAILY BRIEFING DISPLAY */}
      {aiBriefing && (
        <HandDrawnCard variant="postit" className="space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center space-x-2 text-amber-900 dark:text-amber-300 font-serif font-bold text-sm uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>AI Clinical Briefing Generated</span>
          </div>
          <div className="prose max-w-none text-sm leading-relaxed text-amber-950 dark:text-amber-100 font-serif">
            {aiBriefing}
          </div>
        </HandDrawnCard>
      )}

      {/* TODAY'S FOCUS WORKSPACE */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-serif font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">02 // Clinical Action Plan</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-700 dark:text-blue-400 fill-blue-700 dark:fill-blue-400" />
              <span>What Should I Do Today?</span>
            </h2>
            <p className="text-xs font-serif text-slate-600 dark:text-slate-400 mt-0.5">
              Targeted tasks for {progress?.rotation?.name} — Day {progress?.currentDay}
            </p>
          </div>

          <span className="text-xs font-serif font-bold text-slate-900 bg-slate-100 dark:bg-slate-800 dark:text-slate-100 px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
            {completedTaskIds.length} / {tasks.length} COMPLETED
          </span>
        </div>

        {/* Task Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, idx) => {
            const IconComponent = iconMap[task.icon] || Brain;
            const isDone = completedTaskIds.includes(task.id);

            return (
              <HandDrawnCard 
                key={task.id}
                variant={isDone ? 'muted' : 'default'}
                hoverEffect={true}
                className="flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-serif font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                        {task.category}
                      </span>
                    </div>

                    <span className="flex items-center space-x-1 text-xs font-serif text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
                      <span>{task.estimatedTime}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-lg font-serif font-bold ${isDone ? 'line-through opacity-60 text-slate-500' : 'text-slate-900 dark:text-slate-100'}`}>
                      {task.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-serif mt-2 line-clamp-3 leading-relaxed">
                      {task.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  {/* Checkmark Toggle */}
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="flex items-center space-x-2 text-xs font-serif font-semibold cursor-pointer"
                  >
                    <div className={`w-5 h-5 rounded border border-slate-300 dark:border-slate-600 flex items-center justify-center transition-all ${
                      isDone 
                        ? 'bg-blue-700 text-white border-blue-700' 
                        : 'bg-white dark:bg-slate-800'
                    }`}>
                      {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className="font-serif text-xs text-slate-700 dark:text-slate-300">
                      {isDone ? 'Done ✓' : 'Mark Done'}
                    </span>
                  </button>

                  <NavLink
                    to={task.link}
                    className="px-3.5 py-1.5 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:bg-blue-700 text-xs font-serif font-semibold rounded-lg flex items-center space-x-1 transition-all shadow-xs"
                  >
                    <span>{task.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </NavLink>
                </div>
              </HandDrawnCard>
            );
          })}
        </div>
      </div>

      {/* QUICK STATS METRICS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
        <NavLink to="/rotation/topics">
          <HandDrawnCard variant="default" hoverEffect={true} className="p-4 border-l-4 border-l-blue-700">
            <div className="text-blue-700 dark:text-blue-400 font-serif font-bold text-xs uppercase tracking-wider mb-1">01. Topics Repository</div>
            <div className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">32 <span className="text-xs font-serif text-slate-500">/ 50</span></div>
            <p className="text-xs font-serif text-slate-500 mt-1 uppercase">64% Coverage</p>
          </HandDrawnCard>
        </NavLink>

        <NavLink to="/cases">
          <HandDrawnCard variant="default" hoverEffect={true} className="p-4 border-l-4 border-l-emerald-700">
            <div className="text-emerald-700 dark:text-emerald-400 font-serif font-bold text-xs uppercase tracking-wider mb-1">02. Cases Logged</div>
            <div className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">18</div>
            <p className="text-xs font-serif text-slate-500 mt-1 uppercase">De-Identified Logs</p>
          </HandDrawnCard>
        </NavLink>

        <NavLink to="/skills">
          <HandDrawnCard variant="default" hoverEffect={true} className="p-4 border-l-4 border-l-amber-600">
            <div className="text-amber-700 dark:text-amber-400 font-serif font-bold text-xs uppercase tracking-wider mb-1">03. Skills Matrix</div>
            <div className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">14 <span className="text-xs font-serif text-slate-500">/ 25</span></div>
            <p className="text-xs font-serif text-slate-500 mt-1 uppercase">Supervised & Confident</p>
          </HandDrawnCard>
        </NavLink>

        <NavLink to="/questions">
          <HandDrawnCard variant="default" hoverEffect={true} className="p-4 border-l-4 border-l-indigo-700">
            <div className="text-indigo-700 dark:text-indigo-400 font-serif font-bold text-xs uppercase tracking-wider mb-1">04. Attending Qs</div>
            <div className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">182</div>
            <p className="text-xs font-serif text-slate-500 mt-1 uppercase">Rounds Question Bank</p>
          </HandDrawnCard>
        </NavLink>
      </div>

      {/* FOCUSED DAILY SESSION MODE MODAL */}
      <Modal isOpen={isSessionModeOpen} onClose={() => setIsSessionModeOpen(false)} title="Today's Focused Clinical Session" maxWidth="max-w-xl">
        {activeTask && (
          <div className="space-y-6 text-center py-2 animate-in fade-in duration-150 font-serif">
            <div className="flex items-center justify-between text-xs font-serif font-bold text-slate-500 border-b border-slate-200 dark:border-slate-700 pb-3">
              <span>Task {sessionStep + 1} of {tasks.length}</span>
              <span className="text-blue-700 dark:text-blue-400 uppercase font-bold">{activeTask.category}</span>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-serif font-bold text-2xl mx-auto shadow-sm">
              🧠
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100 tracking-tight">{activeTask.title}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 font-serif max-w-sm mx-auto">{activeTask.subtitle}</p>
              <p className="text-xs text-blue-700 dark:text-blue-400 font-serif font-semibold pt-1 uppercase">Estimated Time: {activeTask.estimatedTime}</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <NavLink
                to={activeTask.link}
                onClick={() => setIsSessionModeOpen(false)}
                className="flex-1 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-serif font-semibold text-sm rounded-lg flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-all shadow-xs"
              >
                <span>Open Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </NavLink>

              <HandDrawnButton
                onClick={handleNextSessionStep}
                variant="accent"
                size="md"
                className="flex-1"
              >
                <span>Complete & Continue</span>
                <ChevronRight className="w-4 h-4" />
              </HandDrawnButton>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

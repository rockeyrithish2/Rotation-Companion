import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, ArrowRight, X, ShieldCheck } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { getItem, KEYS } from '../lib/db/storage';

export function LocalDataMigrationModal() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user || !isSupabaseConfigured) return;

    // Check if legacy local data exists
    const hasLocalUser = localStorage.getItem(`rc_user_${user.id}`);
    const hasLocalCases = localStorage.getItem(`rc_logged_cases_${user.id}`);
    const alreadyMigrated = localStorage.getItem(`rc_${user.id}_migrated_to_supabase`);

    if ((hasLocalUser || hasLocalCases) && !alreadyMigrated) {
      setIsOpen(true);
    }
  }, [user]);

  const handleImport = async () => {
    if (!user || !user.id) return;
    setMigrating(true);

    try {
      // 1. Migrate Local Logged Cases
      const localCases = getItem(KEYS.LOGGED_CASES, [], user.id);
      if (localCases.length > 0) {
        const payload = localCases.map(c => ({
          user_id: user.id,
          rotation_id: c.rotationId || 'general-surgery',
          date: c.date || new Date().toISOString().split('T')[0],
          category: c.category || 'General Clinical',
          chief_complaint: c.chiefComplaint || '',
          diagnosis_category: c.diagnosisCategory || '',
          what_i_observed: c.observed || '',
          what_i_learned: c.learned || '',
          questions: c.questionsHad || '',
          topics_to_review: c.topicsToReview || []
        }));

        await supabase.from('logged_clinical_cases').insert(payload);
      }

      // 2. Migrate Topic Progress
      const localUser = getItem(KEYS.USER, {}, user.id);
      const completedTopicIds = localUser.completedTopicIds || [];
      if (completedTopicIds.length > 0) {
        const topicPayload = completedTopicIds.map(topicId => ({
          user_id: user.id,
          topic_id: topicId,
          status: 'completed',
          progress_percentage: 100
        }));

        await supabase.from('topic_progress').upsert(topicPayload);
      }

      // 3. Migrate Skill Mastery
      const localSkills = getItem(KEYS.SKILLS, []);
      const modifiedSkills = localSkills.filter(s => s.status && s.status !== 'NOT_STARTED');
      if (modifiedSkills.length > 0) {
        const skillPayload = modifiedSkills.map(s => ({
          user_id: user.id,
          skill_id: s.id,
          status: s.status
        }));

        await supabase.from('skill_mastery').upsert(skillPayload);
      }

      // Mark migration as completed locally for this user
      localStorage.setItem(`rc_${user.id}_migrated_to_supabase`, 'true');
      setMigrating(false);
      setSuccess(true);
      setTimeout(() => setIsOpen(false), 2000);
    } catch (e) {
      console.error('Data migration error:', e);
      setMigrating(false);
    }
  };

  const handleStartFresh = () => {
    if (user?.id) {
      localStorage.setItem(`rc_${user.id}_migrated_to_supabase`, 'true');
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 max-w-lg w-full p-6 space-y-6 text-slate-900 dark:text-slate-100 rounded-2xl shadow-xl font-serif">
        <div className="flex items-center space-x-3 border-b border-slate-200 dark:border-slate-700 pb-4">
          <div className="w-10 h-10 bg-blue-700 text-white flex items-center justify-center font-bold text-lg rounded-xl shadow-sm">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold uppercase tracking-tight">Local Data Discovered</h2>
            <p className="text-xs font-serif text-blue-700 dark:text-blue-400 font-semibold">Supabase Cloud Sync Available</p>
          </div>
        </div>

        {success ? (
          <div className="p-6 bg-slate-900 text-white rounded-xl text-center space-y-2 animate-in fade-in">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-base font-serif font-bold uppercase">Data Import Complete!</h3>
            <p className="text-xs font-serif text-slate-300">Your cases, skills, and progress are synced to Supabase.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm font-semibold leading-relaxed">
              We found existing Rotation Companion data stored in your local browser cache.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Would you like to import your local clinical case logs, completed topics, and skill levels into your cloud account?
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleImport}
                disabled={migrating}
                className="flex-1 py-3 bg-blue-700 text-white font-serif font-semibold text-xs rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {migrating ? 'Syncing Data...' : 'Import My Local Data'}
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleStartFresh}
                className="py-3 px-4 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-serif font-semibold text-xs rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                Start Fresh
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

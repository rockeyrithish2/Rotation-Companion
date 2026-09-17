import { supabase, isSupabaseConfigured } from '../supabase';
import { getItem, setItem, KEYS } from './storageUtils';
import { INITIAL_LOGGED_CASES } from './seedData';
import { DEFAULT_ROTATIONS } from './schema';

// Helper to get authenticated Supabase user ID
async function getAuthenticatedUser() {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase.auth.getUser();
    if (!error && data?.user?.id) {
      return data.user;
    }
  } catch (e) {
    console.warn('Could not fetch active Supabase auth user:', e);
  }
  return null;
}

// Helper to ensure rotation row exists in public.rotations to satisfy foreign key constraint
async function ensureRotationExists(rotationId) {
  if (!isSupabaseConfigured) return;
  try {
    const rotId = rotationId || 'general-surgery';
    const rot = DEFAULT_ROTATIONS.find(r => r.id === rotId) || {
      id: rotId,
      name: 'General Surgery',
      icon: '🔪',
      defaultDays: 28,
      category: 'Surgery',
      description: 'General surgical rotation'
    };

    await supabase.from('rotations').upsert([{
      id: rot.id,
      name: rot.name,
      description: rot.description || '',
      icon: rot.icon || '🩺',
      default_days: rot.defaultDays || 28,
      category: rot.category || 'Core'
    }], { onConflict: 'id' });
  } catch (e) {
    console.warn('Could not auto-ensure rotation in database:', e);
  }
}

export async function fetchLoggedCasesDB(userId, rotationId = null) {
  const authUser = await getAuthenticatedUser();
  const activeUserId = authUser?.id || (userId && userId.length > 20 ? userId : null);

  if (isSupabaseConfigured && activeUserId) {
    try {
      console.log('🔍 Querying Supabase logged_clinical_cases for user:', activeUserId);
      let query = supabase
        .from('logged_clinical_cases')
        .select('*')
        .eq('user_id', activeUserId)
        .order('date', { ascending: false });

      if (rotationId) {
        query = query.eq('rotation_id', rotationId);
      }

      const { data, error } = await query;
      if (error) {
        console.error('❌ Supabase SELECT error on logged_clinical_cases:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        return { error: error.message };
      } else if (Array.isArray(data)) {
        console.log(`✅ Supabase returned ${data.length} clinical case records for user ${activeUserId}`);
        const formatted = data.map(c => ({
          id: c.id,
          userId: c.user_id,
          date: c.date,
          rotationId: c.rotation_id,
          category: c.category,
          chiefComplaint: c.chief_complaint,
          diagnosisCategory: c.diagnosis_category,
          observed: c.what_i_observed,
          learned: c.what_i_learned,
          questionsHad: c.questions,
          topicsToReview: Array.isArray(c.topics_to_review) ? c.topics_to_review : []
        }));
        setItem(KEYS.LOGGED_CASES, formatted, activeUserId);
        return formatted;
      }
    } catch (e) {
      console.error('Failed to fetch logged cases from Supabase:', e);
      return { error: e.message };
    }
  }

  // Local fallback mode when Supabase is unconfigured or offline
  const logs = getItem(KEYS.LOGGED_CASES, activeUserId ? [] : INITIAL_LOGGED_CASES, activeUserId);
  if (!rotationId) return logs;
  return logs.filter(l => l.rotationId === rotationId);
}

export async function createLoggedCaseDB(userId, caseData) {
  const authUser = await getAuthenticatedUser();

  if (isSupabaseConfigured) {
    if (!authUser) {
      const authErr = 'No authenticated Supabase user session found. Please sign in to save case logs to the cloud database.';
      console.error('❌ INSERT Aborted:', authErr);
      return { error: authErr };
    }

    console.log('🔒 Authenticated Supabase User ID (UUID):', authUser.id);

    const rotationId = caseData.rotationId || 'general-surgery';
    
    // Auto-ensure target rotation row exists in public.rotations to satisfy FK constraint
    await ensureRotationExists(rotationId);

    const payload = {
      user_id: authUser.id,
      rotation_id: rotationId,
      date: caseData.date || new Date().toISOString().split('T')[0],
      category: caseData.category || 'General Clinical',
      chief_complaint: caseData.chiefComplaint || '',
      diagnosis_category: caseData.diagnosisCategory || '',
      what_i_observed: caseData.observed || '',
      what_i_learned: caseData.learned || '',
      questions: caseData.questionsHad || '',
      topics_to_review: Array.isArray(caseData.topicsToReview) ? caseData.topicsToReview : []
    };

    console.log('📦 INSERT payload for logged_clinical_cases:', payload);

    try {
      const { data, error } = await supabase
        .from('logged_clinical_cases')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.error('❌ Supabase INSERT error on logged_clinical_cases:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        return { error: `Database INSERT failed (${error.code || 'RLS/Schema'}): ${error.message}` };
      }

      if (data) {
        console.log('✅ Successfully inserted clinical case into Supabase PostgreSQL:', data.id);
        const newLog = {
          id: data.id,
          userId: data.user_id,
          date: data.date,
          rotationId: data.rotation_id,
          category: data.category,
          chiefComplaint: data.chief_complaint,
          diagnosisCategory: data.diagnosis_category,
          observed: data.what_i_observed,
          learned: data.what_i_learned,
          questionsHad: data.questions,
          topicsToReview: Array.isArray(data.topics_to_review) ? data.topics_to_review : []
        };

        const activeUid = authUser?.id || userId;
        const logs = getItem(KEYS.LOGGED_CASES, [], activeUid);
        logs.unshift(newLog);
        setItem(KEYS.LOGGED_CASES, logs, activeUid);
        return newLog;
      }
    } catch (e) {
      console.error('Failed to insert logged case into Supabase:', e);
      return { error: e.message || 'Database insert failed' };
    }
  }

  // Local fallback storage mode (Only when Supabase environment is unconfigured)
  const activeUid = authUser?.id || userId;
  const logs = getItem(KEYS.LOGGED_CASES, activeUid ? [] : INITIAL_LOGGED_CASES, activeUid);
  const newLog = {
    id: `log-${Date.now()}`,
    userId: activeUid || 'demo-user',
    date: caseData.date || new Date().toISOString().split('T')[0],
    rotationId: caseData.rotationId || 'general-surgery',
    category: caseData.category || 'General Clinical',
    chiefComplaint: caseData.chiefComplaint || '',
    diagnosisCategory: caseData.diagnosisCategory || '',
    observed: caseData.observed || '',
    learned: caseData.learned || '',
    questionsHad: caseData.questionsHad || '',
    topicsToReview: caseData.topicsToReview || []
  };
  logs.unshift(newLog);
  setItem(KEYS.LOGGED_CASES, logs, activeUid);
  return newLog;
}

export async function deleteLoggedCaseDB(userId, caseId) {
  const authUser = await getAuthenticatedUser();
  const activeUid = authUser?.id || userId;

  if (isSupabaseConfigured && authUser) {
    try {
      const { error } = await supabase
        .from('logged_clinical_cases')
        .delete()
        .eq('id', caseId)
        .eq('user_id', authUser.id);

      if (error) {
        console.error('❌ Supabase DELETE error on logged_clinical_cases:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        return { error: error.message };
      }
      console.log('✅ Successfully deleted clinical case from Supabase:', caseId);
      const logs = getItem(KEYS.LOGGED_CASES, [], activeUid);
      const filtered = logs.filter(l => l.id !== caseId);
      setItem(KEYS.LOGGED_CASES, filtered, activeUid);
      return { success: true };
    } catch (e) {
      console.warn('Failed to delete case from Supabase:', e);
      return { error: e.message };
    }
  }

  const logs = getItem(KEYS.LOGGED_CASES, [], activeUid);
  const filtered = logs.filter(l => l.id !== caseId);
  setItem(KEYS.LOGGED_CASES, filtered, activeUid);
  return { success: true };
}

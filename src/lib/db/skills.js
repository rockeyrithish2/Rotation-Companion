import { supabase, isSupabaseConfigured } from '../supabase';
import { getItem, setItem, KEYS } from './storageUtils';
import { INITIAL_SKILLS } from './seedData';


export async function fetchSkillMasteryDB(userId, rotationId = null) {
  if (isSupabaseConfigured && userId) {
    try {
      const { data, error } = await supabase
        .from('skill_mastery')
        .select('*')
        .eq('user_id', userId);

      if (!error && Array.isArray(data)) {
        const baseSkills = getItem(KEYS.SKILLS, INITIAL_SKILLS);
        const mapped = baseSkills.map(s => {
          const master = data.find(d => d.skill_id === s.id);
          return master ? { ...s, status: master.status } : s;
        });
        if (rotationId) return mapped.filter(s => s.rotationId === rotationId);
        return mapped;
      }
    } catch (e) {
      console.warn('Failed to fetch skill mastery from Supabase:', e);
    }
  }

  const baseSkills = getItem(KEYS.SKILLS, INITIAL_SKILLS);
  const userMastery = getItem('rc_skill_mastery', {}, userId);
  const result = baseSkills.map(s => userMastery[s.id] ? { ...s, status: userMastery[s.id] } : s);
  if (!rotationId) return result;
  return result.filter(s => s.rotationId === rotationId);
}

export async function updateSkillMasteryDB(userId, skillId, newStatus) {
  if (isSupabaseConfigured && userId) {
    try {
      await supabase
        .from('skill_mastery')
        .upsert({
          user_id: userId,
          skill_id: skillId,
          status: newStatus,
          updated_at: new Date().toISOString()
        });
    } catch (e) {
      console.warn('Failed to update skill mastery in Supabase:', e);
    }
  }

  const userMastery = getItem('rc_skill_mastery', {}, userId);
  userMastery[skillId] = newStatus;
  setItem('rc_skill_mastery', userMastery, userId);
  
  const baseSkills = getItem(KEYS.SKILLS, INITIAL_SKILLS);
  const found = baseSkills.find(s => s.id === skillId);
  return found ? { ...found, status: newStatus } : null;
}

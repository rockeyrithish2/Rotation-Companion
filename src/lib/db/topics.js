import { supabase, isSupabaseConfigured } from '../supabase';
import { getItem, setItem, KEYS } from './storageUtils';


export async function fetchTopicProgressDB(userId) {
  if (isSupabaseConfigured && userId) {
    try {
      const { data, error } = await supabase
        .from('topic_progress')
        .select('topic_id')
        .eq('user_id', userId)
        .eq('status', 'completed');

      if (!error && Array.isArray(data)) {
        const completedIds = data.map(d => d.topic_id);
        const user = getItem(KEYS.USER, {}, userId);
        setItem(KEYS.USER, { ...user, completedTopicIds: completedIds }, userId);
        return completedIds;
      }
    } catch (e) {
      console.warn('Failed to fetch topic progress from Supabase:', e);
    }
  }

  const user = getItem(KEYS.USER, {}, userId);
  return user.completedTopicIds || [];
}

export async function toggleTopicProgressDB(userId, topicId, isCompleted) {
  if (isSupabaseConfigured && userId) {
    try {
      if (isCompleted) {
        await supabase
          .from('topic_progress')
          .upsert({
            user_id: userId,
            topic_id: topicId,
            status: 'completed',
            progress_percentage: 100,
            completed_at: new Date().toISOString()
          });
      } else {
        await supabase
          .from('topic_progress')
          .delete()
          .eq('user_id', userId)
          .eq('topic_id', topicId);
      }
    } catch (e) {
      console.warn('Failed to toggle topic progress in Supabase:', e);
    }
  }

  const user = getItem(KEYS.USER, {}, userId);
  const completed = user.completedTopicIds || [];
  const exists = completed.includes(topicId);
  const updatedCompleted = exists ? completed.filter(id => id !== topicId) : [...completed, topicId];
  const updatedUser = { ...user, completedTopicIds: updatedCompleted };
  setItem(KEYS.USER, updatedUser, userId);
  return updatedCompleted;
}

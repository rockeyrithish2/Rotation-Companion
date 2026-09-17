/**
 * Shared storage key definitions and local storage primitives
 * (Prevents circular dependencies between storage.js and feature DB modules)
 */

export const KEYS = {
  USER: 'rc_user',
  ROTATIONS: 'rc_rotations',
  TOPICS: 'rc_topics',
  CASES: 'rc_cases',
  SKILLS: 'rc_skills',
  QUESTIONS: 'rc_questions',
  LOGGED_CASES: 'rc_logged_cases',
  DAILY_PLANS: 'rc_daily_plans',
  QUIZ_ATTEMPTS: 'rc_quiz_attempts',
  ROTATION_HISTORY: 'rc_rotation_history',
  AI_CONVERSATIONS: 'rc_ai_conversations',
  SETTINGS: 'rc_settings'
};

const SHARED_KEYS = new Set([
  KEYS.ROTATIONS,
  KEYS.TOPICS,
  KEYS.CASES,
  KEYS.SKILLS,
  KEYS.QUESTIONS
]);

export function getActiveUserId() {
  try {
    return localStorage.getItem('rc_active_user_id') || null;
  } catch (e) {
    return null;
  }
}

export function setActiveUserId(userId) {
  try {
    if (userId) {
      localStorage.setItem('rc_active_user_id', userId);
    } else {
      localStorage.removeItem('rc_active_user_id');
    }
  } catch (e) {
    console.error('Error setting active user ID in storage:', e);
  }
}

export function getScopedKey(baseKey, userId = null) {
  if (SHARED_KEYS.has(baseKey)) {
    return baseKey;
  }
  const uid = userId || getActiveUserId() || 'demo-user';
  return `${baseKey}_${uid}`;
}

export function getItem(baseKey, fallback, userId = null) {
  try {
    const key = getScopedKey(baseKey, userId);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.error(`Error reading ${baseKey} from storage:`, e);
    return fallback;
  }
}

export function setItem(baseKey, value, userId = null) {
  try {
    const key = getScopedKey(baseKey, userId);
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${baseKey} to storage:`, e);
  }
}

export function removeItem(baseKey, userId = null) {
  try {
    const key = getScopedKey(baseKey, userId);
    localStorage.removeItem(key);
  } catch (e) {
    console.error(`Error removing ${baseKey} from storage:`, e);
  }
}

export function getUserScopedData(userId = null) {
  const uid = userId || getActiveUserId() || 'demo-user';
  const result = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.endsWith(`_${uid}`) || SHARED_KEYS.has(key))) {
        result[key] = localStorage.getItem(key);
      }
    }
  } catch (e) {
    console.error('Error gathering user scoped data:', e);
  }
  return result;
}


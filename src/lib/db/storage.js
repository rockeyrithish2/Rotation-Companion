/**
 * Storage Engine & Data Management for Rotation Companion
 */

import { DEFAULT_ROTATIONS } from './schema';
import {
  INITIAL_TOPICS,
  INITIAL_CASES,
  INITIAL_SKILLS,
  INITIAL_QUESTIONS,
  INITIAL_DEMO_USER,
  INITIAL_LOGGED_CASES,
  INITIAL_HISTORICAL_ROTATIONS
} from './seedData';

import { fetchLoggedCasesDB, createLoggedCaseDB, deleteLoggedCaseDB } from './cases';

import { KEYS, getItem, setItem } from './storageUtils';
export { KEYS, getItem, setItem };



// Initialize default seed state if not present
export function initializeStorage() {
  if (!localStorage.getItem(KEYS.ROTATIONS)) {
    setItem(KEYS.ROTATIONS, DEFAULT_ROTATIONS);
  }
  if (!localStorage.getItem(KEYS.TOPICS)) {
    setItem(KEYS.TOPICS, INITIAL_TOPICS);
  }
  if (!localStorage.getItem(KEYS.CASES)) {
    setItem(KEYS.CASES, INITIAL_CASES);
  }
  if (!localStorage.getItem(KEYS.SKILLS)) {
    setItem(KEYS.SKILLS, INITIAL_SKILLS);
  }
  if (!localStorage.getItem(KEYS.QUESTIONS)) {
    setItem(KEYS.QUESTIONS, INITIAL_QUESTIONS);
  }
}

// USER API
export function getUser(userId = null) {
  return getItem(KEYS.USER, INITIAL_DEMO_USER, userId);
}

export function saveUser(userData, userId = null) {
  const current = getUser(userId);
  const updated = { ...current, ...userData };
  setItem(KEYS.USER, updated, userId);
  return updated;
}

// ROTATIONS API
export function getRotations() {
  return getItem(KEYS.ROTATIONS, DEFAULT_ROTATIONS);
}

export function getRotationById(id) {
  const rotations = getRotations();
  return rotations.find(r => r.id === id) || rotations[0];
}

export function addCustomRotation(newRotation) {
  const rotations = getRotations();
  const rotation = {
    id: `custom-rot-${Date.now()}`,
    name: newRotation.name,
    icon: newRotation.icon || '🩺',
    defaultDays: newRotation.defaultDays || 28,
    category: newRotation.category || 'Specialty',
    description: newRotation.description || 'Custom rotation created by user.'
  };
  rotations.push(rotation);
  setItem(KEYS.ROTATIONS, rotations);
  return rotation;
}

// TOPICS API
export function getTopics(rotationId = null) {
  const topics = getItem(KEYS.TOPICS, INITIAL_TOPICS);
  if (!rotationId) return topics;
  const filtered = topics.filter(t => t.rotationId === rotationId);
  return filtered.length > 0 ? filtered : topics;
}

export function getTopicById(id) {
  const topics = getItem(KEYS.TOPICS, INITIAL_TOPICS);
  return topics.find(t => t.id === id);
}

export function toggleTopicCompletion(topicId, userId = null) {
  const user = getUser(userId);
  const completed = user.completedTopicIds || [];
  const exists = completed.includes(topicId);
  const updatedCompleted = exists ? completed.filter(id => id !== topicId) : [...completed, topicId];
  
  saveUser({ completedTopicIds: updatedCompleted }, userId);
  return !exists;
}

// CASES API
export function getCases(rotationId = null) {
  const cases = getItem(KEYS.CASES, INITIAL_CASES);
  if (!rotationId) return cases;
  const filtered = cases.filter(c => c.rotationId === rotationId);
  return filtered.length > 0 ? filtered : cases;
}

export function getCaseById(id) {
  const cases = getItem(KEYS.CASES, INITIAL_CASES);
  return cases.find(c => c.id === id);
}

// LOGGED CASES (MY CASES) API
export async function getLoggedCases(rotationId = null, userId = null) {
  const user = getUser(userId);
  const activeUid = userId || user?.id;
  const dbCases = await fetchLoggedCasesDB(activeUid, rotationId);
  if (Array.isArray(dbCases) && !dbCases.error) {
    return dbCases;
  }
  const logs = getItem(KEYS.LOGGED_CASES, activeUid ? [] : INITIAL_LOGGED_CASES, activeUid);
  if (!rotationId) return logs;
  return logs.filter(l => l.rotationId === rotationId);
}

export async function addLoggedCase(caseData, userId = null) {
  const user = getUser(userId);
  const activeUid = userId || user?.id;
  const created = await createLoggedCaseDB(activeUid, caseData);
  return created;
}

export function updateLoggedCase(id, updatedFields, userId = null) {
  const user = getUser(userId);
  const activeUid = userId || user?.id;
  const logs = getItem(KEYS.LOGGED_CASES, [], activeUid);
  const index = logs.findIndex(l => l.id === id);
  if (index !== -1) {
    logs[index] = { ...logs[index], ...updatedFields };
    setItem(KEYS.LOGGED_CASES, logs, activeUid);
    return logs[index];
  }
  return null;
}

export async function deleteLoggedCase(id, userId = null) {
  const user = getUser(userId);
  const activeUid = userId || user?.id;
  await deleteLoggedCaseDB(activeUid, id);
  const logs = getItem(KEYS.LOGGED_CASES, [], activeUid);
  const filtered = logs.filter(l => l.id !== id);
  setItem(KEYS.LOGGED_CASES, filtered, activeUid);
  return true;
}

// SKILLS API
export function getSkills(rotationId = null) {
  const skills = getItem(KEYS.SKILLS, INITIAL_SKILLS);
  if (!rotationId) return skills;
  const filtered = skills.filter(s => s.rotationId === rotationId);
  return filtered.length > 0 ? filtered : skills;
}

export function updateSkillStatus(skillId, newStatus, userId = null) {
  const skills = getItem(KEYS.SKILLS, INITIAL_SKILLS);
  const userMastery = getItem('rc_skill_mastery', {}, userId);
  userMastery[skillId] = newStatus;
  setItem('rc_skill_mastery', userMastery, userId);

  const found = skills.find(s => s.id === skillId);
  return found ? { ...found, status: newStatus } : null;
}

// QUESTIONS API
export function getQuestions(rotationId = null, difficulty = null) {
  let questions = getItem(KEYS.QUESTIONS, INITIAL_QUESTIONS);
  if (rotationId) {
    const filtered = questions.filter(q => q.rotationId === rotationId);
    if (filtered.length > 0) questions = filtered;
  }
  if (difficulty) {
    questions = questions.filter(q => q.difficulty === difficulty);
  }
  return questions;
}

// QUIZ & WEAK AREAS
export function saveQuizAttempt(attempt, userId = null) {
  const attempts = getItem(KEYS.QUIZ_ATTEMPTS, [], userId);
  const newAttempt = {
    id: `quiz-attempt-${Date.now()}`,
    date: new Date().toISOString(),
    ...attempt
  };
  attempts.unshift(newAttempt);
  setItem(KEYS.QUIZ_ATTEMPTS, attempts, userId);

  // Update user weak areas based on missed topics
  if (attempt.weakTopicIds && attempt.weakTopicIds.length > 0) {
    const user = getUser(userId);
    const currentWeak = user.weakAreaTopicIds || [];
    const merged = Array.from(new Set([...currentWeak, ...attempt.weakTopicIds]));
    saveUser({ weakAreaTopicIds: merged }, userId);
  }

  return newAttempt;
}

export function getQuizAttempts(userId = null) {
  return getItem(KEYS.QUIZ_ATTEMPTS, [], userId);
}

// ROTATION CALCULATION & PROGRESS API
export function getRotationProgress(userId = null) {
  const user = getUser(userId);
  const currentRotation = getRotationById(user.currentRotationId);
  const topics = getTopics(user.currentRotationId);
  const completedCount = (user.completedTopicIds || []).filter(id => topics.some(t => t.id === id)).length;

  const totalTopics = Math.max(topics.length, 1);
  const progressPercent = Math.min(100, Math.round((completedCount / totalTopics) * 100));

  // Date math
  const start = new Date(user.rotationStartDate || Date.now());
  const end = new Date(user.rotationEndDate || Date.now() + 28 * 24 * 60 * 60 * 1000);
  const today = new Date();

  const totalDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  const currentDay = Math.max(1, Math.min(totalDays, Math.ceil((today - start) / (1000 * 60 * 60 * 24)) + 1));
  const daysRemaining = Math.max(0, totalDays - currentDay);

  return {
    rotation: currentRotation,
    totalDays,
    currentDay,
    daysRemaining,
    progressPercent,
    completedCount,
    totalTopics
  };
}

// ROTATION COMPLETION & TIMELINE
export async function completeCurrentRotation(userId = null) {
  const user = getUser(userId);
  const activeUid = userId || user?.id;
  const progress = getRotationProgress(activeUid);
  const loggedCases = await getLoggedCases(user.currentRotationId, activeUid);
  const skills = getSkills(user.currentRotationId);
  const questions = getQuestions(user.currentRotationId);
  const history = getItem(KEYS.ROTATION_HISTORY, activeUid ? [] : INITIAL_HISTORICAL_ROTATIONS, activeUid);

  const completedRecord = {
    id: `completed-${Date.now()}`,
    rotationId: user.currentRotationId,
    rotationName: progress.rotation.name,
    icon: progress.rotation.icon,
    startDate: user.rotationStartDate,
    endDate: user.rotationEndDate,
    totalDays: progress.totalDays,
    progressPercent: progress.progressPercent,
    status: 'COMPLETED',
    topicsCompleted: progress.completedCount,
    casesLogged: Array.isArray(loggedCases) ? loggedCases.length : 0,
    skillsMastered: skills.filter(s => s.status === 'CONFIDENT' || s.status === 'SUPERVISED').length,
    questionsAnswered: questions.length * 2,
    quizAverage: 84,
    strongestAreas: ['Clinical Case Evaluation', 'Diagnostic Workup'],
    weakestAreas: user.weakAreaTopicIds || [],
    completedAt: new Date().toISOString().split('T')[0]
  };

  history.unshift(completedRecord);
  setItem(KEYS.ROTATION_HISTORY, history, activeUid);
  return completedRecord;
}

export function getRotationHistory(userId = null) {
  const user = getUser(userId);
  const activeUid = userId || user?.id;
  return getItem(KEYS.ROTATION_HISTORY, activeUid ? [] : INITIAL_HISTORICAL_ROTATIONS, activeUid);
}

// RESET TO DEMO DATA
export function resetDemoData() {
  localStorage.clear();
  initializeStorage();
  return true;
}

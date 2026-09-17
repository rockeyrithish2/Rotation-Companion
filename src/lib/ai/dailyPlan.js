/**
 * Intelligent Daily Plan Engine for Rotation Companion
 */

import { getRotationProgress, getTopics, getSkills, getQuestions, getLoggedCases, getUser } from '../db/storage';

export function generateDailyPlan() {
  const user = getUser();
  const progress = getRotationProgress();
  const rotationId = user.currentRotationId;
  
  const topics = getTopics(rotationId);
  const skills = getSkills(rotationId);
  const questions = getQuestions(rotationId);
  const loggedCases = getLoggedCases(rotationId);

  // Identify weak or uncompleted topics
  const completedIds = user.completedTopicIds || [];
  const weakIds = user.weakAreaTopicIds || [];

  let targetTopic = topics.find(t => weakIds.includes(t.id)) || 
                    topics.find(t => !completedIds.includes(t.id)) || 
                    topics[0];

  let targetSkill = skills.find(s => s.status !== 'CONFIDENT' && s.status !== 'SUPERVISED') || skills[0];
  let targetQuestionCount = 5;

  const dayNumber = progress.currentDay;

  const tasks = [
    {
      id: `task-learn-${dayNumber}`,
      category: 'LEARN',
      icon: 'Brain',
      title: targetTopic ? targetTopic.title : 'Acute Appendicitis',
      subtitle: targetTopic ? targetTopic.description : 'Pathophysiology and diagnostic management',
      estimatedTime: '10 min',
      completed: completedIds.includes(targetTopic?.id),
      actionText: 'Start Learning',
      link: targetTopic ? `/rotation/topics/${targetTopic.id}` : '/rotation/topics'
    },
    {
      id: `task-skill-${dayNumber}`,
      category: 'CLINICAL SKILL',
      icon: 'Stethoscope',
      title: targetSkill ? targetSkill.title : 'Abdominal Examination & Peritoneal Signs',
      subtitle: targetSkill ? `Status: ${targetSkill.status}` : 'Practice physical exam technique on rounds',
      estimatedTime: '10 min',
      completed: targetSkill?.status === 'CONFIDENT',
      actionText: 'Review Skill',
      link: '/skills'
    },
    {
      id: `task-q-${dayNumber}`,
      category: 'ATTENDING QUESTIONS',
      icon: 'MessageCircle',
      title: `${targetQuestionCount} Attending Questions on ${targetTopic ? targetTopic.title : 'Current Topics'}`,
      subtitle: 'Prepare for Socratic questioning during morning rounds',
      estimatedTime: '5 min',
      completed: false,
      actionText: 'Practice Questions',
      link: '/questions'
    },
    {
      id: `task-pres-${dayNumber}`,
      category: 'CASE PRESENTATION',
      icon: 'Clipboard',
      title: 'Practice a Structured Clinical Case Presentation',
      subtitle: 'Rehearse 2-minute oral handoff for morning patient presentation',
      estimatedTime: '10 min',
      completed: false,
      actionText: 'Practice Presentation',
      link: '/presentation'
    },
    {
      id: `task-proc-${dayNumber}`,
      category: 'PROCEDURE',
      icon: 'Activity',
      title: 'Review Wound Dressing & Sterile Technique',
      subtitle: 'Supervised clinical procedure safety principles',
      estimatedTime: '5 min',
      completed: false,
      actionText: 'Review Procedure',
      link: '/skills'
    }
  ];

  return {
    rotationName: progress.rotation.name,
    currentDay: progress.currentDay,
    totalDays: progress.totalDays,
    daysRemaining: progress.daysRemaining,
    progressPercent: progress.progressPercent,
    tasks
  };
}

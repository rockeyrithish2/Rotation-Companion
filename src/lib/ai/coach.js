/**
 * AI Rotation Coach Service
 */

import { callAIService } from './config';
import { getRotationProgress, getLoggedCases, getSkills, getUser } from '../db/storage';

export async function askRotationCoach(userQuery) {
  const user = getUser();
  const progress = getRotationProgress();
  const loggedCases = getLoggedCases(user.currentRotationId);
  const skills = getSkills(user.currentRotationId);

  const systemPrompt = `
You are the AI Rotation Coach for Rotation Companion, a clinical tutor for medical students.
Current context:
- Student Name: ${user.name}
- Rotation: ${progress.rotation.name} (Day ${progress.currentDay} of ${progress.totalDays})
- Rotation Progress: ${progress.progressPercent}%
- Weak Areas: ${user.weakAreaTopicIds?.join(', ') || 'None identified yet'}
- Logged Cases Count: ${loggedCases.length}
- Completed Topics: ${user.completedTopicIds?.length || 0}

Rules:
1. Provide actionable, concise, high-yield clinical advice tailored to their exact rotation day.
2. Emphasize rounds preparation, structured presentation, key physical exam signs, and high-yield attending questions.
3. Always maintain an educational role. Never present yourself as a treating clinician.
4. Encourage verification against institutional protocols and UpToDate/trusted references.
`;

  const fallbackGenerator = () => {
    const q = userQuery.toLowerCase();
    
    if (q.includes('round') || q.includes('prepare')) {
      return `### 🩺 High-Yield Preparation for ${progress.rotation.name} Rounds (Day ${progress.currentDay})

1. **Patient Handoff Review:** Arrive 30 minutes early to pre-round. Check overnight vitals (especially fever spikes, BP dips), I/Os, and morning labs (WBC, electrolytes).
2. **Top 3 Attending Focus Areas:**
   - **Acute Appendicitis & Bowel Obstruction:** Be ready to state the Alvarado score and describe McBurney vs Rovsing sign.
   - **Post-Op Fever Timeline:** Know the 5 Ws by heart (Wind, Water, Wound, Walking, Wonder drugs).
3. **Pro-Tip for Today:** When presenting your patient on rounds, lead with the 1-sentence summary: *"This is a [Age]-year-old [Male/Female] with history of [Key PMH] presenting POD 2 post-laparoscopic appendectomy who is afebrile, clinically improving, and tolerating oral liquids."*

*Verify clinical decisions with your senior resident or attending physician.*`;
    }

    if (q.includes('weak') || q.includes('prioritize') || q.includes('study')) {
      return `### 🧠 Recommended Revision Plan for Today

Based on your current rotation progress (${progress.progressPercent}% on ${progress.rotation.name}):

1. **Primary Priority:** Small Bowel Obstruction (SBO) & Post-Operative Fever. Your quiz accuracy showed room for improvement in surgical complications.
2. **Actionable Steps:**
   - Review SBO plain film air-fluid level thresholds (>3cm dilated loops).
   - Complete 5 attending practice questions on acute abdomen.
   - Practice a 2-minute oral presentation of a surgical case.

*Always cross-reference with your institution's clinical practice guidelines.*`;
    }

    if (q.includes('question') || q.includes('attending')) {
      return `### 🗣️ Common Attending Questions for ${progress.rotation.name}

1. **"What is the classic triads of small bowel strangulation?"**
   - *Answer:* Fever, localized abdominal tenderness/guarding, and leukocytosis. Indicates impending gangrene/perforation.
2. **"What anatomical landmark indicates the base of the appendix?"**
   - *Answer:* Confluence of the taeniae coli at the apex of the cecum.
3. **"What is the first step in managing acute post-op tachycardia on POD 5?"**
   - *Answer:* Inspect the surgical site, check vitals/O2 sat, and rule out anastomotic leak vs Pulmonary Embolism.

*Keep up the great work on rounds!*`;
    }

    return `### ✨ Rotation Coach Guidance for ${progress.rotation.name} (Day ${progress.currentDay})

Great question, ${user.name}! On Day ${progress.currentDay} of ${progress.rotation.name}, your main focus should be mastering clinical reasoning for common presentations and building confidence in case presentations.

**Key Action Items Today:**
- Review **Acute Appendicitis** and **Post-Op Fever** concept cards.
- Log at least one de-identified clinical encounter from morning rounds.
- Practice 5 attending questions before afternoon teaching.

*Remember to verify local protocol requirements with your clinical supervisor.*`;
  };

  return await callAIService({
    systemPrompt,
    userMessage: userQuery,
    fallbackGenerator
  });
}

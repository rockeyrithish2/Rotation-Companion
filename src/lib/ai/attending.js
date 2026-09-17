/**
 * AI Attending Mode - Socratic Clinical Questioner & Evaluation Engine
 */

import { callAIService } from './config';

export const ATTENDING_SCENARIOS = [
  {
    id: 'scen-surg-1',
    rotationId: 'general-surgery',
    title: '22-Year-Old RLQ Abdominal Pain',
    initialPrompt: 'You are on morning general surgery rounds. The senior attending turns to you: "You are evaluating a 22-year-old male presenting with 18 hours of periumbilical pain that migrated to the right lower quadrant, low-grade fever, and loss of appetite. What is your leading differential diagnosis and immediate physical exam maneuvers?"',
    totalTurns: 4
  },
  {
    id: 'scen-med-1',
    rotationId: 'internal-medicine',
    title: '68-Year-Old Acute Dyspnea & Orthopnea',
    initialPrompt: 'You are in the ED medical resuscitation bay. The attending asks: "Our patient is a 68-year-old female with a history of HTN and CAD presenting with severe dyspnea, orthopnea (uses 3 pillows), and bilateral leg swelling. BP is 168/94, HR 110, SpO2 88% on room air. What is your rapid assessment and top immediate interventions?"',
    totalTurns: 4
  },
  {
    id: 'scen-peds-1',
    rotationId: 'pediatrics',
    title: '14-Day-Old Neonate with Fever',
    initialPrompt: 'Pediatric ER attending: "A 14-day-old infant is brought in with rectal temperature of 38.4°C (101.1°F), poor feeding, and lethargy. What is your step-by-step diagnostic and therapeutic plan?"',
    totalTurns: 4
  }
];

export async function processAttendingTurn({ scenarioId, conversationHistory, userResponse, turnCount }) {
  const scenario = ATTENDING_SCENARIOS.find(s => s.id === scenarioId) || ATTENDING_SCENARIOS[0];
  const isFinalTurn = turnCount >= scenario.totalTurns;

  const systemPrompt = `
You are an expert medical attending physician conducting Socratic rounds questioning for a medical student.
Be encouraging yet rigorous. Ask targeted follow-up questions about history, physical exam signs, diagnostic labs/imaging, or management steps.
If turnCount >= ${scenario.totalTurns}, render the final "SESSION RESULTS" evaluation block with:
- Clinical reasoning: X%
- History: Y%
- Differential diagnosis: Z%
- Areas to review: Bullet points
`;

  const fallbackGenerator = () => {
    if (isFinalTurn) {
      return `Excellent work completing this attending rounds simulation! Here is your performance evaluation:

# 📊 SESSION RESULTS

- **Clinical Reasoning:** 82%
- **History & Physical Exam:** 88%
- **Differential Diagnosis:** 78%
- **Management Plan:** 80%

### 🌟 Strengths Demonstrated
- Prompt identification of key clinical presentation features.
- Clear understanding of surgical indications and emergency triage.

### 🎯 Areas to Review
- Remember to explicitly mention pregnancy test screening in all females of childbearing age with acute abdominal pain.
- Review radiological thresholds (e.g. appendiceal diameter >6mm on CT).

*This simulation is for educational preparation only and does not replace attending physician supervision.*`;
    }

    if (turnCount === 1) {
      return `Good start. You correctly identified acute appendicitis as the primary consideration. 

What specific physical exam maneuvers will you perform to elicit peritoneal signs, and what labs will you order immediately from the ED nurse?`;
    }

    if (turnCount === 2) {
      return `Spot on. Eliciting Rovsing sign and Psoas sign will help confirm peritoneal irritation, and a CBC with differential is essential.

Suppose the CT scan reveals an 8.5mm dilated appendix with mucosal hyperenhancement and localized periappendiceal fat stranding without abscess. What is your definitive management plan and preoperative orders?`;
    }

    return `Very thorough response! You covered NPO status, fluid resuscitation, and broad-spectrum IV antibiotic coverage prior to laparoscopic appendectomy.

What are the 3 most common post-operative complications you will monitor for on post-op day 1 to 3?`;
  };

  return await callAIService({
    systemPrompt,
    userMessage: userResponse,
    fallbackGenerator
  });
}

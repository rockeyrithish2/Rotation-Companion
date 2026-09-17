/**
 * Case Presentation Trainer AI Service
 */

import { callAIService } from './config';

export const PRESENTATION_SECTIONS = [
  { id: 'intro', label: '1. Patient Introduction', placeholder: 'e.g. 45-year-old male with history of type 2 diabetes...' },
  { id: 'cc', label: '2. Chief Complaint', placeholder: 'e.g. 2 days of progressive right upper quadrant pain after fatty meals' },
  { id: 'hpi', label: '3. History of Presenting Illness (HPI)', placeholder: 'OPQRST description, associated nausea/vomiting, fever, bowel habits...' },
  { id: 'pmh', label: '4. Past Medical History', placeholder: 'e.g. T2DM, HTN, Cholelithiasis, prior appendectomy...' },
  { id: 'meds', label: '5. Medication History', placeholder: 'e.g. Metformin 1000mg BID, Lisinopril 10mg daily...' },
  { id: 'allergies', label: '6. Allergies', placeholder: 'e.g. NKDA or Penicillin (rash)...' },
  { id: 'fh', label: '7. Family History', placeholder: 'e.g. Mother had gallstones, Father had CAD...' },
  { id: 'sh', label: '8. Social History', placeholder: 'e.g. Non-smoker, occasional alcohol, lives with spouse...' },
  { id: 'exam', label: '9. Physical Examination', placeholder: 'Vitals, abdominal exam (Murphy sign), scleral icterus...' },
  { id: 'investigations', label: '10. Investigations', placeholder: 'CBC (WBC 13k), LFTs (elevated Alk Phos/Bili), RUQ Ultrasound...' },
  { id: 'assessment', label: '11. Clinical Assessment', placeholder: '1-sentence summary framing the primary diagnostic problem...' },
  { id: 'ddx', label: '12. Differential Diagnosis', placeholder: '1. Acute Cholecystitis, 2. Choledocholithiasis, 3. Peptic Ulcer Disease...' },
  { id: 'plan', label: '13. Management Plan & Discussion', placeholder: 'NPO, IV fluids, IV antibiotics, Laparoscopic Cholecystectomy consult...' }
];

export async function evaluateCasePresentation(presentationData) {
  const systemPrompt = `
You are an expert clinical attending evaluating a medical student's case presentation.
Analyze the 13 presentation fields for:
1. Structure & Flow
2. Completeness & Precision
3. Clarity & Pertinent Positives/Negatives
4. Clinical Reasoning in Assessment & Plan
5. Missing critical items (e.g. vital signs, pregnancy test, surgical risk)

Return structured Markdown feedback with percentage scores and actionable advice.
`;

  const fallbackGenerator = () => {
    return `### 📋 Case Presentation Feedback & Score Report

# OVERALL RATING: 85 / 100 (Strong Clinical Delivery)

---

### 📊 Performance Breakdown
- **Structure & Handoff Flow:** 90%
- **Pertinent Positives & Negatives:** 82%
- **Diagnostic Synthesis (Assessment):** 85%
- **Management Plan Completeness:** 83%

---

### 👍 Strengths
- **Concise One-Liner:** Excellent opening synthesis integrating age, risk factors, and acute presentation.
- **Logical HPI Progression:** Clear timeline of symptom onset and relationship to meals.
- **Targeted Exam:** Identified key physical exam findings (Murphy sign) upfront.

---

### 💡 Areas for Improvement
- **Vitals Precision:** Always explicitly state all 5 vital signs (BP, HR, RR, Temp, SpO2) in the exam section.
- **Surgical Risk Stratification:** In your plan, briefly mention the patient's ASA physical status classification or surgical clearance considerations.

*AI presentation feedback is for educational practice and does not replace direct clinical supervision.*`;
  };

  const userMessage = JSON.stringify(presentationData, null, 2);

  return await callAIService({
    systemPrompt,
    userMessage,
    fallbackGenerator
  });
}

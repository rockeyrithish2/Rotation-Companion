/**
 * Database Schema & Types definition for Rotation Companion
 */

export const STUDENT_TYPES = [
  { id: 'med_student', label: 'Medical Student' },
  { id: 'nursing_student', label: 'Nursing Student' },
  { id: 'pa_student', label: 'Physician Assistant Student' },
  { id: 'other', label: 'Other Healthcare Trainee' }
];

export const ACADEMIC_YEARS = [
  { id: 'pre_clinical', label: 'Pre-clinical' },
  { id: 'year_3', label: '3rd Year' },
  { id: 'year_4', label: '4th Year' },
  { id: 'final_year', label: 'Final Year' },
  { id: 'other', label: 'Other' }
];

export const USER_GOALS = [
  { id: 'rounds_perf', label: 'Perform better on rounds', icon: 'Sparkles' },
  { id: 'case_pres', label: 'Improve case presentations', icon: 'MessageCircle' },
  { id: 'common_cases', label: 'Learn common cases', icon: 'BookOpen' },
  { id: 'procedures', label: 'Learn procedures', icon: 'Activity' },
  { id: 'exams', label: 'Prepare for exams', icon: 'Award' },
  { id: 'attending_q', label: 'Answer attending questions', icon: 'Brain' },
  { id: 'confidence', label: 'Build clinical confidence', icon: 'ShieldCheck' },
  { id: 'track_logs', label: 'Track clinical experiences', icon: 'Clipboard' }
];

export const SKILL_CATEGORIES = [
  'History Taking',
  'Physical Examination',
  'Procedures',
  'Communication',
  'Clinical Reasoning'
];

export const SKILL_STATUSES = [
  { id: 'NOT_STARTED', label: 'Not Started', color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' },
  { id: 'OBSERVED', label: 'Observed ✓', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' },
  { id: 'ASSISTED', label: 'Assisted ✓', color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300' },
  { id: 'SUPERVISED', label: 'Performed Under Supervision ○', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
  { id: 'CONFIDENT', label: 'Confident ★', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' }
];

export const QUESTION_DIFFICULTIES = [
  { id: 'BASIC', label: 'Basic', badge: '🟢 BASIC', color: 'text-emerald-600 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30' },
  { id: 'INTERMEDIATE', label: 'Intermediate', badge: '🟡 INTERMEDIATE', color: 'text-amber-600 border-amber-300 bg-amber-50 dark:bg-amber-950/30' },
  { id: 'ADVANCED', label: 'Advanced', badge: '🔴 ADVANCED', color: 'text-rose-600 border-rose-300 bg-rose-50 dark:bg-rose-950/30' }
];

export const DEFAULT_ROTATIONS = [
  { id: 'internal-medicine', name: 'Internal Medicine', icon: '🫀', defaultDays: 28, category: 'Medicine', description: 'Master systemic adult diseases, diagnostic reasoning, complex management, and inpatient care.' },
  { id: 'general-surgery', name: 'General Surgery', icon: '🔪', defaultDays: 28, category: 'Surgery', description: 'Acute abdominal emergencies, pre-op & post-op care, surgical procedures, and trauma basics.' },
  { id: 'pediatrics', name: 'Pediatrics', icon: '👶', defaultDays: 28, category: 'Pediatrics', description: 'Child development, pediatric acute illnesses, neonatology, vaccines, and pediatric dosing.' },
  { id: 'obgyn', name: 'Obstetrics & Gynecology', icon: '🤰', defaultDays: 28, category: 'Obstetrics', description: 'Labor & delivery, prenatal care, gynecologic surgery, women\'s health, and reproductive endocrinology.' },
  { id: 'psychiatry', name: 'Psychiatry', icon: '🧠', defaultDays: 28, category: 'Mental Health', description: 'Mental status examination, mood disorders, psychosis, psychopharmacology, and crisis intervention.' },
  { id: 'orthopedics', name: 'Orthopedics', icon: '🦴', defaultDays: 14, category: 'Surgery', description: 'Fracture management, musculoskeletal exams, joint dislocations, and orthopedic surgeries.' },
  { id: 'emergency-medicine', name: 'Emergency Medicine', icon: '🚑', defaultDays: 14, category: 'Acute Care', description: 'Triage, resuscitation, acute stabilization, procedural sedation, and rapid diagnostics.' },
  { id: 'anesthesiology', name: 'Anesthesiology', icon: '💉', defaultDays: 14, category: 'Critical Care', description: 'Airway management, pharmacology, peri-operative monitoring, hemodynamics, and nerve blocks.' },
  { id: 'radiology', name: 'Radiology', icon: '🩻', defaultDays: 14, category: 'Diagnostics', description: 'Chest X-rays, abdominal CTs, neuro MRI interpretation, ultrasound basics, and radiation safety.' },
  { id: 'family-medicine', name: 'Family Medicine', icon: '🏡', defaultDays: 28, category: 'Primary Care', description: 'Preventive health, chronic disease management, outpatient procedures, and whole-person care.' },
  { id: 'neurology', name: 'Neurology', icon: '⚡', defaultDays: 14, category: 'Medicine', description: 'Localized neurological exams, stroke protocols, epilepsy management, and neuromuscular disorders.' },
  { id: 'cardiology', name: 'Cardiology', icon: '❤️', defaultDays: 14, category: 'Subspecialty', description: 'ECG interpretation, heart failure management, ACS pathways, arrhythmias, and echocardiograms.' },
  { id: 'dermatology', name: 'Dermatology', icon: '🔍', defaultDays: 14, category: 'Outpatient', description: 'Skin lesion morphology, rashes, biopsies, dermatopathology, and topical therapeutics.' },
  { id: 'ent', name: 'ENT (Otolaryngology)', icon: '👂', defaultDays: 14, category: 'Surgical Specialty', description: 'Head & neck exams, airway compromise, otitis, epistaxis management, and sinus surgery.' },
  { id: 'ophthalmology', name: 'Ophthalmology', icon: '👁️', defaultDays: 14, category: 'Surgical Specialty', description: 'Slit-lamp basics, red eye evaluation, acute glaucoma, ocular trauma, and fundoscopy.' }
];

-- ============================================================
-- ROTATION COMPANION — SUPABASE POSTGRESQL SCHEMA & RLS POLICIES
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  medical_school TEXT,
  academic_year TEXT DEFAULT 'year_3',
  student_type TEXT DEFAULT 'med_student',
  current_rotation_id TEXT DEFAULT 'general-surgery',
  rotation_start_date DATE DEFAULT CURRENT_DATE,
  rotation_end_date DATE DEFAULT (CURRENT_DATE + INTERVAL '28 days'),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ROTATIONS (Shared Educational Resource)
CREATE TABLE IF NOT EXISTS public.rotations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT '🩺',
  default_days INT DEFAULT 28,
  category TEXT DEFAULT 'Core',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Default Rotations
INSERT INTO public.rotations (id, name, description, icon, default_days, category)
VALUES 
  ('internal-medicine', 'Internal Medicine', 'Master systemic adult diseases, diagnostic reasoning, complex management, and inpatient care.', '🫀', 28, 'Medicine'),
  ('general-surgery', 'General Surgery', 'Acute abdominal emergencies, pre-op & post-op care, surgical procedures, and trauma basics.', '🔪', 28, 'Surgery'),
  ('pediatrics', 'Pediatrics', 'Child development, pediatric acute illnesses, neonatology, vaccines, and pediatric dosing.', '👶', 28, 'Pediatrics'),
  ('obgyn', 'Obstetrics & Gynecology', 'Labor & delivery, prenatal care, gynecologic surgery, women''s health, and reproductive endocrinology.', '🤰', 28, 'Obstetrics'),
  ('psychiatry', 'Psychiatry', 'Mental status examination, mood disorders, psychosis, psychopharmacology, and crisis intervention.', '🧠', 28, 'Mental Health'),
  ('orthopedics', 'Orthopedics', 'Fracture management, musculoskeletal exams, joint dislocations, and orthopedic surgeries.', '🦴', 14, 'Surgery'),
  ('emergency-medicine', 'Emergency Medicine', 'Triage, resuscitation, acute stabilization, procedural sedation, and rapid diagnostics.', '🚑', 14, 'Acute Care'),
  ('anesthesiology', 'Anesthesiology', 'Airway management, pharmacology, peri-operative monitoring, hemodynamics, and nerve blocks.', '💉', 14, 'Critical Care'),
  ('radiology', 'Radiology', 'Chest X-rays, abdominal CTs, neuro MRI interpretation, ultrasound basics, and radiation safety.', '🩻', 14, 'Diagnostics'),
  ('family-medicine', 'Family Medicine', 'Preventive health, chronic disease management, outpatient procedures, and whole-person care.', '🏡', 28, 'Primary Care'),
  ('neurology', 'Neurology', 'Localized neurological exams, stroke protocols, epilepsy management, and neuromuscular disorders.', '⚡', 14, 'Medicine'),
  ('cardiology', 'Cardiology', 'ECG interpretation, heart failure management, ACS pathways, arrhythmias, and echocardiograms.', '❤️', 14, 'Subspecialty'),
  ('dermatology', 'Dermatology', 'Skin lesion morphology, rashes, biopsies, dermatopathology, and topical therapeutics.', '🔍', 14, 'Outpatient'),
  ('ent', 'ENT (Otolaryngology)', 'Head & neck exams, airway compromise, otitis, epistaxis management, and sinus surgery.', '👂', 14, 'Surgical Specialty'),
  ('ophthalmology', 'Ophthalmology', 'Slit-lamp basics, red eye evaluation, acute glaucoma, ocular trauma, and fundoscopy.', '👁️', 14, 'Surgical Specialty')
ON CONFLICT (id) DO NOTHING;

-- 3. USER ROTATIONS (Block Status)
CREATE TABLE IF NOT EXISTS public.user_rotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rotation_id TEXT NOT NULL REFERENCES public.rotations(id),
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TOPICS (Shared Educational Resource)
CREATE TABLE IF NOT EXISTS public.topics (
  id TEXT PRIMARY KEY,
  rotation_id TEXT REFERENCES public.rotations(id),
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT DEFAULT 'Intermediate',
  estimated_minutes INT DEFAULT 15,
  importance INT DEFAULT 3,
  content JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TOPIC PROGRESS (User Specific)
CREATE TABLE IF NOT EXISTS public.topic_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL REFERENCES public.topics(id),
  status TEXT DEFAULT 'completed',
  progress_percentage INT DEFAULT 100,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  last_reviewed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, topic_id)
);

-- 6. SKILLS (Shared Educational Resource)
CREATE TABLE IF NOT EXISTS public.skills (
  id TEXT PRIMARY KEY,
  rotation_id TEXT REFERENCES public.rotations(id),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SKILL MASTERY (User Specific)
CREATE TABLE IF NOT EXISTS public.skill_mastery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  skill_id TEXT NOT NULL REFERENCES public.skills(id),
  status TEXT DEFAULT 'OBSERVED',
  observed_at TIMESTAMPTZ,
  assisted_at TIMESTAMPTZ,
  supervised_at TIMESTAMPTZ,
  confidence_level INT DEFAULT 1,
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, skill_id)
);

-- 8. LOGGED CLINICAL CASES (De-identified Student Case Logs)
CREATE TABLE IF NOT EXISTS public.logged_clinical_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rotation_id TEXT NOT NULL REFERENCES public.rotations(id),
  date DATE DEFAULT CURRENT_DATE,
  category TEXT DEFAULT 'General Clinical',
  chief_complaint TEXT NOT NULL,
  diagnosis_category TEXT,
  what_i_observed TEXT,
  what_i_learned TEXT,
  questions TEXT,
  topics_to_review JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. QUESTIONS (Shared Quiz Bank)
CREATE TABLE IF NOT EXISTS public.questions (
  id TEXT PRIMARY KEY,
  rotation_id TEXT REFERENCES public.rotations(id),
  topic_id TEXT REFERENCES public.topics(id),
  vignette TEXT NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer INT NOT NULL,
  explanation TEXT,
  high_yield_pearl TEXT,
  difficulty TEXT DEFAULT 'Intermediate',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. QUIZ ATTEMPTS (User Quiz History)
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rotation_id TEXT REFERENCES public.rotations(id),
  score INT NOT NULL,
  total_questions INT NOT NULL,
  correct_count INT NOT NULL,
  attempt_date TIMESTAMPTZ DEFAULT NOW(),
  answers JSONB
);

-- 11. PRESENTATION SESSIONS (AI Attending Practice)
CREATE TABLE IF NOT EXISTS public.presentation_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rotation_id TEXT REFERENCES public.rotations(id),
  chief_complaint TEXT NOT NULL,
  duration_seconds INT DEFAULT 0,
  score INT DEFAULT 85,
  strengths JSONB DEFAULT '[]'::jsonb,
  improvements JSONB DEFAULT '[]'::jsonb,
  feedback_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. DAILY PLANS (Calendar & Tasks)
CREATE TABLE IF NOT EXISTS public.daily_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  focus_area TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- 13. DAILY TASKS
CREATE TABLE IF NOT EXISTS public.daily_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  daily_plan_id UUID NOT NULL REFERENCES public.daily_plans(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  category TEXT DEFAULT 'Study',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. AI CONVERSATIONS
CREATE TABLE IF NOT EXISTS public.ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT DEFAULT 'AI Attending Session',
  context_type TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. AI MESSAGES
CREATE TABLE IF NOT EXISTS public.ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. ROTATION HISTORY
CREATE TABLE IF NOT EXISTS public.rotation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rotation_id TEXT NOT NULL REFERENCES public.rotations(id),
  start_date DATE,
  end_date DATE,
  grade TEXT,
  summary_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. USER GOALS
CREATE TABLE IF NOT EXISTS public.user_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  goal_text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  target_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. USER SETTINGS
CREATE TABLE IF NOT EXISTS public.user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'dark',
  notifications_enabled BOOLEAN DEFAULT TRUE,
  ai_provider TEXT DEFAULT 'default',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Shared Content (Public Read Access)
ALTER TABLE public.rotations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read shared rotations" ON public.rotations FOR SELECT USING (true);
CREATE POLICY "Public write shared rotations" ON public.rotations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update shared rotations" ON public.rotations FOR UPDATE USING (true);

ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read shared topics" ON public.topics FOR SELECT USING (true);

ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read shared skills" ON public.skills FOR SELECT USING (true);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read shared questions" ON public.questions FOR SELECT USING (true);

-- User-Owned Tables (Strict auth.uid() = user_id Isolation)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles self select" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Profiles self insert" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Profiles self update" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Profiles self delete" ON public.profiles FOR DELETE USING (auth.uid() = id);

ALTER TABLE public.user_rotations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User rotations access" ON public.user_rotations FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.topic_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Topic progress access" ON public.topic_progress FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.skill_mastery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Skill mastery access" ON public.skill_mastery FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.logged_clinical_cases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Logged clinical cases access" ON public.logged_clinical_cases FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Quiz attempts access" ON public.quiz_attempts FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.presentation_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Presentation sessions access" ON public.presentation_sessions FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.daily_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Daily plans access" ON public.daily_plans FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.daily_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Daily tasks access" ON public.daily_tasks FOR ALL USING (
  EXISTS (SELECT 1 FROM public.daily_plans dp WHERE dp.id = daily_plan_id AND dp.user_id = auth.uid())
) WITH CHECK (
  EXISTS (SELECT 1 FROM public.daily_plans dp WHERE dp.id = daily_plan_id AND dp.user_id = auth.uid())
);

ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "AI conversations access" ON public.ai_conversations FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "AI messages access" ON public.ai_messages FOR ALL USING (
  EXISTS (SELECT 1 FROM public.ai_conversations ac WHERE ac.id = conversation_id AND ac.user_id = auth.uid())
) WITH CHECK (
  EXISTS (SELECT 1 FROM public.ai_conversations ac WHERE ac.id = conversation_id AND ac.user_id = auth.uid())
);

ALTER TABLE public.rotation_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Rotation history access" ON public.rotation_history FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.user_goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User goals access" ON public.user_goals FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User settings access" ON public.user_settings FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Trigger for Auto-Creating Profile on Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, medical_school)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Alex Rivera'),
    COALESCE(new.raw_user_meta_data->>'medical_school', 'Medical Academy')
  );
  
  INSERT INTO public.user_settings (user_id)
  VALUES (new.id);

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

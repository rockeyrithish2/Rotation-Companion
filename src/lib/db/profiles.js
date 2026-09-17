import { supabase, isSupabaseConfigured } from '../supabase';
import { getItem, setItem, KEYS } from './storageUtils';
import { INITIAL_DEMO_USER } from './seedData';


export async function fetchUserProfile(userId) {
  if (isSupabaseConfigured && userId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (!error && data) {
        const fetched = {
          id: data.id,
          name: data.full_name,
          medicalSchool: data.medical_school,
          academicYear: data.academic_year,
          studentType: data.student_type,
          currentRotationId: data.current_rotation_id,
          rotationStartDate: data.rotation_start_date,
          rotationEndDate: data.rotation_end_date,
          avatarUrl: data.avatar_url
        };
        setItem(KEYS.USER, fetched, userId);
        return fetched;
      }
    } catch (e) {
      console.warn('Failed to fetch profile from Supabase, using local fallback:', e);
    }
  }
  return getItem(KEYS.USER, { ...INITIAL_DEMO_USER, id: userId || 'demo-user' }, userId);
}

export async function updateUserProfileDB(userId, profileData) {
  if (isSupabaseConfigured && userId) {
    try {
      const payload = {};
      if (profileData.name !== undefined) payload.full_name = profileData.name;
      if (profileData.medicalSchool !== undefined) payload.medical_school = profileData.medicalSchool;
      if (profileData.academicYear !== undefined) payload.academic_year = profileData.academicYear;
      if (profileData.studentType !== undefined) payload.student_type = profileData.studentType;
      if (profileData.currentRotationId !== undefined) payload.current_rotation_id = profileData.currentRotationId;
      if (profileData.rotationStartDate !== undefined) payload.rotation_start_date = profileData.rotationStartDate;
      if (profileData.rotationEndDate !== undefined) payload.rotation_end_date = profileData.rotationEndDate;

      const { data, error } = await supabase
        .from('profiles')
        .update(payload)
        .eq('id', userId)
        .select()
        .single();

      if (!error && data) {
        const updatedProfile = {
          id: data.id,
          name: data.full_name,
          medicalSchool: data.medical_school,
          academicYear: data.academic_year,
          studentType: data.student_type,
          currentRotationId: data.current_rotation_id,
          rotationStartDate: data.rotation_start_date,
          rotationEndDate: data.rotation_end_date,
          avatarUrl: data.avatar_url
        };
        setItem(KEYS.USER, updatedProfile, userId);
        return updatedProfile;
      }
    } catch (e) {
      console.warn('Failed to update profile in Supabase:', e);
    }
  }

  const current = getItem(KEYS.USER, { ...INITIAL_DEMO_USER, id: userId || 'demo-user' }, userId);
  const updated = { ...current, ...profileData };
  setItem(KEYS.USER, updated, userId);
  return updated;
}

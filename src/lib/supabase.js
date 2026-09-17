import { createClient } from '@supabase/supabase-js';

// Default production deployment fallback credentials
const defaultUrl = 'https://dulafewrpyrxalltvpiw.supabase.co';
const defaultAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1bGFmZXdycHlyeGFsbHZ0cGl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1MDc5NDMsImV4cCI6MjEwMjA4Mzk0M30.8Wx3k1vBSW82NE9T6krI4ZzcQfasPQOg37dQ7C1nflk';

// Environment variables with fallback
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || defaultUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || defaultAnonKey;

// Validate credentials
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') && 
  supabaseAnonKey.length > 20
);

if (isSupabaseConfigured) {
  try {
    const urlObj = new URL(supabaseUrl);
    console.log('⚡ Supabase URL configured:', true);
    console.log('⚡ Supabase hostname:', urlObj.hostname);
  } catch (e) {
    console.warn('⚠️ Invalid Supabase URL format:', supabaseUrl);
  }
} else {
  console.info('ℹ️ Rotation Companion running in local storage fallback mode.');
}

// Create Supabase client singleton
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : defaultUrl,
  isSupabaseConfigured ? supabaseAnonKey : defaultAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

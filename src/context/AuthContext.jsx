import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { fetchUserProfile, updateUserProfileDB } from '../lib/db/profiles';
import { getUser, saveUser, initializeStorage, resetDemoData } from '../lib/db/storage';
import { setActiveUserId } from '../lib/db/storageUtils';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeStorage();

    if (isSupabaseConfigured) {
      // 1. Fetch initial Supabase session
      supabase.auth.getSession().then(({ data: { session: initSession } }) => {
        setSession(initSession);
        if (initSession?.user) {
          console.log('🔒 Supabase Session Restored:', {
            sessionExists: true,
            userUuid: initSession.user.id,
            email: initSession.user.email
          });
          setActiveUserId(initSession.user.id);
          fetchUserProfile(initSession.user.id).then(profile => {
            setUser({ ...profile, id: initSession.user.id, email: initSession.user.email });
            setLoading(false);
          });
        } else {
          console.log('ℹ️ No active Supabase session found on startup. Activating Guest Mode.');
          const guestUser = { ...getUser('demo-user'), isGuest: true };
          setActiveUserId('demo-user');
          saveUser(guestUser, 'demo-user');
          setUser(guestUser);
          setLoading(false);
        }
      }).catch(err => {
        console.error('Error fetching Supabase session, using Guest Mode:', err);
        const guestUser = { ...getUser('demo-user'), isGuest: true };
        setActiveUserId('demo-user');
        saveUser(guestUser, 'demo-user');
        setUser(guestUser);
        setLoading(false);
      });

      // 2. Listen for Supabase auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
        console.log(`🔒 Supabase Auth Event: [${event}]`, currentSession?.user ? `User: ${currentSession.user.id}` : 'No user');
        setSession(currentSession);
        if (currentSession?.user) {
          setActiveUserId(currentSession.user.id);
          const profile = await fetchUserProfile(currentSession.user.id);
          setUser({ ...profile, id: currentSession.user.id, email: currentSession.user.email });
        } else if (event === 'SIGNED_OUT') {
          setActiveUserId('demo-user');
          const guestUser = { ...getUser('demo-user'), isGuest: true };
          setUser(guestUser);
        }
        setLoading(false);
      });

      return () => {
        subscription?.unsubscribe();
      };
    } else {
      // Fallback local state
      const localUser = { ...getUser('demo-user'), isGuest: true };
      if (localUser?.id) setActiveUserId(localUser.id);
      setUser(localUser);
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setSession(data.session);
      setActiveUserId(data.user.id);
      const profile = await fetchUserProfile(data.user.id);
      const fullUser = { ...profile, id: data.user.id, email: data.user.email };
      setUser(fullUser);
      return fullUser;
    }

    const updated = saveUser({ email, name: email.split('@')[0], isGuest: false });
    if (updated?.id) setActiveUserId(updated.id);
    setUser(updated);
    return updated;
  };

  const signup = async (name, email, password) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: password || 'Password123!',
        options: {
          data: {
            full_name: name,
            medical_school: 'Medical Academy'
          }
        }
      });

      if (error) throw error;
      if (data.user) {
        setSession(data.session);
        setActiveUserId(data.user.id);
        const fullUser = {
          id: data.user.id,
          name,
          email,
          studentType: 'med_student',
          academicYear: 'year_3',
          currentRotationId: 'general-surgery'
        };
        setUser(fullUser);
        return fullUser;
      }
    }

    const uid = `user-${Date.now()}`;
    setActiveUserId(uid);
    const newUser = {
      id: uid,
      name,
      email,
      studentType: 'med_student',
      academicYear: 'year_3',
      currentRotationId: 'general-surgery',
      rotationStartDate: new Date().toISOString().split('T')[0],
      rotationEndDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    const saved = saveUser(newUser, uid);
    setUser(saved);
    return saved;
  };

  const resetPasswordForEmail = async (email) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      if (error) throw error;
      return data;
    }
    return { success: true };
  };

  const updateUserPassword = async (newPassword) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) throw error;
      return data;
    }
    return { success: true };
  };

  const loginAsDemo = () => {
    resetDemoData();
    const demo = { ...getUser('demo-user'), isGuest: true };
    setActiveUserId('demo-user');
    saveUser(demo, 'demo-user');
    setUser(demo);
    return demo;
  };

  const loginAsGuest = (guestName = 'Guest Scholar') => {
    const guestUser = {
      id: 'demo-user',
      name: guestName,
      email: 'guest@medschool.edu',
      isGuest: true,
      studentType: 'med_student',
      academicYear: 'year_3',
      currentRotationId: 'general-surgery',
      rotationStartDate: new Date().toISOString().split('T')[0],
      rotationEndDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    saveUser(guestUser, 'demo-user');
    setActiveUserId('demo-user');
    setUser(guestUser);
    return guestUser;
  };

  const updateUserProfile = async (data) => {
    if (user?.id && isSupabaseConfigured && !user.isGuest) {
      await updateUserProfileDB(user.id, data);
    }
    const updated = saveUser(data, user?.id || 'demo-user');
    setUser(updated);
    return updated;
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut().catch(err => console.warn('Supabase signout notice:', err));
    }
    setSession(null);
    const guestUser = { ...getUser('demo-user'), isGuest: true };
    setActiveUserId('demo-user');
    setUser(guestUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      login,
      signup,
      resetPasswordForEmail,
      updateUserPassword,
      loginAsDemo,
      loginAsGuest,
      updateUserProfile,
      logout,
      isAuthenticated: !!user && (user?.isGuest || user?.id === 'demo-user' || (isSupabaseConfigured ? !!session : true))
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

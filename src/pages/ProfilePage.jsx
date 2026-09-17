import React, { useState } from 'react';
import { User, Award, Stethoscope, Mail, School, Calendar, BookOpen, Edit3, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRotation } from '../context/RotationContext';
import { ACADEMIC_YEARS, STUDENT_TYPES } from '../lib/db/schema';

export function ProfilePage() {
  const { user, updateUserProfile } = useAuth();
  const { progress } = useRotation();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || 'Alex Rivera');
  const [medSchool, setMedSchool] = useState(user?.medicalSchool || 'Stanford School of Medicine');
  const [year, setYear] = useState(user?.academicYear || 'year_3');

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile({ name, medicalSchool: medSchool, academicYear: year });
    setIsEditing(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200 font-serif text-slate-900 dark:text-slate-100">
      {/* Header Profile Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 space-y-6 shadow-xs font-serif">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-blue-700 text-white flex items-center justify-center text-3xl font-serif font-bold shadow-xs">
            {user?.name?.charAt(0) || 'A'}
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">{user?.name || 'Alex Rivera'}</h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-serif font-semibold rounded-lg self-center sm:self-auto flex items-center gap-1.5 border border-slate-200 dark:border-slate-600 transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>
            </div>
            <p className="text-xs font-serif text-blue-700 dark:text-blue-400 font-semibold">
              {ACADEMIC_YEARS.find(y => y.id === (user?.academicYear || 'year_3'))?.label} • {user?.medicalSchool || 'Stanford School of Medicine'}
            </p>
            <p className="text-xs font-serif text-slate-500">{user?.email || 'alex.rivera@medschool.edu'}</p>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={handleSave} className="p-4 bg-slate-50 dark:bg-slate-700/60 rounded-xl space-y-4 border border-slate-200 dark:border-slate-600 animate-in fade-in duration-150 font-serif">
            <h3 className="text-xs font-serif font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Update Student Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-serif font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-xs font-serif text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-slate-700 dark:text-slate-300 mb-1">Medical School</label>
                <input
                  type="text"
                  value={medSchool}
                  onChange={(e) => setMedSchool(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-xs font-serif text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif font-bold text-slate-700 dark:text-slate-300 mb-1">Academic Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-xs font-serif text-slate-900 dark:text-slate-100"
              >
                {ACADEMIC_YEARS.map(y => (
                  <option key={y.id} value={y.id}>{y.label}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end pt-2">
              <button type="submit" className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-serif font-semibold text-xs rounded-lg shadow-xs flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>Save Profile</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Statistics */}
      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs font-serif">
        <h2 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">Active Rotation Status</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-serif">
          <div className="p-4 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600">
            <span className="text-slate-500 font-serif font-bold block mb-1">Specialty</span>
            <span className="font-serif font-bold text-slate-900 dark:text-slate-100 text-sm">{progress?.rotation?.name}</span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600">
            <span className="text-slate-500 font-serif font-bold block mb-1">Block Day</span>
            <span className="font-serif font-bold text-blue-700 dark:text-blue-400 text-sm">Day {progress?.currentDay} of {progress?.totalDays}</span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600">
            <span className="text-slate-500 font-serif font-bold block mb-1">Completed Topics</span>
            <span className="font-serif font-bold text-slate-900 dark:text-slate-100 text-sm">32 Topics</span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600">
            <span className="text-slate-500 font-serif font-bold block mb-1">Logged Encounters</span>
            <span className="font-serif font-bold text-emerald-700 dark:text-emerald-400 text-sm">18 Cases</span>
          </div>
        </div>
      </div>
    </div>
  );
}

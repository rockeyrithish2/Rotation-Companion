import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { STUDENT_TYPES, ACADEMIC_YEARS, DEFAULT_ROTATIONS, USER_GOALS } from '../lib/db/schema';
import { useAuth } from '../context/AuthContext';
import { useRotation } from '../context/RotationContext';

export function OnboardingPage() {
  const navigate = useNavigate();
  const { updateUserProfile } = useAuth();
  const { changeRotation } = useRotation();

  const [step, setStep] = useState(1);
  const [studentType, setStudentType] = useState('med_student');
  const [academicYear, setAcademicYear] = useState('year_3');
  const [selectedRotationId, setSelectedRotationId] = useState('general-surgery');
  
  // Dates default to today -> 28 days
  const todayStr = new Date().toISOString().split('T')[0];
  const defaultEndStr = new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(defaultEndStr);
  const [selectedGoals, setSelectedGoals] = useState(['rounds_perf', 'case_pres', 'common_cases', 'procedures']);

  // Date calculation preview
  const startD = new Date(startDate);
  const endD = new Date(endDate);
  const totalDays = Math.max(1, Math.ceil((endD - startD) / (1000 * 60 * 60 * 24)));

  const handleGoalToggle = (goalId) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) ? prev.filter(g => g !== goalId) : [...prev, goalId]
    );
  };

  const handleFinishOnboarding = () => {
    setStep(8); // Creating personalized dashboard state
    
    setTimeout(() => {
      updateUserProfile({
        studentType,
        academicYear,
        currentRotationId: selectedRotationId,
        rotationStartDate: startDate,
        rotationEndDate: endDate,
        goals: selectedGoals,
        onboardingCompleted: true
      });
      changeRotation(selectedRotationId, startDate, endDate);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-6 relative font-serif">
      {/* Header Progress indicator */}
      <div className="max-w-xl mx-auto w-full pt-4 relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            🩺
          </div>
          <span className="text-xs font-serif font-bold text-slate-900 tracking-tight">ROTATION COMPANION</span>
        </div>

        {step > 1 && step < 8 && (
          <div className="flex items-center space-x-1.5 text-xs font-serif font-bold text-slate-500">
            <span>Step {step} of 7</span>
            <div className="w-24 bg-slate-200 rounded-full h-1.5 overflow-hidden ml-2">
              <div 
                className="bg-blue-700 h-full rounded-full transition-all duration-300"
                style={{ width: `${(step / 7) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Wizard Content */}
      <main className="max-w-xl mx-auto w-full py-10 relative z-10 font-serif">
        {/* STEP 1: WELCOME */}
        {step === 1 && (
          <div className="text-center space-y-6 animate-in fade-in duration-300 bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
            <div className="w-16 h-16 rounded-2xl bg-blue-700 flex items-center justify-center text-white mx-auto shadow-sm">
              <Stethoscope className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-serif font-bold text-slate-900">Welcome to Rotation Companion</h1>
              <p className="text-sm font-serif text-slate-600">Your clinical rotation, organized.</p>
            </div>

            <p className="text-xs font-serif text-slate-500 max-w-md mx-auto leading-relaxed">
              We'll set up your personalized daily plan, rotation goals, topics, and clinical tracker in under 60 seconds.
            </p>

            <button
              onClick={() => setStep(2)}
              className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-serif font-semibold text-sm rounded-xl shadow-xs inline-flex items-center space-x-2 transition-all"
            >
              <span>Start Setup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: STUDENT TYPE */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300 bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
            <div className="space-y-1">
              <h2 className="text-2xl font-serif font-bold text-slate-900">What type of student are you?</h2>
              <p className="text-xs font-serif text-slate-500">Select your medical training background</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {STUDENT_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setStudentType(type.id)}
                  className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                    studentType === type.id
                      ? 'bg-blue-50 border-blue-700 text-blue-900 font-bold shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-sm font-serif">{type.label}</span>
                  {studentType === type.id && <Check className="w-4 h-4 text-blue-700" />}
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(1)} className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 font-serif font-semibold flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={() => setStep(3)} className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-serif font-semibold rounded-lg flex items-center gap-1 shadow-xs">
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ACADEMIC YEAR */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300 bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
            <div className="space-y-1">
              <h2 className="text-2xl font-serif font-bold text-slate-900">Which year are you in?</h2>
              <p className="text-xs font-serif text-slate-500">We'll adjust the clinical depth of your question bank</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {ACADEMIC_YEARS.map((year) => (
                <button
                  key={year.id}
                  onClick={() => setAcademicYear(year.id)}
                  className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                    academicYear === year.id
                      ? 'bg-blue-50 border-blue-700 text-blue-900 font-bold shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-sm font-serif">{year.label}</span>
                  {academicYear === year.id && <Check className="w-4 h-4 text-blue-700" />}
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(2)} className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 font-serif font-semibold flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={() => setStep(4)} className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-serif font-semibold rounded-lg flex items-center gap-1 shadow-xs">
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: ROTATION SELECTION */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-300 bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
            <div className="space-y-1">
              <h2 className="text-2xl font-serif font-bold text-slate-900">What's your current rotation?</h2>
              <p className="text-xs font-serif text-slate-500">Choose your active specialty block</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto pr-1">
              {DEFAULT_ROTATIONS.map((rot) => (
                <button
                  key={rot.id}
                  onClick={() => setSelectedRotationId(rot.id)}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    selectedRotationId === rot.id
                      ? 'bg-blue-50 border-blue-700 text-blue-900 font-bold shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl mb-2">{rot.icon}</span>
                  <span className="text-xs font-serif font-bold truncate">{rot.name}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(3)} className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 font-serif font-semibold flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={() => setStep(5)} className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-serif font-semibold rounded-lg flex items-center gap-1 shadow-xs">
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5 & 6: DATES */}
        {(step === 5 || step === 6) && (
          <div className="space-y-6 animate-in fade-in duration-300 bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
            <div className="space-y-1">
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                {step === 5 ? "When does your rotation start?" : "When does your rotation end?"}
              </h2>
              <p className="text-xs font-serif text-slate-500">We'll automatically map out your 4-week learning roadmap</p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4 font-serif">
              <div>
                <label className="block text-xs font-serif font-bold text-slate-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-serif text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-slate-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-serif text-slate-900"
                />
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between text-xs">
                <span className="text-slate-700 font-serif font-medium">Calculated Rotation Length:</span>
                <span className="font-serif font-bold text-blue-700">{totalDays} Days</span>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(step - 1)} className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 font-serif font-semibold flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={() => setStep(7)} className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-serif font-semibold rounded-lg flex items-center gap-1 shadow-xs">
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: GOALS */}
        {step === 7 && (
          <div className="space-y-6 animate-in fade-in duration-300 bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
            <div className="space-y-1">
              <h2 className="text-2xl font-serif font-bold text-slate-900">What are your main goals?</h2>
              <p className="text-xs font-serif text-slate-500">Select all that apply to customize your daily engine</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
              {USER_GOALS.map((goal) => {
                const isSelected = selectedGoals.includes(goal.id);
                return (
                  <button
                    key={goal.id}
                    onClick={() => handleGoalToggle(goal.id)}
                    className={`p-3.5 rounded-xl border text-left flex items-center space-x-3 transition-all ${
                      isSelected
                        ? 'bg-blue-50 border-blue-700 text-blue-900 font-bold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                      isSelected ? 'bg-blue-700 border-blue-700 text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    <span className="text-xs font-serif">{goal.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(6)} className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 font-serif font-semibold flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={handleFinishOnboarding}
                className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-serif font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-all"
              >
                <span>Create Dashboard</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 8: CREATING DASHBOARD LOADER */}
        {step === 8 && (
          <div className="text-center py-16 space-y-6 animate-in fade-in duration-300 bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
            <div className="w-12 h-12 rounded-full border-4 border-blue-700 border-t-transparent animate-spin mx-auto" />
            <div className="space-y-2">
              <h2 className="text-xl font-serif font-bold text-slate-900">Generating Personalized Clinical Plan...</h2>
              <p className="text-xs font-serif text-slate-500">Prioritizing topics, case presentations, and attending questions for your rotation.</p>
            </div>
          </div>
        )}
      </main>

      <footer className="text-center text-[11px] font-serif text-slate-500 relative z-10">
        Rotation Companion • Medical Educational Platform
      </footer>
    </div>
  );
}

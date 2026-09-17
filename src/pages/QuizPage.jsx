import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, BookOpen, Filter } from 'lucide-react';
import { getQuestions, getTopics, saveQuizAttempt } from '../lib/db/storage';
import { useRotation } from '../context/RotationContext';
import { useAuth } from '../context/AuthContext';
import { HandDrawnButton } from '../components/ui/HandDrawnButton';
import { HandDrawnCard } from '../components/ui/HandDrawnCard';

export function QuizPage() {
  const { user } = useAuth();
  const { progress } = useRotation();
  const rotationId = progress?.rotation?.id || 'general-surgery';

  const [questionCount, setQuestionCount] = useState(5);
  const [selectedTopicIds, setSelectedTopicIds] = useState(['ALL']);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);

  const availableTopics = getTopics(rotationId);

  const mockMCQs = [
    {
      id: 'mcq-1',
      question: 'Which anatomical structure marks the base of the appendix during surgery?',
      options: ['Confluence of taeniae coli', 'Ligament of Treitz', 'Ileocecal valve', 'McBurney point'],
      correctIdx: 0,
      topicId: 'topic-surg-1',
      explanation: 'The three taeniae coli converge at the apex of the cecum, pinpointing the appendiceal base during laparoscopy or open surgery.',
      highYieldPearl: 'Confluence of taeniae coli at cecal apex = appendiceal base location.'
    },
    {
      id: 'mcq-2',
      question: 'What is the most common cause of Small Bowel Obstruction in patients with prior abdominal surgery?',
      options: ['Post-operative adhesions', 'Incarcerated hernias', 'Volvulus', 'Gastrointestinal stromal tumors'],
      correctIdx: 0,
      topicId: 'topic-surg-2',
      explanation: 'Prior surgical adhesions account for 60-75% of small bowel obstructions in developed nations.',
      highYieldPearl: 'Adhesions #1 cause in patients with prior surgery; Hernias #1 cause in patients without prior surgery.'
    },
    {
      id: 'mcq-3',
      question: 'On what post-operative day does surgical site infection (Wound) typically present with fever?',
      options: ['POD 1-2', 'POD 3-5', 'POD 5-7', 'POD 10+'],
      correctIdx: 2,
      topicId: 'topic-surg-3',
      explanation: 'Surgical site infections (Wound) classically present between POD 5 and POD 7 in the 5 Ws framework.',
      highYieldPearl: '5 Ws of Post-Op Fever: Wind (POD 1-2), Water (POD 3-5), Wound (POD 5-7), Walking (POD 7+), Wonder drugs (POD 7+).'
    },
    {
      id: 'mcq-4',
      question: 'What is the primary target door-to-balloon time for primary PCI in STEMI?',
      options: ['30 minutes', '60 minutes', '90 minutes', '180 minutes'],
      correctIdx: 2,
      topicId: 'topic-med-1',
      explanation: 'Door-to-balloon time should be under 90 minutes at PCI-capable centers to maximize myocardial salvage.',
      highYieldPearl: 'Door-to-balloon <90 min for PCI; Door-to-needle <30 min if fibrinolysis is used.'
    },
    {
      id: 'mcq-5',
      question: 'Which physical exam finding is most indicative of peritoneal irritation in acute appendicitis?',
      options: ['Rovsing sign', 'JVP elevation', 'S3 gallop', 'Scleral icterus'],
      correctIdx: 0,
      topicId: 'topic-surg-1',
      explanation: 'Rovsing sign (pain in RLQ upon deep palpation of LLQ) indicates peritoneal irritation in the right iliac fossa.',
      highYieldPearl: 'Rovsing sign = indirect rebound tenderness in RLQ.'
    }
  ];

  const parseOptions = (opts) => {
    if (Array.isArray(opts)) return opts;
    if (typeof opts === 'string') {
      try {
        const parsed = JSON.parse(opts);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        return [];
      }
    }
    return [];
  };

  const handleToggleTopic = (topicId) => {
    if (topicId === 'ALL') {
      setSelectedTopicIds(['ALL']);
      return;
    }

    setSelectedTopicIds((prev) => {
      const exists = prev.includes(topicId);
      let updated = prev.filter((id) => id !== 'ALL');

      if (exists) {
        updated = updated.filter((id) => id !== topicId);
      } else {
        updated.push(topicId);
      }

      if (updated.length === 0) return ['ALL'];
      return updated;
    });
  };

  const rawQuestions = getQuestions(rotationId);
  const normalizedDBQuestions = rawQuestions.map((q) => ({
    id: q.id,
    question: q.question,
    options: parseOptions(q.options),
    correctIdx: q.correctAnswerIndex ?? 0,
    topicId: q.topicId || 'general',
    explanation: q.explanation || 'Review topic clinical guidelines for detailed discussion.',
    highYieldPearl: q.highYieldPearl || q.explanation || 'Key clinical takeaway for shelf exam.'
  }));

  const allQuestionsPool = normalizedDBQuestions.length > 0 ? normalizedDBQuestions : mockMCQs;

  const filteredPool = selectedTopicIds.includes('ALL')
    ? allQuestionsPool
    : allQuestionsPool.filter((q) => selectedTopicIds.includes(q.topicId));

  const activeQuestions = filteredPool.slice(0, questionCount);
  const currentQ = activeQuestions[currentIdx] || activeQuestions[0];

  const handleSelectOption = (qIdx, optIdx) => {
    setSelectedAnswers({ ...selectedAnswers, [qIdx]: optIdx });
  };

  const handleNext = async () => {
    if (currentIdx < activeQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      setIsQuizActive(false);

      const results = calculateResults();
      await saveQuizAttempt({
        rotationId,
        score: results.correct,
        total: results.total,
        percentage: results.scorePercent,
        topics: selectedTopicIds
      });
    }
  };

  const handleRestart = () => {
    setIsQuizActive(false);
    setQuizFinished(false);
    setCurrentIdx(0);
    setSelectedAnswers({});
  };

  const calculateResults = () => {
    let correct = 0;
    activeQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIdx) {
        correct += 1;
      }
    });
    const total = activeQuestions.length;
    const scorePercent = Math.round((correct / total) * 100) || 0;
    return { correct, total, scorePercent };
  };

  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-4xl mx-auto space-y-8 font-serif animate-in fade-in duration-200 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="text-center space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-xl mx-auto shadow-xs">
          <Award className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-slate-100 tracking-tight">Rounds Quiz Engine</h1>
        <p className="text-sm font-serif text-slate-600 dark:text-slate-400">Practice questions, evaluate clinical accuracy, and review detailed explanations.</p>
      </div>

      {/* Configuration State — TOPIC SELECTION & QUESTION COUNT */}
      {!isQuizActive && !quizFinished && (
        <HandDrawnCard variant="default" className="p-8 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-700 dark:text-blue-400" />
            <span>Configure Quiz Session</span>
          </h2>

          <div className="space-y-6 text-sm font-serif">
            {/* 1. SELECT CLINICAL TOPIC(S) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block font-serif font-bold uppercase tracking-wider text-xs text-slate-700 dark:text-slate-300">
                  Select Clinical Topic(s) for Quiz
                </label>
                <span className="text-xs font-serif font-semibold text-blue-700 dark:text-blue-400">
                  {selectedTopicIds.includes('ALL') ? 'ALL SPECIALTY TOPICS' : `${selectedTopicIds.length} TOPIC(S) SELECTED`}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto p-1">
                <button
                  type="button"
                  onClick={() => setSelectedTopicIds(['ALL'])}
                  className={`px-3.5 py-2 rounded-lg border text-xs font-serif font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    selectedTopicIds.includes('ALL')
                      ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>ALL TOPICS (Comprehensive Quiz)</span>
                </button>

                {availableTopics.map((t) => {
                  const isSelected = selectedTopicIds.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleToggleTopic(t.id)}
                      className={`px-3.5 py-2 rounded-lg border text-xs font-serif font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {isSelected ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-slate-400" />
                      )}
                      <span>{t.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. SELECT QUESTION COUNT */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <label className="block font-serif font-bold uppercase tracking-wider text-xs text-slate-700 dark:text-slate-300 mb-2">
                Number of Questions
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[5, 10, 20, 30].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuestionCount(num)}
                    className={`py-2.5 rounded-lg border text-xs font-serif font-bold transition-all cursor-pointer ${
                      questionCount === num
                        ? 'bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {num} Qs
                  </button>
                ))}
              </div>
            </div>
          </div>

          <HandDrawnButton
            type="button"
            onClick={() => setIsQuizActive(true)}
            variant="accent"
            size="lg"
            className="w-full mt-4"
            icon={Award}
          >
            Start Quiz Session ({activeQuestions.length} Qs • {selectedTopicIds.includes('ALL') ? 'All Topics' : `${selectedTopicIds.length} Selected Topics`})
          </HandDrawnButton>
        </HandDrawnCard>
      )}

      {/* Active Question State */}
      {isQuizActive && !quizFinished && (
        <HandDrawnCard variant="default" className="p-8 space-y-6">
          <div className="flex items-center justify-between text-xs font-serif text-slate-500 border-b border-slate-200 dark:border-slate-700 pb-3">
            <span>Question {currentIdx + 1} of {activeQuestions.length}</span>
            <span className="text-blue-700 dark:text-blue-400 font-semibold">Progress: {Math.round(((currentIdx + 1) / activeQuestions.length) * 100)}%</span>
          </div>

          {currentQ?.vignette && (
            <p className="text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-serif italic leading-relaxed">
              {currentQ.vignette}
            </p>
          )}

          <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100 leading-snug">
            {currentQ?.question}
          </h3>

          <div className="space-y-3">
            {currentQ?.options?.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentIdx] === optIdx;
              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(currentIdx, optIdx)}
                  className={`w-full p-4 rounded-xl border text-left text-xs font-serif font-semibold transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
            <HandDrawnButton
              type="button"
              onClick={handleNext}
              disabled={selectedAnswers[currentIdx] === undefined}
              variant="accent"
              size="md"
              icon={ArrowRight}
            >
              {currentIdx < activeQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </HandDrawnButton>
          </div>
        </HandDrawnCard>
      )}

      {/* Quiz Finished State — Includes Full Question Review & Explanations */}
      {quizFinished && (
        <HandDrawnCard variant="default" className="p-8 text-center space-y-8">
          {/* Summary Header */}
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-serif font-bold text-2xl mx-auto shadow-sm">
              {calculateResults().scorePercent}%
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">Quiz Completed!</h2>
              <p className="text-sm font-serif text-slate-600 dark:text-slate-400">
                You answered <strong>{calculateResults().correct}</strong> out of <strong>{calculateResults().total}</strong> questions correctly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <NavLink to="/progress">
                <HandDrawnButton variant="outline" size="md" icon={Sparkles}>
                  Review Weak Areas on Progress Page
                </HandDrawnButton>
              </NavLink>

              <HandDrawnButton onClick={handleRestart} variant="accent" size="md" icon={RotateCcw}>
                Retake Quiz Session
              </HandDrawnButton>
            </div>
          </div>

          {/* Full Question Breakdown & Explanations */}
          <div className="text-left space-y-6 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-700 dark:text-blue-400" />
              <span>Question Breakdown & Explanations</span>
            </h3>

            <div className="space-y-6">
              {activeQuestions.map((q, idx) => {
                const userChoiceIdx = selectedAnswers[idx];
                const isCorrect = userChoiceIdx === q.correctIdx;

                return (
                  <div
                    key={q.id || idx}
                    className={`p-6 rounded-xl border space-y-4 transition-all shadow-xs ${
                      isCorrect 
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40' 
                        : 'bg-rose-50/70 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-serif font-bold uppercase px-2.5 py-1 rounded bg-slate-900 text-white">
                          Q{idx + 1}
                        </span>
                        <span
                          className={`text-xs font-serif font-bold uppercase px-3 py-1 rounded border flex items-center gap-1.5 ${
                            isCorrect 
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300' 
                              : 'bg-rose-100 text-rose-900 border-rose-300'
                          }`}
                        >
                          {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          {isCorrect ? 'CORRECT' : 'INCORRECT'}
                        </span>
                      </div>

                      <span className="text-xs font-serif text-slate-500">
                        Topic: {availableTopics.find(t => t.id === q.topicId)?.title || 'General Specialty'}
                      </span>
                    </div>

                    {q.vignette && (
                      <p className="text-xs text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 font-serif italic leading-relaxed">
                        {q.vignette}
                      </p>
                    )}

                    <h4 className="text-sm font-serif font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {q.question}
                    </h4>

                    {/* Options List */}
                    <div className="space-y-2 pt-1">
                      {q.options.map((optStr, optIdx) => {
                        const isUserChoice = userChoiceIdx === optIdx;
                        const isCorrectOpt = q.correctIdx === optIdx;

                        let optionStyle = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300";
                        if (isCorrectOpt) {
                          optionStyle = "bg-emerald-100 text-emerald-950 border-emerald-400 font-bold";
                        } else if (isUserChoice && !isCorrect) {
                          optionStyle = "bg-rose-100 text-rose-950 border-rose-400 font-bold line-through";
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-lg border text-xs font-serif flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{String.fromCharCode(65 + optIdx)}. {optStr}</span>
                            {isCorrectOpt && (
                              <span className="text-[10px] font-serif font-bold uppercase text-emerald-900 bg-emerald-200 px-2 py-0.5 rounded border border-emerald-400">
                                Correct Answer
                              </span>
                            )}
                            {isUserChoice && !isCorrectOpt && (
                              <span className="text-[10px] font-serif font-bold uppercase text-rose-900 bg-rose-200 px-2 py-0.5 rounded border border-rose-400">
                                Your Choice
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Clinical Explanation & High-Yield Pearl */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 space-y-2 text-xs font-serif">
                      <p>
                        <strong className="text-blue-700 dark:text-blue-400">Clinical Explanation:</strong> {q.explanation}
                      </p>
                      {q.highYieldPearl && (
                        <p className="pt-2 border-t border-slate-200 dark:border-slate-700 text-amber-900 dark:text-amber-300 font-bold">
                          💡 High-Yield Pearl: {q.highYieldPearl}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </HandDrawnCard>
      )}
    </div>
  );
}

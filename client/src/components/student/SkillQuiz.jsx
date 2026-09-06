import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QUIZ_QUESTIONS } from '../../data/mockData';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Check,
  Zap
} from 'lucide-react';

export const SkillQuiz = ({ onFinished }) => {
  const { recordQuizResults } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const question = QUIZ_QUESTIONS[currentIdx];
  const total = QUIZ_QUESTIONS.length;

  const handleSelectOption = (optId) => {
    if (isAnswerRevealed) return;
    setSelectedAnswers(prev => ({ ...prev, [question.id]: optId }));
  };

  const handleConfirmAnswer = () => {
    setIsAnswerRevealed(true);
  };

  const handleNext = () => {
    setIsAnswerRevealed(false);
    if (currentIdx < total - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      finalizeQuiz();
    }
  };

  const finalizeQuiz = () => {
    setShowResults(true);

    // Calculate score
    let correctCount = 0;
    const skillBoosts = {};

    QUIZ_QUESTIONS.forEach(q => {
      const selected = selectedAnswers[q.id];
      if (selected === q.correct) {
        correctCount += 1;
        skillBoosts[q.skillTarget] = (skillBoosts[q.skillTarget] || 0) + 18;
      } else {
        // Minor penalty or slight baseline increment
        skillBoosts[q.skillTarget] = (skillBoosts[q.skillTarget] || 0) + 4;
      }
    });

    const finalPercentage = Math.round((correctCount / total) * 100);

    // Trigger celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti triggered', e);
    }

    recordQuizResults(finalPercentage, skillBoosts);
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowResults(false);
    setIsAnswerRevealed(false);
  };

  if (showResults) {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) correctCount += 1;
    });
    const percentage = Math.round((correctCount / total) * 100);

    return (
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-md text-center max-w-2xl mx-auto space-y-6 animate-fadeIn">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
          <Award className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Assessment Completed
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            Skill Diagnostics Verified!
          </h2>
          <p className="text-slate-600 text-sm max-w-md mx-auto">
            Your answers have been cryptographically scored and added to your verified skill profile.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-3xl font-extrabold text-slate-900">{correctCount} / {total}</div>
            <div className="text-xs text-slate-500 font-semibold mt-1">Questions Correct</div>
          </div>
          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200">
            <div className="text-3xl font-extrabold text-indigo-600">{percentage}%</div>
            <div className="text-xs text-indigo-700 font-semibold mt-1">Diagnostic Score</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-left space-y-2">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Skills Upgraded & Stamped to Digital Portfolio:
          </div>
          <ul className="text-xs text-emerald-700 space-y-1 pl-5 list-disc">
            {QUIZ_QUESTIONS.map(q => (
              <li key={q.id}>
                <span className="font-semibold">{q.skillTarget}</span>: {selectedAnswers[q.id] === q.correct ? 'Verified Competent (+18 pts)' : 'Identified as Target Gap (+4 pts)'}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Quiz
          </button>
          <button
            onClick={onFinished}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all"
          >
            <span>View Updated Skill Gap Radar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const selectedOpt = selectedAnswers[question.id];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden max-w-3xl mx-auto">
      {/* Quiz Header with progress */}
      <div className="bg-slate-50/80 p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
              {question.category}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Target: <strong className="text-slate-700">{question.skillTarget}</strong>
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1">
            Skill Diagnostic Assessment
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-slate-500 font-medium">Question</div>
            <div className="text-sm font-extrabold text-slate-900">{currentIdx + 1} of {total}</div>
          </div>
          <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Body */}
      <div className="p-6 sm:p-8 space-y-6">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = selectedOpt === option.id;
            const isCorrect = option.id === question.correct;

            let borderClasses = 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50/50';
            if (isSelected) borderClasses = 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20';

            if (isAnswerRevealed) {
              if (isCorrect) {
                borderClasses = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20';
              } else if (isSelected && !isCorrect) {
                borderClasses = 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-500/20';
              } else {
                borderClasses = 'border-slate-200 opacity-60';
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                disabled={isAnswerRevealed}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${borderClasses}`}
              >
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold transition-all ${
                  isAnswerRevealed && isCorrect
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : isAnswerRevealed && isSelected && !isCorrect
                    ? 'bg-rose-600 border-rose-600 text-white'
                    : isSelected
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'border-slate-300 text-slate-600 bg-white'
                }`}>
                  {isAnswerRevealed && isCorrect ? <Check className="w-3.5 h-3.5" /> : option.id.toUpperCase()}
                </div>

                <div className="flex-1 text-sm font-medium text-slate-800 leading-snug">
                  {option.text}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation Card upon Reveal */}
        {isAnswerRevealed && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1 animate-fadeIn">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
              Technical Explanation:
            </span>
            <p className="text-slate-600 leading-relaxed">{question.explanation}</p>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="p-4 sm:px-8 bg-slate-50/50 border-t border-slate-200 flex items-center justify-between">
        <button
          onClick={handleRestart}
          className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
        >
          Cancel & Reset
        </button>

        <div className="flex items-center gap-3">
          {!isAnswerRevealed ? (
            <button
              onClick={handleConfirmAnswer}
              disabled={!selectedOpt}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedOpt
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Submit Answer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-sm transition-all"
            >
              <span>{currentIdx < total - 1 ? 'Next Question' : 'Complete Assessment'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

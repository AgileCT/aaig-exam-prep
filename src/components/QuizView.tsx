import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Question, DomainId, StudyDomainId, UserProgress } from '../types';
import { STUDY_DOMAIN_IDS, getDomainMeta } from '../data/domains';
import { 
  Bookmark, 
  Check, 
  X, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  BookOpen,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { shuffleQuestionOptions } from '../services/questionOrder';
import { resolveReferences } from '../services/referenceResolver';

interface QuizViewProps {
  questions: Question[];
  progress: UserProgress;
  onRecordAttempt: (questionId: string, answeredIndex: number, isCorrect: boolean) => void;
  onToggleBookmark: (questionId: string) => void;
  onOpenTutor: (question: Question) => void;
  initialDomainId?: DomainId | 'ALL';
  initialQuestionId?: string;
}

export const QuizView: React.FC<QuizViewProps> = ({
  questions,
  progress,
  onRecordAttempt,
  onToggleBookmark,
  onOpenTutor,
  initialDomainId = 'ALL',
  initialQuestionId,
}) => {
  const [selectedDomain, setSelectedDomain] = useState<StudyDomainId | 'ALL'>(initialDomainId === 'ALL' ? 'ALL' : getDomainMeta(initialDomainId).id);
  const filteredQuestions = useMemo(() => (selectedDomain === 'ALL'
    ? questions
    : questions.filter(q => q.domainId === selectedDomain)).map(q => shuffleQuestionOptions(q)), [questions, selectedDomain]);
  const [currentIndex, setCurrentIndex] = useState(() => Math.max(0, filteredQuestions.findIndex(q => q.id === initialQuestionId)));
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const submittedRef = useRef(false);

  const currentQ = filteredQuestions[currentIndex];

  useEffect(() => {
    setSelectedOption(null);
    setHasSubmitted(false);
    submittedRef.current = false;
  }, [currentIndex, selectedDomain, currentQ?.id]);

  if (!currentQ) {
    return (
      <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
        <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No questions found under this filter</h3>
        <p className="text-sm text-slate-500 mt-1">Try switching to another domain or generate new questions with AI.</p>
        <button
          onClick={() => setSelectedDomain('ALL')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700"
        >
          View All Questions
        </button>
      </div>
    );
  }

  const isBookmarked = progress.bookmarkedIds.includes(currentQ.id);

  const handleSelectOption = (idx: number) => {
    if (submittedRef.current) return;
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || submittedRef.current) return;
    submittedRef.current = true;
    setHasSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctIndex;
    const originalQuestion = questions.find(q => q.id === currentQ.id)!;
    const originalIndex = originalQuestion.options.indexOf(currentQ.options[selectedOption]);
    onRecordAttempt(currentQ.id, originalIndex, isCorrect);
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Domain Filter */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => { setSelectedDomain('ALL'); setCurrentIndex(0); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedDomain === 'ALL'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Domains ({questions.length})
          </button>
          {STUDY_DOMAIN_IDS.map(dId => (
            <button
              key={dId}
              onClick={() => { setSelectedDomain(dId); setCurrentIndex(0); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedDomain === dId
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {dId} ({questions.filter(q => q.domainId === dId).length})
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500">Practice · confirm each answer for feedback</span>
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Header Tags */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
              {currentQ.domainId} · {getDomainMeta(currentQ.domainId).name}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-semibold text-xs border border-amber-200/60 dark:border-amber-800/40">
              Type: {currentQ.questionType}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Question {currentIndex + 1} of {filteredQuestions.length}
            </span>
          </div>

          <button
            onClick={() => onToggleBookmark(currentQ.id)}
            className={`p-2 rounded-xl transition-colors ${
              isBookmarked
                ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-500'
                : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Bookmark this question"
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        {/* Scenario Text */}
        {currentQ.scenarioText && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            <span className="font-semibold text-slate-900 dark:text-white block mb-1">
              🏢 Enterprise Scenario:
            </span>
            {currentQ.scenarioText}
          </div>
        )}

        {/* Stem Question */}
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
          {currentQ.questionText}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const letter = 'ABCD'[idx];
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;

            let optionStyle = 'border-slate-200 dark:border-slate-750 hover:border-indigo-300 dark:hover:border-indigo-700 bg-white dark:bg-slate-850';

            if (isSelected) {
              optionStyle = 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 ring-1 ring-indigo-500';
            }

            if (hasSubmitted) {
              if (isCorrect) {
                optionStyle = 'border-emerald-500 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 ring-1 ring-emerald-500';
              } else if (isSelected && !isCorrect) {
                optionStyle = 'border-rose-500 dark:border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 ring-1 ring-rose-500';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={hasSubmitted}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-2xl border text-sm transition-all cursor-pointer flex items-start gap-3.5 select-none ${optionStyle}`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {letter}
                </div>
                <div className="flex-1 pt-0.5 leading-relaxed text-slate-800 dark:text-slate-200">
                  {option}
                </div>

                {hasSubmitted && (
                  <div className="shrink-0 pt-0.5">
                    {isCorrect && <Check className="w-5 h-5 text-emerald-500" />}
                    {isSelected && !isCorrect && <X className="w-5 h-5 text-rose-500" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === filteredQuestions.length - 1}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenTutor(currentQ)}
              className="px-4 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-semibold text-xs border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Ask AI Tutor
            </button>

            {!hasSubmitted && (
              <button
                onClick={handleConfirmAnswer}
                disabled={selectedOption === null}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-semibold text-xs shadow-md transition-all active:scale-95"
              >
                Confirm Answer
              </button>
            )}

            {hasSubmitted && currentIndex < filteredQuestions.length - 1 && (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1"
              >
                Next Question <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Detailed Explanation Drawer */}
        {hasSubmitted && (
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Author Governance Rationale
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                Key: {'ABCD'[currentQ.correctIndex]}
              </span>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {currentQ.explanation}
            </p>

            {/* Distractor Explanations */}
            {currentQ.distractorExplanations && currentQ.distractorExplanations.length > 0 && (
              <div className="pt-3 border-t border-slate-200 dark:border-slate-750">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                  ❌ Distractor Breakdown (Trap Analysis):
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  {currentQ.distractorExplanations.map((exp, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-slate-400">•</span>
                      <span>{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Source Reference & Direct Authoritative Links */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-750 space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span>📖 Reference: {currentQ.source}</span>
                <span className="text-[11px] bg-slate-200/80 dark:bg-slate-800 px-2 py-0.5 rounded">
                  Difficulty: {currentQ.difficulty}
                </span>
              </div>

              {(() => {
                const refs = resolveReferences(currentQ.source, currentQ.sourceUrl);
                if (refs.length === 0) return null;
                return (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                      Primary Sources:
                    </span>
                    {refs.map((r, i) => (
                      <a
                        key={i}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-300 font-medium text-[11px] transition-colors"
                      >
                        {r.label}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

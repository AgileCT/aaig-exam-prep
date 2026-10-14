import React, { useState, useEffect } from 'react';
import { Question, DomainId, UserProgress, ExamRecord } from '../types';
import { AAIG_DOMAINS } from '../data/domains';
import { 
  Clock, 
  Flag, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw,
  Award,
  Play,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MockExamViewProps {
  questions: Question[];
  progress: UserProgress;
  onRecordExam: (record: ExamRecord) => void;
  onRecordAttempt: (questionId: string, answeredIndex: number, isCorrect: boolean) => void;
}

export const MockExamView: React.FC<MockExamViewProps> = ({
  questions,
  progress,
  onRecordExam,
  onRecordAttempt,
}) => {
  // Exam session states
  const [isExamActive, setIsExamActive] = useState(false);
  const [examType, setExamType] = useState<'sprint' | 'full'>('sprint');
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(0);
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [examResult, setExamResult] = useState<{
    score: number;
    total: number;
    scaledScore: number;
    passed: boolean;
    domainBreakdown: Record<DomainId, { correct: number; total: number }>;
  } | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'missed'>('all');

  // Start exam setup
  const startExam = (type: 'sprint' | 'full') => {
    setExamType(type);
    const targetCount = type === 'full' ? Math.min(90, questions.length) : Math.min(25, questions.length);
    const targetSeconds = type === 'full' ? 150 * 60 : 40 * 60; // 150 mins or 40 mins

    // Shuffle and pick
    const shuffled = [...questions].sort(() => 0.5 - Math.random()).slice(0, targetCount);
    setExamQuestions(shuffled);
    setUserAnswers({});
    setFlaggedIds(new Set());
    setCurrentIndex(0);
    setTimeLeftSeconds(targetSeconds);
    setIsExamFinished(false);
    setExamResult(null);
    setIsExamActive(true);
  };

  // Timer countdown
  useEffect(() => {
    if (!isExamActive || isExamFinished || timeLeftSeconds <= 0) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamActive, isExamFinished, timeLeftSeconds]);

  const finishExam = () => {
    setIsExamFinished(true);

    let correctCount = 0;
    const breakdown: Record<DomainId, { correct: number; total: number }> = {
      D1: { correct: 0, total: 0 },
      D2: { correct: 0, total: 0 },
      D3: { correct: 0, total: 0 },
      D4: { correct: 0, total: 0 },
    };

    examQuestions.forEach(q => {
      const selected = userAnswers[q.id];
      const isCorrect = selected === q.correctIndex;
      if (selected !== undefined) {
        onRecordAttempt(q.id, selected, isCorrect);
      }
      if (isCorrect) correctCount++;

      if (breakdown[q.domainId]) {
        breakdown[q.domainId].total++;
        if (isCorrect) breakdown[q.domainId].correct++;
      }
    });

    const total = examQuestions.length;
    const rawRatio = total > 0 ? correctCount / total : 0;
    // ISACA 200..800 scaled score model: 450 is pass mark (~65%)
    const scaledScore = Math.round(200 + rawRatio * 600);
    const passed = scaledScore >= 450;

    const result = {
      score: correctCount,
      total,
      scaledScore,
      passed,
      domainBreakdown: breakdown,
    };

    setExamResult(result);

    const record: ExamRecord = {
      id: `exam-${Date.now()}`,
      date: Date.now(),
      score: correctCount,
      total,
      durationSeconds: (examType === 'full' ? 150 * 60 : 40 * 60) - timeLeftSeconds,
      breakdown,
    };
    onRecordExam(record);

    if (passed) {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const toggleFlag = (id: string) => {
    setFlaggedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 1. Landing Screen (Before Exam Starts)
  if (!isExamActive) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            ISACA AAIG™ Proctored Simulation Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Timed Mock Exam Simulator
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
            Simulate authentic testing center conditions: strict time limits, no immediate feedback, flagging for review, and official 200–800 scaled scoring with a 450 pass threshold.
          </p>
        </div>

        {/* Exam Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mini Sprint Mock */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 font-bold text-xs">
                  Quick Assessment
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" /> 40 Minutes
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Mini Sprint Mock Exam
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                A focused 25-question cross-domain sprint designed for rapid diagnosis and daily progress evaluation.
              </p>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 mb-6">
                <li>• 25 Questions sampled across D1–D4</li>
                <li>• 40 Minutes strict timer</li>
                <li>• Scaled scoring & missed question review</li>
              </ul>
            </div>
            <button
              onClick={() => startExam('sprint')}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" /> Start Mini Sprint (40m)
            </button>
          </div>

          {/* Full Official Simulation */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-500/40 shadow-md flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 font-bold text-[10px]">
                Recommended
              </span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                  Full Benchmark
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" /> 150 Minutes
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Full 90-Item Proctored Mock
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Authentic simulation matching ISACA's exact 90-question, 150-minute exam content outline and domain weight distributions.
              </p>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 mb-6">
                <li>• Full blueprint calibrated domain ratios</li>
                <li>• 150 Minutes countdown & question grid</li>
                <li>• Comprehensive domain readiness report</li>
              </ul>
            </div>
            <button
              onClick={() => startExam('full')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-semibold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" /> Start Full Simulation (150m)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Score Report Screen (After Exam Finishes)
  if (isExamFinished && examResult) {
    const missedQuestions = examQuestions.filter(q => userAnswers[q.id] !== q.correctIndex);
    const displayedQuestions = reviewFilter === 'missed' ? missedQuestions : examQuestions;

    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
        {/* Score Card Header */}
        <div className={`p-8 rounded-3xl text-white shadow-xl ${
          examResult.passed 
            ? 'bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900' 
            : 'bg-gradient-to-br from-rose-950 via-slate-900 to-slate-900'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {examResult.passed ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                ) : (
                  <XCircle className="w-6 h-6 text-rose-400" />
                )}
                <span className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  {examResult.passed ? 'PASSED · EXAM READY' : 'DID NOT PASS · FURTHER REVIEW NEEDED'}
                </span>
              </div>
              <h2 className="text-3xl font-extrabold">
                Scaled Score: {examResult.scaledScore} / 800
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Passing standard is 450. You answered {examResult.score} of {examResult.total} questions correctly ({Math.round((examResult.score / examResult.total) * 100)}%).
              </p>
            </div>

            <button
              onClick={() => setIsExamActive(false)}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all self-start sm:self-auto flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Exit to Dashboard
            </button>
          </div>
        </div>

        {/* Domain Breakdown Table */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Performance Breakdown by Domain
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(['D1', 'D2', 'D3', 'D4'] as DomainId[]).map(dId => {
              const dom = AAIG_DOMAINS[dId];
              const stat = examResult.domainBreakdown[dId] || { correct: 0, total: 0 };
              const ratio = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
              return (
                <div key={dId} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {dId} · {dom.name}
                    </span>
                    <span className="font-semibold text-slate-500">
                      {stat.correct}/{stat.total} ({ratio}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${ratio >= 65 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                      style={{ width: `${Math.max(5, ratio)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter Controls for Review */}
        <div className="flex items-center justify-between pt-2">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Question-by-Question Audit ({displayedQuestions.length} items)
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setReviewFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                reviewFilter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              All Items ({examQuestions.length})
            </button>
            <button
              onClick={() => setReviewFilter('missed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                reviewFilter === 'missed'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Missed Items Only ({missedQuestions.length})
            </button>
          </div>
        </div>

        {/* Detailed Question Review List */}
        <div className="space-y-4">
          {displayedQuestions.map((q, idx) => {
            const chosen = userAnswers[q.id];
            const isCorrect = chosen === q.correctIndex;

            return (
              <div
                key={q.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                      {q.domainId}
                    </span>
                    <span className="text-slate-500">{q.subDomain}</span>
                  </div>
                  <span className={`font-bold flex items-center gap-1 ${
                    isCorrect ? 'text-emerald-500' : 'text-rose-500'
                  }`}>
                    {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {q.questionText}
                </p>

                {/* Options Review */}
                <div className="space-y-1.5">
                  {q.options.map((opt, optIdx) => {
                    const isKey = optIdx === q.correctIndex;
                    const isChosen = optIdx === chosen;
                    let style = 'bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300';
                    if (isKey) style = 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 border border-emerald-300 dark:border-emerald-800 font-medium';
                    else if (isChosen && !isKey) style = 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 border border-rose-300 dark:border-rose-800';

                    return (
                      <div key={optIdx} className={`p-2.5 rounded-xl text-xs flex items-start gap-2 ${style}`}>
                        <span className="font-bold">{'ABCD'[optIdx]}.</span>
                        <span>{opt}</span>
                        {isChosen && <span className="ml-auto text-[10px] font-bold text-slate-400">(Your Selection)</span>}
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">Governance Rationale: </span>
                  {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 3. Active Proctored Exam View
  const currentQ = examQuestions[currentIndex];
  if (!currentQ) return null;

  const currentSelection = userAnswers[currentQ.id];
  const isFlagged = flaggedIds.has(currentQ.id);
  const isTimeCritical = timeLeftSeconds <= 300; // < 5 mins

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Proctored Exam Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            {examType === 'full' ? 'Full 90-Item Simulation' : 'Mini Sprint Mock'}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Question {currentIndex + 1} of {examQuestions.length}
          </span>
        </div>

        {/* Live Countdown Timer */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-mono font-bold ${
          isTimeCritical
            ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 animate-pulse border border-rose-300'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
        }`}>
          <Clock className="w-4 h-4" />
          <span>{formatTime(timeLeftSeconds)}</span>
        </div>

        <button
          onClick={finishExam}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
        >
          Submit Exam
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Question Body */}
        <div className="lg:col-span-3 space-y-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {currentQ.domainId} · {AAIG_DOMAINS[currentQ.domainId].name}
            </span>

            <button
              onClick={() => toggleFlag(currentQ.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                isFlagged
                  ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
                  : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500' : ''}`} />
              {isFlagged ? 'Flagged for Review' : 'Flag Question'}
            </button>
          </div>

          {currentQ.scenarioText && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">
                Scenario:
              </span>
              {currentQ.scenarioText}
            </div>
          )}

          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
            {currentQ.questionText}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const letter = 'ABCD'[idx];
              const isSelected = currentSelection === idx;

              return (
                <div
                  key={idx}
                  onClick={() => setUserAnswers(prev => ({ ...prev, [currentQ.id]: idx }))}
                  className={`p-4 rounded-2xl border text-sm transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 ring-1 ring-indigo-500 font-medium'
                      : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {letter}
                  </div>
                  <div className="pt-0.5 leading-relaxed">{opt}</div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 disabled:opacity-40 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
            <button
              onClick={() => currentIndex < examQuestions.length - 1 && setCurrentIndex(currentIndex + 1)}
              disabled={currentIndex === examQuestions.length - 1}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md disabled:opacity-40 flex items-center gap-1.5"
            >
              Next Question <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question Palette / Navigator Grid */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 h-fit">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>Question Palette</span>
            <span className="text-slate-400">
              {Object.keys(userAnswers).length}/{examQuestions.length} Done
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 max-h-[360px] overflow-y-auto pr-1">
            {examQuestions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isFlag = flaggedIds.has(q.id);
              const isCurrent = idx === currentIndex;

              let style = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400';
              if (isAnswered) style = 'bg-indigo-600 text-white font-bold';
              if (isFlag) style = 'bg-amber-500 text-white font-bold ring-2 ring-amber-300';
              if (isCurrent) style += ' ring-2 ring-indigo-400 dark:ring-indigo-300';

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-8 rounded-lg text-xs font-semibold transition-all ${style}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-indigo-600" /> Answered
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-500" /> Flagged for Review
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700" /> Unanswered
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

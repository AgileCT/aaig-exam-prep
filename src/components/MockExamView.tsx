import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Question, StudyDomainId, UserProgress, ExamRecord } from '../types';
import { AAIG_DOMAINS, STUDY_DOMAIN_IDS, getDomainMeta } from '../data/domains';
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
  ExternalLink,
} from 'lucide-react';
import { shuffleQuestionOptions } from '../services/questionOrder';
import { sampleStudyQuestions } from '../services/exam';
import { loadExamSession, saveExamSession, clearExamSession } from '../services/storage';
import { resolveReferences } from '../services/referenceResolver';
import { seenQuestionIds } from '../services/studyStats';

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
    answers: Record<string, number>;
    domainBreakdown: Record<StudyDomainId, { correct: number; total: number }>;
  } | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'missed'>('all');
  // null when the exam was resumed from a saved session and prior exposure is unknown.
  const [seenInExam, setSeenInExam] = useState<number | null>(0);
  const [resumedFromSnapshot, setResumedFromSnapshot] = useState(false);
  const [pendingAutoFinish, setPendingAutoFinish] = useState(false);
  const answersRef = useRef<Record<string, number>>({});
  const finishedRef = useRef(true);
  const startedAtRef = useRef(0);
  const deadlineRef = useRef(0);
  const durationRef = useRef(0);
  // Snapshot taken once on mount: a persisted session resumes instead of
  // losing a 90-question attempt to an accidental refresh.
  const [restoredSession] = useState(() => loadExamSession());

  // Start exam setup
  const startExam = (type: 'sprint' | 'full') => {
    if (questions.length === 0) return;
    setExamType(type);
    const targetCount = type === 'full' ? Math.min(90, questions.length) : Math.min(25, questions.length);
    const targetSeconds = type === 'full' ? 150 * 60 : 40 * 60; // 150 mins or 40 mins

    // Unseen questions are drawn first so repeated exams do not just test memory.
    const seen = seenQuestionIds(progress.history);
    const sampled = sampleStudyQuestions(questions, targetCount, Math.random, seen);
    setSeenInExam(sampled.filter(q => seen.has(q.id)).length);
    const shuffled = sampled.map(q => shuffleQuestionOptions(q));
    setExamQuestions(shuffled);
    answersRef.current = {};
    finishedRef.current = false;
    startedAtRef.current = Date.now();
    durationRef.current = targetSeconds;
    deadlineRef.current = startedAtRef.current + targetSeconds * 1000;
    setUserAnswers({});
    setFlaggedIds(new Set());
    setCurrentIndex(0);
    setTimeLeftSeconds(targetSeconds);
    setIsExamFinished(false);
    setExamResult(null);
    setReviewFilter('all');
    setIsExamActive(true);
  };

  const finishExam = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    clearExamSession();
    const finalAnswers = { ...answersRef.current };

    let correctCount = 0;
    const breakdown = Object.fromEntries(STUDY_DOMAIN_IDS.map(id => [id, { correct: 0, total: 0 }])) as Record<StudyDomainId, { correct: number; total: number }>;

    examQuestions.forEach(q => {
      const selected = finalAnswers[q.id];
      const isCorrect = selected === q.correctIndex;
      if (selected !== undefined) {
        const originalQuestion = questions.find(original => original.id === q.id)!;
        const originalIndex = originalQuestion.options.indexOf(q.options[selected]);
        onRecordAttempt(q.id, originalIndex, isCorrect);
      }
      if (isCorrect) correctCount++;

      const domainId = getDomainMeta(q.domainId).id;
      breakdown[domainId].total++;
      if (isCorrect) breakdown[domainId].correct++;
    });

    const total = examQuestions.length;
    const result = {
      score: correctCount,
      total,
      answers: finalAnswers,
      domainBreakdown: breakdown,
    };

    setExamResult(result);
    setIsExamFinished(true);

    const record: ExamRecord = {
      id: `exam-${Date.now()}`,
      date: Date.now(),
      score: correctCount,
      total,
      durationSeconds: Math.min(durationRef.current, Math.max(0, Math.floor((Date.now() - startedAtRef.current) / 1000))),
      breakdown,
    };
    onRecordExam(record);

  }, [examQuestions, questions, onRecordExam, onRecordAttempt]);

  useEffect(() => {
    if (!isExamActive || isExamFinished) return;
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((deadlineRef.current - Date.now()) / 1000));
      setTimeLeftSeconds(remaining);
      if (remaining === 0) finishExam();
    };
    tick();
    const timer = setInterval(tick, 1000);
    document.addEventListener('visibilitychange', tick);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [isExamActive, isExamFinished, finishExam]);

  // Restore a persisted session (refresh / accidental tab close). The clock
  // is a deadline, so any time spent away is deducted automatically.
  useEffect(() => {
    const snapshot = restoredSession;
    if (!snapshot) return;
    setExamType(snapshot.examType);
    setExamQuestions(snapshot.questions);
    answersRef.current = snapshot.userAnswers;
    setUserAnswers(snapshot.userAnswers);
    setFlaggedIds(new Set(snapshot.flaggedIds));
    setCurrentIndex(Math.min(snapshot.currentIndex, snapshot.questions.length - 1));
    startedAtRef.current = snapshot.startedAt;
    durationRef.current = snapshot.durationSeconds;
    deadlineRef.current = snapshot.examEndsAt;
    setTimeLeftSeconds(Math.max(0, Math.ceil((snapshot.examEndsAt - Date.now()) / 1000)));
    setSeenInExam(null);
    setIsExamFinished(false);
    setExamResult(null);
    setIsExamActive(true);
    finishedRef.current = false;
    if (snapshot.examEndsAt > Date.now()) {
      setResumedFromSnapshot(true);
    } else {
      // Deadline passed while away: grade what was answered.
      setPendingAutoFinish(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-finish once the restored state has committed
  useEffect(() => {
    if (!pendingAutoFinish) return;
    setPendingAutoFinish(false);
    finishExam();
  }, [pendingAutoFinish, finishExam]);

  // Persist the live session so a refresh can resume it
  useEffect(() => {
    if (!isExamActive || isExamFinished || examQuestions.length === 0 || !deadlineRef.current) return;
    saveExamSession({
      examType,
      questions: examQuestions,
      userAnswers,
      flaggedIds: Array.from(flaggedIds),
      currentIndex,
      startedAt: startedAtRef.current,
      durationSeconds: durationRef.current,
      examEndsAt: deadlineRef.current,
    });
  }, [isExamActive, isExamFinished, examQuestions, userAnswers, flaggedIds, currentIndex, examType]);

  const selectAnswer = (questionId: string, index: number) => {
    if (finishedRef.current) return;
    if (Date.now() >= deadlineRef.current) {
      finishExam();
      return;
    }
    const updated = { ...answersRef.current, [questionId]: index };
    answersRef.current = updated;
    setUserAnswers(updated);
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
            Timed Study Practice
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Timed Mock Exam Simulator
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
            Practice with a time limit, deferred feedback, and questions flagged for review. Results show raw accuracy on this sample, not an official exam score or a prediction of passing.
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
                Up to 25 questions across the three study domains, with 40 minutes to review your current understanding. Domain names align with ISACA's public domains; subtopics and balanced sampling are App-defined.
              </p>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 mb-6">
                <li>• {Math.min(25, questions.length)} questions sampled across {STUDY_DOMAIN_IDS.join(', ')}</li>
                <li>• 40 Minutes strict timer</li>
                <li>• Raw accuracy & missed question review</li>
              </ul>
            </div>
            <button
              onClick={() => startExam('sprint')}
              disabled={questions.length === 0}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" /> Start Mini Sprint (40m)
            </button>
          </div>

          {/* Longer Practice Session */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-500/40 shadow-md flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                  Full Benchmark
                </span>
                <div className="flex flex-col items-end gap-2 ml-auto">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 font-bold text-[10px]">
                    Recommended
                  </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium whitespace-nowrap">
                  <Clock className="w-3.5 h-3.5" /> 150 Minutes
                </span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Longer Mock Practice
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Up to 90 questions with a self-selected 150-minute time limit. Sampling aims for an equal allocation across the three study domains; shortages are filled from the remaining bank. This App-defined study allocation does not represent official exam weights.
              </p>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 mb-6">
                <li>• {Math.min(90, questions.length)} questions using balanced study sampling</li>
                <li>• 150 Minutes countdown & question grid</li>
                <li>• Domain accuracy and question review</li>
              </ul>
            </div>
            <button
              onClick={() => startExam('full')}
              disabled={questions.length === 0}
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
    const missedQuestions = examQuestions.filter(q => examResult.answers[q.id] !== q.correctIndex);
    const displayedQuestions = reviewFilter === 'missed' ? missedQuestions : examQuestions;

    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
        {/* Score Card Header */}
        <div className="p-8 rounded-3xl text-white shadow-xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-6 h-6 text-indigo-300" />
                <span className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  Practice Complete
                </span>
              </div>
              <h2 className="text-3xl font-extrabold">
                Accuracy: {examResult.total > 0 ? Math.round(examResult.score / examResult.total * 100) : 0}%
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                You answered {examResult.score} of {examResult.total} questions correctly. Unanswered questions count as missed. {seenInExam === null ? '' : seenInExam > 0 ? `${seenInExam} of ${examResult.total} questions had been answered before, so this score may overstate how you would do on new material. ` : 'All questions were new to you. '}This practice result does not predict an official exam outcome.
              </p>
            </div>

            <button
              onClick={() => setIsExamActive(false)}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all self-start sm:self-auto flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Choose Another Practice
            </button>
          </div>
        </div>

        {/* Domain Breakdown Table */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Performance Breakdown by Domain
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {STUDY_DOMAIN_IDS.map(dId => {
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
                      className="h-full bg-indigo-500"
                      style={{ width: `${ratio}%` }}
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
            Question-by-Question Review ({displayedQuestions.length} items)
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
            const chosen = examResult.answers[q.id];
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
                    {chosen === undefined ? 'Unanswered' : isCorrect ? 'Correct' : 'Incorrect'}
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

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-2 leading-relaxed">
                  <div>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">Governance Rationale: </span>
                    <span className="text-slate-600 dark:text-slate-300">{q.explanation}</span>
                  </div>
                  {q.source && (
                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex flex-wrap items-center justify-between gap-1.5 text-[11px] text-slate-500">
                      <span>📖 {q.source}</span>
                      {(() => {
                        const refs = resolveReferences(q.source, q.sourceUrl);
                        if (refs.length === 0) return null;
                        return (
                          <div className="flex flex-wrap items-center gap-1">
                            {refs.map((r, i) => (
                              <a
                                key={i}
                                href={r.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-300 font-medium text-[10px]"
                              >
                                {r.label}
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  )}
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
      {/* Resume notice */}
      {resumedFromSnapshot && (
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-medium">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          Session restored after page refresh — the clock kept running while you were away.
          <button
            onClick={() => setResumedFromSnapshot(false)}
            className="ml-auto font-bold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Proctored Exam Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              {examType === 'full' ? 'Longer Mock Practice' : 'Mini Sprint Mock'}
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
              {currentQ.domainId} · {getDomainMeta(currentQ.domainId).name}
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
                <button
                  key={idx}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => selectAnswer(currentQ.id, idx)}
                  className={`w-full text-left p-4 rounded-2xl border text-sm transition-all cursor-pointer flex items-start gap-3.5 select-none ${
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
                </button>
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

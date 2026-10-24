import React, { useState } from 'react';
import { Question, UserProgress, Flashcard, StudyDomainId } from '../types';
import { AAIG_DOMAINS } from '../data/domains';
import { 
  Target, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  Sparkles,
  History,
  Clock,
  Download,
  Upload,
  RotateCcw,
  FileJson
} from 'lucide-react';
import { exportProgressJSON, importProgressJSON, resetUserProgress } from '../services/storage';
import { firstAttemptSummary } from '../services/studyStats';

interface DashboardProps {
  questions: Question[];
  flashcards: Flashcard[];
  progress: UserProgress;
  onNavigate: (tab: 'quiz' | 'mockExam' | 'flashcards' | 'review' | 'generate') => void;
  onSelectDomainQuiz: (domainId: StudyDomainId) => void;
  onUpdateProgress?: (progress: UserProgress) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  questions,
  flashcards,
  progress,
  onNavigate,
  onSelectDomainQuiz,
  onUpdateProgress,
}) => {
  const [backupStatus, setBackupStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleExportProgress = () => {
    try {
      const json = exportProgressJSON(progress);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `aaig-study-progress-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setBackupStatus({ type: 'success', message: 'Study progress backup downloaded successfully!' });
      setTimeout(() => setBackupStatus(null), 4000);
    } catch (e: any) {
      setBackupStatus({ type: 'error', message: `Export failed: ${e.message}` });
    }
  };

  const handleImportProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const restored = importProgressJSON(text);
        if (onUpdateProgress) {
          onUpdateProgress(restored);
        }
        setBackupStatus({ type: 'success', message: 'Progress restored successfully from backup!' });
        setTimeout(() => setBackupStatus(null), 4000);
      } catch (err: any) {
        setBackupStatus({ type: 'error', message: err.message || 'Failed to restore backup.' });
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all quiz history, flashcard mastery, and mock exam records? This cannot be undone.')) {
      const blank = resetUserProgress();
      if (onUpdateProgress) {
        onUpdateProgress(blank);
      }
      setBackupStatus({ type: 'success', message: 'All study progress has been reset.' });
      setTimeout(() => setBackupStatus(null), 4000);
    }
  };
  // Compute stats
  const totalQuestions = questions.length;
  const attemptedQuestionIds = Object.keys(progress.history);
  const totalAttempted = attemptedQuestionIds.length;
  
  let totalCorrect = 0;
  let totalAttemptsCount = 0;
  attemptedQuestionIds.forEach(id => {
    const attempts = progress.history[id];
    if (attempts && attempts.length > 0) {
      const latest = attempts[attempts.length - 1];
      if (latest.isCorrect) totalCorrect++;
      totalAttemptsCount += attempts.length;
    }
  });

  // Latest-answer accuracy rises toward 100% as missed items are re-answered after
  // reading the explanation, so first-attempt accuracy is the headline figure.
  const latestAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  const firstTry = firstAttemptSummary(questions, progress.history);
  const accuracy = firstTry.attempted > 0 ? Math.round((firstTry.correct / firstTry.attempted) * 100) : 0;
  const masteredFlashcards = Object.values(progress.flashcardMastery).filter(m => m === 'mastered').length;

  // Domain statistics
  const domainStats = Object.values(AAIG_DOMAINS).map(dom => {
    const domainQuestions = questions.filter(q => q.domainId === dom.id);
    const domainAttempted = domainQuestions.filter(q => progress.history[q.id]?.length > 0);
    const domainCorrect = domainAttempted.filter(q => progress.history[q.id][0].isCorrect);

    const domainAcc = domainAttempted.length > 0 
      ? Math.round((domainCorrect.length / domainAttempted.length) * 100) 
      : 0;

    return {
      ...dom,
      totalCount: domainQuestions.length,
      attemptedCount: domainAttempted.length,
      correctCount: domainCorrect.length,
      accuracy: domainAcc,
    };
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-10 shadow-xl shadow-indigo-950/20">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold mb-4 backdrop-blur-sm">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            Independent AAIG™ Study Companion
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            AI Governance Exam Workbench
          </h1>
          <p className="text-sm sm:text-base text-indigo-100/90 leading-relaxed mb-6">
            Practice enterprise AI governance with original and AI-generated scenarios. These materials are unreviewed study drafts, not ISACA-approved questions or a predictor of exam success.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('mockExam')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-sm shadow-md transition-all active:scale-95"
            >
              <Award className="w-4 h-4 text-white" />
              Timed Mock Exam (150m)
            </button>
            <button
              onClick={() => onNavigate('quiz')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-indigo-900 font-semibold text-sm hover:bg-indigo-50 shadow-md transition-all active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Domain Practice
            </button>
            <button
              onClick={() => onNavigate('flashcards')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-700/60 hover:bg-indigo-700 border border-indigo-500/40 text-white font-semibold text-sm transition-all active:scale-95"
            >
              <Layers className="w-4 h-4 text-sky-300" />
              Review Flashcards
            </button>
            <button
              onClick={() => onNavigate('generate')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-950/60 hover:bg-indigo-950/80 border border-indigo-500/30 text-indigo-200 font-semibold text-sm transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              AI Generator
            </button>
          </div>
        </div>

        {/* Background glow decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-sky-500/20 to-transparent pointer-events-none rounded-r-3xl" />
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Question Bank</span>
            <Target className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {totalQuestions} <span className="text-xs font-normal text-slate-400">items</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Attempted {totalAttempted} ({totalQuestions > 0 ? Math.round((totalAttempted / totalQuestions) * 100) : 0}%)
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">First-Attempt Accuracy</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {accuracy}%
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
            Latest-answer {latestAccuracy}% · {totalAttemptsCount} attempts
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Flashcards Mastered</span>
            <Layers className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {masteredFlashcards} / {flashcards.length}
          </div>
          <div className="text-xs text-sky-600 dark:text-sky-400 mt-1">
            {flashcards.length > 0 ? Math.round((masteredFlashcards / flashcards.length) * 100) : 0}% mastery rate
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Missed Questions</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {progress.wrongIds.length} <span className="text-xs font-normal text-slate-400">items</span>
          </div>
          <div 
            onClick={() => onNavigate('review')}
            className="text-xs text-rose-600 dark:text-rose-400 mt-1 cursor-pointer hover:underline flex items-center gap-0.5"
          >
            Review in Notebook <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Domain Readiness Breakdown */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Progress by Study Domain
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Domain names align with ISACA's three public domains. Subtopics are App-defined; balanced sampling is a custom study choice, not official exam weighting.
            </p>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 self-start sm:self-auto">
            First-attempt accuracy · no official score estimate
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {domainStats.map(dom => (
            <div 
              key={dom.id}
              className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
                    {dom.id}
                  </span>
                  <span className="font-semibold text-sm text-slate-900 dark:text-slate-200">
                    {dom.name}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Balanced study sampling
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-1">
                {dom.description}
              </p>

              {/* Progress bar */}
              <div className="space-y-1.5 mb-3">
                <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  <span>Coverage: {dom.attemptedCount}/{dom.totalCount} questions</span>
                  <span>First-attempt accuracy: {dom.accuracy}%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      dom.accuracy >= 70 ? 'bg-emerald-500' : dom.accuracy >= 50 ? 'bg-amber-500' : 'bg-indigo-600'
                    }`}
                    style={{ width: `${dom.totalCount > 0 ? (dom.attemptedCount / dom.totalCount) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => onSelectDomainQuiz(dom.id)}
                className="w-full py-1.5 px-3 rounded-lg bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 text-xs font-medium flex items-center justify-center gap-1 transition-colors"
              >
                Practice Domain <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Mock Exam Performance History */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-500" />
              Mock Exam History & Performance
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track your mock simulation scores, completion times, and domain performance over time.
            </p>
          </div>
          <button
            onClick={() => onNavigate('mockExam')}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-400 font-semibold text-xs transition-colors self-start sm:self-auto flex items-center gap-1.5"
          >
            <Award className="w-4 h-4" /> Start New Simulation
          </button>
        </div>

        {(!progress.examRecords || progress.examRecords.length === 0) ? (
          <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-dashed border-slate-200 dark:border-slate-700/60 space-y-2">
            <Clock className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No mock exam records yet
            </p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Take a 25-item Mini Sprint (40m) or 90-item Full Simulation (150m) to test your endurance and benchmark your accuracy.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Total Simulated</span>
                <span className="font-bold text-base text-slate-900 dark:text-white">{progress.examRecords.length} attempts</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Best Accuracy</span>
                <span className="font-bold text-base text-emerald-600 dark:text-emerald-400">
                  {Math.max(...progress.examRecords.map(r => r.total > 0 ? Math.round((r.score / r.total) * 100) : 0))}%
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Average Score</span>
                <span className="font-bold text-base text-indigo-600 dark:text-indigo-400">
                  {Math.round(progress.examRecords.reduce((acc, r) => acc + (r.total > 0 ? (r.score / r.total) * 100 : 0), 0) / progress.examRecords.length)}%
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Latest Test</span>
                <span className="font-bold text-base text-slate-700 dark:text-slate-200">
                  {new Date(progress.examRecords[0].date).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto pr-1">
              {progress.examRecords.slice(0, 10).map((record, idx) => {
                const ratio = record.total > 0 ? Math.round((record.score / record.total) * 100) : 0;
                const mins = Math.floor(record.durationSeconds / 60);
                const secs = record.durationSeconds % 60;
                return (
                  <div key={record.id || idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {record.total >= 90 ? 'Full Simulation (90 Items)' : `Mini Sprint (${record.total} Items)`}
                        </span>
                        <span className="text-slate-400 text-[11px]">
                          {new Date(record.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                        </span>
                      </div>
                      {record.breakdown && (
                        <div className="flex flex-wrap gap-1.5 text-[10px]">
                          {Object.entries(record.breakdown).map(([dId, stat]) => (
                            <span key={dId} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              {dId}: {stat.correct}/{stat.total}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className="text-slate-400 font-mono text-[11px]">
                        ⏱ {mins}m {secs}s
                      </span>
                      <span className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                        ratio >= 70 ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400' :
                        ratio >= 50 ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400' :
                        'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {record.score}/{record.total} ({ratio}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Progress Data Management (Backup & Restore) */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileJson className="w-5 h-5 text-indigo-500" />
              Study Progress Backup & Sync
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Export your study history, bookmarks, and mock exam records as a JSON file, or restore them onto another device.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={handleExportProgress}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-indigo-500" /> Export Progress Backup (JSON)
          </button>

          <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5 text-indigo-500" /> Restore from JSON Backup
            <input
              type="file"
              accept=".json"
              onChange={handleImportProgress}
              className="hidden"
            />
          </label>

          <button
            onClick={handleResetProgress}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold transition-colors ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset All Progress
          </button>
        </div>

        {backupStatus && (
          <div className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
            backupStatus.type === 'success' 
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' 
              : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
          }`}>
            <span>{backupStatus.message}</span>
          </div>
        )}
      </div>

      {/* Core Standards Reference Banner */}
      <div className="bg-slate-100 dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 mb-3">
          📚 Public Governance References
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
              ISO/IEC 42001:2023
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              The premier certifiable Artificial Intelligence Management System (AIMS) standard, emphasizing the PDCA lifecycle and the Statement of Applicability (SoA).
            </p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
              NIST AI RMF 1.0
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              Core functions: GOVERN (cross-cutting institutional governance and culture), MAP (context & harms), MEASURE (trustworthiness metrics), and MANAGE (treatment).
            </p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
              EU AI Act
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              Obligations depend on the use case, operator role, risk classification, and applicable dates. Check the current law and its exceptions before applying a study summary.
            </p>
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Independently developed; not affiliated with or endorsed by ISACA. AAIG™ is an ISACA trademark.
        Check the <a className="underline" href="https://www.isaca.org/credentialing/aaig" target="_blank" rel="noopener noreferrer">official AAIG page</a> for current exam information.
      </p>
    </div>
  );
};

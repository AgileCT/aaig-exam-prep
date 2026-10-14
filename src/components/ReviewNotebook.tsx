import React, { useState } from 'react';
import { Question, UserProgress } from '../types';
import { Bookmark, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ReviewNotebookProps {
  questions: Question[];
  progress: UserProgress;
  onLaunchQuestion: (questionId: string) => void;
  onRemoveBookmark: (questionId: string) => void;
  onClearWrong: (questionId: string) => void;
}

export const ReviewNotebook: React.FC<ReviewNotebookProps> = ({
  questions,
  progress,
  onLaunchQuestion,
  onRemoveBookmark,
  onClearWrong,
}) => {
  const [activeTab, setActiveTab] = useState<'wrong' | 'bookmarked'>('wrong');

  const wrongQuestions = questions.filter(q => progress.wrongIds.includes(q.id));
  const bookmarkedQuestions = questions.filter(q => progress.bookmarkedIds.includes(q.id));

  const currentList = activeTab === 'wrong' ? wrongQuestions : bookmarkedQuestions;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Tab Switcher */}
      <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <button
          onClick={() => setActiveTab('wrong')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'wrong'
              ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-rose-500" />
          Missed Questions ({wrongQuestions.length})
        </button>
        <button
          onClick={() => setActiveTab('bookmarked')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'bookmarked'
              ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Bookmark className="w-4 h-4 text-amber-500" />
          Saved Bookmarks ({bookmarkedQuestions.length})
        </button>
      </div>

      {/* List */}
      {currentList.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            {activeTab === 'wrong' ? 'Great work! No missed questions currently.' : 'No bookmarked questions yet.'}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {activeTab === 'wrong' ? 'Keep up the practice streak across all domains.' : 'Click the bookmark icon on any question to save it here.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {currentList.map(q => {
            const attempts = progress.history[q.id] || [];
            const lastAttempt = attempts[attempts.length - 1];

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold">
                      {q.domainId}
                    </span>
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      {q.subDomain}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500 dark:text-slate-400">
                      Type: {q.questionType}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">
                    {q.questionText}
                  </p>

                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span>Reference ({q.reviewStatus === 'reviewed' && q.reviewedBy && q.reviewedAt ? 'reviewed' : 'unreviewed'}): {q.source}</span>
                    {lastAttempt && (
                      <span className={lastAttempt.isCorrect ? 'text-emerald-500' : 'text-rose-500'}>
                        Last Attempt: {lastAttempt.isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  {activeTab === 'wrong' && (
                    <button
                      onClick={() => onClearWrong(q.id)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Mark as resolved and remove"
                    >
                      Mark Resolved
                    </button>
                  )}
                  {activeTab === 'bookmarked' && (
                    <button
                      onClick={() => onRemoveBookmark(q.id)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                  <button
                    onClick={() => onLaunchQuestion(q.id)}
                    className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    Retest Now <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

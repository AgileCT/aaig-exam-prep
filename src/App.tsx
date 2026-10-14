import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { QuizView } from './components/QuizView';
import { MockExamView } from './components/MockExamView';
import { FlashcardView } from './components/FlashcardView';
import { ReviewNotebook } from './components/ReviewNotebook';
import { QuestionGeneratorModal } from './components/QuestionGeneratorModal';
import { AITutorModal } from './components/AITutorModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { 
  loadUserProgress, 
  saveUserProgress, 
  loadAllQuestions, 
  saveCustomQuestion, 
  loadAllFlashcards,
  saveCustomFlashcard,
  getApiKey, 
  saveApiKey 
} from './services/storage';
import { Question, Flashcard, DomainId, FlashcardMastery, UserProgress, ExamRecord } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'quiz' | 'mockExam' | 'flashcards' | 'review' | 'generate'>('dashboard');
  const [questions, setQuestions] = useState<Question[]>(() => loadAllQuestions());
  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => loadAllFlashcards());
  const [progress, setProgress] = useState<UserProgress>(() => loadUserProgress());
  const [apiKey, setApiKey] = useState<string>(() => getApiKey());
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [tutorContextQuestion, setTutorContextQuestion] = useState<Question | undefined>(undefined);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [quizDomainFilter, setQuizDomainFilter] = useState<DomainId | 'ALL'>('ALL');

  // Handle dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Persist progress changes
  const updateProgress = (updater: (prev: UserProgress) => UserProgress) => {
    setProgress(prev => {
      const updated = updater(prev);
      saveUserProgress(updated);
      return updated;
    });
  };

  const handleRecordAttempt = (questionId: string, answeredIndex: number, isCorrect: boolean) => {
    updateProgress(prev => {
      const history = { ...prev.history };
      const attempts = history[questionId] ? [...history[questionId]] : [];
      attempts.push({ answeredIndex, isCorrect, timestamp: Date.now() });
      history[questionId] = attempts;

      const wrongSet = new Set(prev.wrongIds);
      if (!isCorrect) {
        wrongSet.add(questionId);
      }

      return {
        ...prev,
        history,
        wrongIds: Array.from(wrongSet),
      };
    });
  };

  const handleRecordExam = (record: ExamRecord) => {
    updateProgress(prev => ({
      ...prev,
      examRecords: [record, ...(prev.examRecords || [])],
    }));
  };

  const handleToggleBookmark = (questionId: string) => {
    updateProgress(prev => {
      const set = new Set(prev.bookmarkedIds);
      if (set.has(questionId)) {
        set.delete(questionId);
      } else {
        set.add(questionId);
      }
      return {
        ...prev,
        bookmarkedIds: Array.from(set),
      };
    });
  };

  const handleUpdateFlashcardMastery = (cardId: string, mastery: FlashcardMastery) => {
    updateProgress(prev => ({
      ...prev,
      flashcardMastery: {
        ...prev.flashcardMastery,
        [cardId]: mastery,
      },
    }));
  };

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    saveApiKey(key);
  };

  const handleSaveCustomQuestion = (newQ: Question) => {
    const updated = saveCustomQuestion(newQ);
    setQuestions(updated);
  };

  const handleSaveCustomFlashcard = (newCard: Flashcard) => {
    const updated = saveCustomFlashcard(newCard);
    setFlashcards(updated);
  };

  const handleOpenTutorForQuestion = (q: Question) => {
    setTutorContextQuestion(q);
    setIsTutorOpen(true);
  };

  const handleSelectDomainFromDashboard = (dId: DomainId) => {
    setQuizDomainFilter(dId);
    setActiveTab('quiz');
  };

  const handleLaunchQuestionFromReview = (qId: string) => {
    const targetQ = questions.find(q => q.id === qId);
    if (targetQ) {
      setQuizDomainFilter(targetQ.domainId);
      setActiveTab('quiz');
    }
  };

  const handleClearWrong = (qId: string) => {
    updateProgress(prev => ({
      ...prev,
      wrongIds: prev.wrongIds.filter(id => id !== qId),
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenApiKey={() => setIsApiKeyModalOpen(true)}
        hasApiKey={!!apiKey}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        wrongCount={progress.wrongIds.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            questions={questions}
            flashcards={flashcards}
            progress={progress}
            onNavigate={(tab) => setActiveTab(tab)}
            onSelectDomainQuiz={handleSelectDomainFromDashboard}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            questions={questions}
            progress={progress}
            onRecordAttempt={handleRecordAttempt}
            onToggleBookmark={handleToggleBookmark}
            onOpenTutor={handleOpenTutorForQuestion}
            initialDomainId={quizDomainFilter}
          />
        )}

        {activeTab === 'mockExam' && (
          <MockExamView
            questions={questions}
            progress={progress}
            onRecordExam={handleRecordExam}
            onRecordAttempt={handleRecordAttempt}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardView
            flashcards={flashcards}
            progress={progress}
            onUpdateMastery={handleUpdateFlashcardMastery}
          />
        )}

        {activeTab === 'review' && (
          <ReviewNotebook
            questions={questions}
            progress={progress}
            onLaunchQuestion={handleLaunchQuestionFromReview}
            onRemoveBookmark={handleToggleBookmark}
            onClearWrong={handleClearWrong}
          />
        )}

        {activeTab === 'generate' && (
          <QuestionGeneratorModal
            apiKey={apiKey}
            onSaveQuestion={handleSaveCustomQuestion}
            onSaveFlashcard={handleSaveCustomFlashcard}
            onOpenApiKey={() => setIsApiKeyModalOpen(true)}
          />
        )}
      </main>

      {/* Floating AI Tutor Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            setTutorContextQuestion(undefined);
            setIsTutorOpen(true);
          }}
          className="p-3.5 sm:px-4 sm:py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-semibold text-xs shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <div className="relative">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -top-1 -right-1 animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -top-1 -right-1" />
            🤖
          </div>
          <span className="hidden sm:inline">Ask AI Tutor</span>
        </button>
      </div>

      {/* Modals */}
      <AITutorModal
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        contextQuestion={tutorContextQuestion}
        apiKey={apiKey}
      />

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveApiKey}
      />
    </div>
  );
};
export default App;

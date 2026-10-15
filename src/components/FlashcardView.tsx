import React, { useState } from 'react';
import { Flashcard, StudyDomainId, FlashcardMastery, UserProgress } from '../types';
import { STUDY_DOMAIN_IDS, getDomainMeta } from '../data/domains';
import { 
  RotateCw, 
  Check, 
  HelpCircle, 
  X, 
  ArrowLeft, 
  ArrowRight, 
  BookMarked,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FlashcardViewProps {
  flashcards: Flashcard[];
  progress: UserProgress;
  onUpdateMastery: (cardId: string, mastery: FlashcardMastery) => void;
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({
  flashcards,
  progress,
  onUpdateMastery,
}) => {
  const [selectedDomain, setSelectedDomain] = useState<StudyDomainId | 'ALL'>('ALL');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const filteredCards = selectedDomain === 'ALL'
    ? flashcards
    : flashcards.filter(c => c.domainId === selectedDomain);

  const currentCard = filteredCards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleMastery = (mastery: FlashcardMastery) => {
    if (!currentCard) return;
    onUpdateMastery(currentCard.id, mastery);
    if (mastery === 'mastered') {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.8 },
      });
    }
    handleNext();
  };

  if (!currentCard) {
    return (
      <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
        <BookMarked className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No flashcards found</h3>
        <button
          onClick={() => setSelectedDomain('ALL')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium"
        >
          View All Flashcards
        </button>
      </div>
    );
  }

  const currentMastery = progress.flashcardMastery[currentCard.id] || 'new';

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Filter and Counter */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => { setSelectedDomain('ALL'); setCurrentIndex(0); setIsFlipped(false); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedDomain === 'ALL'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Cards ({flashcards.length})
          </button>
          {STUDY_DOMAIN_IDS.map(dId => (
            <button
              key={dId}
              onClick={() => { setSelectedDomain(dId); setCurrentIndex(0); setIsFlipped(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedDomain === dId
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {dId} ({flashcards.filter(c => c.domainId === dId).length})
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Card {currentIndex + 1} of {filteredCards.length}
        </div>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        {currentCard.reviewStatus === 'reviewed' && currentCard.reviewedBy && currentCard.reviewedAt
          ? `Reviewed by ${currentCard.reviewedBy} on ${currentCard.reviewedAt}`
          : 'Unreviewed study material · verify the explanation and references before relying on them.'}
      </p>

      {/* 3D Flip Card Container */}
      <div 
        onClick={handleFlip}
        className="w-full min-h-[360px] cursor-pointer perspective-1000 select-none"
      >
        <div className={`relative w-full min-h-[360px] rounded-3xl transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}>
          {/* FRONT */}
          <div className="absolute inset-0 w-full h-full p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-100 dark:border-slate-800 shadow-xl shadow-indigo-900/5 flex flex-col justify-between backface-hidden">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                  {currentCard.domainId} · {getDomainMeta(currentCard.domainId).name}
                </span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  currentMastery === 'mastered' 
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400' 
                    : currentMastery === 'learning' 
                    ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400' 
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                  {currentMastery === 'mastered' ? 'Mastered' : currentMastery === 'learning' ? 'Reviewing' : 'New Card'}
                </span>
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                {currentCard.topic}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentCard.front}
              </h3>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 pt-6 border-t border-slate-100 dark:border-slate-800">
              <RotateCw className="w-3.5 h-3.5" /> Click card to flip and reveal governance breakdown
            </div>
          </div>

          {/* BACK */}
          <div className="absolute inset-0 w-full h-full p-8 rounded-3xl bg-slate-900 dark:bg-slate-950 text-white border-2 border-indigo-500/40 shadow-xl flex flex-col justify-between rotate-y-180 backface-hidden overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-indigo-400">
                  💡 Study Explanation & References
                </span>
                <span className="text-xs text-slate-400">
                  {currentCard.source}
                </span>
              </div>

              <div className="text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line mb-6">
                {currentCard.back}
              </div>

              {currentCard.keyTakeaway && (
                <div className="p-3.5 rounded-xl bg-indigo-950/80 border border-indigo-700/50 text-xs text-indigo-200 leading-relaxed">
                  <span className="font-bold text-indigo-300 block mb-1">🎯 Study Takeaway:</span>
                  {currentCard.keyTakeaway}
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 pt-4 border-t border-slate-800">
              <RotateCw className="w-3.5 h-3.5" /> Click card to flip back
            </div>
          </div>
        </div>
      </div>

      {/* Mastery Rating Action Buttons */}
      <div className="space-y-3">
        <div className="text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
          Self-evaluate your mastery of this concept:
        </div>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleMastery('learning')}
            className="py-3 px-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/30 hover:bg-rose-100 text-rose-700 dark:text-rose-400 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <X className="w-4 h-4" /> Difficult (Hard)
          </button>
          <button
            onClick={() => handleMastery('learning')}
            className="py-3 px-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/30 hover:bg-amber-100 text-amber-700 dark:text-amber-400 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <HelpCircle className="w-4 h-4" /> Needs Review
          </button>
          <button
            onClick={() => handleMastery('mastered')}
            className="py-3 px-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/30 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-400 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Check className="w-4 h-4" /> Mastered
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 text-xs font-medium flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Previous Card
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === filteredCards.length - 1}
          className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 text-xs font-medium flex items-center gap-1.5 transition-colors"
        >
          Next Card <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

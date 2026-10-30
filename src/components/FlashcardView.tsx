import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Flashcard, StudyDomainId, FlashcardMastery, UserProgress } from '../types';
import { STUDY_DOMAIN_IDS, getDomainMeta } from '../data/domains';
import { flashcardReviewIntervalDays, isFlashcardDue, orderCardsForReview } from '../services/studyStats';
import { 
  RotateCw, 
  Check, 
  HelpCircle, 
  X, 
  ArrowLeft, 
  ArrowRight, 
  BookMarked,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { resolveReferences } from '../services/referenceResolver';

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
  const [dueOnly, setDueOnly] = useState(false);
  const [scheduleNotice, setScheduleNotice] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  // Many card backs are taller than the card, so tell the learner when more text is below.
  const backRef = useRef<HTMLDivElement>(null);
  const frontFlipButtonRef = useRef<HTMLButtonElement>(null);
  const backFlipButtonRef = useRef<HTMLButtonElement>(null);
  const [moreBelow, setMoreBelow] = useState(false);
  const updateMoreBelow = () => {
    const el = backRef.current;
    setMoreBelow(!!el && el.scrollHeight - el.scrollTop - el.clientHeight > 8);
  };

  // Difficult and unseen cards come first. Ordered once from the mastery at the time the
  // deck is opened, so rating a card does not reshuffle the cards still to come.
  const masteryRef = useRef(progress.flashcardMastery);
  masteryRef.current = progress.flashcardMastery;
  const scheduleRef = useRef(progress.flashcardSchedule || {});
  scheduleRef.current = progress.flashcardSchedule || {};
  const orderedCards = useMemo(() => orderCardsForReview(flashcards, masteryRef.current, scheduleRef.current), [flashcards]);
  const domainCards = selectedDomain === 'ALL'
    ? orderedCards
    : orderedCards.filter(c => c.domainId === selectedDomain);
  const filteredCards = dueOnly
    ? domainCards.filter(card => isFlashcardDue(scheduleRef.current[card.id]?.nextReviewAt))
    : domainCards;

  const currentCard = filteredCards[currentIndex];

  useEffect(() => {
    if (backRef.current) backRef.current.scrollTop = 0;
    const timer = setTimeout(updateMoreBelow, 0);
    return () => clearTimeout(timer);
  }, [isFlipped, currentCard?.id]);

  const handleFlip = () => {
    const revealAnswer = !isFlipped;
    setIsFlipped(revealAnswer);
    window.setTimeout(() => {
      (revealAnswer ? backFlipButtonRef.current : frontFlipButtonRef.current)?.focus();
    }, 300);
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
    const previousSchedule = progress.flashcardSchedule?.[currentCard.id];
    const intervalDays = flashcardReviewIntervalDays(mastery, currentMastery === 'mastered', previousSchedule?.intervalDays);
    const nextReviewAt = Date.now() + intervalDays * 24 * 60 * 60 * 1000;
    setScheduleNotice(`${currentCard.topic} is scheduled for ${new Date(nextReviewAt).toLocaleDateString()}.`);
    onUpdateMastery(currentCard.id, mastery);
    if (mastery === 'mastered') {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.8 },
      });
    }
    if (dueOnly) {
      // The rated card leaves the due-only list after the parent saves its new date.
      setIsFlipped(false);
    } else {
      handleNext();
    }
  };

  if (!currentCard) {
    return (
      <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
        <BookMarked className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{dueOnly ? 'No cards are due right now' : 'No flashcards found'}</h3>
        {dueOnly && <p className="mt-1 text-sm text-slate-500">Your next scheduled review is later. You can keep studying the full deck.</p>}
        <button
          onClick={() => { setSelectedDomain('ALL'); setDueOnly(false); setCurrentIndex(0); }}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium"
        >
          View All Flashcards
        </button>
      </div>
    );
  }

  const currentMastery = progress.flashcardMastery[currentCard.id] || 'new';
  const currentReferences = resolveReferences(currentCard.source, currentCard.sourceUrl);

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
        <button
          type="button"
          aria-pressed={dueOnly}
          onClick={() => { setDueOnly(!dueOnly); setCurrentIndex(0); setIsFlipped(false); }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${dueOnly ? 'bg-indigo-600 text-white' : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          Due today ({domainCards.filter(card => isFlashcardDue(scheduleRef.current[card.id]?.nextReviewAt)).length})
        </button>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        {currentCard.reviewStatus === 'reviewed' && currentCard.reviewedBy && currentCard.reviewedAt
          ? `Reviewed by ${currentCard.reviewedBy} on ${currentCard.reviewedAt}`
          : currentCard.verification === 'pending'
            ? 'New card, pending verification · its content and references have not been checked against sources yet.'
            : 'Unreviewed study material · verify the explanation and references before relying on them.'}
      </p>

      {/* 3D Flip Card Container */}
      <div className="w-full min-h-[440px] perspective-1000 select-none">
        <div className={`relative w-full min-h-[440px] rounded-3xl transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}>
          {/* FRONT */}
          <button ref={frontFlipButtonRef} type="button" onClick={handleFlip} aria-label="Reveal flashcard answer" aria-hidden={isFlipped} tabIndex={isFlipped ? -1 : 0} className="absolute inset-0 w-full h-full p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-100 dark:border-slate-800 shadow-xl shadow-indigo-900/5 flex flex-col justify-between backface-hidden text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/60">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                  {currentCard.domainId} · {getDomainMeta(currentCard.domainId).name}
                </span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  currentMastery === 'mastered' 
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400' 
                    : currentMastery === 'hard'
                    ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                    : currentMastery === 'learning' 
                    ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400' 
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                  {currentMastery === 'mastered' ? 'Mastered' : currentMastery === 'hard' ? 'Difficult' : currentMastery === 'learning' ? 'Reviewing' : 'New Card'}
                </span>
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                {currentCard.topic}
              </div>
              {(currentCard.scope || currentCard.verification === 'pending') && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {currentCard.scope && (
                    <span className="px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 text-[11px] font-semibold">
                      {currentCard.scope}
                    </span>
                  )}
                  {currentCard.verification === 'pending' && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 text-[11px] font-semibold">
                      Pending verification
                    </span>
                  )}
                </div>
              )}

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentCard.front}
              </h3>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 pt-6 border-t border-slate-100 dark:border-slate-800">
              <RotateCw className="w-3.5 h-3.5" /> Press to reveal the governance breakdown
            </div>
          </button>

          {/* BACK */}
          <div ref={backRef} aria-hidden={!isFlipped} onScroll={updateMoreBelow} className="absolute inset-0 w-full h-full p-8 rounded-3xl bg-slate-900 dark:bg-slate-950 text-white border-2 border-indigo-500/40 shadow-xl flex flex-col justify-between rotate-y-180 backface-hidden overflow-y-auto">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <span className="text-xs font-bold text-indigo-400">
                  💡 Study Explanation & Reference Links
                </span>
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                  <span>{currentCard.source}</span>
                  {(() => {
                    const refs = resolveReferences(currentCard.source, currentCard.sourceUrl);
                    if (refs.length === 0) return null;
                    return (
                      <div className="flex flex-wrap gap-1">
                        {refs.map((r, i) => (
                          <a
                            key={i}
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            tabIndex={isFlipped ? 0 : -1}
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 font-medium text-[10px] border border-indigo-700/50"
                          >
                            {r.label}
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mb-3">{currentReferences.length > 0 ? 'Check that the linked material supports this specific explanation before relying on it.' : 'No link could be matched to this reference label.'}</p>

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

            <button ref={backFlipButtonRef} type="button" onClick={handleFlip} tabIndex={isFlipped ? 0 : -1} className="flex items-center justify-center gap-1.5 text-xs text-slate-400 pt-4 border-t border-slate-800 bg-transparent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
              <RotateCw className="w-3.5 h-3.5" /> Press to flip the card back
            </button>
            {moreBelow && (
              <div className="sticky bottom-0 -mx-8 -mb-8 pt-10 pb-3 text-center text-[11px] font-semibold text-indigo-300 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent pointer-events-none">
                Scroll for the rest and the study takeaway ↓
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mastery Rating Action Buttons */}
      <div className="space-y-3">
        <div className="text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
          Self-evaluate your mastery of this concept:
        </div>
        {scheduleNotice && <p role="status" className="text-center text-xs text-indigo-600 dark:text-indigo-300">{scheduleNotice}</p>}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleMastery('hard')}
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

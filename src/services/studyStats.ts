import type { Flashcard, FlashcardMastery, Question, UserProgress } from '../types';

type History = UserProgress['history'];

export interface AccuracySummary { attempted: number; correct: number; total: number }

/**
 * First-attempt accuracy: only each question's first recorded answer counts,
 * so re-answering after reading the explanation cannot inflate the score.
 */
export function firstAttemptSummary(questions: readonly Question[], history: History): AccuracySummary {
  let attempted = 0, correct = 0;
  for (const question of questions) {
    const first = history[question.id]?.[0];
    if (!first) continue;
    attempted++;
    if (first.isCorrect) correct++;
  }
  return { attempted, correct, total: questions.length };
}

export function subtopicFirstAttempt(questions: readonly Question[], history: History): Record<string, AccuracySummary> {
  const result: Record<string, AccuracySummary> = {};
  for (const question of questions) {
    const bucket = (result[question.subDomain] ||= { attempted: 0, correct: 0, total: 0 });
    bucket.total++;
    const first = history[question.id]?.[0];
    if (first) { bucket.attempted++; if (first.isCorrect) bucket.correct++; }
  }
  return result;
}

/** Untested subtopics rank as 50% so they are tried before well-mastered ones. */
const subtopicScore = (bucket: AccuracySummary) => bucket.attempted === 0 ? 0.5 : bucket.correct / bucket.attempted;

/**
 * Orders questions for focused practice: weakest subtopics first, unseen
 * questions before seen ones, random within ties.
 */
export function orderWeakFirst(questions: readonly Question[], history: History, rng: () => number = Math.random): Question[] {
  const buckets = subtopicFirstAttempt(questions, history);
  const keyed = questions.map(question => ({
    question,
    score: subtopicScore(buckets[question.subDomain]),
    seen: history[question.id]?.length ? 1 : 0,
    tie: rng(),
  }));
  keyed.sort((a, b) => a.score - b.score || a.seen - b.seen || a.tie - b.tie);
  return keyed.map(entry => entry.question);
}

export function seenQuestionIds(history: History): Set<string> {
  return new Set(Object.keys(history).filter(id => history[id]?.length > 0));
}

const CARD_PRIORITY: Record<FlashcardMastery, number> = { hard: 0, new: 1, learning: 2, mastered: 3 };

/**
 * Orders flashcards for review: difficult cards first, then cards not yet rated, then
 * cards marked for review, then mastered ones. Ties keep the deck's own order.
 */
export function orderCardsForReview(cards: readonly Flashcard[], mastery: Readonly<Record<string, FlashcardMastery>>): Flashcard[] {
  return cards
    .map((card, index) => ({ card, index, priority: CARD_PRIORITY[mastery[card.id] ?? 'new'] ?? CARD_PRIORITY.new }))
    .sort((a, b) => a.priority - b.priority || a.index - b.index)
    .map(entry => entry.card);
}

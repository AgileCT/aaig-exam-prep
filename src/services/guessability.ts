import type { Question } from '../types';

/**
 * Scenario-blind answer guesser used as a content-quality indicator. It never
 * reads the scenario or stem: it rewards governance vocabulary and penalizes
 * wording typical of wrong options. A high hit rate means the correct answer
 * can be found by option wording alone rather than by reasoning about the case.
 */
export const GUESSABILITY_TARGET = 0.4;

const POSITIVE = /risk appetite|tolerance|charter|steering committee|framework|accountab|decision rights|governance|policy|policies|baseline|escalat|owner/gi;
const NEGATIVE = /first[- ]line|1st[- ]line|internal audit|third[- ]line|data scien|engineer|automat|deploy|tool|dashboard|telemetry|immediately|exclusively|solely|unilateral|bypass|without/gi;

const score = (option: string) => (option.match(POSITIVE) || []).length - (option.match(NEGATIVE) || []).length;

/** Chance the guesser picks the right option; ties are broken at random, not by position. */
export function guessProbability(question: Pick<Question, 'options' | 'questionType' | 'correctIndex'>): number {
  const scores = question.options.map(score);
  const target = question.questionType === 'LEAST' ? Math.min(...scores) : Math.max(...scores);
  const tied = scores.filter(value => value === target).length;
  return scores[question.correctIndex] === target ? 1 / tied : 0;
}

export function guessabilityRate(questions: readonly Pick<Question, 'options' | 'questionType' | 'correctIndex'>[]): number {
  if (questions.length === 0) return 0;
  return questions.reduce((sum, question) => sum + guessProbability(question), 0) / questions.length;
}

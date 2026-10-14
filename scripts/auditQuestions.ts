/** Offline structure and bias indicators only. No model calls or expert accuracy approval. */
import { pathToFileURL } from 'node:url';
import type { Question } from '../src/types';
import { INITIAL_QUESTIONS } from '../src/data/questions';
import { INITIAL_FLASHCARDS } from '../src/data/flashcards';
import { isQuestion, isFlashcard, passesLengthGate } from '../src/services/contentValidation';
import { normalizeQuestionStem } from './generateQuestions';

export function auditQuestionBank(questionValues: readonly unknown[], flashcardValues: readonly unknown[]) {
  const errors: string[] = [], warnings: string[] = [];
  const questions = questionValues.filter(isQuestion), flashcards = flashcardValues.filter(isFlashcard);
  if (questions.length !== questionValues.length) errors.push(`${questionValues.length - questions.length} question schema failures`);
  if (flashcards.length !== flashcardValues.length) errors.push(`${flashcardValues.length - flashcards.length} flashcard schema failures`);
  const seenIds = new Set<string>(), seenStems = new Set<string>();
  for (const question of questions) {
    const stem = normalizeQuestionStem(question.questionText);
    if (seenIds.has(question.id)) errors.push(`duplicate question ID: ${question.id}`);
    if (seenStems.has(stem)) errors.push(`duplicate question stem: ${question.id}`);
    seenIds.add(question.id); seenStems.add(stem);
    if (new Set(question.options.map(normalizeQuestionStem)).size !== 4) errors.push(`duplicate options: ${question.id}`);
    if (question.distractorAxes && (!Array.isArray(question.distractorAxes) || question.distractorAxes.length !== 3 || question.distractorAxes.some(axis => typeof axis !== 'string' || !axis.trim()))) {
      errors.push(`invalid distractorAxes: ${question.id}`);
    }
  }
  const seenCards = new Set<string>();
  for (const card of flashcards) {
    if (seenCards.has(card.id)) errors.push(`duplicate flashcard ID: ${card.id}`);
    seenCards.add(card.id);
  }
  const unreviewedQuestions = questions.filter(q => q.reviewStatus !== 'reviewed').length;
  const unreviewedFlashcards = flashcards.filter(q => q.reviewStatus !== 'reviewed').length;
  if (unreviewedQuestions || unreviewedFlashcards) warnings.push(`${unreviewedQuestions} questions and ${unreviewedFlashcards} flashcards are unreviewed; this audit does not verify citations, legal accuracy or exam relevance`);
  const withoutSourceUrl = questions.filter(q => !q.sourceUrl).length;
  if (withoutSourceUrl) warnings.push(`${withoutSourceUrl} questions have reference labels without sourceUrl evidence; locators remain unverified`);
  const missingAxes = questions.filter(q => !q.distractorAxes).length;
  if (missingAxes) warnings.push(`${missingAxes} retained questions lack distractorAxes; future generation gates are not retroactive expert verification`);
  const outsideParity = questions.filter(q => !passesLengthGate(q));
  if (outsideParity.length) warnings.push(`${outsideParity.length} retained questions fall outside length parity [0.75, 1.45]: ${outsideParity.map(q => q.id).join(', ')}`);
  const longestCorrect = questions.filter(q => q.options[q.correctIndex].length === Math.max(...q.options.map(option => option.length))).length;
  if (longestCorrect) warnings.push(`${longestCorrect} retained questions have a longest correct option (including ties); display shuffling removes position cues only`);
  const byTopic: Record<string, { count: number; answerPositions: number[]; questionTypes: string[] }> = {};
  const grouped = new Map<string, Question[]>();
  for (const question of questions) grouped.set(question.subDomain, [...(grouped.get(question.subDomain) || []), question]);
  for (const [topic, group] of grouped) {
    const answerPositions = [0, 1, 2, 3].map(i => group.filter(q => q.correctIndex === i).length);
    const questionTypes = [...new Set(group.map(q => q.questionType))];
    byTopic[topic] = { count: group.length, answerPositions, questionTypes };
    if (group.length > 1 && answerPositions.some(count => count === group.length)) warnings.push(`${topic}: fixed answer position in ${group.length} canonical questions; UI shuffling does not revise authored content`);
    else if (group.length >= 5 && Math.max(...answerPositions) / group.length >= 0.8) {
      const dominant = answerPositions.indexOf(Math.max(...answerPositions));
      warnings.push(`${topic}: dominant answer position ${'ABCD'[dominant]} in ${(100 * answerPositions[dominant] / group.length).toFixed(1)}% of ${group.length} canonical questions; retained content remains unreviewed`);
    }
    if (group.length > 1 && questionTypes.length === 1) warnings.push(`${topic}: single question type (${questionTypes[0]}) across ${group.length} retained questions`);
  }
  return {
    scope: 'Offline structural and concentration checks; no API calls, SME approval or official exam validation',
    questionCount: questions.length, flashcardCount: flashcards.length,
    unreviewedQuestions, unreviewedFlashcards,
    domains: Object.fromEntries(['D1', 'D2', 'D3', 'D4'].map(domain => [domain, questions.filter(q => q.domainId === domain).length])),
    answerPositions: [0, 1, 2, 3].map(i => questions.filter(q => q.correctIndex === i).length),
    byTopic, errors, warnings,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const report = auditQuestionBank(INITIAL_QUESTIONS, INITIAL_FLASHCARDS);
  console.log(JSON.stringify(report, null, 2));
  if (report.errors.length) process.exitCode = 1;
}

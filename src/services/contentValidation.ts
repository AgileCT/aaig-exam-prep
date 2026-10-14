import { Difficulty, DomainId, Flashcard, Question, QuestionType } from '../types';

const domainIds = ['D1', 'D2', 'D3', 'D4'];
const questionTypes = ['BEST', 'FIRST', 'MOST', 'PRIMARY', 'LEAST'];
const difficulties = ['Fundamental', 'Intermediate', 'Director-Level'];
const record = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
const text = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0 && value.length <= 20_000;
const strings = (value: unknown, count: number): value is string[] => Array.isArray(value) && value.length === count && value.every(text);

export function isQuestion(value: unknown): value is Question {
  return record(value) && text(value.id) && typeof value.domainId === 'string' && domainIds.includes(value.domainId) && text(value.subDomain)
    && text(value.questionText) && strings(value.options, 4)
    && new Set(value.options.map(option => option.trim().toLowerCase())).size === 4 && Number.isInteger(value.correctIndex)
    && Number(value.correctIndex) >= 0 && Number(value.correctIndex) <= 3
    && typeof value.questionType === 'string' && questionTypes.includes(value.questionType)
    && typeof value.difficulty === 'string' && difficulties.includes(value.difficulty)
    && text(value.explanation) && text(value.source)
    && (value.scenarioText === undefined || text(value.scenarioText))
    && (value.distractorExplanations === undefined || strings(value.distractorExplanations, 3));
}

export function isFlashcard(value: unknown): value is Flashcard {
  return record(value) && text(value.id) && typeof value.domainId === 'string' && domainIds.includes(value.domainId)
    && text(value.topic) && text(value.front) && text(value.back) && text(value.source) && text(value.keyTakeaway);
}

export function parseGeneratedJson(raw: string): Record<string, unknown> {
  let value: unknown;
  try { value = JSON.parse(raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim()); }
  catch { throw new Error('AI output was not valid JSON. Please generate again.'); }
  if (!record(value)) throw new Error('AI output must be a JSON object. Please generate again.');
  return value;
}

export function parseGeneratedQuestion(raw: string, domainId: DomainId, subDomain: string, questionType: QuestionType, difficulty: Difficulty): Question {
  const value = parseGeneratedJson(raw);
  const question: unknown = {
    id: `aaig-custom-${crypto.randomUUID()}`, domainId, subDomain, questionType, difficulty,
    scenarioText: value.scenarioText, questionText: value.questionText, options: value.options,
    correctIndex: value.correctIndex, explanation: value.explanation,
    distractorExplanations: value.distractorExplanations, source: value.source, reviewStatus: 'unreviewed',
  };
  if (!isQuestion(question) || !strings(value.distractorExplanations, 3)) {
    throw new Error('AI question failed schema checks: four text options, a valid answer index, and complete explanations are required.');
  }
  return question;
}

export function parseGeneratedFlashcard(raw: string, domainId: DomainId): Flashcard {
  const value = parseGeneratedJson(raw);
  const card: unknown = {
    id: `fc-custom-${crypto.randomUUID()}`, domainId,
    topic: value.topic, front: value.front, back: value.back, source: value.source,
    keyTakeaway: value.keyTakeaway, reviewStatus: 'unreviewed',
  };
  if (!isFlashcard(card)) throw new Error('AI flashcard failed schema checks: all card fields must contain text.');
  return card;
}

export function questionLengthRatio(question: Question): number {
  const others = question.options.filter((_, index) => index !== question.correctIndex);
  const mean = others.reduce((sum, option) => sum + option.trim().length, 0) / others.length;
  return question.options[question.correctIndex].trim().length / mean;
}

export function passesLengthGate(question: Question): boolean {
  const ratio = questionLengthRatio(question);
  return Number.isFinite(ratio) && ratio >= 0.75 && ratio <= 1.45;
}

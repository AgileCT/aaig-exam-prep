import test from 'node:test';
import assert from 'node:assert/strict';
import { AAIG_DOMAINS } from '../src/data/domains';
import { INITIAL_QUESTIONS } from '../src/data/questions';
import { INITIAL_FLASHCARDS } from '../src/data/flashcards';
import { loadAllQuestions, loadAllFlashcards, loadUserProgress, saveUserProgress, saveCustomQuestion, saveCustomFlashcard } from '../src/services/storage';
import { sampleStudyQuestions } from '../src/services/exam';
import { parseGeneratedQuestion, parseGeneratedFlashcard } from '../src/services/contentValidation';
import type { Question, Flashcard, UserProgress } from '../src/types';
import { setupDom } from './dom';

const legacyQuestion = (id: string, subDomain = 'D4.4 Third-Party & Supply Chain AI Risk Management'): Question => ({
  ...INITIAL_QUESTIONS[0], id, domainId: 'D4', subDomain,
});
const legacyCard = (id: string): Flashcard => ({ ...INITIAL_FLASHCARDS[0], id, domainId: 'D4', topic: 'Third-Party & Supply Chain AI Risk Management' });

test('active domains match the three public ISACA areas and built-in content contains no active D4', () => {
  assert.deepEqual(Object.keys(AAIG_DOMAINS), ['D1', 'D2', 'D3']);
  assert.deepEqual(Object.values(AAIG_DOMAINS).map(d => d.name), [
    'AI Enterprise Governance', 'Data and AI Architecture Principles', 'AI Enterprise Integration and Performance Monitoring',
  ]);
  assert.equal(INITIAL_QUESTIONS.length, 359);
  assert.equal(INITIAL_FLASHCARDS.length, 40);
  assert.ok([...INITIAL_QUESTIONS, ...INITIAL_FLASHCARDS].every(item => item.domainId !== 'D4'));
  assert.ok(INITIAL_QUESTIONS.every(q => !q.subDomain.startsWith('D4.')));
});

test('legacy custom questions are classified without rewriting stored originals or changing answer history', t => {
  t.after(setupDom());
  const vendor = legacyQuestion('legacy-vendor');
  const unknown = legacyQuestion('legacy-unknown', 'My original D4 topic');
  const stored = JSON.stringify([vendor, unknown]);
  const progress: UserProgress = {
    history: { [vendor.id]: [{ answeredIndex: vendor.correctIndex, isCorrect: true, timestamp: 1 }] },
    wrongIds: [unknown.id], bookmarkedIds: [vendor.id], flashcardMastery: {},
    examRecords: [{ id: 'old-exam', date: 1, score: 1, total: 2, durationSeconds: 30,
      breakdown: { D1: { correct: 0, total: 0 }, D2: { correct: 0, total: 0 }, D3: { correct: 0, total: 0 }, D4: { correct: 1, total: 2 } } }],
  };
  localStorage.setItem('aaig_custom_questions_v1', stored);
  saveUserProgress(progress);
  const loaded = loadAllQuestions();
  const mapped = loaded.find(q => q.id === vendor.id)!;
  assert.equal(mapped.domainId, 'D3');
  assert.match(mapped.subDomain, /^D3\.6 /);
  assert.deepEqual(mapped.options, vendor.options);
  assert.equal(mapped.correctIndex, vendor.correctIndex);
  assert.equal(loaded.find(q => q.id === unknown.id)!.domainId, 'D1');
  assert.equal(localStorage.getItem('aaig_custom_questions_v1'), stored, 'loading must not rewrite originals');
  assert.deepEqual(loadUserProgress(), { ...progress, optionOrderRevision: 1 }, 'historical four-domain exam snapshots must remain intact');
  const saved = saveCustomQuestion({ ...INITIAL_QUESTIONS[0], id: 'new-three-domain' });
  const reread = loadAllQuestions();
  assert.deepEqual(reread.find(q => q.id === vendor.id), saved.find(q => q.id === vendor.id));
  assert.ok(reread.some(q => q.id === unknown.id));
  assert.deepEqual(loadUserProgress(), { ...progress, optionOrderRevision: 1 });
});

test('legacy cards survive reads and saves and retain their mastery linkage', t => {
  t.after(setupDom());
  const card = legacyCard('legacy-card');
  localStorage.setItem('aaig_custom_flashcards_v1', JSON.stringify([card]));
  const mapped = loadAllFlashcards().find(c => c.id === card.id)!;
  assert.equal(mapped.domainId, 'D3');
  assert.equal(mapped.front, card.front);
  assert.equal(mapped.back, card.back);
  const saved = saveCustomFlashcard({ ...INITIAL_FLASHCARDS[0], id: 'new-card' });
  assert.deepEqual(loadAllFlashcards().find(c => c.id === card.id), saved.find(c => c.id === card.id));
});

test('sampling retains legacy D4 questions and fills shortages without duplication', () => {
  const input = [legacyQuestion('vendor-1'), legacyQuestion('vendor-2'), legacyQuestion('policy-1', 'D4.1 Regulatory Landscapes & Global Compliance (EU AI Act)')];
  const snapshot = structuredClone(input);
  const sample = sampleStudyQuestions(input, 25, () => 0.5);
  assert.equal(sample.length, 3);
  assert.equal(new Set(sample.map(q => q.id)).size, 3);
  assert.deepEqual(new Set(sample.map(q => q.domainId)), new Set(['D1', 'D3']));
  assert.deepEqual(input, snapshot, 'mapping and sampling must not mutate source content');
});

test('new AI authoring rejects a retired D4 destination while legacy storage remains readable', () => {
  assert.throws(() => parseGeneratedQuestion(JSON.stringify(INITIAL_QUESTIONS[0]), 'D4', 'Legacy topic', 'BEST', 'Fundamental'));
  assert.throws(() => parseGeneratedFlashcard(JSON.stringify(INITIAL_FLASHCARDS[0]), 'D4'));
});

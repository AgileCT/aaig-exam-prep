import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_QUESTIONS } from '../src/data/questions';
import { sampleStudyQuestions } from '../src/services/exam';
import { firstAttemptSummary, orderWeakFirst, seenQuestionIds, subtopicFirstAttempt } from '../src/services/studyStats';
import type { UserProgress } from '../src/types';

const attempt = (isCorrect: boolean, timestamp = 1) => ({ answeredIndex: 0, isCorrect, timestamp });

test('first-attempt accuracy ignores retries, so a corrected miss still counts as a miss', () => {
  const [a, b, c] = INITIAL_QUESTIONS;
  const history: UserProgress['history'] = { [a.id]: [attempt(false), attempt(true, 2), attempt(true, 3)], [b.id]: [attempt(true)] };
  const summary = firstAttemptSummary([a, b, c], history);
  assert.deepEqual(summary, { attempted: 2, correct: 1, total: 3 });
});

test('weak-first ordering ranks low-accuracy subtopics ahead of mastered ones and unseen ahead of seen', () => {
  const topics = [...new Set(INITIAL_QUESTIONS.map(q => q.subDomain))];
  const weak = INITIAL_QUESTIONS.filter(q => q.subDomain === topics[0]);
  const strong = INITIAL_QUESTIONS.filter(q => q.subDomain === topics[1]);
  const history: UserProgress['history'] = {};
  for (const q of weak.slice(0, 3)) history[q.id] = [attempt(false)];
  for (const q of strong.slice(0, 3)) history[q.id] = [attempt(true)];
  const ordered = orderWeakFirst([...strong, ...weak], history, () => 0.5);
  assert.equal(ordered[0].subDomain, topics[0]);
  assert.equal(ordered.at(-1)!.subDomain, topics[1]);
  const weakPart = ordered.filter(q => q.subDomain === topics[0]);
  assert.ok(!history[weakPart[0].id], 'unseen weak-subtopic questions come before seen ones');
  assert.equal(subtopicFirstAttempt(weak, history)[topics[0]].correct, 0);
});

test('mock exam sampling draws unseen questions first and falls back to seen ones only when needed', () => {
  const seen = new Set(INITIAL_QUESTIONS.filter((_, i) => i % 2 === 0).map(q => q.id));
  const sample = sampleStudyQuestions(INITIAL_QUESTIONS, 90, Math.random, seen);
  assert.equal(sample.length, 90);
  assert.equal(sample.filter(q => seen.has(q.id)).length, 0);
  const all = new Set(INITIAL_QUESTIONS.map(q => q.id));
  const heavy = sampleStudyQuestions(INITIAL_QUESTIONS, 90, Math.random, all);
  assert.equal(heavy.length, 90, 'a fully seen bank still yields a full exam');
  assert.deepEqual([...seenQuestionIds({ x: [attempt(true)], y: [] })], ['x']);
});

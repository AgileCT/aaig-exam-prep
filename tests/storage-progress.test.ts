import test from 'node:test';
import assert from 'node:assert/strict';
import { setupDom } from './dom';
import { exportProgressJSON, importProgressJSON, resetUserProgress, loadUserProgress, saveUserProgress } from '../src/services/storage';
import type { UserProgress } from '../src/types';

test('exportProgressJSON produces valid JSON backup with metadata', () => {
  const cleanup = setupDom();
  try {
    const progress: UserProgress = {
      history: {
        'q-1': [{ answeredIndex: 1, isCorrect: true, timestamp: 12345 }],
      },
      bookmarkedIds: ['q-1'],
      wrongIds: ['q-2'],
      flashcardMastery: { 'fc-1': 'mastered' },
      examRecords: [
        {
          id: 'exam-1',
          date: 12345,
          score: 80,
          total: 90,
          durationSeconds: 3600,
          breakdown: {
            D1: { correct: 25, total: 27 },
            D2: { correct: 18, total: 18 },
            D3: { correct: 37, total: 45 },
          },
        },
      ],
    };

    const exported = exportProgressJSON(progress);
    const parsed = JSON.parse(exported);

    assert.equal(parsed.version, '1.2.0');
    assert.ok(typeof parsed.exportedAt === 'string');
    assert.deepEqual(parsed.progress, progress);
  } finally {
    cleanup();
  }
});

test('importProgressJSON restores valid progress and persists to storage', () => {
  const cleanup = setupDom();
  try {
    const sample: UserProgress = {
      history: { 'q-3': [{ answeredIndex: 0, isCorrect: false, timestamp: 999 }] },
      bookmarkedIds: ['q-3'],
      wrongIds: ['q-3'],
      flashcardMastery: { 'fc-2': 'learning' },
      examRecords: [],
    };

    const exported = exportProgressJSON(sample);
    const imported = importProgressJSON(exported);

    assert.deepEqual(imported, sample);
    assert.deepEqual(loadUserProgress(), sample);
  } finally {
    cleanup();
  }
});

test('importProgressJSON rejects malformed or invalid JSON payloads', () => {
  const cleanup = setupDom();
  try {
    assert.throws(() => importProgressJSON('not a json string'), /Invalid JSON/);
    assert.throws(() => importProgressJSON('null'), /valid progress data/);
  } finally {
    cleanup();
  }
});

test('resetUserProgress resets all history and records to blank state', () => {
  const cleanup = setupDom();
  try {
    saveUserProgress({
      history: { 'q-1': [{ answeredIndex: 0, isCorrect: true, timestamp: 1 }] },
      bookmarkedIds: ['q-1'],
      wrongIds: ['q-1'],
      flashcardMastery: { 'fc-1': 'mastered' },
      examRecords: [],
    });

    const reset = resetUserProgress();
    assert.deepEqual(reset, {
      history: {},
      bookmarkedIds: [],
      wrongIds: [],
      flashcardMastery: {},
      examRecords: [],
    });
    assert.deepEqual(loadUserProgress(), reset);
  } finally {
    cleanup();
  }
});

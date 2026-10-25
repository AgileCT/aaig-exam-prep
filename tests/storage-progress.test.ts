import test from 'node:test';
import assert from 'node:assert/strict';
import { setupDom } from './dom';
import { exportProgressJSON, importProgressJSON, parseProgressJSON, hasProgressData, resetUserProgress, loadUserProgress, saveUserProgress } from '../src/services/storage';
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

    assert.equal(parsed.version, '1.3.0');
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

    // Pre-1.3.0 backups carry no option-order revision and are stamped on import.
    assert.deepEqual(imported, { ...sample, optionOrderRevision: 1 });
    assert.deepEqual(loadUserProgress(), imported);
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
      optionOrderRevision: 1,
    });
    assert.deepEqual(loadUserProgress(), reset);
  } finally {
    cleanup();
  }
});

test('option-order migration remaps pre-1.3.0 attempts to the same option text, once', async () => {
  const cleanup = setupDom();
  try {
    const { CORRECT_POSITION_MOVES } = await import('../src/data/correctPositionMoves');
    const { INITIAL_QUESTIONS } = await import('../src/data/questions');
    const { swapQuestionOptions } = await import('../src/services/questionOrder');
    const [id, move] = Object.entries(CORRECT_POSITION_MOVES)[0];
    const current = INITIAL_QUESTIONS.find(q => q.id === id)!;
    const before = swapQuestionOptions(current, ...move);
    const chosen = before.options[before.correctIndex];
    localStorage.setItem('aaig_user_progress_v1', JSON.stringify({
      history: { [id]: [{ answeredIndex: before.correctIndex, isCorrect: true, timestamp: 1 }], 'custom-q': [{ answeredIndex: 2, isCorrect: false, timestamp: 2 }] },
      bookmarkedIds: [], wrongIds: [], flashcardMastery: {}, examRecords: [],
    }));
    const migrated = loadUserProgress();
    assert.equal(current.options[migrated.history[id][0].answeredIndex], chosen);
    assert.equal(migrated.history['custom-q'][0].answeredIndex, 2);
    assert.equal(migrated.optionOrderRevision, 1);
    saveUserProgress(migrated);
    assert.deepEqual(loadUserProgress(), migrated, 'already-migrated progress is not remapped again');
  } finally {
    cleanup();
  }
});

test('parseProgressJSON drops malformed entries, counts them, and does not save', () => {
  const cleanup = setupDom();
  try {
    saveUserProgress({ history: {}, bookmarkedIds: ['keep'], wrongIds: [], flashcardMastery: {}, examRecords: [] });
    const { progress, dropped } = parseProgressJSON(JSON.stringify({
      progress: {
        history: {
          good: [{ answeredIndex: 1, isCorrect: true, timestamp: 5 }, { answeredIndex: 'x', isCorrect: true, timestamp: 5 }, null],
          notArray: 'oops',
          empty: [{ answeredIndex: -1, isCorrect: true, timestamp: 1 }],
        },
        bookmarkedIds: ['a', 'a', 7],
        wrongIds: [],
        flashcardMastery: { f1: 'mastered', f2: 'bogus' },
        examRecords: [{ id: 'e1', date: 1, score: 2, total: 3, durationSeconds: 4, breakdown: {} }, { score: 'x' }, { date: 1, score: 1, total: 2 }],
      },
    }));
    assert.deepEqual(Object.keys(progress.history), ['good']);
    assert.equal(progress.history.good.length, 1);
    assert.deepEqual(progress.bookmarkedIds, ['a']);
    assert.deepEqual(progress.flashcardMastery, { f1: 'mastered' });
    assert.equal(progress.examRecords.length, 2);
    assert.equal(progress.examRecords[1].id, 'imported-1');
    assert.equal(dropped, 2 + 1 + 1 + 1 + 1 + 1 + 1);
    assert.deepEqual(loadUserProgress().bookmarkedIds, ['keep']);
    assert.throws(() => parseProgressJSON('[1,2]'), /valid progress data/);
  } finally {
    cleanup();
  }
});

test('hasProgressData is false only for a blank progress', () => {
  const blank = { history: {}, bookmarkedIds: [], wrongIds: [], flashcardMastery: {}, examRecords: [] };
  assert.equal(hasProgressData(blank), false);
  assert.equal(hasProgressData({ ...blank, bookmarkedIds: ['q'] }), true);
  assert.equal(hasProgressData({ ...blank, flashcardMastery: { f: 'new' } }), true);
});

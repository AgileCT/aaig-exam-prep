import { Question, Flashcard, UserProgress, FlashcardMastery, ExamRecord, ExamSession } from '../types';
import { ACTIVE_QUESTIONS } from '../data/questions';
import { INITIAL_FLASHCARDS } from '../data/flashcards';
import { isFlashcard, isQuestion } from './contentValidation';
import { normalizeFlashcardDomain, normalizeQuestionDomain } from './domainTaxonomy';
import { AIConfig, defaultAIConfig, validateAIConfig } from './ai';
import { CORRECT_POSITION_MOVES, OPTION_ORDER_REVISION } from '../data/correctPositionMoves';
import { swappedIndex } from './questionOrder';

const STORAGE_KEY_PROGRESS = 'aaig_user_progress_v1';
const STORAGE_KEY_CUSTOM_QUESTIONS = 'aaig_custom_questions_v1';
const STORAGE_KEY_CUSTOM_FLASHCARDS = 'aaig_custom_flashcards_v1';
const STORAGE_KEY_API_KEY = 'aaig_gemini_api_key';
const STORAGE_KEY_AI_CONFIG = 'aaig_ai_config_v1';
const STORAGE_KEY_EXAM_SESSION = 'aaig_exam_session_v1';

export function getAIConfig(): AIConfig {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY_AI_CONFIG) || localStorage.getItem(STORAGE_KEY_AI_CONFIG);
    if (raw) return validateAIConfig(JSON.parse(raw));
    return { ...defaultAIConfig(), apiKey: getApiKey() };
  } catch { return defaultAIConfig(); }
}

export function getAIConfigPreference(): boolean {
  try { return !!localStorage.getItem(STORAGE_KEY_AI_CONFIG) || getApiKeyPreference(); }
  catch { return false; }
}

export function saveAIConfig(input: AIConfig, remember = false): void {
  const config = input.apiKey.trim() ? validateAIConfig(input) : null;
  // Snapshot all affected entries before changing either store; restore on failure.
  const stores = [sessionStorage, localStorage];
  const keys = [STORAGE_KEY_AI_CONFIG, STORAGE_KEY_API_KEY];
  const snapshot = stores.map(store => keys.map(key => store.getItem(key)));
  try {
    if (config) (remember ? localStorage : sessionStorage).setItem(STORAGE_KEY_AI_CONFIG, JSON.stringify(config));
    for (const store of stores) {
      if (!config || store !== (remember ? localStorage : sessionStorage)) store.removeItem(STORAGE_KEY_AI_CONFIG);
      store.removeItem(STORAGE_KEY_API_KEY);
    }
  } catch {
    for (const [i, store] of stores.entries()) for (const [j, key] of keys.entries()) {
      try { const previous = snapshot[i][j]; if (previous === null) store.removeItem(key); else store.setItem(key, previous); } catch { /* Storage may be disabled; active React configuration remains unchanged. */ }
    }
    throw new Error(config ? 'AI configuration was not saved. Browser storage is unavailable.' : 'API key could not be cleared because browser storage is unavailable.');
  }
}

/**
 * Remaps recorded answer indices from before the canonical option-order
 * revision so each attempt still points at the option the learner chose.
 */
export function migrateProgress(progress: UserProgress): UserProgress {
  if ((progress.optionOrderRevision ?? 0) >= OPTION_ORDER_REVISION) return progress;
  const history = Object.fromEntries(Object.entries(progress.history || {}).map(([id, attempts]) => {
    const move = CORRECT_POSITION_MOVES[id];
    if (!move || !Array.isArray(attempts)) return [id, attempts];
    return [id, attempts.map(attempt => typeof attempt?.answeredIndex === 'number'
      ? { ...attempt, answeredIndex: swappedIndex(attempt.answeredIndex, move) } : attempt)];
  }));
  return { ...progress, history, optionOrderRevision: OPTION_ORDER_REVISION };
}

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (raw) {
      return migrateProgress(JSON.parse(raw));
    }
  } catch (e) {
    console.error('Failed to parse user progress from localStorage', e);
  }
  return {
    history: {},
    bookmarkedIds: [],
    wrongIds: [],
    flashcardMastery: {},
    flashcardSchedule: {},
    examRecords: [],
    optionOrderRevision: OPTION_ORDER_REVISION,
  };
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save user progress', e);
  }
}

export function loadAllQuestions(): Question[] {
  try {
    const rawCustom = localStorage.getItem(STORAGE_KEY_CUSTOM_QUESTIONS);
    const parsed: unknown = rawCustom ? JSON.parse(rawCustom) : [];
    const custom = Array.isArray(parsed) ? parsed.filter(isQuestion) : [];
    return [...ACTIVE_QUESTIONS, ...custom.map(normalizeQuestionDomain)];
  } catch (e) {
    console.error('Failed to load custom questions', e);
    return ACTIVE_QUESTIONS;
  }
}

export function saveCustomQuestion(newQ: Question): Question[] {
  if (!isQuestion(newQ)) throw new Error('Cannot save this question: required fields are invalid.');
  try {
    const rawCustom = localStorage.getItem(STORAGE_KEY_CUSTOM_QUESTIONS);
    const parsed: unknown = rawCustom ? JSON.parse(rawCustom) : [];
    const custom = Array.isArray(parsed) ? parsed.filter(isQuestion) : [];
    const updated = [newQ, ...custom.filter(q => q.id !== newQ.id)];
    localStorage.setItem(STORAGE_KEY_CUSTOM_QUESTIONS, JSON.stringify(updated));
    return [...ACTIVE_QUESTIONS, ...updated.map(normalizeQuestionDomain)];
  } catch {
    throw new Error('Question was not saved. Browser storage may be full or unavailable.');
  }
}

export function loadAllFlashcards(): Flashcard[] {
  try {
    const rawCustom = localStorage.getItem(STORAGE_KEY_CUSTOM_FLASHCARDS);
    const parsed: unknown = rawCustom ? JSON.parse(rawCustom) : [];
    const custom = Array.isArray(parsed) ? parsed.filter(isFlashcard) : [];
    return [...INITIAL_FLASHCARDS, ...custom.map(normalizeFlashcardDomain)];
  } catch (e) {
    console.error('Failed to load custom flashcards', e);
    return INITIAL_FLASHCARDS;
  }
}

export function saveCustomFlashcard(newCard: Flashcard): Flashcard[] {
  if (!isFlashcard(newCard)) throw new Error('Cannot save this flashcard: required fields are invalid.');
  try {
    const rawCustom = localStorage.getItem(STORAGE_KEY_CUSTOM_FLASHCARDS);
    const parsed: unknown = rawCustom ? JSON.parse(rawCustom) : [];
    const custom = Array.isArray(parsed) ? parsed.filter(isFlashcard) : [];
    const updated = [newCard, ...custom.filter(c => c.id !== newCard.id)];
    localStorage.setItem(STORAGE_KEY_CUSTOM_FLASHCARDS, JSON.stringify(updated));
    return [...INITIAL_FLASHCARDS, ...updated.map(normalizeFlashcardDomain)];
  } catch {
    throw new Error('Flashcard was not saved. Browser storage may be full or unavailable.');
  }
}

export function getApiKey(): string {
  try {
    return sessionStorage.getItem(STORAGE_KEY_API_KEY) || localStorage.getItem(STORAGE_KEY_API_KEY) || '';
  } catch { return ''; }
}

export function getApiKeyPreference(): boolean {
  try { return !!localStorage.getItem(STORAGE_KEY_API_KEY); }
  catch { return false; }
}

export function clearApiKey(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY_API_KEY);
    localStorage.removeItem(STORAGE_KEY_API_KEY);
  } catch { throw new Error('API key could not be cleared because browser storage is unavailable.'); }
}

export function saveApiKey(key: string, remember = false): void {
  const trimmed = key.trim();
  if (!trimmed) { clearApiKey(); return; }
  try {
    const target = remember ? localStorage : sessionStorage;
    const other = remember ? sessionStorage : localStorage;
    target.setItem(STORAGE_KEY_API_KEY, trimmed);
    other.removeItem(STORAGE_KEY_API_KEY);
  } catch { throw new Error('API key was not saved. Browser storage is unavailable.'); }
}

export function loadExamSession(): ExamSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EXAM_SESSION);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.examEndsAt !== 'number' || !Array.isArray(parsed.questions) || parsed.questions.length === 0) return null;
    return parsed as ExamSession;
  } catch { return null; }
}

export function saveExamSession(session: ExamSession): void {
  try {
    localStorage.setItem(STORAGE_KEY_EXAM_SESSION, JSON.stringify(session));
  } catch { /* Storage full or unavailable: the session simply cannot be resumed. */ }
}

export function clearExamSession(): void {
  try { localStorage.removeItem(STORAGE_KEY_EXAM_SESSION); }
  catch { /* Nothing to clear if storage is unavailable. */ }
}

export function exportProgressJSON(progress: UserProgress): string {
  const exportPayload = {
    version: '1.3.0',
    exportedAt: new Date().toISOString(),
    progress,
  };
  return JSON.stringify(exportPayload, null, 2);
}

const FLASHCARD_STATES = new Set<string>(['new', 'learning', 'hard', 'mastered']);
const isFiniteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);
const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export interface ParsedProgress {
  progress: UserProgress;
  /** Backup entries discarded because they did not match the expected shape. */
  dropped: number;
}

/** Validate a backup without saving it, so the caller can confirm before overwriting. */
export function parseProgressJSON(rawJson: string): ParsedProgress {
  let parsed: any;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    throw new Error('Invalid JSON file format. Please upload a valid backup file.');
  }

  const candidate = isPlainObject(parsed) && parsed.progress !== undefined ? parsed.progress : parsed;

  if (!isPlainObject(candidate)) {
    throw new Error('Backup file does not contain valid progress data.');
  }

  let dropped = 0;

  const history: UserProgress['history'] = {};
  for (const [id, attempts] of Object.entries(isPlainObject(candidate.history) ? candidate.history : {})) {
    if (!Array.isArray(attempts)) { dropped++; continue; }
    const valid = attempts.filter((attempt: any) =>
      isPlainObject(attempt) && typeof attempt.answeredIndex === 'number' && Number.isInteger(attempt.answeredIndex) && attempt.answeredIndex >= 0
      && typeof attempt.isCorrect === 'boolean' && isFiniteNumber(attempt.timestamp));
    dropped += attempts.length - valid.length;
    if (valid.length > 0) history[id] = valid as UserProgress['history'][string];
  }

  const idList = (value: unknown): string[] => {
    const list = Array.isArray(value) ? value : [];
    const valid = [...new Set(list.filter((id): id is string => typeof id === 'string'))];
    dropped += list.length - valid.length;
    return valid;
  };

  const flashcardMastery: UserProgress['flashcardMastery'] = {};
  for (const [id, state] of Object.entries(isPlainObject(candidate.flashcardMastery) ? candidate.flashcardMastery : {})) {
    if (typeof state === 'string' && FLASHCARD_STATES.has(state)) flashcardMastery[id] = state as UserProgress['flashcardMastery'][string];
    else dropped++;
  }

  const flashcardSchedule: NonNullable<UserProgress['flashcardSchedule']> = {};
  for (const [id, entry] of Object.entries(isPlainObject(candidate.flashcardSchedule) ? candidate.flashcardSchedule : {})) {
    if (isPlainObject(entry) && isFiniteNumber(entry.nextReviewAt) && isFiniteNumber(entry.intervalDays) && entry.intervalDays >= 0) {
      flashcardSchedule[id] = { nextReviewAt: entry.nextReviewAt, intervalDays: entry.intervalDays };
    } else dropped++;
  }

  const examRecords: UserProgress['examRecords'] = [];
  for (const record of Array.isArray(candidate.examRecords) ? candidate.examRecords : []) {
    if (!isPlainObject(record) || !isFiniteNumber(record.score) || !isFiniteNumber(record.total) || !isFiniteNumber(record.date)) { dropped++; continue; }
    examRecords.push({
      id: typeof record.id === 'string' ? record.id : `imported-${record.date}`,
      date: record.date,
      score: record.score,
      total: record.total,
      durationSeconds: isFiniteNumber(record.durationSeconds) ? record.durationSeconds : 0,
      breakdown: isPlainObject(record.breakdown) ? record.breakdown as UserProgress['examRecords'][number]['breakdown'] : {},
    });
  }

  const validProgress: UserProgress = {
    history,
    bookmarkedIds: idList(candidate.bookmarkedIds),
    wrongIds: idList(candidate.wrongIds),
    flashcardMastery,
    flashcardSchedule,
    examRecords,
    // Backups from before 1.3.0 carry no revision and are migrated below.
    ...(typeof candidate.optionOrderRevision === 'number' ? { optionOrderRevision: candidate.optionOrderRevision } : {}),
  };

  return { progress: migrateProgress(validProgress), dropped };
}

export function importProgressJSON(rawJson: string): UserProgress {
  const { progress } = parseProgressJSON(rawJson);
  saveUserProgress(progress);
  return progress;
}

/** True when the progress holds any study activity that a restore would overwrite. */
export function hasProgressData(progress: UserProgress): boolean {
  return Object.keys(progress.history).length > 0 || progress.bookmarkedIds.length > 0 || progress.wrongIds.length > 0
    || Object.keys(progress.flashcardMastery).length > 0 || Object.keys(progress.flashcardSchedule || {}).length > 0 || progress.examRecords.length > 0;
}

export function resetUserProgress(): UserProgress {
  const blank: UserProgress = {
    history: {},
    bookmarkedIds: [],
    wrongIds: [],
    flashcardMastery: {},
    flashcardSchedule: {},
    examRecords: [],
    optionOrderRevision: OPTION_ORDER_REVISION,
  };
  saveUserProgress(blank);
  return blank;
}

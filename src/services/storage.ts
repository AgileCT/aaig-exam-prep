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

export function importProgressJSON(rawJson: string): UserProgress {
  let parsed: any;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    throw new Error('Invalid JSON file format. Please upload a valid backup file.');
  }

  const candidate = parsed && parsed.progress ? parsed.progress : parsed;

  if (!candidate || typeof candidate !== 'object') {
    throw new Error('Backup file does not contain valid progress data.');
  }

  const validProgress: UserProgress = {
    history: typeof candidate.history === 'object' && candidate.history !== null ? candidate.history : {},
    bookmarkedIds: Array.isArray(candidate.bookmarkedIds) ? candidate.bookmarkedIds.filter((id: unknown) => typeof id === 'string') : [],
    wrongIds: Array.isArray(candidate.wrongIds) ? candidate.wrongIds.filter((id: unknown) => typeof id === 'string') : [],
    flashcardMastery: typeof candidate.flashcardMastery === 'object' && candidate.flashcardMastery !== null ? candidate.flashcardMastery : {},
    examRecords: Array.isArray(candidate.examRecords) ? candidate.examRecords.filter((rec: any) => rec && typeof rec.score === 'number') : [],
    // Backups from before 1.3.0 carry no revision and are migrated below.
    ...(typeof candidate.optionOrderRevision === 'number' ? { optionOrderRevision: candidate.optionOrderRevision } : {}),
  };

  const migrated = migrateProgress(validProgress);
  saveUserProgress(migrated);
  return migrated;
}

export function resetUserProgress(): UserProgress {
  const blank: UserProgress = {
    history: {},
    bookmarkedIds: [],
    wrongIds: [],
    flashcardMastery: {},
    examRecords: [],
    optionOrderRevision: OPTION_ORDER_REVISION,
  };
  saveUserProgress(blank);
  return blank;
}

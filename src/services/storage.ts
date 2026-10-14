import { Question, Flashcard, UserProgress, FlashcardMastery, ExamRecord } from '../types';
import { INITIAL_QUESTIONS } from '../data/questions';
import { INITIAL_FLASHCARDS } from '../data/flashcards';

const STORAGE_KEY_PROGRESS = 'aaig_user_progress_v1';
const STORAGE_KEY_CUSTOM_QUESTIONS = 'aaig_custom_questions_v1';
const STORAGE_KEY_CUSTOM_FLASHCARDS = 'aaig_custom_flashcards_v1';
const STORAGE_KEY_API_KEY = 'aaig_gemini_api_key';

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (raw) {
      return JSON.parse(raw);
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
    const custom: Question[] = rawCustom ? JSON.parse(rawCustom) : [];
    return [...INITIAL_QUESTIONS, ...custom];
  } catch (e) {
    console.error('Failed to load custom questions', e);
    return INITIAL_QUESTIONS;
  }
}

export function saveCustomQuestion(newQ: Question): Question[] {
  try {
    const rawCustom = localStorage.getItem(STORAGE_KEY_CUSTOM_QUESTIONS);
    const custom: Question[] = rawCustom ? JSON.parse(rawCustom) : [];
    const updated = [newQ, ...custom.filter(q => q.id !== newQ.id)];
    localStorage.setItem(STORAGE_KEY_CUSTOM_QUESTIONS, JSON.stringify(updated));
    return [...INITIAL_QUESTIONS, ...updated];
  } catch (e) {
    console.error('Failed to save custom question', e);
    return INITIAL_QUESTIONS;
  }
}

export function loadAllFlashcards(): Flashcard[] {
  try {
    const rawCustom = localStorage.getItem(STORAGE_KEY_CUSTOM_FLASHCARDS);
    const custom: Flashcard[] = rawCustom ? JSON.parse(rawCustom) : [];
    return [...INITIAL_FLASHCARDS, ...custom];
  } catch (e) {
    console.error('Failed to load custom flashcards', e);
    return INITIAL_FLASHCARDS;
  }
}

export function saveCustomFlashcard(newCard: Flashcard): Flashcard[] {
  try {
    const rawCustom = localStorage.getItem(STORAGE_KEY_CUSTOM_FLASHCARDS);
    const custom: Flashcard[] = rawCustom ? JSON.parse(rawCustom) : [];
    const updated = [newCard, ...custom.filter(c => c.id !== newCard.id)];
    localStorage.setItem(STORAGE_KEY_CUSTOM_FLASHCARDS, JSON.stringify(updated));
    return [...INITIAL_FLASHCARDS, ...updated];
  } catch (e) {
    console.error('Failed to save custom flashcard', e);
    return INITIAL_FLASHCARDS;
  }
}

export function getApiKey(): string {
  return localStorage.getItem(STORAGE_KEY_API_KEY) || '';
}

export function saveApiKey(key: string): void {
  localStorage.setItem(STORAGE_KEY_API_KEY, key.trim());
}

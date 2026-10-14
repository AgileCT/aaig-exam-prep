export type DomainId = 'D1' | 'D2' | 'D3' | 'D4';

export type QuestionType = 'BEST' | 'FIRST' | 'MOST' | 'PRIMARY' | 'LEAST';

export type Difficulty = 'Fundamental' | 'Intermediate' | 'Director-Level';

export interface DomainMeta {
  id: DomainId;
  name: string;
  weight: number; // percentage, e.g. 30
  description: string;
  subDomains: string[];
}

export interface Question {
  id: string;
  domainId: DomainId;
  subDomain: string;
  scenarioText?: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  questionType: QuestionType;
  explanation: string;
  distractorExplanations?: string[];
  source: string;
  difficulty: Difficulty;
  distractorAxes?: string[];
}

export interface Flashcard {
  id: string;
  domainId: DomainId;
  topic: string;
  front: string;
  back: string;
  source: string;
  keyTakeaway: string;
}

export type FlashcardMastery = 'new' | 'learning' | 'mastered';

export interface QuestionAttempt {
  answeredIndex: number;
  isCorrect: boolean;
  timestamp: number;
}

export interface ExamRecord {
  id: string;
  date: number;
  score: number;
  total: number;
  durationSeconds: number;
  breakdown: Record<DomainId, { correct: number; total: number }>;
}

export interface UserProgress {
  history: Record<string, QuestionAttempt[]>;
  bookmarkedIds: string[];
  wrongIds: string[];
  flashcardMastery: Record<string, FlashcardMastery>;
  examRecords: ExamRecord[];
}

export type TutorMode = 'standard' | 'socratic' | 'teach-back' | 'drill';

export interface TutorMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  mode?: TutorMode;
  questionContext?: Question;
}

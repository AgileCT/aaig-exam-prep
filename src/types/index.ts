export type DomainId = 'D1' | 'D2' | 'D3' | 'D4';
export type StudyDomainId = Exclude<DomainId, 'D4'>;

export type QuestionType = 'BEST' | 'FIRST' | 'MOST' | 'PRIMARY' | 'LEAST';

export type Difficulty = 'Fundamental' | 'Intermediate' | 'Director-Level';

export interface DomainMeta {
  id: StudyDomainId;
  name: string;
  weight: number; // Relative practice allocation, not an official exam weight.
  description: string;
  subDomains: string[];
}

export interface Question {
  id: string;
  domainId: DomainId;
  subDomain: string;
  legacyDomainId?: DomainId;
  legacySubDomain?: string;
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
  reviewStatus?: 'unreviewed' | 'reviewed';
  sourceUrl?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface Flashcard {
  id: string;
  domainId: DomainId;
  topic: string;
  legacyDomainId?: DomainId;
  front: string;
  back: string;
  source: string;
  keyTakeaway: string;
  reviewStatus?: 'unreviewed' | 'reviewed';
  sourceUrl?: string;
  reviewedBy?: string;
  reviewedAt?: string;
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
  // Historical records retain their original domain keys, including legacy D4.
  breakdown: Partial<Record<DomainId, { correct: number; total: number }>>;
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

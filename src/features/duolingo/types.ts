import type { EstimatedCefr } from './level';

export interface DuolingoCourse {
  title: string;
  learningLanguage: string;
  xp: number;
  level: EstimatedCefr;
}

export interface DuolingoStats {
  username: string;
  streak: number;
  totalXp: number;
  learningLanguage: string;
  avatar?: string;
  courses: DuolingoCourse[];
  motivation: string;
  lastUpdated: string;
}

import type { EstimatedCefr } from './level';

export interface DuolingoCourse {
  title: string;
  learningLanguage: string;
  xp: number;
  level: EstimatedCefr;
}

export interface DuolingoActivity {
  windowDays: number;
  totalXp: number;
  activeDays: number;
  streakExtendedDays: number;
}

export interface DuolingoStats {
  username: string;
  userId?: number;
  streak: number;
  totalXp: number;
  learningLanguage: string;
  avatar?: string;
  courses: DuolingoCourse[];
  motivation: string;
  lastUpdated: string;
  activity?: DuolingoActivity;
}

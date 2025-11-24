import { useState, useEffect } from 'react';
import duolingoData from '../data/generated/duolingo.json';

export interface DuolingoCourse {
  title: string;
  learningLanguage: string;
  xp: number;
}

export interface DuolingoStats {
  username: string;
  streak: number;
  totalXp: number;
  level: string;
  learningLanguage: string;
  avatar?: string;
  courses: DuolingoCourse[];
  motivation: string;
}

interface UseDuolingoStatsOptions {
  username: string;
  fallbackData?: DuolingoStats;
}

/**
 * Custom hook for Duolingo stats
 * Uses build-time generated data to avoid CORS and runtime API issues
 */
export function useDuolingoStats({ username, fallbackData }: UseDuolingoStatsOptions) {
  // Since data is imported statically, we don't strictly need state for "loading",
  // but we keep the interface consistent for now or for potential future client-side revalidation.
  const [stats, setStats] = useState<DuolingoStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate a brief loading state or just set immediately
    // Setting immediately is better for UX (SSG-like feel)

    if (duolingoData) {
      // Cast the imported JSON to our interface to ensure type safety
      // The script ensures the structure matches
      setStats(duolingoData as unknown as DuolingoStats);
      setLoading(false);
    } else {
      if (fallbackData) {
        setStats(fallbackData);
        setLoading(false);
      } else {
        setError(new Error('No data available'));
        setLoading(false);
      }
    }
  }, [username, fallbackData]);

  return { stats, loading, error };
}

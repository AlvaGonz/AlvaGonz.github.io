import { useState, useEffect } from 'react';

interface DuolingoStats {
  username: string;
  streak: number;
  totalXp: number;
  level: string;
  learningLanguage: string;
  avatar?: string;
}

interface UseDuolingoStatsOptions {
  username: string;
  fallbackData?: DuolingoStats;
}

/**
 * Custom hook para fetch de stats de Duolingo
 * Centraliza la lógica de llamadas a API y error handling
 */
export function useDuolingoStats({ username, fallbackData }: UseDuolingoStatsOptions) {
  const [stats, setStats] = useState<DuolingoStats | null>(fallbackData ?? null);
  const [loading, setLoading] = useState(!fallbackData);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Using allorigins proxy to avoid CORS issues as in previous implementation
        const response = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.duolingo.com/2017-06-30/users?username=${username}`)}`,
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const parsedData = JSON.parse(data.contents);

        if (!isMounted) return;

        if (parsedData.users && parsedData.users.length > 0) {
          const user = parsedData.users[0];
          const processedStats: DuolingoStats = {
            username: user.username,
            streak: user.streak,
            totalXp: user.totalXp,
            level: 'B2', // Inferred or static
            learningLanguage: user.learningLanguage,
            avatar: user.picture ? `https:${user.picture}/xxlarge` : undefined,
          };
          setStats(processedStats);
        } else {
          throw new Error('User not found');
        }
      } catch (err) {
        if (!isMounted) return;

        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        console.error('Duolingo fetch error:', error);

        // Usar fallback data si disponible
        if (fallbackData) {
          setStats(fallbackData);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      isMounted = false; // Cleanup
    };
  }, [username, fallbackData]);

  return { stats, loading, error };
}

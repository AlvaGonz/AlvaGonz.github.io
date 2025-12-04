import { useState, useEffect } from 'react';
import { fetchGitHubStats, GitHubStats } from '@/lib/github-client';

export const useGitHubStats = () => {
  const [data, setData] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        setLoading(true);
        const stats = await fetchGitHubStats();
        setData(stats);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  return { data, loading, error };
};

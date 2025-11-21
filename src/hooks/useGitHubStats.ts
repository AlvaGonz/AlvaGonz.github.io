import { useState, useEffect } from 'react';
import { fetchGitHubStats, GitHubStats } from '@/lib/github-client';

export function useGitHubStats() {
  const [data, setData] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Check cache (24 hours)
        const cached = localStorage.getItem('github_stats_v2');
        const cacheTime = localStorage.getItem('github_stats_v2_time');

        if (cached && cacheTime) {
          const age = Date.now() - parseInt(cacheTime);
          if (age < 24 * 60 * 60 * 1000) {
            setData(JSON.parse(cached));
            setLoading(false);
            return;
          }
        }

        const stats = await fetchGitHubStats();
        if (stats) {
          setData(stats);
          localStorage.setItem('github_stats_v2', JSON.stringify(stats));
          localStorage.setItem('github_stats_v2_time', Date.now().toString());
        } else {
          // Fallback to cache if fetch fails even if expired
          if (cached) {
            setData(JSON.parse(cached));
            console.warn('Fetch failed, using expired cache');
          } else {
            throw new Error('Failed to fetch GitHub data');
          }
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
}

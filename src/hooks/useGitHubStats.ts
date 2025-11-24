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
            try {
              const parsed = JSON.parse(cached);
              if (
                parsed &&
                Array.isArray(parsed.topLanguages) &&
                Array.isArray(parsed.topRepos) &&
                parsed.user
              ) {
                setData(parsed);
                setLoading(false);
                return;
              }
            } catch (e) {
              console.warn('Failed to parse cached GitHub data');
            }
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
            try {
              const parsed = JSON.parse(cached);
              if (
                parsed &&
                Array.isArray(parsed.topLanguages) &&
                Array.isArray(parsed.topRepos) &&
                parsed.user
              ) {
                setData(parsed);
                console.warn('Fetch failed, using expired cache');
              } else {
                throw new Error('Invalid cache structure');
              }
            } catch (e) {
              throw new Error('Failed to fetch GitHub data and invalid cache');
            }
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

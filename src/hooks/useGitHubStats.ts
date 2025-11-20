import { useState, useEffect } from 'react';
import { getTopLanguages, getTopRepos, getGithubStats } from '@/lib/github';

export interface GithubData {
  languages: Array<{ name: string; count: number }>;
  repos: Array<{
    id: number;
    name: string;
    description: string | null;
    url: string;
    stars: number;
    forks: number;
    language: string | null;
    updatedAt: string;
  }>;
  stats: {
    followers: number;
    publicRepos: number;
    avatar: string;
  };
}

export function useGitHubStats() {
  const [data, setData] = useState<GithubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check cache (24h)
        const cached = localStorage.getItem('github_data');
        const cacheTime = localStorage.getItem('github_data_time');

        if (cached && cacheTime) {
          const age = Date.now() - parseInt(cacheTime);
          if (age < 24 * 60 * 60 * 1000) {
            setData(JSON.parse(cached));
            setLoading(false);
            return;
          }
        }

        // Fetch fresh data
        const [languages, repos, stats] = await Promise.all([
          getTopLanguages(),
          getTopRepos(),
          getGithubStats(),
        ]);

        const freshData = { languages, repos, stats };
        setData(freshData);

        // Save to cache
        localStorage.setItem('github_data', JSON.stringify(freshData));
        localStorage.setItem('github_data_time', Date.now().toString());
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching GitHub data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}


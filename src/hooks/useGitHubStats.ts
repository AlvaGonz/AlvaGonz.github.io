import { useState, useEffect } from 'react';
import {
  fetchUserStats,
  fetchAllPublicRepos
} from '@/lib/github-client';

interface GitHubStatsData {
  user: {
    publicRepos: number;
  };
  topLanguages: Array<{ name: string; count: number; color: string }>;
  allLanguages: Array<{ name: string; count: number; color: string; bytes: number }>;
}

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  React: '#61dafb',
  Java: '#b07219',
  'C#': '#953cad',
  Go: '#00ADD8',
  Rust: '#dea584',
  Shell: '#89e051',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
};

export const useGitHubStats = () => {
  const [data, setData] = useState<GitHubStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        setLoading(true);
        const userStats = await fetchUserStats();
        const repos = await fetchAllPublicRepos(100); // Fetch enough to get accurate language stats

        if (!userStats || !repos) {
          throw new Error('Failed to fetch GitHub stats or repositories.');
        }

        const langBytes: Record<string, number> = {};

        repos.forEach((repo) => {
          repo.languages.forEach((lang) => {
            langBytes[lang.name] = (langBytes[lang.name] || 0) + lang.size;
          });
        });

        const totalBytes = Object.values(langBytes).reduce((a, b) => a + b, 0);

        const sortedLanguages = Object.entries(langBytes)
          .sort(([, bytesA], [, bytesB]) => bytesB - bytesA)
          .map(([name, count]) => ({
            name,
            count: totalBytes > 0 ? Math.round((count / totalBytes) * 100) : 0, // As percentage
            color: languageColors[name] || '#8b949e', // Fallback color
            bytes: count,
          }));

        const topLanguages = sortedLanguages.slice(0, 5);

        setData({
          user: {
            publicRepos: userStats.repositories.totalCount,
          },
          topLanguages,
          allLanguages: sortedLanguages,
        });
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

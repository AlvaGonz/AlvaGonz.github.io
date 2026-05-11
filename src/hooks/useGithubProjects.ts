import { useState, useEffect } from 'react';
import {
  fetchPinnedProjects,
  fetchAllPublicRepos,
  validateToken,
  GitHubRepository,
} from '../lib/github-client';

export function useGithubProjects() {
  const [projects, setProjects] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);

        // 1. Validar token (solo en desarrollo)
        if (import.meta.env.DEV) {
          await validateToken();
        }

        // 2. Intentar obtener repos pinneados
        let repos = await fetchPinnedProjects();

        // 3. Si no hay pinneados, obtener todos los repos
        if (repos.length === 0) {
          console.log('ℹ️ No pinned repositories found, fetching all public repos...');
          repos = await fetchAllPublicRepos(6);
        }

        setProjects(repos);
      } catch (err: any) {
        let errorMsg = err instanceof Error ? err.message : 'Unknown error';
        
        // Handle GraphQL specific 401 errors
        if (errorMsg.includes('401') || (err.response && err.response.status === 401)) {
          errorMsg = 'GitHub Authentication failed (401). Your token might be expired, invalid, or revoked.';
        }

        setError(errorMsg);
        console.error('❌ Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return { projects, loading, error };
}

import { Octokit } from '@octokit/rest';

// Use token if available for higher rate limits, otherwise public API
const token = import.meta.env.VITE_GITHUB_TOKEN;
const username = import.meta.env.VITE_GITHUB_USERNAME || 'AlvaGonz';

export const octokit = new Octokit({
  auth: token,
});

export interface GitHubStats {
  user: {
    followers: number;
    publicRepos: number;
    avatar: string;
    bio: string;
    location: string;
  };
  topLanguages: Array<{ name: string; count: number; color: string }>;
  topRepos: Array<{
    id: number;
    name: string;
    description: string;
    url: string;
    stars: number;
    forks: number;
    language: { name: string; color: string } | null;
    updatedAt: string;
  }>;
}

// GitHub language colors map (fallback)
const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  React: '#61dafb',
  Java: '#b07219',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Shell: '#89e051',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
};

export async function fetchGitHubStats(): Promise<GitHubStats | null> {
  try {
    const [userReq, reposReq] = await Promise.all([
      octokit.users.getByUsername({ username }),
      octokit.repos.listForUser({
        username,
        type: 'owner',
        sort: 'updated',
        per_page: 100, // Fetch enough to get accurate language stats
      }),
    ]);

    const repos = reposReq.data.filter(repo => !repo.fork); // Filter out forks for language stats

    // Calculate Top Languages
    const langCount: Record<string, number> = {};
    repos.forEach(repo => {
      if (repo.language) {
        langCount[repo.language] = (langCount[repo.language] || 0) + 1;
      }
    });

    const topLanguages = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        count,
        color: languageColors[name] || '#8b949e' // Fallback color
      }));

    // Get Top Repos (pinned logic is hard via REST, so we use 'starred' or 'updated' and let user pick manually ideally, 
    // but for now we'll pick top starred + updated)
    // A better heuristic: sort by stars, then updated
    const topRepos = repos
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 6)
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || '',
        url: repo.html_url,
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        language: repo.language ? {
          name: repo.language,
          color: languageColors[repo.language] || '#8b949e'
        } : null,
        updatedAt: repo.updated_at || new Date().toISOString(),
      }));

    return {
      user: {
        followers: userReq.data.followers,
        publicRepos: userReq.data.public_repos,
        avatar: userReq.data.avatar_url,
        bio: userReq.data.bio || '',
        location: userReq.data.location || '',
      },
      topLanguages,
      topRepos,
    };

  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return null;
  }
}


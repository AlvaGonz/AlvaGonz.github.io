import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN,
});

export async function getTopLanguages() {
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'AlvaGonz';

  try {
    const { data: repos } = await octokit.repos.listForUser({
      username,
      type: 'owner',
      per_page: 100,
      sort: 'updated',
    });

    const languages: Record<string, number> = {};
    repos.forEach((repo) => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    return Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));
  } catch (error) {
    console.error('Error fetching languages:', error);
    return [];
  }
}

export async function getTopRepos(limit = 6) {
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'AlvaGonz';

  try {
    const { data: repos } = await octokit.repos.listForUser({
      username,
      type: 'owner',
      sort: 'pushed',
      direction: 'desc',
      per_page: limit,
    });

    return repos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      language: repo.language,
      updatedAt: repo.updated_at || new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching repos:', error);
    return [];
  }
}

export async function getGithubStats() {
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'AlvaGonz';

  try {
    const { data: user } = await octokit.users.getByUsername({
      username,
    });

    return {
      followers: user.followers,
      publicRepos: user.public_repos,
      avatar: user.avatar_url,
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      followers: 0,
      publicRepos: 0,
      avatar: '',
    };
  }
}

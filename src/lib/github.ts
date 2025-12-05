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
      sort: 'pushed',
    });

    const langPromises = repos.map((repo) =>
      octokit.repos
        .listLanguages({
          owner: username,
          repo: repo.name,
        })
        .then((response) => response.data)
    );

    const langData = await Promise.all(langPromises);

    const languageTotals: Record<string, number> = {};

    langData.forEach((langs) => {
      for (const lang in langs) {
        if (Object.prototype.hasOwnProperty.call(langs, lang)) {
          languageTotals[lang] =
            (languageTotals[lang] || 0) + (langs[lang] as number);
        }
      }
    });

    const totalBytes = Object.values(languageTotals).reduce(
      (sum, bytes) => sum + bytes,
      0
    );

    if (totalBytes === 0) {
      return [];
    }

    return Object.entries(languageTotals)
      .sort(([, aBytes], [, bBytes]) => bBytes - aBytes)
      .slice(0, 7) // Top 7 languages
      .map(([name, bytes]) => ({
        name,
        percentage: ((bytes / totalBytes) * 100).toFixed(2),
      }));
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

import type { GitHubRepository } from '@/lib/github-client';

export interface GitHubStatsData {
  user: {
    publicRepos: number;
  };
  topLanguages: Array<{ name: string; count: number; color: string }>;
  allLanguages: Array<{ name: string; count: number; color: string; bytes: number }>;
  repos: GitHubRepository[];
  isFallback?: boolean;
}

export const FALLBACK_GITHUB_STATS: GitHubStatsData = {
  user: {
    publicRepos: 26,
  },
  topLanguages: [
    { name: 'TypeScript', count: 38, color: '#3178c6' },
    { name: 'JavaScript', count: 24, color: '#f1e05a' },
    { name: 'Python', count: 16, color: '#3572A5' },
    { name: 'HTML', count: 9, color: '#e34c26' },
    { name: 'CSS', count: 6, color: '#563d7c' },
  ],
  allLanguages: [
    { name: 'TypeScript', count: 38, color: '#3178c6', bytes: 485000 },
    { name: 'JavaScript', count: 24, color: '#f1e05a', bytes: 310000 },
    { name: 'Python', count: 16, color: '#3572A5', bytes: 205000 },
    { name: 'HTML', count: 9, color: '#e34c26', bytes: 115000 },
    { name: 'CSS', count: 6, color: '#563d7c', bytes: 78000 },
    { name: 'C#', count: 4, color: '#953cad', bytes: 52000 },
    { name: 'Java', count: 2, color: '#b07219', bytes: 26000 },
    { name: 'Go', count: 1, color: '#00ADD8', bytes: 16000 },
  ],
  repos: [
    {
      id: 'repo-1',
      name: 'AlvaGonz.github.io',
      description:
        'Dual-personality interactive portfolio built with React, Vite, Framer Motion, and Tailwind CSS.',
      url: 'https://github.com/AlvaGonz/AlvaGonz.github.io',
      isPrivate: false,
      stargazerCount: 7,
      forkCount: 2,
      primaryLanguage: { name: 'TypeScript', color: '#3178c6' },
      languages: [
        { name: 'TypeScript', color: '#3178c6', size: 485000 },
        { name: 'CSS', color: '#563d7c', size: 78000 },
        { name: 'HTML', color: '#e34c26', size: 115000 },
      ],
      homepageUrl: 'https://alvagonz.github.io',
      repositoryTopics: [
        { topic: { name: 'portfolio' } },
        { topic: { name: 'react' } },
        { topic: { name: 'typescript' } },
      ],
      pushedAt: new Date().toISOString(),
    },
    {
      id: 'repo-2',
      name: 'FlujoNet-OD',
      description:
        'Multi-agent orchestration and workflow automation platform with containerized pipelines.',
      url: 'https://github.com/AlvaGonz/FlujoNet-OD',
      isPrivate: false,
      stargazerCount: 4,
      forkCount: 1,
      primaryLanguage: { name: 'Python', color: '#3572A5' },
      languages: [
        { name: 'Python', color: '#3572A5', size: 205000 },
        { name: 'TypeScript', color: '#3178c6', size: 120000 },
      ],
      homepageUrl: null,
      repositoryTopics: [{ topic: { name: 'ai-agents' } }, { topic: { name: 'python' } }],
      pushedAt: new Date().toISOString(),
    },
    {
      id: 'repo-3',
      name: 'andruia-core',
      description:
        'Agentic AI intelligence suite and skills engine designed for high-precision autonomous coding.',
      url: 'https://github.com/AlvaGonz/andruia-core',
      isPrivate: false,
      stargazerCount: 5,
      forkCount: 0,
      primaryLanguage: { name: 'TypeScript', color: '#3178c6' },
      languages: [
        { name: 'TypeScript', color: '#3178c6', size: 280000 },
        { name: 'JavaScript', color: '#f1e05a', size: 90000 },
      ],
      homepageUrl: null,
      repositoryTopics: [{ topic: { name: 'agent' } }, { topic: { name: 'automation' } }],
      pushedAt: new Date().toISOString(),
    },
    {
      id: 'repo-4',
      name: 'dotfiles-terminal-craft',
      description:
        'Personal developer workspace configurations, shell utilities, and tmux ergonomics.',
      url: 'https://github.com/AlvaGonz/dotfiles',
      isPrivate: false,
      stargazerCount: 3,
      forkCount: 0,
      primaryLanguage: { name: 'Shell', color: '#89e051' },
      languages: [{ name: 'Shell', color: '#89e051', size: 45000 }],
      homepageUrl: null,
      repositoryTopics: [{ topic: { name: 'dotfiles' } }],
      pushedAt: new Date().toISOString(),
    },
  ],
  isFallback: true,
};

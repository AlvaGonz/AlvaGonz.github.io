import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { Project } from '../src/content/types';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_LOGIN = 'AlvaGonz';
const GITHUB_API = 'https://api.github.com';

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  language_color?: string;
}

interface GraphQLResponse {
  data?: {
    user?: {
      pinnedItems?: {
        nodes?: Array<{
          name: string;
          description: string | null;
          url: string;
          stargazerCount: number;
          forkCount: number;
          primaryLanguage?: {
            name: string;
            color: string;
          } | null;
        }>;
      };
    };
  };
  errors?: Array<{ message: string }>;
}

async function fetchPinnedReposGraphQL(): Promise<Project[]> {
  if (!GITHUB_TOKEN) {
    console.warn('GITHUB_TOKEN not set, falling back to REST API');
    return fetchPinnedReposREST();
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables: { login: GITHUB_LOGIN },
      }),
    });

    const data: GraphQLResponse = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return fetchPinnedReposREST();
    }

    const nodes = data.data?.user?.pinnedItems?.nodes || [];
    
    if (nodes.length === 0) {
      console.log('No pinned items found, falling back to latest repositories via REST...');
      return fetchPinnedReposREST();
    }
    
    return nodes.map((repo) => ({
      name: repo.name,
      description: repo.description || '',
      url: repo.url,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      language: repo.primaryLanguage
        ? {
            name: repo.primaryLanguage.name,
            color: repo.primaryLanguage.color,
          }
        : null,
    }));
  } catch (error) {
    console.error('GraphQL fetch failed:', error);
    return fetchPinnedReposREST();
  }
}

async function fetchPinnedReposREST(): Promise<Project[]> {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };
    
    if (GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `${GITHUB_API}/users/${GITHUB_LOGIN}/repos?sort=updated&per_page=6&type=public`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const repos: GitHubRepo[] = await response.json();

    return repos.map((repo) => ({
      name: repo.name,
      description: repo.description || '',
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language
        ? {
            name: repo.language,
            color: repo.language_color || '#586e75',
          }
        : null,
    }));
  } catch (error) {
    console.error('REST API fetch failed:', error);
    return getFallbackProjects();
  }
}

function getFallbackProjects(): Project[] {
  return [
    {
      name: 'AlvaGonz.github.io',
      description: "Adrian A. A. G.'s CV Project",
      url: 'https://github.com/AlvaGonz/AlvaGonz.github.io',
      stars: 0,
      forks: 0,
      language: { name: 'HTML', color: '#e34c26' },
    },
    {
      name: 'FAKKE-NEWS',
      description: 'Una aplicación web moderna para consulta de noticias con diseño editorial inspirado en WSJ y The New Yorker.',
      url: 'https://github.com/AlvaGonz/FAKKE-NEWS',
      stars: 0,
      forks: 0,
      language: { name: 'C#', color: '#239120' },
    },
  ];
}

async function main(): Promise<void> {
  console.log('Fetching pinned repositories...');
  const projects = await fetchPinnedReposGraphQL();

  const outputDir = join(process.cwd(), 'src', 'data', 'generated');
  mkdirSync(outputDir, { recursive: true });

  const outputPath = join(outputDir, 'pinned.json');
  const output = {
    projects,
    fetchedAt: new Date().toISOString(),
    source: GITHUB_TOKEN ? 'graphql' : 'rest',
  };

  writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`✅ Wrote ${projects.length} projects to ${outputPath}`);
}

main().catch((error) => {
  console.error('Script failed:', error);
  process.exit(1);
});


import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { Project } from '../src/content/types';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_LOGIN = 'AlvaGonz';

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
    throw new Error(
      'GITHUB_TOKEN is not set. Please add it to your environment variables.',
    );
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
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
  }

  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.statusText}`);
  }

  const nodes = data.data?.user?.pinnedItems?.nodes || [];

  if (nodes.length === 0) {
    console.warn(
      'No pinned repositories found for user. The generated file will be empty.',
    );
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
}

async function main(): Promise<void> {
  console.log('Fetching pinned repositories via GraphQL...');
  const projects = await fetchPinnedReposGraphQL();

  const outputDir = join(process.cwd(), 'src', 'data', 'generated');
  mkdirSync(outputDir, { recursive: true });

  const outputPath = join(outputDir, 'pinned.json');
  const output = {
    projects,
    fetchedAt: new Date().toISOString(),
    source: 'graphql',
  };

  writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`✅ Wrote ${projects.length} projects to ${outputPath}`);
}

main().catch((error) => {
  console.error('❌ Script failed:', error.message);
  process.exit(1);
});


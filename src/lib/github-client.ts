import { GraphQLClient, gql } from 'graphql-request';

// Validar que token existe
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_USER = 'AlvaGonz';

if (!GITHUB_TOKEN) {
  console.warn('⚠️ VITE_GITHUB_TOKEN not found in .env.local');
  console.warn('GitHub API requests will be rate-limited (60/hour)');
} else {
  console.log(`✅ GitHub Token detected (Length: ${GITHUB_TOKEN.length})`);
}

// Cliente GraphQL con autenticación
const graphqlClient = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN || ''}`,
    'Content-Type': 'application/json',
  },
});

// ==================== QUERIES ====================

/**
 * Query para obtener repositorios pinneados del usuario
 * Devuelve: name, description, url, languages, stargazers, homepageUrl, primaryLanguage
 */
const PINNED_REPOS_QUERY = gql`
  query GetPinnedRepositories($userName: String!) {
    user(login: $userName) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            id
            name
            description
            url
            isPrivate
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
            languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
              edges {
                size
                node {
                  name
                  color
                }
              }
            }
            homepageUrl
            repositoryTopics(first: 5) {
              nodes {
                topic {
                  name
                }
              }
            }
            pushedAt
          }
        }
      }
    }
  }
`;

/**
 * Query para obtener todos los repositorios (no solo pinneados)
 * Ordenado por stars descendente
 */
const ALL_REPOS_QUERY = gql`
  query GetAllRepositories($userName: String!, $first: Int = 20) {
    user(login: $userName) {
      repositories(
        first: $first
        orderBy: { field: STARGAZERS, direction: DESC }
        privacy: PUBLIC
      ) {
        totalCount
        nodes {
          id
          name
          description
          url
          isPrivate
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
          homepageUrl
          repositoryTopics(first: 5) {
            nodes {
              topic {
                name
              }
            }
          }
          pushedAt
        }
      }
    }
  }
`;

/**
 * Query para obtener estadísticas del usuario
 */
const USER_STATS_QUERY = gql`
  query GetUserStats($userName: String!) {
    user(login: $userName) {
      name
      bio
      location
      websiteUrl
      twitterUsername
      repositories {
        totalCount
      }
      followers {
        totalCount
      }
      following {
        totalCount
      }
      pullRequests {
        totalCount
      }
      issues {
        totalCount
      }
      gists {
        totalCount
      }
    }
  }
`;

// ==================== TIPOS ====================

export interface GitHubRepository {
  id: string;
  name: string;
  description: string | null;
  url: string;
  isPrivate: boolean;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  languages: Array<{
    name: string;
    color: string;
    size: number;
  }>;
  homepageUrl: string | null;
  repositoryTopics: Array<{
    topic: {
      name: string;
    };
  }>;
  pushedAt: string;
}

export interface GitHubUserStats {
  name: string;
  bio: string | null;
  location: string | null;
  websiteUrl: string | null;
  twitterUsername: string | null;
  repositories: {
    totalCount: number;
  };
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
  pullRequests: {
    totalCount: number;
  };
  issues: {
    totalCount: number;
  };
  gists: {
    totalCount: number;
  };
}

// ==================== FUNCIONES ====================

/**
 * Obtener repositorios pinneados del usuario
 */
export async function fetchPinnedProjects(): Promise<GitHubRepository[]> {
  // Remove try-catch to let the component handle the error
  const data: any = await graphqlClient.request(PINNED_REPOS_QUERY, {
    userName: GITHUB_USER,
  });

  const repos = data.user.pinnedItems.nodes || [];

  return repos.map((repo: any) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    url: repo.url,
    isPrivate: repo.isPrivate,
    stargazerCount: repo.stargazerCount,
    forkCount: repo.forkCount,
    primaryLanguage: repo.primaryLanguage,
    languages: repo.languages?.edges?.map((edge: any) => ({
      name: edge.node.name,
      color: edge.node.color,
      size: edge.size,
    })) || [],
    homepageUrl: repo.homepageUrl,
    repositoryTopics: repo.repositoryTopics?.nodes || [],
    pushedAt: repo.pushedAt,
  }));
}

/**
 * Obtener todos los repositorios públicos
 */
export async function fetchAllPublicRepos(
  limit: number = 20
): Promise<GitHubRepository[]> {
  // Remove try-catch to let the component handle the error
  const data: any = await graphqlClient.request(ALL_REPOS_QUERY, {
    userName: GITHUB_USER,
    first: limit,
  });

  const repos = data.user.repositories.nodes || [];

  return repos.map((repo: any) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    url: repo.url,
    isPrivate: repo.isPrivate,
    stargazerCount: repo.stargazerCount,
    forkCount: repo.forkCount,
    primaryLanguage: repo.primaryLanguage,
    languages: repo.languages?.edges?.map((edge: any) => ({
      name: edge.node.name,
      color: edge.node.color,
      size: edge.size,
    })) || [],
    homepageUrl: repo.homepageUrl,
    repositoryTopics: repo.repositoryTopics?.nodes || [],
    pushedAt: repo.pushedAt,
  }));
}

/**
 * Obtener estadísticas del usuario
 */
export async function fetchUserStats(): Promise<GitHubUserStats | null> {
  try {
    const data: any = await graphqlClient.request(USER_STATS_QUERY, {
      userName: GITHUB_USER,
    });

    return data.user;
  } catch (error) {
    console.error('❌ Error fetching user stats:', error);
    return null;
  }
}

/**
 * Obtener repositorio específico por nombre
 */
export async function fetchRepositoryByName(
  repoName: string
): Promise<GitHubRepository | null> {
  const REPO_QUERY = gql`
    query GetRepository($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        id
        name
        description
        url
        isPrivate
        stargazerCount
        forkCount
        primaryLanguage {
          name
          color
        }
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            size
            node {
              name
              color
            }
          }
        }
        homepageUrl
        repositoryTopics(first: 5) {
          nodes {
            topic {
              name
            }
          }
        }
        pushedAt
      }
    }
  `;

  try {
    const data: any = await graphqlClient.request(REPO_QUERY, {
      owner: GITHUB_USER,
      name: repoName,
    });

    const repo = data.repository;
    return {
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.url,
      isPrivate: repo.isPrivate,
      stargazerCount: repo.stargazerCount,
      forkCount: repo.forkCount,
      primaryLanguage: repo.primaryLanguage,
      languages: repo.languages?.edges?.map((edge: any) => ({
        name: edge.node.name,
        color: edge.node.color,
        size: edge.size,
      })) || [],
      homepageUrl: repo.homepageUrl,
      repositoryTopics: repo.repositoryTopics?.nodes || [],
      pushedAt: repo.pushedAt,
    };
  } catch (error) {
    console.error(`❌ Error fetching repository ${repoName}:`, error);
    return null;
  }
}

/**
 * Validar que el token está funcionando
 */
export async function validateToken(): Promise<boolean> {
  if (!GITHUB_TOKEN) {
    console.warn('⚠️ No GitHub token provided');
    return false;
  }

  try {
    const data: any = await graphqlClient.request(
      gql`
        query {
          viewer {
            login
          }
        }
      `
    );

    console.log('✅ GitHub token valid - Authenticated as:', data.viewer.login);
    return true;
  }
  catch (error) {
    console.error('❌ GitHub token validation failed:', error);
    return false;
  }
}

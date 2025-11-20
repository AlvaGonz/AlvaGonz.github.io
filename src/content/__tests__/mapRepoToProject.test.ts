import { describe, it, expect } from 'vitest';
import type { Project } from '../types';

// This function would be in a utils file if we extract it
function mapRepoToProject(repo: {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage?: {
    name: string;
    color: string;
  } | null;
}): Project {
  return {
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
  };
}

describe('mapRepoToProject', () => {
  it('should map repository to project correctly', () => {
    const repo = {
      name: 'test-repo',
      description: 'Test description',
      url: 'https://github.com/user/test-repo',
      stargazerCount: 10,
      forkCount: 5,
      primaryLanguage: {
        name: 'TypeScript',
        color: '#3178c6',
      },
    };

    const project = mapRepoToProject(repo);

    expect(project).toEqual({
      name: 'test-repo',
      description: 'Test description',
      url: 'https://github.com/user/test-repo',
      stars: 10,
      forks: 5,
      language: {
        name: 'TypeScript',
        color: '#3178c6',
      },
    });
  });

  it('should handle null description', () => {
    const repo = {
      name: 'test-repo',
      description: null,
      url: 'https://github.com/user/test-repo',
      stargazerCount: 0,
      forkCount: 0,
      primaryLanguage: null,
    };

    const project = mapRepoToProject(repo);

    expect(project.description).toBe('');
    expect(project.language).toBeNull();
  });

  it('should handle missing primary language', () => {
    const repo = {
      name: 'test-repo',
      description: 'No language',
      url: 'https://github.com/user/test-repo',
      stargazerCount: 0,
      forkCount: 0,
    };

    const project = mapRepoToProject(repo);

    expect(project.language).toBeNull();
  });
});


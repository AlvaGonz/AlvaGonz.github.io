const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'AlvaGonz';
const BASE_URL = 'https://api.github.com';

export interface GitHubEvent {
    id: string;
    type: string;
    created_at: string;
    repo: {
        name: string;
        url: string;
    };
    payload: {
        commits?: Array<{
            message: string;
            sha: string;
        }>;
        action?: string;
    };
}

export interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    updated_at: string;
}

export const getGithubActivityUrl = () =>
    `${BASE_URL}/users/${GITHUB_USERNAME}/events/public?per_page=5`;

export const getGithubReposUrl = () =>
    `${BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=6&type=owner`;

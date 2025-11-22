import { useFetch } from '../../hooks/useFetch';
import { getGithubReposUrl, GitHubRepo } from '../../services/github';

export function GithubRepos() {
    const { data: repos, loading, error } = useFetch<GitHubRepo[]>(
        getGithubReposUrl()
    );

    if (loading) return <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-gray-100/10 rounded-lg"></div>)}
    </div>;

    if (error) return null;

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold">Top Repositories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {repos?.map(repo => (
                    <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-lg border border-gray-200/10 hover:border-primary-500/50 hover:bg-gray-50/5 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold group-hover:text-primary-400 transition-colors">
                                {repo.name}
                            </h4>
                            <span className="text-xs bg-gray-100/10 px-2 py-1 rounded text-gray-400">
                                ⭐ {repo.stargazers_count}
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-2 mb-3 h-10">
                            {repo.description || 'No description available'}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                            {repo.language && (
                                <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                                    {repo.language}
                                </span>
                            )}
                            <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

import { useFetch } from '../../hooks/useFetch';
import { getGithubActivityUrl, GitHubEvent } from '../../services/github';

export function GithubActivity() {
    const { data: events, loading, error } = useFetch<GitHubEvent[]>(
        getGithubActivityUrl()
    );

    if (loading) return <div className="animate-pulse h-20 bg-gray-100/10 rounded-lg"></div>;
    if (error) return null; // Hide silently on error

    const pushEvents = events?.filter(e => e.type === 'PushEvent' || e.type === 'CreateEvent').slice(0, 4);

    if (!pushEvents?.length) return null;

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
                <span className="i-lucide-activity"></span>
                Recent Activity
            </h3>
            <div className="space-y-3">
                {pushEvents.map(event => (
                    <div key={event.id} className="flex gap-3 text-sm border-l-2 border-gray-200/20 pl-3 py-1">
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-primary-400">
                                    {event.type === 'PushEvent' ? 'Pushed to' : 'Created'}
                                </span>
                                <a
                                    href={`https://github.com/${event.repo.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline font-mono text-xs"
                                >
                                    {event.repo.name}
                                </a>
                            </div>
                            <div className="text-gray-400 text-xs mt-1">
                                {event.payload.commits?.[0]?.message || 'New repository created'}
                            </div>
                            <time className="text-[10px] text-gray-500 block mt-1">
                                {new Date(event.created_at).toLocaleDateString(undefined, {
                                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                })}
                            </time>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

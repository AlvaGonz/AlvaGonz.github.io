import { useFetch } from '../../hooks/useFetch';
import { getFavoriteGamesUrl, Game } from '../../services/rawg';

export function GamingShowcase() {
    // The RAWG response structure for a list is { results: Game[] }
    const { data, loading, error } = useFetch<{ results: Game[] }>(
        getFavoriteGamesUrl()
    );

    if (loading) return <div className="grid grid-cols-2 gap-4 animate-pulse">
        {[1, 2].map(i => <div key={i} className="h-40 bg-white/5 rounded-lg"></div>)}
    </div>;

    if (error || !data?.results) return null;

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="i-lucide-gamepad-2"></span>
                Gaming Vibe
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.results.slice(0, 4).map(game => (
                    <div
                        key={game.id}
                        className="group relative h-48 rounded-xl overflow-hidden border border-white/10 hover:border-primary-500/50 transition-all"
                    >
                        <img
                            src={game.background_image}
                            alt={game.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4 w-full">
                            <h4 className="font-bold text-white text-lg leading-tight mb-1">{game.name}</h4>
                            <div className="flex items-center justify-between text-xs text-gray-300">
                                <span className="bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm">
                                    {new Date(game.released).getFullYear()}
                                </span>
                                <span className="flex items-center gap-1 text-yellow-400">
                                    ⭐ {game.rating}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

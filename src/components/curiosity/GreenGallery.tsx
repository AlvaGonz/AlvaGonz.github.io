import { useFetch } from '../../hooks/useFetch';
import { getGreenGalleryUrl, UnsplashPhoto } from '../../services/unsplash';

export function GreenGallery() {
    const { data, loading, error } = useFetch<{ results: UnsplashPhoto[] }>(
        getGreenGalleryUrl()
    );

    if (loading) return <div className="h-64 bg-white/5 rounded-lg animate-pulse"></div>;
    if (error || !data?.results) return null;

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="i-lucide-image"></span>
                Aesthetic
            </h3>
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
                {data.results.map(photo => (
                    <div key={photo.id} className="break-inside-avoid relative group rounded-lg overflow-hidden">
                        <img
                            src={photo.urls.small}
                            alt={photo.alt_description}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                        <div className="absolute bottom-0 left-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-[10px] text-white/80">by {photo.user.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

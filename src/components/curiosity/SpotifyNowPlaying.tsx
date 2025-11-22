

export function SpotifyNowPlaying() {
    return (
        <div className="fixed bottom-4 left-4 z-50 w-full max-w-sm origin-bottom-left transform scale-75 hover:scale-90 transition-transform duration-300">
            <div className="overflow-hidden rounded-xl shadow-2xl shadow-black/50">
                <iframe
                    data-testid="embed-iframe"
                    style={{ borderRadius: '12px' }}
                    src="https://open.spotify.com/embed/playlist/3EX5tmywatH8OHNS2l7wU3?utm_source=generator"
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="bg-black/80 backdrop-blur-xl"
                ></iframe>
            </div>
        </div>
    );
}

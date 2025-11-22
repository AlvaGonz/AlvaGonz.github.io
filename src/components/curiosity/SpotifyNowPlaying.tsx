import React from 'react';

export function SpotifyNowPlaying() {
    return (
        <div className="w-full max-w-md mx-auto overflow-hidden rounded-xl shadow-lg hover:shadow-green-500/20 transition-shadow duration-300">
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
                className="bg-black/20 backdrop-blur-sm"
            ></iframe>
        </div>
    );
}

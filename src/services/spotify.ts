const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

export interface SpotifyTrack {
    item: {
        name: string;
        artists: Array<{ name: string }>;
        album: {
            images: Array<{ url: string }>;
            name: string;
        };
        external_urls: {
            spotify: string;
        };
    };
    is_playing: boolean;
}

const getAccessToken = async () => {
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) return null;

    const basic = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: REFRESH_TOKEN,
        }),
    });

    return response.json();
};

export const getNowPlaying = async () => {
    const { access_token } = await getAccessToken() || {};
    if (!access_token) return null;

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    if (response.status === 204 || response.status > 400) {
        return null;
    }

    return response.json();
};

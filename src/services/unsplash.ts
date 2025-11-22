const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const BASE_URL = 'https://api.unsplash.com';

export interface UnsplashPhoto {
    id: string;
    urls: {
        small: string;
        regular: string;
    };
    user: {
        name: string;
        username: string;
    };
    description: string;
    alt_description: string;
}

export const getGreenGalleryUrl = () =>
    `${BASE_URL}/search/photos?query=green nature aesthetic&per_page=6&orientation=landscape&client_id=${ACCESS_KEY}`;

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  metacritic: number;
  slug: string;
}

// NFS Most Wanted ID is usually around 326 (2005) or 4914 (2012).
// Let's search or hardcode specific favorites.
// NFS Most Wanted (2005) ID: 326
// NFS Underground 2 ID: 362
// Minecraft ID: 22509

export const getFavoriteGamesUrl = () => {
  // Fetch specific games by ID to ensure we get the favorites
  // This endpoint doesn't support multiple IDs directly in all plans,
  // so we might need to fetch individual or use a search.
  // For simplicity in this demo, let's fetch a list of games that match a search or just top rated racing games if specific IDs fail.
  // Better approach: Search for "Need for Speed"
  return `${BASE_URL}/games?key=${API_KEY}&search=need for speed&page_size=5`;
};

export const getGameDetailsUrl = (id: number) => `${BASE_URL}/games/${id}?key=${API_KEY}`;

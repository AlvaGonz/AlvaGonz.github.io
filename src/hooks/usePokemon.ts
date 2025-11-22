import { useState, useEffect } from 'react';
import { fetchPokemon, PokemonData } from '@/lib/pokeapi';

export function usePokemon(pokemonId: number) {
  const [data, setData] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Check cache (1 hour) - cache key includes pokemon ID
        const cacheKey = `pokemon_${pokemonId}`;
        const cached = localStorage.getItem(cacheKey);
        const cacheTime = localStorage.getItem(`${cacheKey}_time`);

        if (cached && cacheTime) {
          const age = Date.now() - parseInt(cacheTime);
          if (age < 60 * 60 * 1000) {
            try {
              const parsed = JSON.parse(cached);
              if (parsed && parsed.id && parsed.name) {
                setData(parsed);
                setLoading(false);
                return;
              }
            } catch (e) {
              console.warn('Failed to parse cached Pokemon data');
            }
          }
        }

        const pokemonData = await fetchPokemon(pokemonId);
        if (pokemonData) {
          setData(pokemonData);
          localStorage.setItem(cacheKey, JSON.stringify(pokemonData));
          localStorage.setItem(`${cacheKey}_time`, Date.now().toString());
        } else {
          // Fallback to cache if fetch fails even if expired
          if (cached) {
            try {
              const parsed = JSON.parse(cached);
              if (parsed && parsed.id && parsed.name) {
                setData(parsed);
                console.warn('Fetch failed, using expired cache');
              } else {
                throw new Error('Invalid cache structure');
              }
            } catch (e) {
              throw new Error('Failed to fetch Pokemon data and invalid cache');
            }
          } else {
            throw new Error('Failed to fetch Pokemon data');
          }
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [pokemonId]);

  return { data, loading, error };
}


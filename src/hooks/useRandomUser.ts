import { useState, useEffect } from 'react';
import { fetchRandomUser, RandomUser } from '@/lib/randomUser';

export function useRandomUser() {
  const [data, setData] = useState<RandomUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Check cache (1 hour)
        const cached = localStorage.getItem('random_user');
        const cacheTime = localStorage.getItem('random_user_time');

        if (cached && cacheTime) {
          const age = Date.now() - parseInt(cacheTime);
          if (age < 60 * 60 * 1000) {
            try {
              const parsed = JSON.parse(cached);
              if (parsed && parsed.results && Array.isArray(parsed.results)) {
                setData(parsed);
                setLoading(false);
                return;
              }
            } catch (e) {
              console.warn('Failed to parse cached Random User data');
            }
          }
        }

        const userData = await fetchRandomUser();
        if (userData) {
          setData(userData);
          localStorage.setItem('random_user', JSON.stringify(userData));
          localStorage.setItem('random_user_time', Date.now().toString());
        } else {
          // Fallback to cache if fetch fails even if expired
          if (cached) {
            try {
              const parsed = JSON.parse(cached);
              if (parsed && parsed.results && Array.isArray(parsed.results)) {
                setData(parsed);
                console.warn('Fetch failed, using expired cache');
              } else {
                throw new Error('Invalid cache structure');
              }
            } catch (e) {
              throw new Error('Failed to fetch Random User data and invalid cache');
            }
          } else {
            throw new Error('Failed to fetch Random User data');
          }
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
}


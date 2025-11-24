import { useState, useEffect } from 'react';
import { fetchLeetCodeStats, LeetCodeStats } from '@/lib/leetcode';

export function useLeetcodeStats() {
  const [data, setData] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Check cache (1 hour)
        const cached = localStorage.getItem('leetcode_stats');
        const cacheTime = localStorage.getItem('leetcode_stats_time');

        if (cached && cacheTime) {
          const age = Date.now() - parseInt(cacheTime);
          if (age < 60 * 60 * 1000) {
            try {
              const parsed = JSON.parse(cached);
              if (parsed && parsed.status && parsed.data?.userProfile) {
                setData(parsed);
                setLoading(false);
                return;
              }
            } catch (e) {
              console.warn('Failed to parse cached LeetCode data');
            }
          }
        }

        const stats = await fetchLeetCodeStats();
        if (stats) {
          setData(stats);
          localStorage.setItem('leetcode_stats', JSON.stringify(stats));
          localStorage.setItem('leetcode_stats_time', Date.now().toString());
        } else {
          // Fallback to cache if fetch fails even if expired
          if (cached) {
            try {
              const parsed = JSON.parse(cached);
              if (parsed && parsed.status && parsed.data?.userProfile) {
                setData(parsed);
                console.warn('Fetch failed, using expired cache');
              } else {
                throw new Error('Invalid cache structure');
              }
            } catch (e) {
              throw new Error('Failed to fetch LeetCode data and invalid cache');
            }
          } else {
            throw new Error('Failed to fetch LeetCode data');
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

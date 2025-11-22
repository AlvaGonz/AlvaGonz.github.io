import { useState, useEffect } from 'react';

interface ApiState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    lastUpdated: Date | null;
}

interface FetchOptions {
    interval?: number;
    headers?: HeadersInit;
    skip?: boolean;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes default cache

export function useFetch<T>(
    url: string,
    options?: FetchOptions
): ApiState<T> {
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        loading: true,
        error: null,
        lastUpdated: null,
    });

    useEffect(() => {
        if (options?.skip) return;

        const fetchData = async () => {
            // Check local storage cache first
            const cacheKey = `cache_${url}`;
            const cached = localStorage.getItem(cacheKey);

            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                const age = Date.now() - timestamp;

                if (age < CACHE_DURATION) {
                    setState({
                        data,
                        loading: false,
                        error: null,
                        lastUpdated: new Date(timestamp),
                    });
                    return; // Use cache
                }
            }

            try {
                setState(prev => ({ ...prev, loading: true }));
                const res = await fetch(url, { headers: options?.headers });

                if (!res.ok) {
                    throw new Error(`API error: ${res.status}`);
                }

                const data = await res.json();

                // Update cache
                localStorage.setItem(cacheKey, JSON.stringify({
                    data,
                    timestamp: Date.now()
                }));

                setState({
                    data,
                    loading: false,
                    error: null,
                    lastUpdated: new Date(),
                });
            } catch (error) {
                console.error(`Error fetching ${url}:`, error);
                setState(prev => ({
                    ...prev,
                    loading: false,
                    error: error as Error,
                }));
            }
        };

        fetchData();

        if (options?.interval) {
            const interval = setInterval(fetchData, options.interval);
            return () => clearInterval(interval);
        }
    }, [url, options?.interval, options?.skip]);

    return state;
}

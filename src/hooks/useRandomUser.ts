import { useState, useEffect } from 'react';

export interface RandomUser {
    name: {
        first: string;
        last: string;
    };
    location: {
        city: string;
        country: string;
    };
    picture: {
        medium: string;
    };
}

export interface RandomUserData {
    results: RandomUser[];
}

export function useRandomUser() {
    const [data, setData] = useState<RandomUserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://randomuser.me/api/');
                if (!response.ok) {
                    throw new Error('Failed to fetch random user');
                }
                const json = await response.json();
                setData(json);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Unknown error'));
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { data, loading, error };
}

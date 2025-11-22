export interface RandomUser {
  results: Array<{
    gender: string;
    name: {
      title: string;
      first: string;
      last: string;
    };
    location: {
      city: string;
      country: string;
    };
    email: string;
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
  }>;
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export async function fetchRandomUser(): Promise<RandomUser | null> {
  try {
    const response = await fetch('https://randomuser.me/api/');

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = (await response.json()) as RandomUser;
    return data;
  } catch (error) {
    console.error('Error fetching Random User data:', error);
    return null;
  }
}


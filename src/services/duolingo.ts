export interface DuolingoUser {
    username: string;
    avatar: string;
    streak: number;
    totalXp: number;
    learningLanguage: string;
    courses: Array<{
        title: string;
        xp: number;
        crowns: number;
    }>;
}

const USERNAME = 'AlvaGonz';
const PROXY_URL = 'https://api.allorigins.win/raw?url=';
const DUOLINGO_API = `https://www.duolingo.com/api/1/users/show?username=${USERNAME}`;

export const getDuolingoStats = async (): Promise<DuolingoUser | null> => {
    try {
        const response = await fetch(`${PROXY_URL}${encodeURIComponent(DUOLINGO_API)}`);

        if (!response.ok) {
            throw new Error('Failed to fetch Duolingo stats');
        }

        const data = await response.json();

        // Transform the raw data into our interface
        // Note: The structure might vary slightly, so we add safe access
        return {
            username: data.username,
            avatar: data.avatar || 'https://d35aaqx5ub95lt.cloudfront.net/images/duo-2024.svg',
            streak: data.streakData?.streak || data.site_streak || 0,
            totalXp: data.totalXp || 0,
            learningLanguage: data.learningLanguage || 'en',
            courses: data.courses || []
        };
    } catch (error) {
        console.error('Error fetching Duolingo stats:', error);
        return null;
    }
};

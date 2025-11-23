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
        learningLanguage: string;
        fromLanguage: string;
    }>;
}

const USERNAME = 'AlvaGonz';
// Use allorigins.win/get for better CORS support
const PROXY_URL = 'https://api.allorigins.win/get?url=';
const DUOLINGO_API = `https://www.duolingo.com/2017-06-30/users?username=${USERNAME}`;

export const getDuolingoStats = async (): Promise<DuolingoUser | null> => {
    try {
        // Fetch via proxy - allorigins.win/get returns {contents: "...", status: {...}}
        const response = await fetch(`${PROXY_URL}${encodeURIComponent(DUOLINGO_API)}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch Duolingo stats: ${response.statusText}`);
        }

        const proxyData = await response.json();
        const data = JSON.parse(proxyData.contents);
        const userData = data.users?.[0] || data;

        // Transform the raw data into our interface
        return {
            username: userData.username || USERNAME,
            avatar: userData.picture ? (userData.picture.startsWith('//') ? `https:${userData.picture}` : userData.picture) : '/images/duo-face.png',
            streak: userData.streak || 0,
            totalXp: userData.totalXp || 0,
            learningLanguage: userData.learningLanguage || 'en',
            courses: (userData.courses || []).map((course: any) => ({
                title: course.title,
                xp: course.xp,
                crowns: course.crowns || 0,
                learningLanguage: course.learningLanguage,
                fromLanguage: course.fromLanguage
            }))
        };
    } catch (error) {
        console.error('Error fetching Duolingo stats:', error);
        return null;
    }
};

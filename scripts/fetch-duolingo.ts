import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const USERNAME = 'AlvaGonz';
const DUOLINGO_API_URL = `https://www.duolingo.com/2017-06-30/users?username=${USERNAME}`;

interface DuolingoCourse {
    title: string;
    learningLanguage: string;
    xp: number;
}

interface DuolingoStats {
    username: string;
    streak: number;
    totalXp: number;
    level: string;
    learningLanguage: string;
    avatar?: string;
    courses: DuolingoCourse[];
    motivation: string;
}

// Fallback data in case the API fails or changes
const FALLBACK_DATA: DuolingoStats = {
    username: USERNAME,
    streak: 452,
    totalXp: 30705,
    level: "B2",
    learningLanguage: "en",
    avatar: "/images/duo-face.png",
    courses: [
        { title: "English", learningLanguage: "en", xp: 12500 },
        { title: "Japanese", learningLanguage: "ja", xp: 2920 }
    ],
    motivation: "serious"
};

async function fetchDuolingoStats(): Promise<DuolingoStats> {
    try {
        console.log(`Fetching Duolingo stats for ${USERNAME}...`);

        // Duolingo API requires a user-agent to avoid 403s
        const response = await fetch(DUOLINGO_API_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.users || data.users.length === 0) {
            throw new Error('User not found in response');
        }

        const user = data.users[0];

        // Map API response to our interface
        const stats: DuolingoStats = {
            username: user.username || USERNAME,
            streak: user.streak || 0,
            totalXp: user.totalXp || 0,
            level: "B2", // Level is not directly available in this endpoint, keeping static
            learningLanguage: user.learningLanguage || 'en',
            avatar: user.picture ? `https:${user.picture}/xxlarge` : undefined,
            courses: (user.courses || []).map((c: any) => ({
                title: c.title,
                learningLanguage: c.learningLanguage,
                xp: c.xp
            })),
            motivation: user.motivation || "serious"
        };

        return stats;

    } catch (error) {
        console.warn('Failed to fetch Duolingo stats, using fallback data:', error);
        return FALLBACK_DATA;
    }
}

async function main() {
    const stats = await fetchDuolingoStats();

    const outputDir = join(process.cwd(), 'src', 'data', 'generated');
    mkdirSync(outputDir, { recursive: true });

    const outputPath = join(outputDir, 'duolingo.json');

    writeFileSync(outputPath, JSON.stringify(stats, null, 2), 'utf-8');
    console.log(`✅ Wrote Duolingo stats to ${outputPath}`);
}

main().catch(err => {
    console.error('Script failed:', err);
    process.exit(1);
});

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { estimateCefr } from '../src/features/duolingo/level';
import type { DuolingoStats } from '../src/features/duolingo/types';

const USERNAME = 'AlvaGonz';
const DUOLINGO_API_URL = `https://www.duolingo.com/2017-06-30/users?username=${USERNAME}`;

interface RawCourse {
  title?: string;
  learningLanguage?: string;
  xp?: number;
}

interface RawUser {
  username?: string;
  streak?: number;
  totalXp?: number;
  learningLanguage?: string;
  picture?: string;
  motivation?: string;
  courses?: RawCourse[];
}

async function fetchDuolingoStats(): Promise<DuolingoStats> {
  const response = await fetch(DUOLINGO_API_URL, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = (await response.json()) as { users?: RawUser[] };
  const user = data.users?.[0];

  if (!user) {
    throw new Error('User not found in response');
  }

  const courses = (user.courses ?? [])
    .filter(
      (course): course is RawCourse & { title: string; learningLanguage: string; xp: number } =>
        Boolean(course.title && course.learningLanguage) &&
        typeof course.xp === 'number' &&
        Number.isFinite(course.xp),
    )
    .map((course) => ({
      title: course.title,
      learningLanguage: course.learningLanguage,
      xp: course.xp,
      level: estimateCefr(course.xp),
    }))
    .sort((a, b) => b.xp - a.xp);

  return {
    username: user.username ?? USERNAME,
    streak: user.streak ?? 0,
    totalXp: user.totalXp ?? 0,
    learningLanguage: user.learningLanguage ?? 'en',
    avatar: user.picture ? `https:${user.picture}/xxlarge` : undefined,
    courses,
    motivation: user.motivation ?? 'serious',
    lastUpdated: new Date().toISOString(),
  };
}

async function main() {
  const outputDir = join(process.cwd(), 'src', 'data', 'generated');
  const outputPath = join(outputDir, 'duolingo.json');

  try {
    console.log(`Fetching Duolingo stats for ${USERNAME}...`);
    const stats = await fetchDuolingoStats();
    mkdirSync(outputDir, { recursive: true });
    writeFileSync(outputPath, JSON.stringify(stats, null, 2) + '\n', 'utf-8');
    console.log(`✅ Wrote Duolingo stats to ${outputPath}`);
  } catch (error) {
    if (existsSync(outputPath)) {
      console.warn('Failed to fetch Duolingo stats. Keeping previous data.', error);
      return;
    }
    console.error('Failed to fetch Duolingo stats and no previous data exists.', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Script failed:', error);
  process.exit(1);
});

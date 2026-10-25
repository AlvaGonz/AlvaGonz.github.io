import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { estimateCefr } from '../src/features/duolingo/level';
import type { DuolingoActivity, DuolingoStats } from '../src/features/duolingo/types';

const USERNAME = 'AlvaGonz';
const DUOLINGO_API_URL = `https://www.duolingo.com/2017-06-30/users?username=${USERNAME}`;

interface RawCourse {
  title?: string;
  learningLanguage?: string;
  xp?: number;
}

interface RawUser {
  id?: number;
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
    userId: user.id,
    streak: user.streak ?? 0,
    totalXp: user.totalXp ?? 0,
    learningLanguage: user.learningLanguage ?? 'en',
    avatar: user.picture ? `https:${user.picture}/xxlarge` : undefined,
    courses,
    motivation: user.motivation ?? 'serious',
    lastUpdated: new Date().toISOString(),
  };
}

function thirtyDaysAgoIso(): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - 30);
  return date.toISOString().slice(0, 10);
}

async function fetchAnakinActivity(apiKey: string, userId: number): Promise<DuolingoActivity | null> {
  const startDate = thirtyDaysAgoIso();
  try {
    const submitResponse = await fetch('https://api.anakin.io/v1/wire/task', {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action_id: 'act_duolingo_user_xp_summaries',
        params: { user_id: String(userId), start_date: startDate },
      }),
    });

    if (!submitResponse.ok) {
      console.warn(`Anakin submit failed: HTTP ${submitResponse.status}`);
      return null;
    }

    const submitted = (await submitResponse.json()) as { job_id?: string };
    if (!submitted.job_id) return null;

    for (let attempt = 0; attempt < 20; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const pollResponse = await fetch(`https://api.anakin.io/v1/wire/jobs/${submitted.job_id}`, {
        headers: { 'X-API-Key': apiKey },
      });

      if (!pollResponse.ok) return null;

      const job = (await pollResponse.json()) as {
        status?: string;
        result?: { summaries?: unknown[] };
        output?: { summaries?: unknown[] };
        summaries?: unknown[];
      };

      if (job.status === 'succeeded' || job.status === 'completed') {
        const nested = (job.data as { data?: Record<string, unknown> } | undefined)?.data;
        const result = (nested ?? job.data ?? job.result ?? job.output ?? job) as Record<string, unknown>;
        const summaries = Array.isArray(result.summaries)
          ? (result.summaries as Array<Record<string, unknown>>)
          : [];

        const totalXp =
          typeof result.total_xp_in_window === 'number'
            ? result.total_xp_in_window
            : summaries.reduce((sum, entry) => sum + (Number(entry.xp) || 0), 0);
        const activeDays = summaries.filter(
          (entry) => (Number(entry.xp) || 0) > 0 || (Number(entry.sessions) || 0) > 0,
        ).length;
        const streakExtendedDays = summaries.filter((entry) => entry.streak_extended === true).length;

        return {
          windowDays: 30,
          totalXp,
          activeDays,
          streakExtendedDays,
        };
      }

      if (job.status === 'failed') {
        console.warn('Anakin job failed');
        return null;
      }
    }

    console.warn('Anakin job timed out');
    return null;
  } catch (error) {
    console.warn('Anakin activity fetch failed', error);
    return null;
  }
}

async function main() {
  const outputDir = join(process.cwd(), 'src', 'data', 'generated');
  const outputPath = join(outputDir, 'duolingo.json');

  try {
    console.log(`Fetching Duolingo stats for ${USERNAME}...`);
    const stats = await fetchDuolingoStats();

    const apiKey = process.env.ANAKIN_API_KEY;
    if (apiKey && stats.userId) {
      console.log('Fetching Anakin activity summary...');
      const activity = await fetchAnakinActivity(apiKey, stats.userId);
      if (activity) {
        stats.activity = activity;
      } else if (existsSync(outputPath)) {
        try {
          const previous = JSON.parse(readFileSync(outputPath, 'utf-8')) as DuolingoStats;
          if (previous.activity) stats.activity = previous.activity;
        } catch {
          // ignore corrupt previous file
        }
      }
    }

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

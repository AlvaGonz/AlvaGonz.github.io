import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import {
  DUOLINGO_USERNAME,
  duolingoApiUrl,
  mapDuolingoUser,
  type DuolingoApiUser,
} from '../src/features/duolingo/api';

const OUTPUT_PATH = join(process.cwd(), 'src', 'data', 'generated', 'duolingo.json');
const MAX_ATTEMPTS = 3;

async function fetchUser(): Promise<DuolingoApiUser> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(duolingoApiUrl(DUOLINGO_USERNAME), {
        headers: {
          Accept: 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = (await response.json()) as { users?: DuolingoApiUser[] };
      const user = data.users?.[0];

      if (!user) {
        throw new Error('User not found in response');
      }

      return user;
    } catch (error) {
      lastError = error;
      if (attempt < MAX_ATTEMPTS) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
      }
    }
  }

  throw lastError;
}

async function main(): Promise<void> {
  try {
    const user = await fetchUser();
    const stats = mapDuolingoUser(user, DUOLINGO_USERNAME);

    mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
    writeFileSync(OUTPUT_PATH, `${JSON.stringify(stats, null, 2)}\n`, 'utf-8');

    console.log(
      `Duolingo synced: ${stats.streak} day streak, ${stats.totalXp} XP, ${stats.courses.length} courses`,
    );
  } catch (error) {
    if (existsSync(OUTPUT_PATH)) {
      console.warn('Duolingo fetch failed; keeping the existing snapshot.', error);
      return;
    }

    throw error;
  }
}

main().catch((error) => {
  console.error('Duolingo sync failed:', error);
  process.exit(1);
});

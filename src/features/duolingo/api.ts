import { estimateCefr } from './level';
import type { DuolingoCourse, DuolingoStats } from './types';

export const DUOLINGO_USERNAME = 'AlvaGonz';

export interface DuolingoApiCourse {
  id?: string;
  title?: string;
  learningLanguage?: string;
  xp?: number;
}

export interface DuolingoApiUser {
  id?: number;
  username?: string;
  streak?: number;
  streakData?: {
    currentStreak?: {
      length?: number;
    };
  };
  totalXp?: number;
  learningLanguage?: string;
  currentCourseId?: string;
  picture?: string;
  motivation?: string;
  courses?: DuolingoApiCourse[];
}

export function duolingoApiUrl(username: string): string {
  return `https://www.duolingo.com/2017-06-30/users?username=${encodeURIComponent(username)}`;
}

export function mapDuolingoUser(user: DuolingoApiUser, fallbackUsername: string): DuolingoStats {
  const courses: DuolingoCourse[] = (user.courses ?? [])
    .filter((course): course is DuolingoApiCourse & { title: string; learningLanguage: string } =>
      Boolean(course.title && course.learningLanguage),
    )
    .map((course) => {
      const xp = course.xp ?? 0;
      return {
        title: course.title,
        learningLanguage: course.learningLanguage,
        xp,
        level: estimateCefr(xp),
      };
    })
    .sort((a, b) => b.xp - a.xp);

  return {
    username: user.username ?? fallbackUsername,
    userId: user.id,
    streak: user.streakData?.currentStreak?.length ?? user.streak ?? 0,
    totalXp: user.totalXp ?? courses.reduce((sum, course) => sum + course.xp, 0),
    learningLanguage: user.learningLanguage ?? courses[0]?.learningLanguage ?? 'en',
    avatar: user.picture
      ? `${user.picture.startsWith('//') ? `https:${user.picture}` : user.picture}/xxlarge`
      : undefined,
    courses,
    motivation: user.motivation ?? 'serious',
    lastUpdated: new Date().toISOString(),
  };
}

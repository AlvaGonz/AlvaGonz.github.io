export const DUOLINGO_USERNAME = 'AlvaGonz';

export interface DuolingoCourse {
  title: string;
  learningLanguage: string;
  xp: number;
}

export interface DuolingoStats {
  username: string;
  streak: number;
  streakStartDate?: string;
  totalXp: number;
  learningLanguage: string;
  currentCourse?: string;
  avatar?: string;
  courses: DuolingoCourse[];
  motivation: string;
}

export interface DuolingoApiCourse {
  id?: string;
  title?: string;
  learningLanguage?: string;
  xp?: number;
}

export interface DuolingoApiUser {
  username?: string;
  streak?: number;
  streakData?: {
    currentStreak?: {
      length?: number;
      startDate?: string;
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
  const rawCourses = user.courses ?? [];

  const courses = rawCourses
    .filter((course): course is DuolingoApiCourse & { title: string; learningLanguage: string } =>
      Boolean(course.title && course.learningLanguage),
    )
    .map((course) => ({
      title: course.title,
      learningLanguage: course.learningLanguage,
      xp: course.xp ?? 0,
    }))
    .sort((a, b) => b.xp - a.xp);

  const currentCourse =
    rawCourses.find((course) => course.id === user.currentCourseId)?.title ??
    rawCourses.find((course) => course.learningLanguage === user.learningLanguage)?.title ??
    courses[0]?.title;

  const totalXp = user.totalXp ?? courses.reduce((sum, course) => sum + course.xp, 0);

  return {
    username: user.username ?? fallbackUsername,
    streak: user.streakData?.currentStreak?.length ?? user.streak ?? 0,
    streakStartDate: user.streakData?.currentStreak?.startDate,
    totalXp,
    learningLanguage: user.learningLanguage ?? courses[0]?.learningLanguage ?? 'en',
    currentCourse,
    avatar: user.picture
      ? `${user.picture.startsWith('//') ? `https:${user.picture}` : user.picture}/xxlarge`
      : undefined,
    courses,
    motivation: user.motivation ?? 'serious',
  };
}

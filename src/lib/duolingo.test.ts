import { describe, expect, it } from 'vitest';
import { mapDuolingoUser, type DuolingoApiUser } from './duolingo';

const apiUser: DuolingoApiUser = {
  username: 'AlvaGonz',
  streak: 1,
  streakData: { currentStreak: { length: 776, startDate: '2024-06-21' } },
  totalXp: 72937,
  learningLanguage: 'pt',
  currentCourseId: 'DUOLINGO_PT_ES',
  picture: '//cdn.example.com/avatar',
  motivation: 'brain',
  courses: [
    { id: 'DUOLINGO_EN_ES', title: 'English', learningLanguage: 'en', xp: 43277 },
    { id: 'DUOLINGO_PT_ES', title: 'Portuguese', learningLanguage: 'pt', xp: 15584 },
    { id: 'DUOLINGO_JA_EN', title: 'Japanese', learningLanguage: 'ja', xp: 2765 },
  ],
};

describe('mapDuolingoUser', () => {
  it('maps the current streak, total XP and course list', () => {
    const stats = mapDuolingoUser(apiUser, 'fallback');

    expect(stats.streak).toBe(776);
    expect(stats.streakStartDate).toBe('2024-06-21');
    expect(stats.totalXp).toBe(72937);
    expect(stats.currentCourse).toBe('Portuguese');
    expect(stats.courses.map((course) => course.title)).toEqual([
      'English',
      'Portuguese',
      'Japanese',
    ]);
  });

  it('normalizes a protocol-relative avatar URL', () => {
    expect(mapDuolingoUser(apiUser, 'fallback').avatar).toBe(
      'https://cdn.example.com/avatar/xxlarge',
    );
  });

  it('falls back to the legacy streak and course sum when newer fields are missing', () => {
    const stats = mapDuolingoUser(
      {
        streak: 12,
        courses: [{ title: 'English', learningLanguage: 'en', xp: 100 }],
      },
      'AlvaGonz',
    );

    expect(stats.streak).toBe(12);
    expect(stats.totalXp).toBe(100);
    expect(stats.username).toBe('AlvaGonz');
    expect(stats.currentCourse).toBe('English');
  });

  it('returns safe defaults for an empty profile', () => {
    const stats = mapDuolingoUser({}, 'AlvaGonz');

    expect(stats.streak).toBe(0);
    expect(stats.totalXp).toBe(0);
    expect(stats.courses).toEqual([]);
    expect(stats.currentCourse).toBeUndefined();
    expect(stats.learningLanguage).toBe('en');
  });
});

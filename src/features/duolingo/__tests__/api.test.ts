import { describe, expect, it } from 'vitest';
import { mapDuolingoUser, type DuolingoApiUser } from '../api';

const apiUser: DuolingoApiUser = {
  id: 478388255,
  username: 'AlvaGonz',
  streak: 1,
  streakData: { currentStreak: { length: 776 } },
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
    expect(stats.totalXp).toBe(72937);
    expect(stats.userId).toBe(478388255);
    expect(stats.courses.map((course) => course.title)).toEqual([
      'English',
      'Portuguese',
      'Japanese',
    ]);
  });

  it('estimates a CEFR level for every course from its XP', () => {
    const stats = mapDuolingoUser(apiUser, 'fallback');

    expect(stats.courses.find((course) => course.title === 'English')?.level).toBe('C1');
    expect(stats.courses.find((course) => course.title === 'Portuguese')?.level).toBe('B2');
    expect(stats.courses.find((course) => course.title === 'Japanese')?.level).toBe('A2');
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
  });

  it('returns safe defaults for an empty profile', () => {
    const stats = mapDuolingoUser({}, 'AlvaGonz');

    expect(stats.streak).toBe(0);
    expect(stats.totalXp).toBe(0);
    expect(stats.courses).toEqual([]);
    expect(stats.learningLanguage).toBe('en');
    expect(stats.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });
});

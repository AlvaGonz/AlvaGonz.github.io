import { describe, expect, it } from 'vitest';
import { estimateCefr } from '../level';

describe('estimateCefr', () => {
  it('maps XP bands to an estimated CEFR level', () => {
    expect(estimateCefr(0)).toBe('A1');
    expect(estimateCefr(999)).toBe('A1');
    expect(estimateCefr(1000)).toBe('A2');
    expect(estimateCefr(2999)).toBe('A2');
    expect(estimateCefr(3000)).toBe('B1');
    expect(estimateCefr(7999)).toBe('B1');
    expect(estimateCefr(8000)).toBe('B2');
    expect(estimateCefr(19999)).toBe('B2');
    expect(estimateCefr(20000)).toBe('C1');
  });

  it('treats invalid XP as A1', () => {
    expect(estimateCefr(Number.NaN)).toBe('A1');
    expect(estimateCefr(-50)).toBe('A1');
  });
});

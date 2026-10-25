export type EstimatedCefr = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

// Approximate mapping from course XP. Capped at C1 because XP alone cannot prove C2.
const CEFR_THRESHOLDS: ReadonlyArray<{ minXp: number; level: EstimatedCefr }> = [
  { minXp: 20000, level: 'C1' },
  { minXp: 8000, level: 'B2' },
  { minXp: 3000, level: 'B1' },
  { minXp: 1000, level: 'A2' },
  { minXp: 0, level: 'A1' },
];

export function estimateCefr(xp: number): EstimatedCefr {
  const safeXp = Number.isFinite(xp) ? Math.max(0, xp) : 0;
  return CEFR_THRESHOLDS.find((threshold) => safeXp >= threshold.minXp)!.level;
}

import { describe, expect, it } from 'vitest';
import { KEYBOARD_LAYOUT } from '../keyboard-layout';
import { formalKeyboardTheme, curiosityKeyboardTheme, getKeyboardTheme } from '../keyboard-theme';

describe('keyboard-theme', () => {
  it('returns formal theme for formal side', () => {
    const theme = getKeyboardTheme('formal');
    expect(theme.side).toBe('formal');
    expect(theme.canvasBg).toBe(formalKeyboardTheme.canvasBg);
    expect(theme.chassis.baseColor).toBe('#06302b'); // Pine
    expect(theme.keys.primary.base).toBe('#2cc295'); // Mountain Meadow
    expect(theme.keys.alphanumeric.base).toBe('#032221'); // Dark Green
  });

  it('returns curiosity theme for curiosity side', () => {
    const theme = getKeyboardTheme('curiosity');
    expect(theme.side).toBe('curiosity');
    expect(theme.canvasBg).toBe(curiosityKeyboardTheme.canvasBg);
    expect(theme.chassis.baseColor).toBe('#21263A'); // Night Blue-Grey
    expect(theme.keys.primary.base).toBe('#D0D34D'); // Lime Chartreuse
    expect(theme.keys.secondary.base).toBe('#157954'); // Deep Emerald
  });

  it('defaults to formal theme when side is null or undefined', () => {
    expect(getKeyboardTheme(null).side).toBe('formal');
    expect(getKeyboardTheme(undefined).side).toBe('formal');
  });

  it('ensures all keys in KEYBOARD_LAYOUT have valid semantic roles', () => {
    const validRoles = ['alphanumeric', 'modifier', 'primary', 'secondary', 'accent', 'space'];

    KEYBOARD_LAYOUT.forEach((row) => {
      row.forEach((key) => {
        expect(key.role).toBeDefined();
        expect(validRoles).toContain(key.role);
      });
    });
  });

  it('verifies Enter key is primary and Esc key is accent', () => {
    const allKeys = KEYBOARD_LAYOUT.flat();
    const enterKey = allKeys.find((k) => k.code === 'Enter');
    const escKey = allKeys.find((k) => k.code === 'Escape');
    const bkspKey = allKeys.find((k) => k.code === 'Backspace');
    const spaceKey = allKeys.find((k) => k.code === 'Space');

    expect(enterKey?.role).toBe('primary');
    expect(escKey?.role).toBe('accent');
    expect(bkspKey?.role).toBe('secondary');
    expect(spaceKey?.role).toBe('space');
  });
});

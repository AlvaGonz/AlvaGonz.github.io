import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCelestialSky, calculateSiderealAngle, projectCoordinate } from '../useCelestialSky';

describe('useCelestialSky', () => {
  it('calculates reproducible sidereal angle for a given date', () => {
    // Fixed date: Oct 26, 2026 12:00 UTC
    const testDate = new Date(Date.UTC(2026, 9, 26, 12, 0, 0));
    const angle = calculateSiderealAngle(testDate);
    expect(angle).toBeGreaterThan(0);
    expect(angle).toBeLessThan(360);
  });

  it('projects celestial coordinates into 2D canvas coordinates', () => {
    // Polaris at Dec ~89° should project close to the celestial pole (small radius)
    const polaris = projectCoordinate(37.9, 89.3, 0, 340);
    const polarisRadius = Math.sqrt(polaris.x * polaris.x + polaris.y * polaris.y);
    expect(polarisRadius).toBeLessThan(35);

    // Equatorial star at Dec ~0° should project significantly farther out
    const equatorStar = projectCoordinate(83.0, -0.3, 0, 340);
    const equatorRadius = Math.sqrt(equatorStar.x * equatorStar.x + equatorStar.y * equatorStar.y);
    expect(equatorRadius).toBeGreaterThan(150);
  });

  it('provides constellations with stars, lines, and today date formatting', () => {
    const testDate = new Date(Date.UTC(2026, 9, 26, 0, 0, 0));
    const { result } = renderHook(() => useCelestialSky(testDate));

    expect(result.current.todayFormatted).toContain('Oct 26');
    expect(result.current.constellations.length).toBeGreaterThanOrEqual(8);

    // Verify key constellations exist
    const names = result.current.constellations.map((c) => c.latinName);
    expect(names).toContain('Ursa Major');
    expect(names).toContain('Orion');
    expect(names).toContain('Cassiopeia');
    expect(names).toContain('Cygnus');

    // Check lines and stars are generated
    const orion = result.current.constellations.find((c) => c.latinName === 'Orion');
    expect(orion?.stars.length).toBeGreaterThan(0);
    expect(orion?.lines.length).toBeGreaterThan(0);
  });
});

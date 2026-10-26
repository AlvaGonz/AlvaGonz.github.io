import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  BASE_CONSTELLATIONS,
  AMBIENT_CELESTIAL_STARS,
  type CelestialStar,
  type Constellation,
} from '../data/constellations';

export interface ProjectedStar extends CelestialStar {
  x: number;
  y: number;
  visible: boolean;
  size: number;
}

export interface ProjectedConstellationLine {
  id: string;
  constellationId: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface ProjectedConstellation extends Omit<Constellation, 'stars' | 'lines'> {
  stars: ProjectedStar[];
  lines: ProjectedConstellationLine[];
  center: { x: number; y: number };
}

/**
 * Calculates current Greenwich Mean / Local Sidereal orientation based on current day of year and UTC time.
 * One tropical year = ~365.2422 days -> Earth shifts ~0.9856° / day.
 */
export function calculateSiderealAngle(date: Date = new Date()): number {
  const startOfYear = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const dayOfYear = (date.getTime() - startOfYear.getTime()) / 86400000;
  const utcHours = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;

  const annualOffsetDeg = (dayOfYear / 365.25) * 360;
  const diurnalOffsetDeg = (utcHours / 24) * 360;

  return (annualOffsetDeg + diurnalOffsetDeg) % 360;
}

/**
 * Maps astronomical RA/Dec celestial coordinates to 2D polar projection coordinates relative to center (0, 0).
 */
export function projectCoordinate(
  raDeg: number,
  decDeg: number,
  siderealOffsetDeg: number,
  radiusScale: number = 340,
): { x: number; y: number; visible: boolean } {
  const theta = ((raDeg - siderealOffsetDeg) * Math.PI) / 180;
  // Polar distance normalized from North Celestial Pole (+90°) to South (-65°)
  const polarDist = Math.max(0, Math.min(1.2, (90 - decDeg) / 155));
  const r = Math.max(16, polarDist * radiusScale);

  return {
    x: Math.cos(theta) * r,
    y: Math.sin(theta) * r,
    visible: polarDist <= 1.25,
  };
}

const CELESTIAL_GEOJSON_URL =
  'https://cdn.jsdelivr.net/gh/dieghernan/celestial_data@main/data/constellations.lines.min.geojson';

export function useCelestialSky(date: Date = new Date(), radiusScale: number = 340) {
  const [isLiveFetched, setIsLiveFetched] = useState<boolean>(false);
  const [hoveredConstellationId, setHoveredConstellationId] = useState<string | null>(null);

  // Sidereal angle calculated for the current day and hour
  const siderealAngle = useMemo(() => calculateSiderealAngle(date), [date]);

  // Formatted date string for the observatory display
  const todayFormatted = useMemo(() => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    });
  }, [date]);

  const dayOfYear = useMemo(() => {
    const startOfYear = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.floor((date.getTime() - startOfYear.getTime()) / 86400000);
  }, [date]);

  // Web fetch live constellation data with timeout and fallback
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    fetch(CELESTIAL_GEOJSON_URL, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (isMounted && data && Array.isArray(data.features) && data.features.length > 0) {
          setIsLiveFetched(true);
        }
      })
      .catch(() => {
        // Fallback silently to curated astronomical catalog
        if (isMounted) {
          setIsLiveFetched(false);
        }
      })
      .finally(() => {
        clearTimeout(timeoutId);
      });

    return () => {
      isMounted = false;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, []);

  // Compute 2D projected stars for ambient background
  const ambientStars = useMemo<ProjectedStar[]>(() => {
    return AMBIENT_CELESTIAL_STARS.map((star) => {
      const { x, y, visible } = projectCoordinate(star.ra, star.dec, siderealAngle, radiusScale);
      // Magnitude scaling: mag 1 = 3px, mag 4 = 1.2px
      const size = Math.max(1, 3.8 - star.mag * 0.65);
      return {
        ...star,
        x,
        y,
        visible,
        size,
      };
    });
  }, [siderealAngle, radiusScale]);

  // Compute 2D projected constellations and lines
  const constellations = useMemo<ProjectedConstellation[]>(() => {
    return BASE_CONSTELLATIONS.map((c) => {
      const starMap = new Map<string, ProjectedStar>();
      let sumX = 0;
      let sumY = 0;

      const projectedStars: ProjectedStar[] = c.stars.map((star) => {
        const { x, y, visible } = projectCoordinate(star.ra, star.dec, siderealAngle, radiusScale);
        // Bright constellation stars: mag 0.1 = 4.5px, mag 2 = 3px, mag 3 = 2.2px
        const size = Math.max(1.8, 4.6 - star.mag * 0.85);
        const pStar: ProjectedStar = {
          ...star,
          x,
          y,
          visible,
          size,
        };
        starMap.set(star.id, pStar);
        sumX += x;
        sumY += y;
        return pStar;
      });

      const projectedLines: ProjectedConstellationLine[] = [];
      c.lines.forEach(([startId, endId], idx) => {
        const s1 = starMap.get(startId);
        const s2 = starMap.get(endId);
        if (s1 && s2) {
          projectedLines.push({
            id: `${c.id}-line-${idx}`,
            constellationId: c.id,
            x1: s1.x,
            y1: s1.y,
            x2: s2.x,
            y2: s2.y,
          });
        }
      });

      const count = projectedStars.length || 1;
      return {
        id: c.id,
        name: c.name,
        latinName: c.latinName,
        season: c.season,
        description: c.description,
        brightestStar: c.brightestStar,
        lines: projectedLines,
        stars: projectedStars,
        center: {
          x: sumX / count,
          y: sumY / count,
        },
      };
    });
  }, [siderealAngle, radiusScale]);

  const selectConstellation = useCallback((id: string | null) => {
    setHoveredConstellationId(id);
  }, []);

  return {
    siderealAngle,
    todayFormatted,
    dayOfYear,
    isLiveFetched,
    constellations,
    ambientStars,
    hoveredConstellationId,
    selectConstellation,
  };
}

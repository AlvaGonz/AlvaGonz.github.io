import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useScrollProgress, computeStageFromScroll } from '../useScrollProgress';

describe('computeStageFromScroll', () => {
  it('should return 0 for progress < 0.25', () => {
    expect(computeStageFromScroll(0)).toBe(0);
    expect(computeStageFromScroll(0.24)).toBe(0);
  });

  it('should return 1 for progress >= 0.25 and < 0.5', () => {
    expect(computeStageFromScroll(0.25)).toBe(1);
    expect(computeStageFromScroll(0.49)).toBe(1);
  });

  it('should return 2 for progress >= 0.5 and < 0.75', () => {
    expect(computeStageFromScroll(0.5)).toBe(2);
    expect(computeStageFromScroll(0.74)).toBe(2);
  });

  it('should return 3 for progress >= 0.75', () => {
    expect(computeStageFromScroll(0.75)).toBe(3);
    expect(computeStageFromScroll(1)).toBe(3);
  });
});

describe('useScrollProgress', () => {
  beforeEach(() => {
    // Mock window.scrollY and document dimensions
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      value: 1000,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      value: 500,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with 0 progress', () => {
    const { result } = renderHook(() => useScrollProgress());
    expect(result.current).toBe(0);
  });

  it('should update progress on scroll', async () => {
    const { result } = renderHook(() => useScrollProgress());

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 250,
    });

    window.dispatchEvent(new Event('scroll'));

    await waitFor(() => {
      expect(result.current).toBeGreaterThan(0);
    });
  });

  it('should clamp progress between 0 and 1', async () => {
    const { result } = renderHook(() => useScrollProgress());

    // Simulate extreme scroll
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 10000,
    });

    window.dispatchEvent(new Event('scroll'));

    await waitFor(() => {
      expect(result.current).toBeLessThanOrEqual(1);
      expect(result.current).toBeGreaterThanOrEqual(0);
    });
  });
});

import { useState, useEffect, useCallback } from 'react';

type Side = 'curiosity' | 'formal';

export function useSide() {
  const [side, setSideState] = useState<Side>('formal');

  // Initialize
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlSide = urlParams.get('side') as Side | null;
    const storedSide = localStorage.getItem('portfolio-side') as Side | null;

    if (urlSide === 'curiosity' || urlSide === 'formal') {
      setSideState(urlSide);
    } else if (storedSide === 'curiosity' || storedSide === 'formal') {
      setSideState(storedSide);
    }
  }, []);

  const setSide = useCallback((newSide: Side) => {
    setSideState(newSide);
    const url = new URL(window.location.href);
    url.searchParams.set('side', newSide);
    window.history.replaceState({}, '', url);
    localStorage.setItem('portfolio-side', newSide);
  }, []);

  const toggleSide = useCallback(() => {
    setSide(side === 'curiosity' ? 'formal' : 'curiosity');
  }, [side, setSide]);

  return { side, setSide, toggleSide };
}


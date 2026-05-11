import { createContext, useState, useCallback, useContext, ReactNode, useEffect } from 'react';

export type Side = 'curiosity' | 'formal';

interface SideContextType {
  side: Side | null;
  setSide: (side: Side | null) => void;
  toggleSide: () => void;
}

const SideContext = createContext<SideContextType | undefined>(undefined);

// Helper to get initial state
const getInitialSide = (): Side | null => {
  if (typeof window === 'undefined') return null;

  // 1. Try URL param
  const urlParams = new URLSearchParams(window.location.search);
  const sideParam = urlParams.get('side')?.toLowerCase();
  if (sideParam === 'formal' || sideParam === 'curiosity') {
    return sideParam as Side;
  }

  // 2. Try localStorage
  const savedSide = localStorage.getItem('portfolio-side')?.toLowerCase();
  if (savedSide === 'formal' || savedSide === 'curiosity') {
    return savedSide as Side;
  }

  return null;
};

export function SideProvider({ children }: { children: ReactNode }) {
  // Use a safer initialization pattern
  const [side, setSideState] = useState<Side | null>(null);

  useEffect(() => {
    // Initialize on mount to avoid hydration/SSR issues and rule of hooks errors
    const initial = getInitialSide();
    if (initial) {
      setSideState(initial);
      document.documentElement.setAttribute('data-theme', initial);
    }
  }, []);

  useEffect(() => {
    if (side) {
      document.documentElement.setAttribute('data-theme', side);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [side]);

  const setSide = useCallback((newSide: Side | null) => {
    setSideState(newSide);
    const url = new URL(window.location.href);

    if (newSide) {
      url.searchParams.set('side', newSide);
      localStorage.setItem('portfolio-side', newSide);
    } else {
      url.searchParams.delete('side');
      localStorage.removeItem('portfolio-side');
    }

    window.history.replaceState({}, '', url);
  }, []);

  const toggleSide = useCallback(() => {
    setSideState((prev) => {
      const newSide = prev === 'curiosity' ? 'formal' : 'curiosity';
      const url = new URL(window.location.href);
      url.searchParams.set('side', newSide);
      window.history.replaceState({}, '', url);
      localStorage.setItem('portfolio-side', newSide);
      return newSide;
    });
  }, []);

  return (
    <SideContext.Provider value={{ side, setSide, toggleSide }}>{children}</SideContext.Provider>
  );
}

export function useSideContext() {
  const context = useContext(SideContext);
  if (context === undefined) {
    throw new Error('useSideContext must be used within a SideProvider');
  }
  return context;
}

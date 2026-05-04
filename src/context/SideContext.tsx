import { createContext, useState, useCallback, useContext, ReactNode } from 'react';

export type Side = 'curiosity' | 'formal';

interface SideContextType {
  side: Side | null;
  setSide: (side: Side | null) => void;
  toggleSide: () => void;
}

const SideContext = createContext<SideContextType | undefined>(undefined);

// Helper to get initial state synchronously
const getInitialSide = (): Side | null => {
  if (typeof window === 'undefined') return null;

  const urlParams = new URLSearchParams(window.location.search);
  const sideParam = urlParams.get('side'); // 'formal' | 'curiosity' | null

  if (sideParam === 'formal' || sideParam === 'curiosity') {
    return sideParam;
  }

  return null; // Default fallback to show selector
};

export function SideProvider({ children }: { children: ReactNode }) {
  const [side, setSideState] = useState<Side | null>(getInitialSide);

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

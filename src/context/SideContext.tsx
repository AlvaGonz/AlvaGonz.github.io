import { createContext, useState, useEffect, useCallback, useContext, ReactNode } from 'react';

export type Side = 'curiosity' | 'formal';

interface SideContextType {
  side: Side | null;
  setSide: (side: Side) => void;
  toggleSide: () => void;
}

const SideContext = createContext<SideContextType | undefined>(undefined);

export function SideProvider({ children }: { children: ReactNode }) {
  const [side, setSideState] = useState<Side | null>(null);

  // Initialize from URL or localStorage
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
    <SideContext.Provider value={{ side, setSide, toggleSide }}>
      {children}
    </SideContext.Provider>
  );
}

export function useSideContext() {
  const context = useContext(SideContext);
  if (context === undefined) {
    throw new Error('useSideContext must be used within a SideProvider');
  }
  return context;
}

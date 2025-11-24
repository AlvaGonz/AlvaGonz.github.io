import { useEffect } from 'react';
import { usePortfolioSide } from './usePortfolioSide';
import { Theme } from '@/lib/color-system';

export function useTheme() {
  const { side } = usePortfolioSide();
  // Default to formal if side is null or undefined
  const currentTheme: Theme = side === 'formal' || side === 'curiosity' ? side : 'formal';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  return { theme: currentTheme };
}

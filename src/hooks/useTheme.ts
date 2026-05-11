import { useEffect } from 'react';
import { usePortfolioSide } from '@/hooks/usePortfolioSide';

export function useTheme() {
  const { side } = usePortfolioSide();

  useEffect(() => {
    if (side) {
      document.documentElement.setAttribute('data-theme', side);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [side]);

  return { theme: side };
}

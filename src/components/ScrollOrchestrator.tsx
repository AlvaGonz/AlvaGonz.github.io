import { useEffect } from 'react';
import { useScrollProgress, computeStageFromScroll } from '../hooks/useScrollProgress';

export function ScrollOrchestrator(): null {
  const progress = useScrollProgress();
  const stage = computeStageFromScroll(progress);

  useEffect(() => {
    document.body.setAttribute('data-scroll-stage', String(stage));
    document.documentElement.style.setProperty('--scroll-progress', String(progress));
  }, [progress, stage]);

  return null;
}


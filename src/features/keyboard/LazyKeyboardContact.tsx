import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { Side } from '@/context/SideContext';

const KeyboardContact = lazy(() => import('./KeyboardContact'));

interface LazyKeyboardContactProps {
  side?: Side;
}

export function LazyKeyboardContact({ side }: LazyKeyboardContactProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[520px]">
      {visible ? (
        <Suspense
          fallback={
            <div className="h-[520px] animate-pulse rounded-3xl border border-white/10 bg-white/5" />
          }
        >
          <KeyboardContact side={side} />
        </Suspense>
      ) : null}
    </div>
  );
}

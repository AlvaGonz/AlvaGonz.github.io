import { lazy, Suspense, useEffect, useRef, useState } from 'react';

const KeyboardContact = lazy(() => import('./KeyboardContact'));

export function LazyKeyboardContact() {
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
        <Suspense fallback={<div className="h-[520px] animate-pulse rounded-xl bg-black/10" />}>
          <KeyboardContact />
        </Suspense>
      ) : null}
    </div>
  );
}

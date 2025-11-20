import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface SplitLayoutProps {
  creative: React.ReactNode;
  formal: React.ReactNode;
}

type Side = 'creative' | 'formal';

export function SplitLayout({ creative, formal }: SplitLayoutProps): JSX.Element {
  const [activeSide, setActiveSide] = useState<Side>('creative');

  // Initialize from URL or localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlSide = urlParams.get('side');
    const storedSide = localStorage.getItem('portfolio-side') as Side | null;

    if (urlSide === 'creative' || urlSide === 'formal') {
      setActiveSide(urlSide);
    } else if (storedSide === 'creative' || storedSide === 'formal') {
      setActiveSide(storedSide);
    }
  }, []);

  // Update URL and localStorage when side changes
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('side', activeSide);
    window.history.replaceState({}, '', url);
    localStorage.setItem('portfolio-side', activeSide);
  }, [activeSide]);

  const toggleSide = useCallback(() => {
    setActiveSide((prev) => (prev === 'creative' ? 'formal' : 'creative'));
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
      e.preventDefault();
      toggleSide();
    }
  }, [toggleSide]);

  return (
    <div className="pt-48 md:pt-56 min-h-screen" onKeyDown={handleKeyDown}>
      <div className="fixed top-20 right-4 z-50">
        <button
          onClick={toggleSide}
          className={clsx(
            'px-4 py-2 rounded-full font-medium transition-all duration-300',
            'focus:outline-none focus:ring-2 focus:ring-primary-caribbean-green focus:ring-offset-2 focus:ring-offset-primary-rich-black',
            activeSide === 'creative'
              ? 'bg-primary-caribbean-green text-primary-rich-black'
              : 'bg-primary-dark-green text-primary-anti-flash-white hover:bg-primary-bangladesh-green'
          )}
          aria-label={`Switch to ${activeSide === 'creative' ? 'formal' : 'creative'} view`}
        >
          {activeSide === 'creative' ? 'Formal' : 'Creative'}
        </button>
      </div>

      <div className="relative w-full min-h-[calc(100vh-12rem)]">
        <AnimatePresence mode="wait">
          {activeSide === 'creative' ? (
            <motion.div
              key="creative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {creative}
            </motion.div>
          ) : (
            <motion.div
              key="formal"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {formal}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


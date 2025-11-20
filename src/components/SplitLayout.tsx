import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { LandingSelector } from './LandingSelector';
import { BackgroundMusic } from './BackgroundMusic';

interface SplitLayoutProps {
  curiosity: React.ReactNode;
  formal: React.ReactNode;
}

type Side = 'curiosity' | 'formal';

export function SplitLayout({ curiosity, formal }: SplitLayoutProps): JSX.Element {
  const [activeSide, setActiveSide] = useState<Side | null>(null);

  // Initialize from URL or localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlSide = urlParams.get('side');
    // const storedSide = localStorage.getItem('portfolio-side') as Side | null;

    // Only auto-select if explicitly in URL or Storage AND we want to bypass landing (optional)
    // For now, let's respect the user's request to ALWAYS show selection unless URL forces it?
    // "Antes de que el usuario pueda pasar... debe haber una seccion inicial"
    // However, for UX, deep linking should work.
    
    if (urlSide === 'curiosity' || urlSide === 'formal') {
      setActiveSide(urlSide);
    } 
    // If we want to force selection every session, comment out the localStorage check below
    // else if (storedSide === 'curiosity' || storedSide === 'formal') {
    //   setActiveSide(storedSide);
    // }
  }, []);

  // Update URL and localStorage when side changes
  useEffect(() => {
    if (activeSide) {
      const url = new URL(window.location.href);
      url.searchParams.set('side', activeSide);
      window.history.replaceState({}, '', url);
      localStorage.setItem('portfolio-side', activeSide);
    }
  }, [activeSide]);

  const toggleSide = useCallback(() => {
    setActiveSide((prev) => (prev === 'curiosity' ? 'formal' : 'curiosity'));
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!activeSide) return;

    // Accessibility: Allow keyboard navigation but don't interfere with Tab
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      if (e.key === 'ArrowLeft' && activeSide === 'formal') {
        e.preventDefault();
        setActiveSide('curiosity');
      } else if (e.key === 'ArrowRight' && activeSide === 'curiosity') {
        e.preventDefault();
        setActiveSide('formal');
      }
    }
  }, [activeSide]);

  if (!activeSide) {
    return <LandingSelector onSelect={setActiveSide} />;
  }

  return (
    <div className="pt-24 md:pt-32 min-h-screen" onKeyDown={handleKeyDown}>
      <BackgroundMusic visible={activeSide === 'curiosity'} />
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleSide}
          className={clsx(
            'px-4 py-2 rounded-full font-medium transition-all duration-300 shadow-lg backdrop-blur-md border border-white/10',
            'focus:outline-none focus:ring-2 focus:ring-primary-caribbean-green focus:ring-offset-2 focus:ring-offset-primary-rich-black',
            activeSide === 'curiosity'
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-primary-dark-green text-primary-anti-flash-white hover:bg-primary-bangladesh-green'
          )}
          aria-label={`Switch to ${activeSide === 'curiosity' ? 'formal' : 'curiosity'} view`}
        >
          {activeSide === 'curiosity' ? 'Go Formal' : 'Go Curiosity'}
        </button>
      </div>

      <div className="relative w-full min-h-[calc(100vh-12rem)]">
        <AnimatePresence mode="wait">
          {activeSide === 'curiosity' ? (
            <motion.div
              key="curiosity"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {curiosity}
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

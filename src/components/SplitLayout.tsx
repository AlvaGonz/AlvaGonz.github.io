import { useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioSelector } from './PortfolioSelector';
import { usePortfolioSide } from '@/hooks/usePortfolioSide';
import { Navbar } from './layout/Navbar';
import { SpotifyNowPlaying } from './curiosity/SpotifyNowPlaying';

interface SplitLayoutProps {
  curiosity: React.ReactNode;
  formal: React.ReactNode;
}

export function SplitLayout({ curiosity, formal }: SplitLayoutProps): JSX.Element {
  const { side, setSide } = usePortfolioSide();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!side) return;

      // Accessibility: Allow keyboard navigation but don't interfere with Tab
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        if (e.key === 'ArrowLeft' && side === 'formal') {
          e.preventDefault();
          setSide('curiosity');
        } else if (e.key === 'ArrowRight' && side === 'curiosity') {
          e.preventDefault();
          setSide('formal');
        }
      }
    },
    [side, setSide],
  );

  // Scroll to top when switching views
  useEffect(() => {
    if (side) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [side]);

  if (!side) {
    return <PortfolioSelector onSelect={setSide} />;
  }

  return (
    <div className="min-h-screen" onKeyDown={handleKeyDown}>
      <Navbar />

      <div className="relative w-full min-h-screen pt-16">
        <AnimatePresence mode="wait">
          {side === 'curiosity' ? (
            <motion.div
              key="curiosity"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full"
            >
              {curiosity}
            </motion.div>
          ) : (
            <motion.div
              key="formal"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full"
            >
              {formal}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <SpotifyNowPlaying />
    </div>
  );
}

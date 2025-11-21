import { motion, useScroll, useTransform } from 'framer-motion';
import { useSide } from '@/hooks/useSide';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const { side } = useSide();
  
  // Only show on curiosity side or both? Usually nice on both.
  // But maybe different colors.
  
  // Map scroll progress to width
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  if (!side) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 z-50"
      style={{ 
        width, 
        background: side === 'curiosity' 
          ? 'linear-gradient(to right, var(--c-curiosity-primary), var(--c-curiosity-secondary))'
          : 'var(--c-primary-mountain-meadow)',
        transformOrigin: "0%"
      }}
    />
  );
}


import { motion, useScroll } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();

  const background = theme === 'curiosity' 
    ? 'linear-gradient(90deg, var(--c-curiosity-primary), var(--c-curiosity-secondary))'
    : 'var(--c-primary-mountain-meadow)';

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 origin-left z-[60]"
      style={{ scaleX: scrollYProgress, background }}
    />
  );
}

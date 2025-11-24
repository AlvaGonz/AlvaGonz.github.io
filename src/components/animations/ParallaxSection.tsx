import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  offset?: number; // How many pixels to move (positive = up, negative = down/faster)
  className?: string;
  direction?: 'y' | 'x';
}

export function ParallaxSection({
  children,
  offset = 50,
  className = '',
  direction = 'y',
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Map scroll progress (0 to 1) to transform (-offset to offset)
  const moveValue = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  const style = direction === 'y' ? { y: moveValue } : { x: moveValue };

  return (
    <motion.div ref={ref} style={style} className={className}>
      {children}
    </motion.div>
  );
}

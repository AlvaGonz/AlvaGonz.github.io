import { motion, useInView, UseInViewOptions } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { fadeInUp, slideInLeft, slideInRight, scaleIn, fadeIn } from '@/lib/animation-variants';

interface FadeInOnScrollProps {
  children: ReactNode;
  variant?: 'fadeUp' | 'slideLeft' | 'slideRight' | 'scale' | 'fade';
  delay?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

export function FadeInOnScroll({
  children,
  variant = 'fadeUp',
  delay = 0,
  className = '',
  once = true,
  threshold = 0.2,
}: FadeInOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold } as UseInViewOptions);

  const getVariant = () => {
    switch (variant) {
      case 'slideLeft':
        return slideInLeft;
      case 'slideRight':
        return slideInRight;
      case 'scale':
        return scaleIn;
      case 'fade':
        return fadeIn;
      default:
        return fadeInUp;
    }
  };

  const variants = getVariant();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration: 0.5,
        ...(variants?.visible &&
        typeof variants.visible === 'object' &&
        'transition' in variants.visible
          ? (variants.visible as { transition?: object }).transition
          : {}),
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

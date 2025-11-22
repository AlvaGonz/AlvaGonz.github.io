import { Variants } from 'framer-motion';

// Standard Fade Up (Used for text, cards)
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } // Custom easing
  },
  exit: { opacity: 0, y: 30 }
};

// Simple Fade (Used for backgrounds, images)
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { opacity: 0 }
};

// Slide In from Left (Used for timelines, sidebars)
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  exit: { opacity: 0, x: -50 }
};

// Slide In from Right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  exit: { opacity: 0, x: 50 }
};

// Scale Up (Used for badges, icons, buttons)
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  },
  exit: { opacity: 0, scale: 0.8 }
};

// Stagger Container (Parent for lists like Skills, Projects)
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Micro-interaction: Hover Scale
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: 'spring', stiffness: 400, damping: 17 }
};

// Micro-interaction: Hover Lift (Cards)
export const hoverLift = {
  whileHover: { y: -8, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)' },
  transition: { type: 'spring', stiffness: 300, damping: 20 }
};

import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

export function AnimatedBg() {
  const { theme } = useTheme();

  // Only animate on curiosity side
  if (theme !== 'curiosity') return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base Background */}
      <div className="absolute inset-0 bg-curiosity-bg" />

      {/* Animated Orbs */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-curiosity-primary/10 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-curiosity-secondary/10 blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Mesh Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-curiosity-secondary" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <motion.path
          d="M -100 200 Q 400 400 800 100 T 1600 300"
          fill="none"
          stroke="url(#gradient-line)"
          strokeWidth="2"
          initial={{ pathLength: 0, pathOffset: 0 }}
          animate={{ pathLength: 1, pathOffset: 1 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--c-curiosity-primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--c-curiosity-primary)" />
            <stop offset="100%" stopColor="var(--c-curiosity-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

import { motion } from 'framer-motion';

export function HeroIcon() {
  return (
    <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0 border-2 border-dashed border-curiosity-primary/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner counter-rotating ring */}
      <motion.div
        className="absolute inset-4 border-2 border-dotted border-curiosity-secondary/30 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Center Icon - Code Brackets & Pen */}
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-curiosity-primary relative z-10">
        <motion.path
          d="M7 8l-4 4 4 4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
        />
        <motion.path
          d="M17 8l4 4-4 4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", repeatDelay: 1, delay: 0.5 }}
        />
        <motion.path
          d="M14 4l-4 16"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-curiosity-secondary"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
        />
      </svg>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-curiosity-primary/20 blur-xl rounded-full animate-pulse" />
    </div>
  );
}

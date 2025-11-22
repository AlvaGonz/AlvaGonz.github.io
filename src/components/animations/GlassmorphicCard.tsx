import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { hoverLift } from '@/lib/animation-variants';

interface GlassmorphicCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassmorphicCard({ 
  children, 
  className = '',
  hoverEffect = true 
}: GlassmorphicCardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? hoverLift.whileHover : undefined}
      transition={hoverEffect ? hoverLift.transition : undefined}
      className={`
        relative overflow-hidden
        bg-white/5 backdrop-blur-md border border-white/10
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        rounded-xl
        ${className}
      `}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      }}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {children}
    </motion.div>
  );
}

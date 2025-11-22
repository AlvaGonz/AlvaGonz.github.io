import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeInUp, hoverLift } from '@/lib/animation-variants';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

export function AnimatedCard({ 
  children, 
  className = '', 
  delay = 0,
  onClick
}: AnimatedCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={hoverLift.whileHover}
      transition={{ delay }}
      className={`cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

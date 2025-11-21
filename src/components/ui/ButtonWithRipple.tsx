import { motion, AnimatePresence } from 'framer-motion';
import { useState, ReactNode, MouseEvent } from 'react';

interface ButtonWithRippleProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function ButtonWithRipple({ children, onClick, className = '', disabled }: ButtonWithRippleProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples([...ripples, { id, x, y }]);
    onClick?.();

    // Cleanup ripple
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden ${className}`}
      disabled={disabled}
    >
      <span className="relative z-10">{children}</span>
      
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full pointer-events-none"
            initial={{ width: 0, height: 0, left: ripple.x, top: ripple.y, opacity: 0.5 }}
            animate={{ 
              width: 500, 
              height: 500, 
              left: ripple.x - 250, 
              top: ripple.y - 250, 
              opacity: 0 
            }}
            transition={{ duration: 0.6 }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
}


import { motion } from 'framer-motion';

export function FloatingElements() {
  const shapes = [
    // Original 4
    { type: 'circle', x: '10%', y: '20%', size: 20, color: 'text-curiosity-primary', delay: 0 },
    { type: 'rect', x: '85%', y: '15%', size: 30, color: 'text-curiosity-secondary', delay: 1 },
    { type: 'triangle', x: '15%', y: '80%', size: 25, color: 'text-curiosity-accent', delay: 2 },
    { type: 'cross', x: '80%', y: '75%', size: 20, color: 'text-curiosity-primary', delay: 3 },

    // Added 22 more particles
    { type: 'circle', x: '5%', y: '45%', size: 18, color: 'text-curiosity-secondary', delay: 0.5 },
    { type: 'rect', x: '92%', y: '35%', size: 22, color: 'text-curiosity-accent', delay: 1.2 },
    { type: 'triangle', x: '25%', y: '10%', size: 24, color: 'text-curiosity-primary', delay: 2.1 },
    { type: 'cross', x: '70%', y: '50%', size: 19, color: 'text-curiosity-secondary', delay: 3.3 },
    { type: 'circle', x: '40%', y: '25%', size: 21, color: 'text-curiosity-accent', delay: 0.8 },
    { type: 'rect', x: '60%', y: '85%', size: 26, color: 'text-curiosity-primary', delay: 1.5 },
    { type: 'triangle', x: '8%', y: '60%', size: 23, color: 'text-curiosity-secondary', delay: 2.7 },
    { type: 'cross', x: '88%', y: '55%', size: 17, color: 'text-curiosity-accent', delay: 3.6 },
    { type: 'circle', x: '50%', y: '8%', size: 20, color: 'text-curiosity-primary', delay: 1.1 },
    { type: 'rect', x: '30%', y: '70%', size: 25, color: 'text-curiosity-secondary', delay: 2.2 },
    { type: 'triangle', x: '75%', y: '30%', size: 22, color: 'text-curiosity-accent', delay: 3.1 },
    { type: 'cross', x: '18%', y: '40%', size: 18, color: 'text-curiosity-primary', delay: 0.6 },
    { type: 'circle', x: '65%', y: '18%', size: 24, color: 'text-curiosity-secondary', delay: 1.8 },
    { type: 'rect', x: '12%', y: '92%', size: 21, color: 'text-curiosity-accent', delay: 2.5 },
    { type: 'triangle', x: '45%', y: '55%', size: 20, color: 'text-curiosity-primary', delay: 3.4 },
    { type: 'cross', x: '82%', y: '8%', size: 19, color: 'text-curiosity-secondary', delay: 0.9 },
    { type: 'circle', x: '35%', y: '88%', size: 23, color: 'text-curiosity-accent', delay: 1.6 },
    { type: 'rect', x: '55%', y: '42%', size: 22, color: 'text-curiosity-primary', delay: 2.8 },
    { type: 'triangle', x: '90%', y: '65%', size: 21, color: 'text-curiosity-secondary', delay: 3.5 },
    { type: 'cross', x: '22%', y: '28%', size: 18, color: 'text-curiosity-accent', delay: 1.3 },
    { type: 'circle', x: '68%', y: '72%', size: 20, color: 'text-curiosity-primary', delay: 2.3 },
    { type: 'rect', x: '3%', y: '12%', size: 24, color: 'text-curiosity-secondary', delay: 3.2 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.color} opacity-20`}
          style={{ left: shape.x, top: shape.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        >
          <Shape type={shape.type} size={shape.size} />
        </motion.div>
      ))}
    </div>
  );
}

function Shape({ type, size }: { type: string; size: number }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'currentColor',
  };

  switch (type) {
    case 'circle':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
    case 'rect':
      return (
        <svg {...props}>
          <rect x="2" y="2" width="20" height="20" rx="4" />
        </svg>
      );
    case 'triangle':
      return (
        <svg {...props}>
          <path d="M12 2L2 22h20L12 2z" />
        </svg>
      );
    case 'cross':
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
          <path d="M12 4v16M4 12h16" />
        </svg>
      );
    default:
      return null;
  }
}

import { motion } from 'framer-motion';

export function FloatingElements() {
  const shapes = [
    { type: 'circle', x: '10%', y: '20%', size: 20, color: 'text-curiosity-primary', delay: 0 },
    { type: 'rect', x: '85%', y: '15%', size: 30, color: 'text-curiosity-secondary', delay: 1 },
    { type: 'triangle', x: '15%', y: '80%', size: 25, color: 'text-curiosity-accent', delay: 2 },
    { type: 'cross', x: '80%', y: '75%', size: 20, color: 'text-curiosity-primary', delay: 3 },
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

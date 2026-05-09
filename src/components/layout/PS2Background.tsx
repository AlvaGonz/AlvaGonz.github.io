import { motion } from 'framer-motion';

export function PS2Background(): JSX.Element {
  // Alex Cristache Palette #MINDFULPALETTES No. 160
  // Palette Colors:
  // #D6D9D8 (Light Grey)
  // #C7CEE8 (Light Blue Grey)
  // #D0D34D (Lime Green)
  // #157954 (Forest Green)
  // #21263A (Deep Blue/Black)

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#1a1e2e]">
      {/* Deep Ambient Base using the darkest color from palette */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#21263A] to-[#0f111a]" />

      {/* Wave 1 - Deep & Slow (Forest Green to Deep Blue) */}
      <motion.div
        className="absolute -inset-[10%] w-[120%] h-[120%] opacity-60 mix-blend-normal"
        initial={{ x: '-2%' }}
        animate={{ x: '2%' }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <motion.path
            d="M0,400 C320,500 640,300 960,400 C1280,500 1440,400 1440,400 V800 H0 Z"
            fill="url(#grad1)"
            animate={{
              d: [
                'M0,400 C320,500 640,300 960,400 C1280,500 1440,400 1440,400 V800 H0 Z',
                'M0,400 C320,300 640,500 960,400 C1280,300 1440,400 1440,400 V800 H0 Z',
                'M0,400 C320,500 640,300 960,400 C1280,500 1440,400 1440,400 V800 H0 Z',
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#157954" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#21263A" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Wave 2 - Mid Speed (Lime to Forest Green) */}
      <motion.div
        className="absolute -inset-[10%] w-[120%] h-[120%] opacity-50 mix-blend-lighten"
        initial={{ x: '0%' }}
        animate={{ x: '-2%' }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <motion.path
            d="M0,500 C400,600 800,400 1200,500 L1440,550 V800 H0 Z"
            fill="url(#grad2)"
            animate={{
              d: [
                'M0,500 C400,600 800,400 1200,500 L1440,550 V800 H0 Z',
                'M0,500 C400,400 800,600 1200,500 L1440,450 V800 H0 Z',
                'M0,500 C400,600 800,400 1200,500 L1440,550 V800 H0 Z',
              ],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D0D34D" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#157954" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Wave 3 - Fast & Light (Light Blue/Grey to Lime) */}
      <motion.div
        className="absolute -inset-[10%] w-[120%] h-[120%] opacity-30 mix-blend-overlay"
        initial={{ y: '2%' }}
        animate={{ y: '-2%' }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <motion.path
            d="M0,300 C480,200 960,600 1440,300 V800 H0 Z"
            fill="url(#grad3)"
            animate={{
              d: [
                'M0,300 C480,200 960,600 1440,300 V800 H0 Z',
                'M0,300 C480,500 960,100 1440,300 V800 H0 Z',
                'M0,300 C480,200 960,600 1440,300 V800 H0 Z',
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <defs>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C7CEE8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#D0D34D" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating Particles (Palette accents) */}
      {[...Array(22)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-2xl"
          style={{
            width: Math.random() * 150 + 50,
            height: Math.random() * 150 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            // Alternate between Lime and Light Blue
            background: i % 2 === 0 ? '#D0D34D' : '#C7CEE8',
            opacity: 0.1,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20 + Math.random() * 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0f111a_90%)] pointer-events-none" />

      {/* Scanline Effect */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(transparent 50%, rgba(0,0,0,0.5) 50%)',
          backgroundSize: '4px 4px',
        }}
      />
    </div>
  );
}

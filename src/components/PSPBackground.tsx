import { motion } from 'framer-motion';

export function PSPBackground(): JSX.Element {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#051a15]">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#065f46]" />

      {/* Wave 1 - Slow & Deep (Dark Green) */}
      <motion.div
        className="absolute inset-0 opacity-40"
        initial={{ x: '-10%' }}
        animate={{ x: '10%' }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        <svg
          className="w-[120%] h-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,400 C320,600 640,200 960,400 C1280,600 1440,400 1440,400 V800 H0 Z"
            fill="url(#grad1)"
            animate={{
              d: [
                "M0,400 C320,600 640,200 960,400 C1280,600 1440,400 1440,400 V800 H0 Z",
                "M0,400 C320,200 640,600 960,400 C1280,200 1440,400 1440,400 V800 H0 Z",
                "M0,400 C320,600 640,200 960,400 C1280,600 1440,400 1440,400 V800 H0 Z",
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
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Wave 2 - Mid Speed & Offset */}
      <motion.div
        className="absolute inset-0 opacity-20 mix-blend-screen"
        initial={{ x: '0%' }}
        animate={{ x: '-5%' }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        <svg
          className="w-[110%] h-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,500 C400,700 800,300 1200,500 L1440,600 V800 H0 Z"
            fill="url(#grad2)"
            animate={{
              d: [
                "M0,500 C400,700 800,300 1200,500 L1440,600 V800 H0 Z",
                "M0,500 C400,300 800,700 1200,500 L1440,400 V800 H0 Z",
                "M0,500 C400,700 800,300 1200,500 L1440,600 V800 H0 Z",
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
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Wave 3 - Fast & High */}
      <motion.div
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        initial={{ y: '5%' }}
        animate={{ y: '-5%' }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,300 C480,200 960,600 1440,300 V800 H0 Z"
            fill="url(#grad3)"
            animate={{
              d: [
                "M0,300 C480,200 960,600 1440,300 V800 H0 Z",
                "M0,300 C480,500 960,100 1440,300 V800 H0 Z",
                "M0,300 C480,200 960,600 1440,300 V800 H0 Z",
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
              <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#064e3b" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      
      {/* Subtle Particles */}
      <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay" />
    </div>
  );
}


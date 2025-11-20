import { motion } from 'framer-motion';

export function CreativeView(): JSX.Element {
  return (
    <div className="min-h-screen p-8 md:p-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gradient-1-from via-gradient-2-from to-gradient-3-to bg-clip-text text-transparent mb-4">
            Creative Space
          </h2>
          <p className="text-xl text-secondary-pistachio">
            Where ideas come to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5].map((gradientNum) => (
            <motion.div
              key={gradientNum}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: gradientNum * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className={`
                h-64 rounded-2xl p-8
                bg-gradient-to-br
                from-[var(--c-gradient-${gradientNum}-from)]
                to-[var(--c-gradient-${gradientNum}-to)]
                shadow-scroll-modern
                backdrop-blur-sm
                border border-secondary-pistachio/20
                transition-all duration-300
              `}
            >
              <div className="text-primary-rich-black font-semibold text-lg">
                Gradient {gradientNum}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-gradient-3-from to-gradient-5-to">
            <p className="text-2xl font-medium text-primary-anti-flash-white">
              Explore • Create • Innovate
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


import { motion } from 'framer-motion';

interface LandingSelectorProps {
  onSelect: (side: 'curiosity' | 'formal') => void;
}

export function LandingSelector({ onSelect }: LandingSelectorProps): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-primary-rich-black relative overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary-mountain-meadow/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-curiosity-primary/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 z-10"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-primary-anti-flash-white mb-4">
          Select a Profile
        </h1>
        <p className="text-xl text-secondary-pistachio">
          Choose your preferred portfolio experience
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full z-10">
        {/* Formal Card */}
        <motion.button
          onClick={() => onSelect('formal')}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ y: -10, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-left relative group overflow-hidden rounded-3xl p-1 bg-[#0c1214] border border-white/5 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-bangladesh-green to-primary-mountain-meadow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative h-full bg-primary-dark-green rounded-[20px] p-8 md:p-12 flex flex-col justify-between z-10 transition-colors duration-300 group-hover:bg-primary-rich-black/90">
            <div>
              <div className="w-20 h-20 rounded-full bg-primary-rich-black border-2 border-primary-mountain-meadow mb-6 overflow-hidden">
                <img
                  src="/images/Sitting.png"
                  alt="Formal"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl font-bold text-primary-anti-flash-white mb-2">
                Formal
              </h2>
              <p className="text-primary-mountain-meadow font-medium mb-6">
                Professional & Clean
              </p>
              <p className="text-secondary-pistachio leading-relaxed">
                Minimalist design showcasing career achievements, skills, and professional timeline.
              </p>
            </div>
            <div className="mt-8 h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary-mountain-meadow"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.button>

        {/* Curiosity Card */}
        <motion.button
          onClick={() => onSelect('curiosity')}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ y: -10, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-left relative group overflow-hidden rounded-3xl p-1 bg-curiosity-bg border border-white/5 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-curiosity-primary to-curiosity-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative h-full bg-[#282e45] rounded-[20px] p-8 md:p-12 flex flex-col justify-between z-10 transition-colors duration-300 group-hover:bg-curiosity-bg/90">
            <div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-curiosity-primary to-curiosity-secondary mb-6 flex items-center justify-center text-3xl text-curiosity-bg shadow-[0_0_15px_rgba(208,211,77,0.4)]">
                ✨
              </div>
              <h2 className="text-3xl font-bold text-curiosity-text mb-2">
                Curiosity
              </h2>
              <p className="text-curiosity-primary font-medium mb-6">
                curios & Interactive
              </p>
              <p className="text-curiosity-text-secondary leading-relaxed">
                Vibrant, animated experience exploring curios coding, passions, and experiments.
              </p>
            </div>
            <div className="mt-8 h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-curiosity-primary to-curiosity-secondary"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.button>
      </div>

      <footer className="absolute bottom-8 text-center text-sm text-secondary-stone opacity-60">
        <p>© 2025 Adrian A. A. González</p>
      </footer>
    </div>
  );
}

import { motion } from 'framer-motion';

export function HeroIcon() {
  return (
    <motion.div 
      className="w-24 h-24 mx-auto bg-white/5 rounded-full flex items-center justify-center"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <span className="text-4xl">✨</span>
    </motion.div>
  );
}

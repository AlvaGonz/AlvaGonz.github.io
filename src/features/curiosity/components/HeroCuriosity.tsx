import { motion } from 'framer-motion';
import { profile } from '@/content/profile';
import { ParallaxSection } from '@/components/animations/ParallaxSection';
import { fadeInUp, staggerContainer } from '@/lib/animation-variants';

export function HeroCuriosity() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background Elements would go here (Phase 4) */}

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <ParallaxSection offset={-30} className="mb-8">
          <motion.div
            variants={fadeInUp}
            className="inline-block p-1 rounded-full bg-gradient-to-r from-Curiosity-primary to-Curiosity-secondary"
          >
            <img
              src={profile.avatar_Curious}
              alt={profile.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-Curiosity-bg object-cover"
            />
          </motion.div>
        </ParallaxSection>

        <ParallaxSection offset={-20}>
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold font-curiosity-display mb-4 bg-clip-text text-transparent bg-gradient-to-r from-Curiosity-primary via-Curiosity-highlight to-Curiosity-secondary"
          >
            Curious Developer
          </motion.h1>
        </ParallaxSection>

        <ParallaxSection offset={-10}>
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-Curiosity-text-secondary font-curiosity-body max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Crafting digital experiences with code, design, and a touch of magic. Exploring the
            intersection of functionality and aesthetics.
          </motion.p>
        </ParallaxSection>

        <motion.div variants={fadeInUp} className="flex justify-center gap-4">
          <a
            href="#about"
            className="px-8 py-3 rounded-full bg-Curiosity-primary text-Curiosity-bg font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(208,211,77,0.4)]"
          >
            Explore Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-Curiosity-text font-semibold hover:bg-white/20 transition-all"
          >
            Contact Me
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

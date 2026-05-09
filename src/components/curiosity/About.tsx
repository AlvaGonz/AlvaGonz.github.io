// Implemented from DESIGN.md — Curiosity scope
import { motion } from 'framer-motion';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';

const interests = [
  { label: 'Faith', icon: '✝️', color: 'bg-Curiosity-primary/10 text-Curiosity-primary border-Curiosity-primary/20' },
  { label: 'Gaming', icon: '🎮', color: 'bg-Curiosity-secondary/10 text-Curiosity-secondary border-Curiosity-secondary/20' },
  { label: 'Design', icon: '🎨', color: 'bg-Curiosity-accent/10 text-Curiosity-accent border-Curiosity-accent/20' },
  { label: 'Learning', icon: '📚', color: 'bg-Curiosity-highlight/10 text-Curiosity-highlight border-Curiosity-highlight/20' },
] as const;

export function About() {
  return (
    <section id="about" className="py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <FadeInOnScroll variant="slideRight">
          <div className="relative">
            {/* Ambient glow — Curiosity gradient system (Gradient 3: Periwinkle → Emerald) */}
            <motion.div
              className="absolute -inset-4 rounded-xl opacity-20 blur-xl bg-gradient-to-r from-Curiosity-secondary to-Curiosity-accent"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="relative bg-theme-surface p-8 rounded-3xl border border-theme-border shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold font-curiosity-display mb-6 text-Curiosity-primary">
                🌱 The Person Behind the Code
              </h2>
              <p className="text-lg text-theme-text-secondary font-curiosity-body leading-relaxed mb-4">
                Beyond the terminal and the commits, I'm a person driven by{' '}
                <strong className="text-Curiosity-primary">faith, community, and Curiosity</strong>. I
                believe that technology is best used when it serves a purpose greater than itself.
              </p>
              <p className="text-lg text-theme-text-secondary font-curiosity-body leading-relaxed mb-4">
                My world isn't just binary. It's colored by my love for{' '}
                <span className="text-Curiosity-primary">green</span> (obviously), the adrenaline of{' '}
                <span className="text-Curiosity-highlight">gaming</span>, and the discipline of{' '}
                <span className="text-Curiosity-accent">design</span>. Whether I'm managing multimedia for
                my church or tinkering with a new framework, I bring the same level of passion and
                dedication.
              </p>
              <p className="text-lg text-theme-text-secondary font-curiosity-body leading-relaxed">
                I'm motivated by the logic of code, but grounded by the values of my faith. For me,
                every bug fixed and every system built is a small act of stewardship.
              </p>
            </div>
          </div>
        </FadeInOnScroll>

        <div className="space-y-6">
          <FadeInOnScroll variant="slideLeft">
            <div className="grid grid-cols-2 gap-4">
              {interests.map((interest) => (
                <motion.div
                  key={interest.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className={`p-4 rounded-2xl border ${interest.color} flex flex-col items-center justify-center gap-2`}
                >
                  <span className="text-3xl">{interest.icon}</span>
                  <span className="font-bold font-curiosity-display text-sm">{interest.label}</span>
                </motion.div>
              ))}
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  );
}

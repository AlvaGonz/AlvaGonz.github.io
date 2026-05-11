// Implemented from DESIGN.md — Curiosity scope
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';

const hobbies = [
  {
    icon: '💪',
    label: 'Working Out',
    desc: 'Building discipline through fitness. Calisthenics, weightlifting, and nutrition.',
    borderClass: 'border-curiosity-highlight/30',
    interactive: false,
  },
  {
    icon: '🔨',
    label: 'Tech Tinkering',
    desc: "Building PCs, fixing hardware, and breaking things just to see how they work.",
    hint: '(Warning: Don\'t click too many times...)',
    borderClass: 'border-curiosity-primary/30',
    glowClass: 'bg-curiosity-primary/5 group-hover:bg-curiosity-primary/10',
    hintClass: 'text-curiosity-primary/70',
    interactive: true,
  },
  {
    icon: '📚',
    label: 'Reading',
    desc: 'Sci-fi, Theology, and Tech documentation. Always learning something new.',
    borderClass: 'border-curiosity-secondary/30',
    interactive: false,
  },
  {
    icon: '🎵',
    label: 'Music',
    desc: 'Appreciating everything from Lo-Fi beats to Worship music.',
    borderClass: 'border-curiosity-accent/30',
    interactive: false,
  },
] as const;

export function Hobbies() {
  const [showBSOD, setShowBSOD] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleTinkeringClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 5) {
      setShowBSOD(true);
      setClickCount(0);
      setTimeout(() => setShowBSOD(false), 4000);
    }
  };

  return (
    <section id="hobbies" className="py-12 md:py-20 relative">
      <AnimatePresence>
        {showBSOD && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#0078d7] text-white font-['Segoe_UI',_sans-serif] overflow-hidden flex items-center justify-center"
            style={{ cursor: 'none' }}
          >
            <div className="w-full max-w-4xl px-8 md:px-20">
              <div className="space-y-8">
                <div className="text-7xl md:text-9xl font-light mb-12">:(</div>
                <div className="space-y-6">
                  <h2 className="text-xl md:text-3xl font-curiosity-display font-light leading-relaxed max-w-2xl">
                    Your PC ran into a problem and needs to restart. We're just collecting some
                    error info, and then we'll restart for you.
                  </h2>
                  <p className="text-lg md:text-2xl font-curiosity-body font-light">0% complete</p>
                </div>
                <div className="mt-12 space-y-2 text-sm md:text-base font-light">
                  <p className="font-curiosity-body">Stop code: CRITICAL_PROCESS_DIED</p>
                  <p className="font-curiosity-body">What failed: user_patience.sys</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <FadeInOnScroll variant="fadeUp">
        <h2 className="text-3xl md:text-4xl font-curiosity-display mb-8 text-curiosity-primary border-b-2 border-curiosity-primary/30 pb-2 inline-block">
          Hobbies &amp; Interests
        </h2>
      </FadeInOnScroll>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hobbies.map((hobby, index) =>
          hobby.interactive ? (
            <FadeInOnScroll key={hobby.label} variant="scale" delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleTinkeringClick}
                className={`bg-[#282e45] p-6 rounded-2xl border ${hobby.borderClass} shadow-2xl cursor-pointer group h-full relative overflow-hidden`}
              >
                <div className={`absolute inset-0 transition-colors ${'glowClass' in hobby ? hobby.glowClass : ''}`} />
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{hobby.icon}</div>
                  <h3 className="text-xl font-curiosity-display text-curiosity-text mb-2">{hobby.label}</h3>
                  <p className="text-curiosity-text-secondary font-curiosity-body text-sm leading-relaxed">
                    {hobby.desc}
                    {'hint' in hobby && (
                      <>
                        <br />
                        <span className={`text-xs mt-2 block italic ${'hintClass' in hobby ? hobby.hintClass : ''}`}>
                          {hobby.hint}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </motion.div>
            </FadeInOnScroll>
          ) : (
            <FadeInOnScroll key={hobby.label} variant="scale" delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`bg-[#282e45] p-6 rounded-2xl border ${hobby.borderClass} shadow-2xl h-full`}
              >
                <div className="text-4xl mb-4">{hobby.icon}</div>
                <h3 className="text-xl font-curiosity-display text-curiosity-text mb-2">{hobby.label}</h3>
                <p className="text-curiosity-text-secondary font-curiosity-body text-sm leading-relaxed">{hobby.desc}</p>
              </motion.div>
            </FadeInOnScroll>
          ),
        )}
      </div>
    </section>
  );
}

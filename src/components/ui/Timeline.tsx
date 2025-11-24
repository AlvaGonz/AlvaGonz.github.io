import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FadeInOnScroll } from '../animations/FadeInOnScroll';
import { useTheme } from '@/hooks/useTheme';

export interface TimelinePhase {
  phase: string;
  items: string[];
}

export interface TimelineProps {
  phases: TimelinePhase[];
}

export function Timeline({ phases }: TimelineProps) {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Draw line based on scroll
  const scaleY = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div ref={ref} className="relative space-y-12 pl-4 sm:pl-8">
      {/* Vertical Drawing Line */}
      <motion.div
        style={{ scaleY, transformOrigin: 'top' }}
        className={`absolute left-4 sm:left-8 top-2 bottom-0 w-0.5 -translate-x-1/2 z-0 ${
          theme === 'curiosity'
            ? 'bg-gradient-to-b from-curiosity-primary via-curiosity-secondary to-transparent shadow-[0_0_15px_rgba(208,211,77,0.5)]'
            : 'bg-gradient-to-b from-theme-primary via-theme-primary/50 to-transparent'
        }`}
      />

      {phases.map((milestone, idx) => (
        <FadeInOnScroll
          key={idx}
          delay={idx * 0.2}
          variant="slideLeft"
          className="relative pl-8 sm:pl-12 group z-10"
        >
          {/* Timeline dot */}
          <div className="absolute left-0 top-6 sm:left-[-2rem] w-8 h-8 flex items-center justify-center -translate-x-1/2 sm:translate-x-0">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: idx * 0.2 + 0.3, type: 'spring' }}
              className={`w-4 h-4 rounded-full border-2 z-10 bg-theme-background ${
                theme === 'curiosity'
                  ? 'border-curiosity-primary shadow-[0_0_10px_rgba(208,211,77,0.8)]'
                  : 'border-theme-primary shadow-none'
              }`}
            />
          </div>

          {/* Content */}
          <div
            className={`
            rounded-xl p-6 border backdrop-blur-sm transition-all duration-300
            ${
              theme === 'curiosity'
                ? 'bg-white/5 border-white/10 hover:border-curiosity-primary/50 hover:bg-white/10 shadow-xl'
                : 'bg-theme-surface/50 border-theme-border hover:border-theme-primary/50'
            }
          `}
          >
            <h3
              className={`text-xl font-bold mb-4 flex items-center gap-3 flex-wrap ${
                theme === 'curiosity' ? 'text-white' : 'text-theme-text'
              }`}
            >
              <span
                className={`text-sm font-mono uppercase tracking-wider ${
                  theme === 'curiosity' ? 'text-curiosity-primary' : 'text-theme-primary/80'
                }`}
              >
                {theme === 'curiosity' ? `Chapter 0${idx + 1}` : `Phase ${idx + 1}`}
              </span>
              <span className="w-1 h-1 rounded-full bg-theme-text-secondary hidden sm:block" />
              <span className="w-full sm:w-auto">{milestone.phase}</span>
            </h3>
            <ul className="space-y-3">
              {milestone.items.map((item, i) => (
                <li key={i} className="text-theme-text-secondary flex items-start gap-2.5">
                  <span
                    className={`mt-1.5 text-xs ${
                      theme === 'curiosity' ? 'text-curiosity-secondary' : 'text-theme-primary'
                    }`}
                  >
                    {theme === 'curiosity' ? '✨' : '✦'}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeInOnScroll>
      ))}
    </div>
  );
}

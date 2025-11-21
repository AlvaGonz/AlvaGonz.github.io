import { motion } from 'framer-motion';
import { FadeInOnScroll } from '../animations/FadeInOnScroll';

export interface TimelinePhase {
  phase: string;
  items: string[];
}

export interface TimelineProps {
  phases: TimelinePhase[];
}

export function Timeline({ phases }: TimelineProps) {
  return (
    <div className="relative space-y-8 pl-4 sm:pl-8">
      {/* Vertical line */}
      <div className="absolute left-4 sm:left-8 top-2 bottom-2 w-px bg-gradient-to-b from-theme-primary via-theme-primary/50 to-transparent -translate-x-1/2" />

      {phases.map((milestone, idx) => (
        <FadeInOnScroll 
          key={idx}
          delay={idx * 0.2}
          variant="slideLeft"
          className="relative pl-8 sm:pl-12 group"
        >
          {/* Timeline dot */}
          <div className="absolute left-0 top-1.5 w-8 h-8 sm:w-16 sm:h-px flex items-center justify-end -translate-x-1/2 sm:translate-x-[-100%]">
             <div className="w-3 h-3 rounded-full bg-theme-background border-2 border-theme-primary shadow-[0_0_10px_rgba(var(--theme-primary),0.5)] group-hover:scale-125 transition-transform duration-300 z-10" />
          </div>

          {/* Content */}
          <div className="bg-theme-surface/50 rounded-xl p-6 border border-theme-border hover:border-theme-primary/50 transition-colors backdrop-blur-sm">
            <h3 className="text-xl font-bold text-theme-text mb-4 flex items-center gap-3 flex-wrap">
              <span className="text-theme-primary/80 text-sm font-mono uppercase tracking-wider">Phase {idx + 1}</span>
              <span className="w-1 h-1 rounded-full bg-theme-text-secondary hidden sm:block" />
              <span className="w-full sm:w-auto">{milestone.phase}</span>
            </h3>
            <ul className="space-y-3">
              {milestone.items.map((item, i) => (
                <li key={i} className="text-theme-text-secondary flex items-start gap-2.5">
                  <span className="text-theme-primary mt-1.5 text-xs">✦</span>
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

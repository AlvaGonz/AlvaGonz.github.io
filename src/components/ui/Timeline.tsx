import { motion } from 'framer-motion';

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
      <div className="absolute left-4 sm:left-8 top-2 bottom-2 w-px bg-gradient-to-b from-primary-mountain-meadow via-primary-mountain-meadow/50 to-transparent -translate-x-1/2" />

      {phases.map((milestone, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.2 }}
          className="relative pl-8 sm:pl-12 group"
        >
          {/* Timeline dot */}
          <div className="absolute left-0 top-1.5 w-8 h-8 sm:w-16 sm:h-px flex items-center justify-end -translate-x-1/2 sm:translate-x-[-100%]">
             <div className="w-3 h-3 rounded-full bg-primary-rich-black border-2 border-primary-mountain-meadow shadow-[0_0_10px_rgba(44,201,149,0.5)] group-hover:scale-125 transition-transform duration-300" />
          </div>

          {/* Content */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-primary-mountain-meadow/30 transition-colors">
            <h3 className="text-xl font-bold text-primary-anti-flash-white mb-4 flex items-center gap-3">
              <span className="text-primary-mountain-meadow/80 text-sm font-mono uppercase tracking-wider">Phase {idx + 1}</span>
              <span className="w-1 h-1 rounded-full bg-secondary-stone" />
              {milestone.phase}
            </h3>
            <ul className="space-y-3">
              {milestone.items.map((item, i) => (
                <li key={i} className="text-secondary-pistachio flex items-start gap-2.5">
                  <span className="text-primary-mountain-meadow mt-1.5 text-xs">✦</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}


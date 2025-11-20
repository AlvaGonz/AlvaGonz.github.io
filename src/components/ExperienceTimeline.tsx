import { motion } from 'framer-motion';
import { experience } from '../content/experience';

export function ExperienceTimeline(): JSX.Element {
  return (
    <div className="relative border-l-2 border-primary-mountain-meadow/30 ml-3 space-y-12 py-4">
      {experience.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2, duration: 0.5 }}
          className="relative pl-8"
        >
          {/* Dot */}
          <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary-rich-black border-2 border-primary-mountain-meadow shadow-[0_0_10px_rgba(44,201,149,0.5)]" />
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h3 className="text-xl font-bold text-primary-anti-flash-white">
              {item.role} <span className="text-primary-mountain-meadow">@ {item.company}</span>
            </h3>
            <span className="text-sm font-mono text-secondary-stone bg-primary-rich-black/50 px-2 py-1 rounded border border-white/5">
              {item.period}
            </span>
          </div>
          
          <p className="text-secondary-pistachio mb-4 max-w-2xl leading-relaxed">
            {item.description}
          </p>
          
          {item.skills && (
            <div className="flex flex-wrap gap-2">
              {item.skills.map((skill) => (
                <span 
                  key={skill} 
                  className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary-mountain-meadow/10 text-primary-mountain-meadow border border-primary-mountain-meadow/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}


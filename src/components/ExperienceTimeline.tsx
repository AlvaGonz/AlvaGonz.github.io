import { motion } from 'framer-motion';
import { experience } from '../content/experience';
import { FadeInOnScroll } from './animations/FadeInOnScroll';

export function ExperienceTimeline(): JSX.Element {
  return (
    <div className="relative border-l-2 border-theme-primary/30 ml-3 space-y-12 py-4">
      {experience.map((item, index) => (
        <FadeInOnScroll 
          key={item.id} 
          delay={index * 0.1} 
          variant="slideLeft"
          className="relative pl-8"
        >
          {/* Dot */}
          <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-theme-background border-2 border-theme-primary shadow-[0_0_10px_rgba(var(--theme-primary),0.5)] transition-colors" />
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h3 className="text-xl font-bold text-theme-text">
              {item.role} <span className="text-theme-primary">@ {item.company}</span>
            </h3>
            <span className="text-sm font-mono text-theme-text-secondary bg-theme-surface/50 px-2 py-1 rounded border border-theme-border">
              {item.period}
            </span>
          </div>
          
          <p className="text-theme-text-secondary mb-4 max-w-2xl leading-relaxed">
            {item.description}
          </p>
          
          {item.skills && (
            <div className="flex flex-wrap gap-2">
              {item.skills.map((skill) => (
                <span 
                  key={skill} 
                  className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-theme-primary/10 text-theme-primary border border-theme-primary/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </FadeInOnScroll>
      ))}
    </div>
  );
}

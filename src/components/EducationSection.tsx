import { motion } from 'framer-motion';
import { education } from '../content/education';

export function EducationSection(): JSX.Element {
  return (
    <div className="space-y-8">
      {/* Education */}
      <div>
        <div className="space-y-8 border-l-2 border-primary-mountain-meadow/20 ml-3 py-2">
          {education.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8"
            >
              <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-primary-mountain-meadow" />
              <div className="bg-primary-rich-black/40 p-6 rounded-xl border border-white/5 hover:border-primary-mountain-meadow/30 transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <div>
                    <h4 className="text-xl font-bold text-primary-anti-flash-white">{item.school}</h4>
                    <p className="text-lg text-secondary-pistachio">{item.degree}</p>
                  </div>
                  <span className="text-sm font-mono text-secondary-stone mt-2 md:mt-0 bg-white/5 px-3 py-1 rounded-full">
                    {item.period}
                  </span>
                </div>
                {item.skills && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.skills.map(skill => (
                      <span key={skill} className="text-xs px-2 py-1 rounded bg-primary-dark-green text-primary-mountain-meadow border border-primary-mountain-meadow/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

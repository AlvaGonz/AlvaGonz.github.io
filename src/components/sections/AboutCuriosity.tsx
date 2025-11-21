import { motion } from 'framer-motion';
import { profile } from '@/content/profile';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';

export function AboutCuriosity() {
  return (
    <section id="about" className="py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <FadeInOnScroll variant="slideRight">
          <div className="relative">
            <motion.div 
              className="absolute -inset-4 bg-gradient-to-r from-curiosity-primary to-curiosity-secondary rounded-xl opacity-20 blur-xl"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <div className="relative bg-theme-surface p-8 rounded-xl border border-theme-border shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-curiosity-primary">
                Who am I?
              </h2>
              <p className="text-lg text-theme-text-secondary leading-relaxed mb-4">
                {profile.about}
              </p>
              <p className="text-lg text-theme-text-secondary leading-relaxed">
                Beyond the syntax and logic, I'm driven by the "why" and "how" of digital creation. 
                I believe that the best software feels like magic—effortless, intuitive, and alive.
              </p>
            </div>
          </div>
        </FadeInOnScroll>

        <div className="space-y-6">
          {[
            { title: "Design", width: "90%", color: "bg-curiosity-primary" },
            { title: "Development", width: "95%", color: "bg-curiosity-secondary" },
            { title: "Strategy", width: "85%", color: "bg-curiosity-accent" }
          ].map((item, i) => (
            <FadeInOnScroll key={item.title} delay={i * 0.2} variant="slideLeft">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-theme-text">{item.title}</span>
                  <span className="text-theme-text-secondary">{item.width}</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${item.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: item.width }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
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
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <div className="relative bg-theme-surface p-8 rounded-xl border border-theme-border shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-curiosity-primary">
                🌌 The Explorer
              </h2>
              <p className="text-lg text-theme-text-secondary leading-relaxed mb-4">
                I'm a Software Engineering student on a quest through the digital frontier. I
                started in Frontend—building interfaces, crafting experiences—but lately, I've been
                drawn to the mysteries of Backend Architecture and System Design. There's something
                magnetic about the hidden machinery that powers everything we see.
              </p>
              <p className="text-lg text-theme-text-secondary leading-relaxed mb-4">
                My curiosity doesn't stop there. I'm actively exploring the realms of QA Automation
                (because breaking things systematically is an art), Data Analysis (patterns hidden
                in chaos are irresistible), and Cybersecurity (understanding vulnerabilities is
                understanding power).
              </p>
              <p className="text-lg text-theme-text-secondary leading-relaxed mb-4">
                <span className="text-curiosity-accent font-bold">Here's the truth:</span> I believe
                we're living through a revolution. AI isn't replacing developers—it's transforming
                us into something more. We're becoming orchestrators, architects of digital
                workforces. I don't just write code anymore; I <em>conduct</em> it. I delegate to AI
                agents, design systems at scale, and build solutions that would've taken teams to
                accomplish.
              </p>
              <p className="text-lg text-theme-text-secondary leading-relaxed">
                This isn't just the future—it's <strong>now</strong>. And I'm here for every second
                of it. 🚀✨
              </p>
            </div>
          </div>
        </FadeInOnScroll>

        <div className="space-y-6">
          {[
            { title: 'Backend Systems', width: '88%', color: 'bg-curiosity-primary' },
            { title: 'Frontend Craft', width: '92%', color: 'bg-curiosity-secondary' },
            { title: 'AI Orchestration', width: '85%', color: 'bg-curiosity-accent' },
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

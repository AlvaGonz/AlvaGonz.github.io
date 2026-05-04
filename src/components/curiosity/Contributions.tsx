import { motion } from 'framer-motion';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';

export function Contributions() {
    return (
        <section id="contributions" className="py-12 md:py-20">
            <FadeInOnScroll variant="fadeUp">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-curiosity-accent border-b-2 border-curiosity-accent/30 pb-2 inline-block">
                    Contributions
                </h2>
            </FadeInOnScroll>

            <div className="grid md:grid-cols-3 gap-6">
                {[
                    {
                        title: 'Church Media Team',
                        role: 'Lead Technician',
                        desc: 'Leading the multimedia ministry, training volunteers, and managing technical infrastructure for weekly services.',
                        icon: '⛪'
                    },
                    {
                        title: 'Community Workshops',
                        role: 'Mentor',
                        desc: 'Teaching basic computer skills and digital literacy to empower local community members.',
                        icon: '🤝'
                    },
                    {
                        title: 'Open Source',
                        role: 'Contributor',
                        desc: 'Sharing code and learning from the global developer community. Building tools that help others.',
                        icon: '🌐'
                    }
                ].map((item, i) => (
                    <FadeInOnScroll key={item.title} delay={i * 0.1} variant="fadeUp">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-theme-surface p-6 rounded-xl border border-theme-border hover:border-curiosity-accent/50 transition-colors h-full"
                        >
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h3 className="text-xl font-bold text-theme-text mb-2">{item.title}</h3>
                            <span className="inline-block px-2 py-1 rounded bg-curiosity-accent/10 text-curiosity-accent text-xs font-bold mb-3">
                                {item.role}
                            </span>
                            <p className="text-theme-text-secondary text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    </FadeInOnScroll>
                ))}
            </div>
        </section>
    );
}

import { motion } from 'framer-motion';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';

export function About() {
    return (
        <section id="about" className="py-12 md:py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <FadeInOnScroll variant="slideRight">
                    <div className="relative">
                        <motion.div
                            className="absolute -inset-4 bg-gradient-to-r from-green-400 to-emerald-600 rounded-xl opacity-20 blur-xl"
                            animate={{
                                scale: [1, 1.05, 1],
                                opacity: [0.2, 0.3, 0.2],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                        <div className="relative bg-theme-surface p-8 rounded-xl border border-theme-border shadow-xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-mountain-meadow">
                                🌱 The Person Behind the Code
                            </h2>
                            <p className="text-lg text-theme-text-secondary leading-relaxed mb-4">
                                Beyond the terminal and the commits, I'm a person driven by <strong className="text-theme-primary">faith, community, and curiosity</strong>.
                                I believe that technology is best used when it serves a purpose greater than itself.
                            </p>
                            <p className="text-lg text-theme-text-secondary leading-relaxed mb-4">
                                My world isn't just binary. It's colored by my love for <span className="text-green-400">green</span> (obviously),
                                the adrenaline of <span className="text-orange-400">gaming</span>, and the discipline of <span className="text-purple-400">design</span>.
                                Whether I'm managing multimedia for my church or tinkering with a new framework, I bring the same level of passion and dedication.
                            </p>
                            <p className="text-lg text-theme-text-secondary leading-relaxed">
                                I'm motivated by the logic of code, but grounded by the values of my faith.
                                For me, every bug fixed and every system built is a small act of stewardship.
                            </p>
                        </div>
                    </div>
                </FadeInOnScroll>

                <div className="space-y-6">
                    <FadeInOnScroll variant="slideLeft">
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'Faith', icon: '✝️', color: 'bg-yellow-500/10 text-yellow-500' },
                                { label: 'Gaming', icon: '🎮', color: 'bg-red-500/10 text-red-500' },
                                { label: 'Design', icon: '🎨', color: 'bg-purple-500/10 text-purple-500' },
                                { label: 'Learning', icon: '📚', color: 'bg-blue-500/10 text-blue-500' },
                            ].map((interest) => (
                                <motion.div
                                    key={interest.label}
                                    whileHover={{ scale: 1.05 }}
                                    className={`p-4 rounded-xl border border-white/5 ${interest.color} flex flex-col items-center justify-center gap-2`}
                                >
                                    <span className="text-3xl">{interest.icon}</span>
                                    <span className="font-bold">{interest.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </FadeInOnScroll>
                </div>
            </div>
        </section>
    );
}

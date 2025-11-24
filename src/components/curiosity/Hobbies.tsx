import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';

export function Hobbies() {
    const [showBSOD, setShowBSOD] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    const handleTinkeringClick = () => {
        const newCount = clickCount + 1;
        setClickCount(newCount);

        if (newCount >= 5) {
            setShowBSOD(true);
            setClickCount(0);
            setTimeout(() => setShowBSOD(false), 4000);
        }
    };

    return (
        <section id="hobbies" className="py-12 md:py-20 relative">
            <AnimatePresence>
                {showBSOD && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-[#0078d7] text-white font-['Segoe_UI',_sans-serif] overflow-hidden flex items-center justify-center"
                        style={{ cursor: 'none' }}
                    >
                        <div className="w-full max-w-4xl px-8 md:px-20">
                            <div className="space-y-8">
                                <div className="text-7xl md:text-9xl font-light mb-12">:(</div>
                                <div className="space-y-6">
                                    <h2 className="text-xl md:text-3xl font-light leading-relaxed max-w-2xl">
                                        Your PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for you.
                                    </h2>
                                    <p className="text-lg md:text-2xl font-light">0% complete</p>
                                </div>
                                <div className="mt-12 space-y-2 text-sm md:text-base font-light">
                                    <p>Stop code: CRITICAL_PROCESS_DIED</p>
                                    <p>What failed: user_patience.sys</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <FadeInOnScroll variant="fadeUp">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-green-500 border-b-2 border-green-500/30 pb-2 inline-block">
                    Hobbies & Interests
                </h2>
            </FadeInOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Working Out Card */}
                <FadeInOnScroll variant="scale" delay={0.1}>
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-[#0c1214] p-6 rounded-xl border border-red-500/30 shadow-xl h-full"
                    >
                        <div className="text-4xl mb-4">💪</div>
                        <h3 className="text-xl font-bold text-white mb-2">Working Out</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Building discipline through fitness. Calisthenics, weightlifting, and nutrition.
                        </p>
                    </motion.div>
                </FadeInOnScroll>

                {/* Tech Tinkering Card (Interactive) */}
                <FadeInOnScroll variant="scale" delay={0.2}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleTinkeringClick}
                        className="bg-[#0c1214] p-6 rounded-xl border border-green-500/30 shadow-xl cursor-pointer group h-full relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 transition-colors" />
                        <div className="relative z-10">
                            <div className="text-4xl mb-4">🔨</div>
                            <h3 className="text-xl font-bold text-white mb-2">Tech Tinkering</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Building PCs, fixing hardware, and breaking things just to see how they work.
                                <br />
                                <span className="text-xs text-green-500/70 mt-2 block italic">
                                    (Warning: Don't click too many times...)
                                </span>
                            </p>
                        </div>
                    </motion.div>
                </FadeInOnScroll>

                {/* Reading Card */}
                <FadeInOnScroll variant="scale" delay={0.3}>
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-[#0c1214] p-6 rounded-xl border border-blue-500/30 shadow-xl h-full"
                    >
                        <div className="text-4xl mb-4">📚</div>
                        <h3 className="text-xl font-bold text-white mb-2">Reading</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Sci-fi, Theology, and Tech documentation. Always learning something new.
                        </p>
                    </motion.div>
                </FadeInOnScroll>

                {/* Music Card */}
                <FadeInOnScroll variant="scale" delay={0.4}>
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-[#0c1214] p-6 rounded-xl border border-purple-500/30 shadow-xl h-full"
                    >
                        <div className="text-4xl mb-4">🎵</div>
                        <h3 className="text-xl font-bold text-white mb-2">Music</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Appreciating everything from Lo-Fi beats to Worship music.
                        </p>
                    </motion.div>
                </FadeInOnScroll>
            </div>
        </section>
    );
}

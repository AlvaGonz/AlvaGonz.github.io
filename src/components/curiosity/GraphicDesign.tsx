import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';

export function GraphicDesign() {
    return (
        <section id="graphic-design" className="py-12 md:py-20">
            <FadeInOnScroll variant="fadeUp">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-curiosity-primary border-b-2 border-curiosity-secondary/30 pb-2 inline-block">
                    Graphic Design
                </h2>
            </FadeInOnScroll>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <FadeInOnScroll variant="scale">
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-500" />
                        <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                            <img
                                src="/images/hipters.png"
                                alt="Hipsters Community Event Design"
                                loading="lazy"
                                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <p className="text-white font-medium">Community Event Branding</p>
                            </div>
                        </div>
                    </div>
                </FadeInOnScroll>

                <FadeInOnScroll variant="slideLeft">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-theme-text">Visual Storytelling</h3>
                        <p className="text-lg text-theme-text-secondary leading-relaxed">
                            Design is more than just making things look good—it's about communication.
                            My work in graphic design focuses on creating impactful visuals for community events,
                            church gatherings, and brand identity.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-2xl">🎨</span>
                                <div>
                                    <h4 className="font-bold text-theme-text">Tools of Choice</h4>
                                    <p className="text-theme-text-secondary">Figma, Canva, Adobe Creative Suite</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-2xl">✨</span>
                                <div>
                                    <h4 className="font-bold text-theme-text">Focus</h4>
                                    <p className="text-theme-text-secondary">Event Flyers, Social Media Assets, Video Creation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeInOnScroll>
            </div>
        </section>
    );
}

import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';

export function MultimediaManagement() {
    return (
        <section id="multimedia" className="py-12 md:py-20">
            <FadeInOnScroll variant="fadeUp">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-curiosity-secondary border-b-2 border-curiosity-primary/30 pb-2 inline-block">
                    Multimedia Management
                </h2>
            </FadeInOnScroll>

            <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                <FadeInOnScroll variant="slideRight" className="order-2 md:order-1">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-theme-text">Production & Direction</h3>
                        <p className="text-lg text-theme-text-secondary leading-relaxed">
                            Orchestrating audio, video, and live streams is where technical precision meets creative flow.
                            I manage multimedia production for large-scale church services and community projects,
                            ensuring seamless delivery of content.
                        </p>

                        <ul className="space-y-3">
                            {[
                                'Live Stream Architecture & Management',
                                'Video Editing & Post-Production',
                                'Audio Mixing & Sound Engineering',
                                'Team Coordination for Live Events'
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-theme-text-secondary">
                                    <span className="text-curiosity-secondary">▶</span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {['Premiere Pro', 'DaVinci Resolve', 'OBS Studio', 'Audition'].map((tool) => (
                                <span key={tool} className="px-3 py-1 rounded-full bg-curiosity-secondary/10 text-curiosity-secondary text-sm font-medium border border-curiosity-secondary/20">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                </FadeInOnScroll>

                <FadeInOnScroll variant="scale" className="order-1 md:order-2">
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-500" />
                        <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-black/50 aspect-video flex items-center justify-center">
                            {/* Placeholder for video content or another image */}
                            <div className="text-center p-8">
                                <span className="text-6xl mb-4 block">🎬</span>
                                <p className="text-white/80 font-medium">Live Production Workflow</p>
                            </div>
                        </div>
                    </div>
                </FadeInOnScroll>
            </div>
        </section>
    );
}

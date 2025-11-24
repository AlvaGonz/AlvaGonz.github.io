import type { Profile } from '../../content/types';
import { FadeInOnScroll } from '../animations/FadeInOnScroll';

interface ContactCuriosityProps {
    profile: Profile;
}

export function ContactCuriosity({ profile }: ContactCuriosityProps): JSX.Element {
    return (
        <section id="contact" className="py-12 md:py-20">
            <FadeInOnScroll variant="fadeUp">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-curiosity-primary border-b-2 border-curiosity-secondary/30 pb-2 inline-block">
                    Let's Connect! 🚀
                </h2>
            </FadeInOnScroll>

            <FadeInOnScroll variant="fadeUp" delay={0.2}>
                <p className="text-xl text-curiosity-text-secondary mb-8 max-w-2xl">
                    Got a cool project idea? Want to chat about tech, games, or anything in between?
                    Hit me up through any of these channels!
                </p>
            </FadeInOnScroll>

            <FadeInOnScroll variant="scale" delay={0.3}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
                    {/* LinkedIn */}
                    <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden rounded-2xl bg-[#0c1214] border border-blue-500/30 p-6 hover:border-blue-500/60 transition-all duration-300 hover:scale-105"
                        aria-label="LinkedIn profile"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10 flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                                <img
                                    src="https://skillicons.dev/icons?i=linkedin"
                                    alt="LinkedIn"
                                    className="w-10 h-10 group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <span className="text-white font-bold text-lg">LinkedIn</span>
                            <span className="text-gray-400 text-sm">Let's network</span>
                        </div>
                    </a>

                    {/* GitHub */}
                    <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden rounded-2xl bg-[#0c1214] border border-purple-500/30 p-6 hover:border-purple-500/60 transition-all duration-300 hover:scale-105"
                        aria-label="GitHub profile"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10 flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                                <img
                                    src="https://skillicons.dev/icons?i=github"
                                    alt="GitHub"
                                    className="w-10 h-10 bg-white rounded-full group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <span className="text-white font-bold text-lg">GitHub</span>
                            <span className="text-gray-400 text-sm">Check my code</span>
                        </div>
                    </a>

                    {/* Email */}
                    {profile.email && (
                        <a
                            href={`mailto:${profile.email}`}
                            className="group relative overflow-hidden rounded-2xl bg-[#0c1214] border border-red-500/30 p-6 hover:border-red-500/60 transition-all duration-300 hover:scale-105"
                            aria-label="Send email"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 flex flex-col items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                                    <img
                                        src="https://skillicons.dev/icons?i=gmail"
                                        alt="Email"
                                        className="w-10 h-10 group-hover:scale-110 transition-transform"
                                    />
                                </div>
                                <span className="text-white font-bold text-lg">Email</span>
                                <span className="text-gray-400 text-sm">Drop a message</span>
                            </div>
                        </a>
                    )}
                </div>
            </FadeInOnScroll>
        </section>
    );
}

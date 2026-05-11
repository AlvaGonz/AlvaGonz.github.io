// Implemented from DESIGN.md — Curiosity scope
import type { Profile } from '@/content/types';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';

interface ContactCuriosityProps {
  profile: Profile;
}

const socialCards = [
  {
    key: 'linkedin' as const,
    label: 'LinkedIn',
    subtext: "Let's network",
    icon: 'https://skillicons.dev/icons?i=linkedin',
    iconClass: '',
    borderClass: 'border-curiosity-secondary/30 hover:border-curiosity-secondary/60',
    bgClass: 'from-curiosity-secondary/10',
    avatarBgClass: 'bg-curiosity-secondary/20 group-hover:bg-curiosity-secondary/30',
  },
  {
    key: 'github' as const,
    label: 'GitHub',
    subtext: 'Check my code',
    icon: 'https://skillicons.dev/icons?i=github',
    iconClass: 'bg-white rounded-full',
    borderClass: 'border-curiosity-primary/30 hover:border-curiosity-primary/60',
    bgClass: 'from-curiosity-primary/10',
    avatarBgClass: 'bg-curiosity-primary/20 group-hover:bg-curiosity-primary/30',
  },
  {
    key: 'instagram' as const,
    label: 'Instagram',
    subtext: 'Follow me',
    icon: 'https://skillicons.dev/icons?i=instagram',
    iconClass: '',
    borderClass: 'border-curiosity-accent/30 hover:border-curiosity-accent/60',
    bgClass: 'from-curiosity-accent/10',
    avatarBgClass: 'bg-curiosity-accent/20 group-hover:bg-curiosity-accent/30',
    optional: true,
  },
];

export function ContactCuriosity({ profile }: ContactCuriosityProps): JSX.Element {
  const getHref = (key: string): string => {
    if (key === 'email') return `mailto:${profile.email}`;
    return (profile as unknown as Record<string, string>)[key] ?? '#';
  };

  return (
    <section id="contact" className="py-12 md:py-20">
      <FadeInOnScroll variant="fadeUp">
        <h2 className="text-3xl md:text-4xl font-curiosity-display mb-8 text-curiosity-primary border-b-2 border-curiosity-secondary/30 pb-2 inline-block">
          Let's Connect! 🚀
        </h2>
      </FadeInOnScroll>

      <FadeInOnScroll variant="fadeUp" delay={0.2}>
        <p className="text-xl text-curiosity-text-secondary font-curiosity-body mb-8 max-w-2xl">
          Got a cool project idea? Want to chat about tech, games, or anything in between? Hit me up
          through any of these channels!
        </p>
      </FadeInOnScroll>

      <FadeInOnScroll variant="scale" delay={0.3}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl">
          {socialCards.map((card) => {
            if (card.optional && !profile[card.key as keyof Profile]) return null;
            return (
              <a
                key={card.key}
                href={getHref(card.key)}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-2xl bg-[#282e45] border ${card.borderClass} p-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(208,211,77,0.15)]`}
                aria-label={`${card.label} profile`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.bgClass} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className={`w-16 h-16 rounded-full ${card.avatarBgClass} flex items-center justify-center transition-colors`}>
                    <img
                      src={card.icon}
                      alt={card.label}
                      className={`w-10 h-10 group-hover:scale-110 transition-transform ${card.iconClass}`}
                    />
                  </div>
                  <span className="text-curiosity-text font-curiosity-display text-sm uppercase tracking-widest">{card.label}</span>
                  <span className="text-curiosity-text-secondary text-sm">{card.subtext}</span>
                </div>
              </a>
            );
          })}

          {/* Email — always rendered if present */}
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="group relative overflow-hidden rounded-2xl bg-[#282e45] border border-curiosity-highlight/30 hover:border-curiosity-highlight/60 p-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(208,211,77,0.15)]"
              aria-label="Send email"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-curiosity-highlight/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-curiosity-highlight/20 group-hover:bg-curiosity-highlight/30 flex items-center justify-center transition-colors">
                  <img
                    src="https://skillicons.dev/icons?i=gmail"
                    alt="Email"
                    className="w-10 h-10 group-hover:scale-110 transition-transform"
                  />
                </div>
                <span className="text-curiosity-text font-curiosity-display text-sm uppercase tracking-widest">Email</span>
                <span className="text-curiosity-text-secondary text-sm">Drop a message</span>
              </div>
            </a>
          )}
        </div>
      </FadeInOnScroll>
    </section>
  );
}

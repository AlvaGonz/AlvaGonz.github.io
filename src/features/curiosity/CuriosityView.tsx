// Implemented from DESIGN.md — Curiosity scope
import { About } from '@/features/curiosity/components/About';
import { GraphicDesign } from '@/features/curiosity/components/GraphicDesign';
import { MultimediaManagement } from '@/features/curiosity/components/MultimediaManagement';
import { Contributions } from '@/features/curiosity/components/Contributions';
import { GamingShowcase } from '@/features/curiosity/components/GamingShowcase';
import { NFSWidget } from '@/features/curiosity/components/NFSWidget';
import { Hobbies } from '@/features/curiosity/components/Hobbies';
import { DailyVerse } from '@/features/formal/components/DailyVerse';
import { ContactCuriosity } from '@/features/curiosity/components/ContactCuriosity';
import { AnimatedBg } from '@/components/svg/AnimatedBg';
import { FloatingElements } from '@/components/svg/FloatingElements';
import { HeroCuriosity } from '@/features/curiosity/components/HeroCuriosity';
import { DominicanFlagIcon } from '@/components/icons/FlagIcons';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';
import { DuolingoFireWidget } from '@/features/duolingo/components/DuolingoFireWidget';
import { profile } from '@/content/profile';
import { LanguageMindMap } from '@/features/curiosity/components/LanguageMindMap';
import { ProfessionalVault } from '@/features/curiosity/components/ProfessionalVault';

export function CuriosityView(): JSX.Element {
  return (
    <div className="min-h-screen p-0 md:p-0 relative overflow-hidden">
      {/* Dynamic SVG Background */}
      <AnimatedBg />

      {/* Floating Decorative Elements */}
      <FloatingElements />

      <div id="bmw-sound-player" className="hidden" />

      <div className="relative z-10">
        {/* Hero Section */}
        <HeroCuriosity />

        <div className="max-w-7xl mx-auto px-8 space-y-24 pb-24">
          {/* About Section */}
          <About />

          {/* Gaming Section */}
          <section id="gaming">
            <FadeInOnScroll variant="fadeUp">
              <h2 className="text-3xl md:text-4xl font-curiosity-display mb-8 text-curiosity-primary border-b-2 border-curiosity-secondary/30 pb-2 inline-block">
                Gaming
              </h2>
            </FadeInOnScroll>
            <div className="space-y-12">
              <NFSWidget />
              <GamingShowcase />
            </div>
          </section>

          {/* Learning Section */}
          <section id="learning" className="space-y-8">
            <FadeInOnScroll variant="fadeUp">
              <h2 className="text-3xl md:text-4xl font-curiosity-display mb-8 text-curiosity-secondary border-b-2 border-curiosity-primary/30 pb-2 inline-block">
                Learning
              </h2>
            </FadeInOnScroll>
            <FadeInOnScroll variant="fadeUp">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Spanish — Gradient 4: Lime → Night Blue border per DESIGN.md */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-curiosity-primary to-curiosity-highlight p-1 shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="bg-curiosity-bg h-full w-full rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                      <span className="text-9xl">ñ</span>
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <DominicanFlagIcon size={36} className="rounded-sm shadow-sm" />
                          <h3 className="text-2xl font-curiosity-display text-curiosity-text">
                            Spanish
                          </h3>
                        </div>
                        <p className="text-curiosity-text-secondary font-curiosity-body">
                          My mother tongue. The language of my thoughts, passion, and culture.
                        </p>
                      </div>
                      <div className="mt-6">
                        <div className="inline-block px-4 py-2 rounded-full bg-curiosity-primary/20 text-curiosity-primary font-bold border border-curiosity-primary/30">
                          Native Speaker
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* English - Duolingo Style */}
                <DuolingoFireWidget />
              </div>
            </FadeInOnScroll>
          </section>

          {/* Code Universe Section */}
          <section id="code-universe" className="space-y-8">
            <FadeInOnScroll variant="fadeUp">
              <h2 className="text-3xl md:text-4xl font-curiosity-display mb-8 text-curiosity-primary border-b-2 border-curiosity-secondary/30 pb-2 inline-block">
                Code Universe
              </h2>
            </FadeInOnScroll>
            <FadeInOnScroll variant="scale">
              <LanguageMindMap />
            </FadeInOnScroll>
          </section>

          {/* Professional Vault (Integrated Formal Sections) */}
          <ProfessionalVault />

          {/* Graphic Design Section */}
          <GraphicDesign />

          {/* Multimedia Section */}
          <MultimediaManagement />

          {/* Hobbies Section */}
          <Hobbies />

          {/* Contributions Section */}
          <Contributions />

          {/* Contact Section */}
          <ContactCuriosity profile={profile} />

          {/* Daily Verse */}
          <DailyVerse />
        </div>
      </div>
    </div>
  );
}

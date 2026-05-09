// Implemented from DESIGN.md — Curiosity scope
import { About } from './Curiosity/About';
import { GraphicDesign } from './Curiosity/GraphicDesign';
import { MultimediaManagement } from './Curiosity/MultimediaManagement';
import { Contributions } from './Curiosity/Contributions';
import { GamingShowcase } from './Curiosity/GamingShowcase';
import { NFSWidget } from './Curiosity/NFSWidget';
import { Hobbies } from './Curiosity/Hobbies';
import { Roadmap } from './sections/Roadmap';
import { DailyVerse } from './formal/DailyVerse';
import { ContactCuriosity } from './Curiosity/ContactCuriosity';
import { AnimatedBg } from './svg/AnimatedBg';
import { FloatingElements } from './svg/FloatingElements';
import { HeroCuriosity } from './sections/HeroCuriosity';
import { FadeInOnScroll } from './animations/FadeInOnScroll';
import { DuolingoFireWidget } from '../features/duolingo/components/DuolingoFireWidget';
import { profile } from '../content/profile';
import { LanguageMindMap } from './Curiosity/LanguageMindMap';

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
              <h2 className="text-3xl md:text-4xl font-bold font-curiosity-display mb-8 text-Curiosity-primary border-b-2 border-Curiosity-secondary/30 pb-2 inline-block">
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
              <h2 className="text-3xl md:text-4xl font-bold font-curiosity-display mb-8 text-Curiosity-secondary border-b-2 border-Curiosity-primary/30 pb-2 inline-block">
                Learning
              </h2>
            </FadeInOnScroll>
            <FadeInOnScroll variant="fadeUp">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Spanish — Gradient 4: Lime → Night Blue border per DESIGN.md */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-Curiosity-primary to-Curiosity-highlight p-1 shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="bg-Curiosity-bg h-full w-full rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                      <span className="text-9xl">ñ</span>
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-4xl">🇩🇴</span>
                          <h3 className="text-2xl font-bold font-curiosity-display text-Curiosity-text">Spanish</h3>
                        </div>
                        <p className="text-Curiosity-text-secondary font-curiosity-body">
                          My mother tongue. The language of my thoughts, passion, and culture.
                        </p>
                      </div>
                      <div className="mt-6">
                        <div className="inline-block px-4 py-2 rounded-full bg-Curiosity-primary/20 text-Curiosity-primary font-bold border border-Curiosity-primary/30">
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
              <h2 className="text-3xl md:text-4xl font-bold font-curiosity-display mb-8 text-Curiosity-primary border-b-2 border-Curiosity-secondary/30 pb-2 inline-block">
                Code Universe
              </h2>
            </FadeInOnScroll>
            <FadeInOnScroll variant="scale">
              <LanguageMindMap />
            </FadeInOnScroll>
          </section>

          {/* Graphic Design Section */}
          <GraphicDesign />

          {/* Multimedia Section */}
          <MultimediaManagement />

          {/* Hobbies Section */}
          <Hobbies />

          {/* Contributions Section */}
          <Contributions />

          {/* Roadmap Section */}
          <Roadmap variant="Curiosity" />

          {/* Contact Section */}
          <ContactCuriosity profile={profile} />

          {/* Daily Verse */}
          <DailyVerse />
        </div>
      </div>
    </div>
  );
}

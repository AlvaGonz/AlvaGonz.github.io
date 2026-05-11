// Implemented from DESIGN.md — Curiosity scope
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';

const toolsList = [
  { icon: '🎨', title: 'Tools of Choice', desc: 'Figma, Canva, Adobe Creative Suite' },
  { icon: '✨', title: 'Focus', desc: 'Event Flyers, Social Media Assets, Video Creation' },
] as const;

export function GraphicDesign() {
  return (
    <section id="graphic-design" className="py-12 md:py-20">
      <FadeInOnScroll variant="fadeUp">
        {/* Section header uses Gradient 2 (Periwinkle → Lime) as per DESIGN.md */}
        <h2 className="text-3xl md:text-4xl font-curiosity-display mb-8 text-curiosity-primary border-b-2 border-curiosity-secondary/30 pb-2 inline-block">
          Graphic Design
        </h2>
      </FadeInOnScroll>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <FadeInOnScroll variant="scale">
          <div className="relative group">
            {/* Ambient glow — Gradient 2: Periwinkle → Lime from DESIGN.md */}
            <div className="absolute -inset-2 bg-gradient-to-r from-curiosity-secondary to-curiosity-primary rounded-xl opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative overflow-hidden rounded-2xl border border-theme-border shadow-2xl">
              <img
                src="/images/hipters.png"
                alt="Hipsters Community Event Design"
                loading="lazy"
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-curiosity-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-curiosity-text font-curiosity-body font-medium">Demasiado Hipster ¿No?</p>
              </div>
            </div>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll variant="slideLeft">
          <div className="space-y-6">
            <h3 className="text-2xl font-curiosity-display text-theme-text">Visual Storytelling</h3>
            <p className="text-lg text-theme-text-secondary font-curiosity-body leading-relaxed">
              Design is more than just making things look good—it's about communication. My work in
              graphic design focuses on creating impactful visuals for community events, church
              gatherings, and brand identity.
            </p>

            <div className="space-y-4">
              {toolsList.map((item) => (
                <div key={item.title} className="flex items-center gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-curiosity-display text-theme-text">{item.title}</h4>
                    <p className="text-theme-text-secondary font-curiosity-body">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}

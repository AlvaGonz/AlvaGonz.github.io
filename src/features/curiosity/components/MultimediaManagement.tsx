import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';
import { Clapperboard, Play } from 'lucide-react';

const skills = [
  'Live Stream Architecture & Management',
  'Video Editing & Post-Production',
  'Audio Mixing & Sound Engineering',
  'Team Coordination for Live Events',
];

const tools = ['Premiere Pro', 'DaVinci Resolve', 'OBS Studio', 'Audition'];

export function MultimediaManagement() {
  return (
    <section id="multimedia" className="py-12 md:py-20">
      <FadeInOnScroll variant="fadeUp">
        <h2 className="text-3xl md:text-4xl font-curiosity-display mb-8 text-curiosity-secondary border-b-2 border-curiosity-primary/30 pb-2 inline-block">
          Multimedia Management
        </h2>
      </FadeInOnScroll>

      <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
        <FadeInOnScroll variant="slideRight" className="order-2 md:order-1">
          <div className="space-y-6">
            <h3 className="text-2xl font-curiosity-display text-theme-text">
              Production &amp; Direction
            </h3>
            <p className="text-lg text-theme-text-secondary font-curiosity-body leading-relaxed">
              Orchestrating audio, video, and live streams is where technical precision meets
              creative flow. I manage multimedia production for large-scale church services and
              community projects, ensuring seamless delivery of content.
            </p>

            <ul className="space-y-3">
              {skills.map((item) => (
                <li key={item} className="flex items-center gap-3 text-theme-text-secondary">
                  <Play className="w-4 h-4 text-curiosity-secondary" fill="currentColor" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mt-4">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 rounded-full bg-curiosity-secondary/10 text-curiosity-secondary text-sm font-medium border border-curiosity-secondary/20"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll variant="scale" className="order-1 md:order-2">
          <div className="relative group">
            {/* Gradient 3: Periwinkle → Emerald from DESIGN.md */}
            <div className="absolute -inset-2 bg-gradient-to-r from-curiosity-secondary to-curiosity-accent rounded-xl opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative overflow-hidden rounded-xl border border-theme-border shadow-2xl bg-curiosity-bg/80 aspect-video flex items-center justify-center">
              <div className="text-center p-8">
                <Clapperboard className="w-16 h-16 mb-4 mx-auto text-curiosity-secondary" />
                <p className="text-curiosity-text-secondary font-curiosity-body font-medium">
                  Live Production Workflow
                </p>
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}

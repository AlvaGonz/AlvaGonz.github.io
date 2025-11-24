import type { Skill } from '../content/types';
import { motion } from 'framer-motion';
import { staggerContainer, scaleIn } from '@/lib/animation-variants';
import { FadeInOnScroll } from './animations/FadeInOnScroll';

interface SkillPillsProps {
  skills: Skill[];
  animate?: boolean;
}

const categoryColors: Record<Skill['category'], string> = {
  // Using theme-compatible opacities/colors where possible, or keeping distinct identity
  language: 'bg-theme-surface border-theme-primary/30 text-theme-text',
  framework: 'bg-theme-primary/10 border-theme-primary text-theme-primary',
  tool: 'bg-theme-secondary/20 border-theme-secondary text-theme-text-secondary',
  database: 'bg-theme-accent/10 border-theme-accent text-theme-accent',
};

export function SkillPills({ skills, animate = true }: SkillPillsProps): JSX.Element {
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<Skill['category'], Skill[]>,
  );

  const Container = animate ? motion.div : 'div';
  const Item = animate ? motion.span : 'span';

  return (
    <div className="space-y-8">
      {(Object.keys(groupedSkills) as Skill['category'][]).map((category, catIndex) => (
        <FadeInOnScroll key={category} delay={catIndex * 0.1} variant="fadeUp">
          <div className="relative">
            <h3 className="text-xl font-bold text-theme-primary mb-4 capitalize flex items-center gap-2">
              {category}
              <span className="h-px flex-1 bg-theme-border" />
            </h3>

            <Container
              className="flex flex-wrap gap-3"
              variants={animate ? staggerContainer : undefined}
              initial={animate ? 'hidden' : undefined}
              whileInView={animate ? 'visible' : undefined}
              viewport={animate ? { once: true } : undefined}
            >
              {groupedSkills[category].map((skill) => (
                <Item
                  key={skill.name}
                  variants={animate ? scaleIn : undefined}
                  whileHover={animate ? { scale: 1.05, y: -2 } : undefined}
                  className={`pl-2 pr-4 py-2 rounded-full text-sm font-medium ${categoryColors[category]} transition-all flex items-center gap-2 border shadow-sm hover:shadow-md`}
                >
                  {skill.iconId && (
                    <img
                      src={`https://skillicons.dev/icons?i=${skill.iconId}`}
                      alt=""
                      className="w-5 h-5 rounded-sm opacity-90"
                      loading="lazy"
                    />
                  )}
                  {skill.name}
                </Item>
              ))}
            </Container>
          </div>
        </FadeInOnScroll>
      ))}
    </div>
  );
}

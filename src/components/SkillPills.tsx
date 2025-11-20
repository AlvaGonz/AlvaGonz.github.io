import type { Skill } from '../content/types';

interface SkillPillsProps {
  skills: Skill[];
}

const categoryColors: Record<Skill['category'], string> = {
  language: 'bg-primary-bangladesh-green text-primary-anti-flash-white',
  framework: 'bg-primary-mountain-meadow text-primary-rich-black',
  tool: 'bg-secondary-mint text-primary-rich-black',
  database: 'bg-secondary-frog text-primary-anti-flash-white',
};

export function SkillPills({ skills }: SkillPillsProps): JSX.Element {
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<Skill['category'], Skill[]>
  );

  return (
    <div className="space-y-6">
      {(Object.keys(groupedSkills) as Skill['category'][]).map((category) => (
        <div key={category}>
          <h3 className="text-xl font-semibold text-primary-mountain-meadow mb-3 capitalize">
            {category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {groupedSkills[category].map((skill) => (
              <span
                key={skill.name}
                className={`px-4 py-2 rounded-full text-sm font-medium ${categoryColors[category]} transition-transform hover:scale-110`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


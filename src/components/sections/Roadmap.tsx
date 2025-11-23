import { Timeline, TimelinePhase } from '@/components/ui/Timeline';

export interface RoadmapProps {
  variant: 'formal' | 'curiosity';
}

const roadmapData: Record<'formal' | 'curiosity', TimelinePhase[]> = {
  formal: [
    {
      phase: 'Past (2023-2024)',
      items: [
        'Frontend expertise with React',
        'Design systems mastery',
        'Web performance optimization',
      ],
    },
    {
      phase: 'Present (2024-2025)',
      items: [
        'Full-Stack development',
        'Backend patterns & architecture',
        'System design focus',
      ],
    },
    {
      phase: 'Future (2025-2026)',
      items: [
        'Backend specialization (Q4 2025)',
        'QA/Security certification (Q1 2026)',
        'Data engineering project (Q2 2026)',
      ],
    },
  ],
  curiosity: [
    {
      phase: 'Chapter 1: The Canvas',
      items: [
        'Discovered the beauty of design',
        'React as my curios paintbrush',
        'Building interfaces with intention',
      ],
    },
    {
      phase: 'Chapter 2: The Logic',
      items: [
        'Found elegance in algorithms',
        'Backend\'s hidden complexity',
        'Systems thinking breakthrough',
      ],
    },
    {
      phase: 'Chapter 3: The Convergence',
      items: [
        'Bridging creativity and logic',
        'Exploring new frontiers',
        'Wherever curiosity leads',
      ],
    },
  ],
};

export function Roadmap({ variant = 'formal' }: RoadmapProps) {
  const phases = roadmapData[variant];
  const title = variant === 'formal' ? 'My Roadmap' : 'The Journey';

  return (
    <section id="roadmap" className="space-y-8">
      <h2 className="text-4xl font-bold font-axiforma text-primary-anti-flash-white">{title}</h2>
      <Timeline phases={phases} />
    </section>
  );
}


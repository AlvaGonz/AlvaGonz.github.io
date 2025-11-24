import { motion } from 'framer-motion';
import type { Project } from '../content/types';
import { usePortfolioSide } from '@/hooks/usePortfolioSide';
import { GlassmorphicCard } from './animations/GlassmorphicCard';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps): JSX.Element {
  const { side } = usePortfolioSide();
  const isCuriosity = side === 'curiosity';

  const updatedAt = project.updatedAt;
  const daysAgo = updatedAt
    ? Math.floor((Date.now() - new Date(updatedAt).getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const timeText =
    daysAgo === null
      ? null
      : daysAgo === 0
        ? 'today'
        : daysAgo === 1
          ? 'yesterday'
          : daysAgo < 30
            ? `${daysAgo}d ago`
            : daysAgo < 365
              ? `${Math.floor(daysAgo / 30)}mo ago`
              : `${Math.floor(daysAgo / 365)}y ago`;

  const content = (
    <>
      <div className="flex items-start justify-between mb-3">
        <h3
          className="text-xl font-semibold text-theme-text line-clamp-1 group-hover:text-theme-primary transition-colors"
          title={project.name}
        >
          {project.name}
        </h3>
        {project.language && (
          <span
            className="text-xs px-2 py-1 rounded-full shrink-0 ml-2 backdrop-blur-sm"
            style={{
              backgroundColor: isCuriosity
                ? `${project.language.color}30`
                : `${project.language.color}20`,
              color: project.language.color,
              border: `1px solid ${project.language.color}40`,
            }}
          >
            {project.language.name}
          </span>
        )}
      </div>

      <p className="text-theme-text-secondary mb-6 line-clamp-2 flex-grow">
        {project.description || 'No description available.'}
      </p>

      <div className="flex items-center justify-between text-sm pt-4 border-t border-theme-border/50">
        <div className="flex gap-4 text-theme-text-secondary">
          <span className="flex items-center gap-1.5" title="Stars">
            <span className="text-yellow-500">⭐</span> {project.stars}
          </span>
          <span className="flex items-center gap-1.5" title="Forks">
            <span className="text-blue-400">🍴</span> {project.forks}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {timeText && (
            <span className="text-xs text-theme-text-secondary/60 hidden sm:inline-block">
              {timeText}
            </span>
          )}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-theme-primary hover:text-theme-accent transition-colors font-medium flex items-center gap-1"
          >
            Code <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </>
  );

  if (isCuriosity) {
    return (
      <GlassmorphicCard className="p-6 h-full flex flex-col group">{content}</GlassmorphicCard>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-theme-surface rounded-xl p-6 border border-theme-border hover:border-theme-primary transition-all duration-300 shadow-scroll-modern h-full flex flex-col group"
    >
      {content}
    </motion.div>
  );
}

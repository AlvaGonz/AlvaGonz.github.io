import { motion } from 'framer-motion';
import type { Project } from '../content/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps): JSX.Element {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-primary-dark-green rounded-xl p-6 border border-secondary-pine hover:border-primary-mountain-meadow transition-all duration-300 shadow-scroll-modern"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-primary-anti-flash-white">
          {project.name}
        </h3>
        {project.language && (
          <span
            className="text-xs px-2 py-1 rounded-full"
            style={{
              backgroundColor: `${project.language.color}20`,
              color: project.language.color,
            }}
          >
            {project.language.name}
          </span>
        )}
      </div>
      <p className="text-secondary-pistachio mb-4 line-clamp-3">
        {project.description || 'No description available.'}
      </p>
      <div className="flex items-center justify-between text-sm text-secondary-stone">
        <div className="flex gap-4">
          <span>⭐ {project.stars}</span>
          <span>🍴 {project.forks}</span>
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-mountain-meadow hover:text-primary-caribbean-green transition-colors font-medium"
        >
          View →
        </a>
      </div>
    </motion.div>
  );
}


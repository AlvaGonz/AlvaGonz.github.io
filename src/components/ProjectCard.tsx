import { motion } from 'framer-motion';
import type { Project } from '../content/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps): JSX.Element {
  // If we have GitHub API data (implied by presence of numeric ID in real API response, 
  // though here we use our existing type which matches well enough. 
  // We might want to add `updatedAt` to the type or just accept it if we extend the type locally).
  
  // Note: The current Project type in src/content/types.ts doesn't have updatedAt.
  // We'll assume it might be passed in extended object or ignore for now to keep type safety pure 
  // until we update the type definition. 
  // Actually, let's check if we can safely access it.
  
  const updatedAt = (project as any).updatedAt as string | undefined;

  const daysAgo = updatedAt
    ? Math.floor((Date.now() - new Date(updatedAt).getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const timeText =
    daysAgo === null ? null :
    daysAgo === 0 ? 'today' :
    daysAgo === 1 ? 'yesterday' :
    daysAgo < 30 ? `${daysAgo}d ago` :
    daysAgo < 365 ? `${Math.floor(daysAgo / 30)}mo ago` :
    `${Math.floor(daysAgo / 365)}y ago`;

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-primary-dark-green rounded-xl p-6 border border-secondary-pine hover:border-primary-mountain-meadow transition-all duration-300 shadow-scroll-modern h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-primary-anti-flash-white line-clamp-1" title={project.name}>
          {project.name}
        </h3>
        {project.language && (
          <span
            className="text-xs px-2 py-1 rounded-full shrink-0 ml-2"
            style={{
              backgroundColor: `${project.language.color}20`,
              color: project.language.color,
              border: `1px solid ${project.language.color}40`
            }}
          >
            {project.language.name}
          </span>
        )}
      </div>
      
      <p className="text-secondary-pistachio mb-6 line-clamp-2 flex-grow">
        {project.description || 'No description available.'}
      </p>
      
      <div className="flex items-center justify-between text-sm pt-4 border-t border-white/5">
        <div className="flex gap-4 text-secondary-stone">
          <span className="flex items-center gap-1.5" title="Stars">
            <span className="text-yellow-500">⭐</span> {project.stars}
          </span>
          <span className="flex items-center gap-1.5" title="Forks">
            <span className="text-blue-400">🍴</span> {project.forks}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          {timeText && (
            <span className="text-xs text-secondary-stone/60 hidden sm:inline-block">
              {timeText}
            </span>
          )}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-mountain-meadow hover:text-primary-caribbean-green transition-colors font-medium flex items-center gap-1"
          >
            Code <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

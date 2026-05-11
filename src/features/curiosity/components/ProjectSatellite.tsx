import { motion } from 'framer-motion';

// Custom SVG Icons for consistency
const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const GitForkIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <circle cx="18" cy="6" r="3" />
    <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
    <path d="M12 12v3" />
  </svg>
);
import { GitHubRepository } from '@/lib/github-client';

interface ProjectSatelliteProps {
  project: GitHubRepository;
  index: number;
}

export function ProjectSatellite({ project, index }: ProjectSatelliteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative group h-full"
    >
      {/* Background Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-curiosity-primary/20 to-curiosity-secondary/20 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>

      <div className="relative h-full bg-curiosity-bg/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 overflow-hidden flex flex-col justify-between hover:border-curiosity-primary/40 transition-all duration-300">
        {/* Decorative corner elements */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-curiosity-primary/30 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-curiosity-secondary/30 rounded-bl-2xl" />

        {/* Header: Satellite Name & Status */}
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-curiosity-primary animate-pulse" />
              <span className="text-[10px] font-mono text-curiosity-primary/60 tracking-widest uppercase">
                Satellite_ID: {index.toString().padStart(2, '0')}
              </span>
            </div>
            <h3 className="text-lg font-curiosity-display text-curiosity-text leading-tight group-hover:text-curiosity-primary transition-colors">
              {project.name}
            </h3>
          </div>
          <div className="flex gap-2">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-curiosity-primary/20 hover:border-curiosity-primary/40 transition-all"
              title="View Source"
            >
              <GithubIcon className="w-4 h-4 text-curiosity-text-secondary" />
            </a>
            {project.homepageUrl && (
              <a
                href={project.homepageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-curiosity-secondary/20 hover:border-curiosity-secondary/40 transition-all"
                title="Live Demo"
              >
                <ExternalLinkIcon className="w-4 h-4 text-curiosity-text-secondary" />
              </a>
            )}
          </div>
        </div>

        {/* Content: Description */}
        <p className="text-sm text-curiosity-text-secondary line-clamp-2 font-curiosity-body opacity-80 group-hover:opacity-100 transition-opacity mb-4">
          {project.description || 'No system log description available for this unit.'}
        </p>

        {/* Footer: Tech & Stats */}
        <div className="space-y-4">
          {/* Progress Bar (Decorative) */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-white/20">
              <span>SYNC_COMPLETE</span>
              <span>100%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                className="h-full bg-gradient-to-r from-curiosity-primary to-curiosity-secondary"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {project.primaryLanguage && (
                <span className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-curiosity-text-secondary">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: project.primaryLanguage.color || '#888' }}
                  />
                  {project.primaryLanguage.name}
                </span>
              )}
            </div>
            <div className="flex gap-3 text-[11px] font-mono text-white/30">
              <span className="flex items-center gap-1">
                <StarIcon className="w-3 h-3" /> {project.stargazerCount}
              </span>
              <span className="flex items-center gap-1">
                <GitForkIcon className="w-3 h-3" /> {project.forkCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

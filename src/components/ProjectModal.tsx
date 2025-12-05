import { useRef, useEffect } from 'react';
import { GitHubRepository } from '../lib/github-client';

interface ProjectModalProps {
  project: GitHubRepository;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm">
      <div ref={modalRef} className="relative w-full max-w-2xl p-8 bg-primary-rich-black-light rounded-lg shadow-xl border border-primary-slate-gray/20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-primary-anti-flash-white hover:text-red-500 text-2xl font-bold transition-colors"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-primary-anti-flash-white mb-4">{project.name}</h2>
        <p className="text-secondary-stone mb-6">{project.description || 'No description provided.'}</p>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          {project.primaryLanguage && (
            <span className="flex items-center gap-2 px-4 py-2 bg-primary-deep-champagne/10 text-primary-deep-champagne rounded-full text-sm font-semibold">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: project.primaryLanguage.color || '#cccccc',
                }}
              />
              {project.primaryLanguage.name}
            </span>
          )}

          {project.stargazerCount > 0 && (
            <span className="flex items-center gap-1.5 text-secondary-pistachio text-md">
              ⭐ {project.stargazerCount} Stars
            </span>
          )}

          {project.forkCount > 0 && (
            <span className="flex items-center gap-1.5 text-secondary-pistachio text-md">
              🍴 {project.forkCount} Forks
            </span>
          )}
        </div>

        {project.repositoryTopics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.repositoryTopics.map((topic) => (
              <span key={topic.topic.name} className="px-3 py-1 bg-primary-mountain-meadow/20 text-primary-mountain-meadow text-xs rounded-md">
                {topic.topic.name}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-4 mt-8">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-6 py-3 bg-primary-mountain-meadow text-white font-bold rounded-md hover:bg-primary-mountain-meadow/80 transition-colors"
          >
            View on GitHub
          </a>
          {project.homepageUrl && (
            <a
              href={project.homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 border border-primary-deep-champagne text-primary-deep-champagne font-bold rounded-md hover:bg-primary-deep-champagne/10 transition-colors"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

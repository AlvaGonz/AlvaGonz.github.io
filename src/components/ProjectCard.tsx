import { GitHubRepository } from '../lib/github-client';

// Componente para mostrar cada proyecto
export function ProjectCard({ project }: { project: GitHubRepository }) {
  return (
    <div
      className="p-6 bg-formal-primary-dark-green rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-formal-secondary-basil/20 hover:border-formal-primary-mountain-meadow/50 group relative"
    >
      <h3 className="text-xl font-bold text-formal-primary-anti-flash-white mb-2 transition-colors">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-formal-primary-mountain-meadow transition-colors after:absolute after:inset-0 after:z-0"
        >
          {project.name}
        </a>
      </h3>
      <p className="text-sm text-formal-secondary-stone mb-4 line-clamp-2">
        {project.description || 'No description'}
      </p>

      <div className="flex items-center gap-4 text-xs mb-4 relative z-10">
        {project.primaryLanguage && (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-formal-secondary-frog/10 text-formal-secondary-frog rounded-full font-semibold">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: project.primaryLanguage.color || '#cccccc',
              }}
            />
            {project.primaryLanguage.name}
          </span>
        )}

        {project.stargazerCount > 0 && (
          <span className="flex items-center gap-1 text-formal-secondary-pistachio">
            ⭐ {project.stargazerCount}
          </span>
        )}

        {project.forkCount > 0 && (
          <span className="flex items-center gap-1 text-formal-secondary-pistachio">
            🍴 {project.forkCount}
          </span>
        )}
      </div>

      {project.repositoryTopics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 relative z-10">
          {project.repositoryTopics.map((topic) => (
            <span
              key={topic.topic.name}
              className="px-3 py-1 bg-formal-primary-mountain-meadow/20 text-formal-primary-mountain-meadow text-xs rounded-md"
            >
              {topic.topic.name}
            </span>
          ))}
        </div>
      )}

      {project.homepageUrl && (
        <div className="mt-4 relative z-10">
          <a
            href={project.homepageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-formal-secondary-frog hover:underline text-sm font-medium"
          >
            Live Demo →
          </a>
        </div>
      )}
    </div>
  );
}

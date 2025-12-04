import { GitHubRepository } from '../lib/github-client';

// Componente para mostrar cada proyecto
export function ProjectCard({ project }: { project: GitHubRepository }) {
  return (
    <a href={project.url} target="_blank" rel="noopener noreferrer" 
       className="block p-6 bg-primary-rich-black-light rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-primary-slate-gray/20 hover:border-primary-mountain-meadow/50 group">
      <h3 className="text-xl font-bold text-primary-anti-flash-white mb-2 group-hover:text-primary-mountain-meadow transition-colors">{project.name}</h3>
      <p className="text-sm text-secondary-stone mb-4 line-clamp-2">{project.description || 'No description'}</p>

      <div className="flex items-center gap-4 text-xs mb-4">
        {project.primaryLanguage && (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-primary-deep-champagne/10 text-primary-deep-champagne rounded-full font-semibold">
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
          <span className="flex items-center gap-1 text-secondary-pistachio">
            ⭐ {project.stargazerCount}
          </span>
        )}
        
        {project.forkCount > 0 && (
          <span className="flex items-center gap-1 text-secondary-pistachio">
            🍴 {project.forkCount}
          </span>
        )}
      </div>

      {project.repositoryTopics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.repositoryTopics.map((topic) => (
            <span key={topic.topic.name} className="px-3 py-1 bg-primary-mountain-meadow/20 text-primary-mountain-meadow text-xs rounded-md">
              {topic.topic.name}
            </span>
          ))}
        </div>
      )}

      {project.homepageUrl && (
        <div className="mt-4">
          <a href={project.homepageUrl} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center text-primary-deep-champagne hover:underline text-sm font-medium">
            Live Demo →
          </a>
        </div>
      )}
    </a>
  );
}

import { useGitHubStats } from '@/hooks/useGitHubStats';
import { LanguageBadge } from '@/components/ui/LanguageBadge';
import { motion } from 'framer-motion';

export function GithubStats() {
  const { data, loading } = useGitHubStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32 text-theme-text-secondary animate-pulse">
        Loading GitHub insights...
      </div>
    );
  }

  if (!data) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-theme-surface/40 rounded-2xl p-6 border border-theme-border backdrop-blur-sm"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Top Languages */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-theme-text mb-4 flex items-center gap-2">
            <span className="text-xl">💻</span>
            Top Languages
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.topLanguages.map(lang => (
              <LanguageBadge
                key={lang.name}
                name={lang.name}
                count={lang.count}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-theme-border hidden md:block" />
        <div className="h-px w-full bg-theme-border md:hidden" />

        {/* Activity Stats */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-theme-text mb-4 flex items-center gap-2">
            <span className="text-xl">📊</span>
            GitHub Activity
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-theme-surface/50 rounded-xl p-4 text-center border border-theme-border hover:border-theme-primary/30 transition-colors group">
              <p className="text-xs text-theme-text-secondary uppercase tracking-wider mb-1 group-hover:text-theme-primary transition-colors">Repos</p>
              <p className="text-2xl font-bold text-theme-text">{data.user.publicRepos}</p>
            </div>
            <div className="bg-theme-surface/50 rounded-xl p-4 text-center border border-theme-border hover:border-theme-primary/30 transition-colors group">
              <p className="text-xs text-theme-text-secondary uppercase tracking-wider mb-1 group-hover:text-theme-primary transition-colors">Followers</p>
              <p className="text-2xl font-bold text-theme-text">{data.user.followers}</p>
            </div>
            <div className="bg-theme-surface/50 rounded-xl p-4 text-center border border-theme-border hover:border-theme-primary/30 transition-colors group">
              <p className="text-xs text-theme-text-secondary uppercase tracking-wider mb-1 group-hover:text-theme-primary transition-colors">Status</p>
              <div className="flex items-center justify-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-semibold text-theme-text">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import { useGitHubStats } from '@/hooks/useGitHubStats';
import { motion } from 'framer-motion';
import { LanguageIcon } from '@/components/ui/LanguageIcon';

const languageColors: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  Python: '#3572A5',
  HTML: '#E34C26',
  CSS: '#0277bd',
  'C#': '#953cad',
  SCSS: '#CF649A',
  Java: '#db771d',
  Vue: '#41b883'
  // Add more colors as needed
};

export function TopLanguages() {
  const { data, loading } = useGitHubStats();

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 bg-primary-rich-black/50 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!data) return null;

  const totalCount = data.topLanguages.reduce((acc, lang) => acc + lang.count, 0);
  const topLangs = data.topLanguages.slice(0, 7); // Limit to top 7 for this layout

  return (
    <div className="space-y-4">
      {topLangs.map((lang, index) => {
        const percentage = (lang.count / totalCount) * 100;
        const color = languageColors[lang.name] || '#A8B2C1';

        return (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ delay: 0.1 * index, duration: 0.6, ease: 'easeOut' }}
            className="group"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <LanguageIcon language={lang.name} className="w-5 h-5" />
                <p className="font-medium text-secondary-pistachio">{lang.name}</p>
              </div>
              <p className="text-sm font-mono text-secondary-stone">{percentage.toFixed(1)}%</p>
            </div>
            <div className="w-full bg-primary-dark-green/50 rounded-full h-2.5 overflow-hidden border border-white/5">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${percentage}%` }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2 + 0.1 * index,
                  duration: 1,
                  ease: [0.25, 1, 0.5, 1],
                }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
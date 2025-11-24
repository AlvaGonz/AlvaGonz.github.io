interface LanguageBadgeProps {
  name: string;
  count?: number;
}

const languageColors: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  Python: '#3572A5',
  React: '#61DAFB',
  HTML: '#E34C26',
  CSS: '#563D7C',
  'C++': '#00599C',
  Java: '#007396',
  Rust: '#CE422B',
  Go: '#00ADD8',
  SQL: '#336791',
  'C#': '#178600',
  Vue: '#41B883',
  Shell: '#89E051',
};

export function LanguageBadge({ name, count }: LanguageBadgeProps) {
  const color = languageColors[name] || '#8B949E';

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors">
      <div
        className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]"
        style={{ backgroundColor: color }}
      />
      <span className="font-medium text-primary-anti-flash-white">{name}</span>
      {count && <span className="text-xs text-secondary-stone">({count})</span>}
    </div>
  );
}

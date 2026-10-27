import { USAFlagIcon } from '@/components/icons/FlagIcons';
import duolingoData from '../../../data/generated/duolingo.json';
import type { DuolingoStats } from '../types';

export function DuolingoWidget() {
  const stats = duolingoData as unknown as DuolingoStats;
  const english = stats.courses.find((course) => course.learningLanguage === 'en');

  if (!english) return null;

  return (
    <div className="bg-formal-primary-rich-black/50 p-4 rounded-xl border border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors">
      <div className="flex items-center gap-3">
        <USAFlagIcon size={24} className="rounded-sm" />
        <div>
          <h3 className="font-bold text-white">English</h3>
          <p className="text-sm text-formal-secondary-stone">
            {english.level} · {english.xp.toLocaleString()} XP
            {stats.activity ? ` · ${stats.activity.totalXp.toLocaleString()} XP (30d)` : ''}
          </p>
        </div>
      </div>
      <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">
        {english.level}
      </div>
    </div>
  );
}

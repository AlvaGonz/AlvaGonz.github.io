import { USAFlagIcon } from '@/components/icons/FlagIcons';

export function DuolingoWidget() {
  return (
    <div className="bg-formal-primary-rich-black/50 p-4 rounded-xl border border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors">
      <div className="flex items-center gap-3">
        <USAFlagIcon size={24} className="rounded-sm" />
        <div>
          <h3 className="font-bold text-white">English</h3>
          <p className="text-sm text-formal-secondary-stone">Basic (B2)</p>
        </div>
      </div>
      <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">
        B2
      </div>
    </div>
  );
}

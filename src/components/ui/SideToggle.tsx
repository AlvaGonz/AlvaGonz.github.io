import { usePortfolioSide } from '@/hooks/usePortfolioSide';

export function SideToggle() {
  const { side, setSide } = usePortfolioSide();

  return (
    <div className="flex gap-1 bg-formal-primary-rich-black/50 rounded-full p-1 border border-white/10">
      <button
        onClick={() => setSide('formal')}
        className={`px-3 py-1.5 rounded-full transition-all duration-300 font-medium text-xs sm:text-sm flex items-center gap-2 ${
          side === 'formal'
            ? 'bg-formal-primary-dark-green text-formal-primary-anti-flash-white shadow-lg'
            : 'text-formal-secondary-stone hover:text-formal-primary-anti-flash-white'
        }`}
      >
        <span>💼</span>
        <span className="hidden sm:inline">Formal</span>
      </button>

      <button
        onClick={() => setSide('Curiosity')}
        className={`px-3 py-1.5 rounded-full transition-all duration-300 font-medium text-xs sm:text-sm flex items-center gap-2 ${
          side === 'Curiosity'
            ? 'bg-gradient-to-r from-Curiosity-primary to-Curiosity-secondary text-Curiosity-bg shadow-[0_0_20px_rgba(208,211,77,0.6)]'
            : 'text-formal-secondary-stone hover:text-formal-primary-anti-flash-white'
        }`}
      >
        <span>🔍</span>
        <span className="hidden sm:inline">Curiosity</span>
      </button>
    </div>
  );
}

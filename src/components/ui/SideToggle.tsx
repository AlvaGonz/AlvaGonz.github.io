import { usePortfolioSide } from '@/hooks/usePortfolioSide';

export function SideToggle() {
  const { side, setSide } = usePortfolioSide();

  return (
    <div className="flex gap-1 bg-primary-rich-black/50 rounded-full p-1 border border-white/10">
      <button
        onClick={() => setSide('formal')}
        className={`px-3 py-1.5 rounded-full transition-all duration-300 font-medium text-xs sm:text-sm flex items-center gap-2 ${side === 'formal'
          ? 'bg-primary-dark-green text-primary-anti-flash-white shadow-lg'
          : 'text-secondary-stone hover:text-primary-anti-flash-white'
          }`}
      >
        <span>💼</span>
        <span className="hidden sm:inline">Formal</span>
      </button>

      <button
        onClick={() => setSide('curiosity')}
        className={`px-3 py-1.5 rounded-full transition-all duration-300 font-medium text-xs sm:text-sm flex items-center gap-2 ${side === 'curiosity'
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
          : 'text-secondary-stone hover:text-primary-anti-flash-white'
          }`}
      >
        <span>✨</span>
        <span className="hidden sm:inline">Curiosity</span>
      </button>
    </div>
  );
}

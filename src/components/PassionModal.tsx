import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FireStreakEffect } from './effects/FireStreakEffect';

export interface PassionContent {
  id: string;
  title: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  color: string;
  isSound?: boolean;
  isInteractive?: boolean;
  showFireEffect?: boolean;
  englishLevel?: string;
}

interface PassionModalProps {
  isOpen: boolean;
  onClose: () => void;
  passion: PassionContent | null;
  onPlaySound?: () => void;
  onTriggerBSOD?: () => void;
}

export function PassionModal({ isOpen, onClose, passion, onPlaySound, onTriggerBSOD }: PassionModalProps): JSX.Element {
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Reset clicks when modal opens/closes
  useEffect(() => {
    if (!isOpen) setClickCount(0);
  }, [isOpen]);

  const handleIconClick = () => {
    if (passion?.id === 'pc' && onTriggerBSOD) {
      const newCount = clickCount + 1;
      setClickCount(newCount);
      if (newCount >= 5) {
        onTriggerBSOD();
        setClickCount(0);
      }
    }
  };

  if (!isOpen || !passion) return <></>;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl bg-primary-rich-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        >
          {/* Fire Effect for English */}
          {passion.showFireEffect && <FireStreakEffect />}
          {/* Header Image */}
          <div className="relative h-64 md:h-80">
            <img
              src={passion.image}
              alt={passion.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${passion.color} opacity-80`} />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
              <div
                className={`text-6xl mb-4 ${passion.id === 'pc' ? 'cursor-pointer active:scale-90 transition-transform select-none' : ''}`}
                onClick={handleIconClick}
              >
                {passion.icon}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                {passion.title}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            <p className="text-xl md:text-2xl text-primary-anti-flash-white font-medium mb-6 leading-relaxed">
              {passion.shortDesc}
            </p>

            <div className="prose prose-invert max-w-none text-secondary-pistachio">
              <p className="text-lg leading-relaxed whitespace-pre-line">
                {passion.fullDesc}
              </p>

              {/* English Level Display */}
              {passion.englishLevel && (
                <div className="mt-6 p-4 bg-[#58cc02]/20 rounded-xl border-2 border-[#58cc02]/50">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">🎯</div>
                    <div>
                      <p className="text-white font-bold text-xl mb-1">Current Level</p>
                      <p className="text-[#58cc02] font-bold text-2xl">{passion.englishLevel}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {passion.isSound && (
              <div
                onClick={onPlaySound}
                className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10 flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-colors group"
              >
                <div className="text-3xl group-hover:scale-110 transition-transform">🔊</div>
                <div>
                  <p className="font-bold text-white">Hear the Engine</p>
                  <p className="text-sm text-gray-400">Click here to unleash the straight-cut gears.</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

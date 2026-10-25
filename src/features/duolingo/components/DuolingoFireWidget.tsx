import { useState, type CSSProperties } from 'react';
import { Sparkles, Flame } from 'lucide-react';
import './DuolingoFireWidget.css';
import duolingoData from '../../../data/generated/duolingo.json';
import type { DuolingoStats } from '../types';

const stats = duolingoData as DuolingoStats;
const primaryLevel =
  stats.courses.find((course) => course.learningLanguage === stats.learningLanguage)?.level ??
  stats.courses[0]?.level ??
  'A1';

export const DuolingoFireWidget = () => {
  const [isFireActive, setIsFireActive] = useState<boolean>(false);

  const handleWidgetClick = () => {
    if (isFireActive) return;
    setIsFireActive(true);
    setTimeout(() => setIsFireActive(false), 3000);
  };

  return (
    <div
      className={`
        duo-widget-container 
        w-full p-5 rounded-2xl cursor-pointer select-none
        flex flex-col gap-4
        bg-gradient-to-r from-green-50 to-green-100
        border-2 border-[#58CC02]
        shadow-[0_4px_12px_rgba(88,204,2,0.1)]
        hover:shadow-[0_8px_24px_rgba(88,204,2,0.2)] hover:-translate-y-0.5
        ${isFireActive ? 'fire-active' : ''}
      `}
      onClick={handleWidgetClick}
      role="button"
      tabIndex={0}
      aria-label={`Duolingo stats for ${stats.username}. Click to activate fire effect.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleWidgetClick();
        }
      }}
    >
      {isFireActive && (
        <div className="fire-effect-wrapper">
          <div className="fire-flames-container">
            <img
              src="/images/streak-flame-updated-v0-3n46sx7a0e9b1.webp"
              alt="flame"
              className="flame flame-large"
              style={{ left: '20%', '--delay': '0s' } as CSSProperties}
            />
            <img
              src="/images/streak-flame-updated-v0-3n46sx7a0e9b1.webp"
              alt="flame"
              className="flame flame-large"
              style={{ left: '50%', '--delay': '0.1s' } as CSSProperties}
            />
            <img
              src="/images/streak-flame-updated-v0-3n46sx7a0e9b1.webp"
              alt="flame"
              className="flame flame-large"
              style={{ left: '80%', '--delay': '0.2s' } as CSSProperties}
            />

            {[...Array(6)].map((_, i) => (
              <img
                src="/images/streak-flame-updated-v0-3n46sx7a0e9b1.webp"
                alt="flame"
                key={`med-${i}`}
                className="flame flame-medium"
                style={
                  {
                    left: `${15 + i * 14}%`,
                    '--delay': `${i * 0.05}s`,
                    '--rotation': `${i * 60}deg`,
                  } as CSSProperties
                }
              />
            ))}

            {[...Array(8)].map((_, i) => (
              <img
                src="/images/streak-flame-updated-v0-3n46sx7a0e9b1.webp"
                alt="flame"
                key={`sm-${i}`}
                className="flame flame-small"
                style={
                  {
                    left: `${10 + i * 11}%`,
                    '--delay': `${i * 0.08}s`,
                    '--rotation': `${i * 45}deg`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </div>
      )}

      <div className="relative z-10 flex items-center gap-4 w-full">
        <div className="relative shrink-0">
          <img
            src={stats.avatar || '/images/duo-face.png'}
            alt={`${stats.username}'s avatar`}
            className={`
              duo-avatar w-20 h-20 rounded-full object-cover border-4 border-white
              transition-all duration-300
              ${isFireActive ? 'border-[#FFC715]' : ''}
            `}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = '/images/duo-face.png';
            }}
          />
          <div
            className="absolute -bottom-1 -right-1 bg-[#58CC02] text-white text-sm font-bold px-2 py-1 rounded-md border-2 border-white"
            title="Estimated from course XP"
          >
            {primaryLevel}
          </div>
        </div>

        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-1">
            <h3
              className={`font-bold text-[1.73rem] font-curiosity-display ${isFireActive ? 'text-white' : 'text-[#4B4B4B]'}`}
            >
              {stats.username}
            </h3>
          </div>

          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span
                className={`text-[0.8rem] font-bold uppercase tracking-wider ${isFireActive ? 'text-white/90' : 'text-gray-500'}`}
              >
                Streak
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`streak-count text-[2.88rem] font-black leading-none ${isFireActive ? 'text-white' : 'text-[#F49000]'}`}
                >
                  {stats.streak}
                </span>
                <img
                  src="/images/streak-flame-updated-v0-3n46sx7a0e9b1.webp"
                  alt="Fire streak"
                  className="w-10 h-10 object-contain fire-icon"
                />
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span
                className={`text-[0.8rem] font-bold uppercase tracking-wider ${isFireActive ? 'text-white/90' : 'text-gray-500'}`}
              >
                Total XP
              </span>
              <span
                className={`font-bold text-[1.44rem] ${isFireActive ? 'text-white' : 'text-[#4B4B4B]'}`}
              >
                {stats.totalXp.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`relative z-10 border-t ${isFireActive ? 'border-white/20' : 'border-gray-200'} pt-3 mt-1`}
      >
        <div className="flex justify-between items-center mb-2">
          <span
            className={`text-[0.8rem] font-bold uppercase ${isFireActive ? 'text-white/90' : 'text-gray-500'}`}
          >
            Active Courses
          </span>
        </div>

        {stats.activity && (
          <div className="mb-2 text-[0.85rem] text-gray-500">
            Last {stats.activity.windowDays} days: {stats.activity.totalXp.toLocaleString()} XP ·{' '}
            {stats.activity.activeDays} active days
          </div>
        )}

        <div className="space-y-2">
          {stats.courses.map((course) => (
            <div
              key={course.learningLanguage}
              className="flex justify-between items-center text-[1.15rem]"
            >
              <div className="flex items-center gap-2">
                <span className={`font-medium ${isFireActive ? 'text-white' : 'text-[#4B4B4B]'}`}>
                  {course.title}{' '}
                  <span className="text-gray-400 text-[0.9rem]">
                    ({course.learningLanguage.toUpperCase()})
                  </span>
                </span>
              </div>
              <span
                className={`font-mono text-[0.9rem] ${isFireActive ? 'text-white/80' : 'text-gray-500'}`}
              >
                {course.level} · {course.xp.toLocaleString()} XP
              </span>
            </div>
          ))}
        </div>
      </div>

      {!isFireActive && (
        <div className="absolute -bottom-6 left-0 w-full text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="text-[0.86rem] text-gray-400 font-curiosity-body font-medium flex items-center justify-center gap-1.5">
            <Sparkles size={14} className="text-curiosity-primary" />
            Haz click para activar
            <Flame size={14} className="text-[#F49000]" />
          </span>
        </div>
      )}
    </div>
  );
};

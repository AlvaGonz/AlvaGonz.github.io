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
        group relative w-full cursor-pointer select-none
        rounded-2xl border border-white/10 bg-white/[0.03]
        p-6 transition-colors duration-200
        hover:bg-white/[0.06] active:bg-white/[0.1] focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-curiosity-primary/60
        ${isFireActive ? 'fire-active' : ''}
      `}
      onClick={handleWidgetClick}
      role="button"
      tabIndex={0}
      aria-label={`Duolingo stats for ${stats.username}. Click to activate fire effect.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleWidgetClick();
        }
      }}
    >
      {/* Fire effect layer */}
      {isFireActive && (
        <div className="pointer-events-none absolute -inset-4 z-50" aria-hidden="true">
          <div className="fire-flames-container absolute inset-x-0 bottom-0 h-full">
            <img
              src="/images/streak-flame-updated-v0-3n46sx7a0e9b1.webp"
              alt=""
              className="flame flame-large absolute bottom-0"
              style={{ left: '15%', '--delay': '0s' } as CSSProperties}
            />
            <img
              src="/images/streak-flame-updated-v0-3n46sx7a0e9b1.webp"
              alt=""
              className="flame flame-large absolute bottom-0"
              style={{ left: '45%', '--delay': '0.1s' } as CSSProperties}
            />
            <img
              src="/images/streak-flame-updated-v0-3n46sx7a0e9b1.webp"
              alt=""
              className="flame flame-large absolute bottom-0"
              style={{ left: '72%', '--delay': '0.2s' } as CSSProperties}
            />
            {[...Array(4)].map((_, i) => (
              <img
                key={`med-${i}`}
                src="/images/streak-flame-updated-v0-3n46sx7a0e9b1.webp"
                alt=""
                className="flame flame-medium absolute bottom-0"
                style={
                  {
                    left: `${10 + i * 20}%`,
                    '--delay': `${0.05 + i * 0.1}s`,
                  } as CSSProperties
                }
              />
            ))}
            {[...Array(10)].map((_, i) => (
              <div
                key={`sp-${i}`}
                className="sparkle absolute bottom-0"
                style={
                  {
                    left: `${5 + i * 9}%`,
                    '--delay': `${i * 0.1}s`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Header: avatar + identity */}
      <div className="relative z-10 flex items-center gap-4">
        <div className="relative shrink-0">
          <img
            src={stats.avatar || '/images/duo-face.png'}
            alt={`${stats.username}'s avatar`}
            className="h-16 w-16 rounded-full border-2 border-white/20 object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = '/images/duo-face.png';
            }}
          />
          <span
            className="absolute -bottom-1 -right-1 rounded-md border border-white/20 bg-curiosity-primary px-1.5 py-0.5 text-[0.65rem] font-bold text-curiosity-bg"
            title="Estimated from course XP"
          >
            {primaryLevel}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-bold text-lg text-curiosity-text">{stats.username}</h3>
          <p className="text-xs text-curiosity-text-secondary">Duolingo</p>
        </div>

        <div className="text-right">
          <p className="text-[0.65rem] font-medium text-curiosity-text-secondary">Streak</p>
          <p className="flex items-center justify-end gap-1.5 text-2xl font-black leading-none text-curiosity-primary">
            {stats.streak}
            <Flame className="h-5 w-5 text-orange-400" aria-hidden="true" />
          </p>
        </div>
      </div>

      {/* XP summary */}
      <div className="relative z-10 flex items-baseline justify-between border-t border-white/10 pt-4">
        <div>
          <p className="text-[0.65rem] font-medium  text-curiosity-text-secondary">Total XP</p>
          <p className="text-xl font-bold text-curiosity-text">{stats.totalXp.toLocaleString()}</p>
        </div>
        {stats.activity && (
          <div className="text-right">
            <p className="text-[0.65rem] font-medium  text-curiosity-text-secondary">30-day XP</p>
            <p className="text-sm font-semibold text-curiosity-text-secondary">
              {stats.activity.totalXp.toLocaleString()} · {stats.activity.activeDays} active
            </p>
          </div>
        )}
      </div>

      {/* Courses */}
      <div className="relative z-10 border-t border-white/10 pt-4">
        <p className="mb-2 text-[0.65rem] font-medium  text-curiosity-text-secondary">Courses</p>
        <ul className="space-y-1.5">
          {stats.courses.map((course) => (
            <li key={course.learningLanguage} className="flex items-center justify-between text-sm">
              <span className="text-curiosity-text">
                {course.title}
                <span className="ml-1.5 text-xs text-curiosity-text-secondary">
                  {course.learningLanguage.toUpperCase()}
                </span>
              </span>
              <span className="text-xs text-curiosity-text-secondary">
                {course.level} · {course.xp.toLocaleString()} XP
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hint */}
      {!isFireActive && (
        <p className="relative z-10 text-center text-[0.7rem] text-curiosity-text-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Sparkles className="mr-1 inline h-3 w-3 text-curiosity-primary" aria-hidden="true" />
          Click to ignite
        </p>
      )}
    </div>
  );
};

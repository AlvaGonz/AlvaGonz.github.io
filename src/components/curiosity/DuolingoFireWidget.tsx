import React, { useState, useEffect, useCallback } from 'react';
import './DuolingoFireWidget.css';

interface DuolingoCourse {
    title: string;
    learningLanguage: string;
    xp: number;
}

interface DuolingoStats {
    username: string;
    streak: number;
    totalXp: number;
    level: string;
    learningLanguage: string;
    avatar?: string;
    courses: DuolingoCourse[];
    motivation: string;
}

interface DuolingoFireWidgetProps {
    username?: string;
    onFireComplete?: () => void;
}

export const DuolingoFireWidget: React.FC<DuolingoFireWidgetProps> = ({
    username = "AlvaGonz",
    onFireComplete
}) => {
    const [stats, setStats] = useState<DuolingoStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [isFireActive, setIsFireActive] = useState<boolean>(false);

    // Fallback data
    const fallbackStats: DuolingoStats = {
        username: username,
        streak: 452,
        totalXp: 30705,
        level: "B2",
        learningLanguage: "en",
        avatar: "/images/duo-face.png",
        courses: [
            { title: "English", learningLanguage: "en", xp: 12500 },
            { title: "Japanese", learningLanguage: "ja", xp: 2920 }
        ],
        motivation: "serious"
    };

    const fetchDuolingoStats = useCallback(async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.duolingo.com/2017-06-30/users?username=${username}`)}`);

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            const parsedData = JSON.parse(data.contents);

            if (parsedData.users && parsedData.users.length > 0) {
                const user = parsedData.users[0];

                // Map courses
                const courses: DuolingoCourse[] = user.courses.map((c: any) => ({
                    title: c.title,
                    learningLanguage: c.learningLanguage,
                    xp: c.xp
                })).sort((a: any, b: any) => b.xp - a.xp); // Sort by XP

                setStats({
                    username: user.username,
                    streak: user.streak,
                    totalXp: user.totalXp,
                    level: "B2",
                    learningLanguage: user.learningLanguage,
                    avatar: user.picture ? `https:${user.picture}/xxlarge` : undefined,
                    courses: courses,
                    motivation: user.motivation || "diligent"
                });
            } else {
                throw new Error('User not found');
            }
        } catch (err) {
            console.warn("Failed to fetch Duolingo stats, using fallback:", err);
            setStats(fallbackStats);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [username]);

    useEffect(() => {
        fetchDuolingoStats();
        const interval = setInterval(fetchDuolingoStats, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [fetchDuolingoStats]);

    const handleWidgetClick = () => {
        if (isFireActive) return;
        setIsFireActive(true);
        setTimeout(() => {
            setIsFireActive(false);
            if (onFireComplete) onFireComplete();
        }, 3000);
    };

    if (loading) {
        return (
            <div className="w-full h-48 rounded-2xl bg-gray-100 animate-pulse flex items-center justify-center border-2 border-gray-200">
                <div className="w-8 h-8 border-4 border-[#58CC02] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

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
        ${error && !isFireActive ? 'border-[#FF4B4B]' : ''}
      `}
            onClick={handleWidgetClick}
            role="button"
            tabIndex={0}
            aria-label={`Duolingo stats for ${username}. Click to activate fire effect.`}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleWidgetClick();
                }
            }}
        >
            {/* Fire Effect Layers */}
            {isFireActive && (
                <div className="fire-effect-wrapper">
                    <div className="fire-flames-container">
                        {/* 3 Gotas Grandes */}
                        <div className="flame flame-large" style={{ left: '20%', '--delay': '0s' } as React.CSSProperties}></div>
                        <div className="flame flame-large" style={{ left: '50%', '--delay': '0.1s' } as React.CSSProperties}></div>
                        <div className="flame flame-large" style={{ left: '80%', '--delay': '0.2s' } as React.CSSProperties}></div>

                        {/* 6 Gotas Medianas */}
                        {[...Array(6)].map((_, i) => (
                            <div key={`med-${i}`}
                                className="flame flame-medium"
                                style={{
                                    left: `${15 + i * 14}%`,
                                    '--delay': `${i * 0.05}s`,
                                    '--rotation': `${i * 60}deg`
                                } as React.CSSProperties}>
                            </div>
                        ))}

                        {/* 8 Gotas Pequeñas */}
                        {[...Array(8)].map((_, i) => (
                            <div key={`sm-${i}`}
                                className="flame flame-small"
                                style={{
                                    left: `${10 + i * 11}%`,
                                    '--delay': `${i * 0.08}s`,
                                    '--rotation': `${i * 45}deg`
                                } as React.CSSProperties}>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Header: Avatar + Main Stats */}
            <div className="relative z-10 flex items-center gap-4 w-full">
                {/* Avatar */}
                <div className="relative shrink-0">
                    <img
                        src={stats?.avatar || "/images/duo-face.png"}
                        alt={`${username}'s avatar`}
                        className={`
              duo-avatar w-20 h-20 rounded-full object-cover border-4 border-white
              transition-all duration-300
              ${isFireActive ? 'border-[#FFC715]' : ''}
            `}
                        loading="lazy"
                        onError={(e) => {
                            e.currentTarget.src = "/images/duo-face.png";
                        }}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#58CC02] text-white text-sm font-bold px-2 py-1 rounded-md border-2 border-white">
                        {stats?.level}
                    </div>
                </div>

                {/* Main Stats */}
                <div className="flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className={`font-bold text-[1.73rem] ${isFireActive ? 'text-white' : 'text-[#4B4B4B]'}`}>
                            {stats?.username}
                        </h3>
                    </div>

                    <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                            <span className={`text-[0.8rem] font-bold uppercase tracking-wider ${isFireActive ? 'text-white/90' : 'text-gray-500'}`}>
                                Streak
                            </span>
                            <div className="flex items-center gap-2">
                                <span className={`streak-count text-[2.88rem] font-black leading-none ${isFireActive ? 'text-white' : 'text-[#F49000]'}`}>
                                    {stats?.streak}
                                </span>
                                <img
                                    src="/images/streak-flame-updated-v0-3n46sx7a0e9b1.webp"
                                    alt="Fire streak"
                                    className="w-10 h-10 object-contain fire-icon"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-end">
                            <span className={`text-[0.8rem] font-bold uppercase tracking-wider ${isFireActive ? 'text-white/90' : 'text-gray-500'}`}>
                                Total XP
                            </span>
                            <span className={`font-bold text-[1.44rem] ${isFireActive ? 'text-white' : 'text-[#4B4B4B]'}`}>
                                {stats?.totalXp.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expanded Stats: Courses */}
            <div className={`relative z-10 border-t ${isFireActive ? 'border-white/20' : 'border-gray-200'} pt-3 mt-1`}>
                <div className="flex justify-between items-center mb-2">
                    <span className={`text-[0.8rem] font-bold uppercase ${isFireActive ? 'text-white/90' : 'text-gray-500'}`}>
                        Active Courses
                    </span>
                </div>

                <div className="space-y-2">
                    {stats?.courses.slice(0, 3).map((course, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[1.15rem]">
                            <div className="flex items-center gap-2">
                                <span className={`font-medium ${isFireActive ? 'text-white' : 'text-[#4B4B4B]'}`}>
                                    {course.title} <span className="text-gray-400 text-[0.9rem]">({course.learningLanguage.toUpperCase()})</span>
                                </span>
                            </div>
                            <span className={`font-mono text-[0.9rem] ${isFireActive ? 'text-white/80' : 'text-gray-500'}`}>
                                {course.xp.toLocaleString()} XP
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hint Text (Only visible when not active) */}
            {!isFireActive && (
                <div className="absolute -bottom-6 left-0 w-full text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-[0.86rem] text-gray-400 font-medium">
                        ✨ Haz click para activar 🔥
                    </span>
                </div>
            )}
        </div>
    );
};

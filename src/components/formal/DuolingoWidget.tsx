import { useState, useEffect } from 'react';
import { getDuolingoStats, DuolingoUser } from '../../services/duolingo';

export function DuolingoWidget() {
    const [stats, setStats] = useState<DuolingoUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getDuolingoStats();
            setStats(data);
            setLoading(false);
        };

        fetchStats();
    }, []);

    if (loading) return (
        <div className="bg-primary-rich-black/50 p-4 rounded-xl border border-white/5 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-full"></div>
                <div className="space-y-2">
                    <div className="h-4 w-24 bg-white/10 rounded"></div>
                    <div className="h-3 w-16 bg-white/10 rounded"></div>
                </div>
            </div>
        </div>
    );

    if (!stats) return (
        <div className="bg-primary-rich-black/50 p-4 rounded-xl border border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
                <span className="text-2xl">🇺🇸</span>
                <div>
                    <h3 className="font-bold text-white">English</h3>
                    <p className="text-sm text-secondary-stone">Basic (B2)</p>
                </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">
                B2
            </div>
        </div>
    );

    return (
        <div className="bg-primary-rich-black/50 p-4 rounded-xl border border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors group">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <img
                        src={stats.avatar}
                        alt="Duolingo Avatar"
                        className="w-10 h-10 rounded-full border-2 border-[#58cc02]"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#58cc02] text-[10px] font-bold text-white px-1.5 rounded-full border border-primary-rich-black">
                        {stats.streak}🔥
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-white">English</h3>
                    <p className="text-sm text-secondary-stone">
                        {stats.totalXp.toLocaleString()} XP
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-1">
                <div className="px-3 py-1 rounded-full bg-[#58cc02]/20 text-[#58cc02] text-xs font-bold border border-[#58cc02]/30 group-hover:bg-[#58cc02]/30 transition-colors">
                    Active Learner
                </div>
            </div>
        </div>
    );
}

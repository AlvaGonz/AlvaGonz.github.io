import { useLeetcodeStats } from '@/hooks/useLeetcodeStats';
import { motion } from 'framer-motion';

export function LeetcodeStats() {
  const { data, loading, error } = useLeetcodeStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32 text-theme-text-secondary animate-pulse">
        Loading LeetCode stats...
      </div>
    );
  }

  if (error || !data?.data?.userProfile) {
    return null;
  }

  const user = data.data.userProfile;
  const solvePercentage = user.totalProblems > 0 
    ? (user.totalSolved / user.totalProblems) * 100 
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800 backdrop-blur-sm"
    >
      <h3 className="text-xl font-bold mb-4 text-theme-text flex items-center gap-2">
        <span className="text-2xl">⚔️</span>
        LeetCode Progress
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white/50 dark:bg-theme-surface/50 rounded-xl p-4 text-center border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-theme-text-secondary mb-1">Ranking</p>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            #{user.ranking.toLocaleString()}
          </p>
        </div>
        <div className="bg-white/50 dark:bg-theme-surface/50 rounded-xl p-4 text-center border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-theme-text-secondary mb-1">Accuracy</p>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {user.acceptanceRate.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-theme-text-secondary">
            {user.totalSolved} / {user.totalProblems} problemas resueltos
          </p>
          <p className="text-sm font-semibold text-theme-text">
            {solvePercentage.toFixed(1)}%
          </p>
        </div>
        <div className="w-full bg-gray-200 dark:bg-theme-surface rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${solvePercentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="text-center p-3 bg-white/50 dark:bg-theme-surface/50 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-green-600 dark:text-green-400 font-bold text-lg">{user.easyCount}</p>
          <p className="text-theme-text-secondary text-xs">Easy</p>
        </div>
        <div className="text-center p-3 bg-white/50 dark:bg-theme-surface/50 rounded-lg border border-orange-200 dark:border-orange-800">
          <p className="text-orange-600 dark:text-orange-400 font-bold text-lg">{user.mediumCount}</p>
          <p className="text-theme-text-secondary text-xs">Medium</p>
        </div>
        <div className="text-center p-3 bg-white/50 dark:bg-theme-surface/50 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400 font-bold text-lg">{user.hardCount}</p>
          <p className="text-theme-text-secondary text-xs">Hard</p>
        </div>
      </div>
    </motion.div>
  );
}


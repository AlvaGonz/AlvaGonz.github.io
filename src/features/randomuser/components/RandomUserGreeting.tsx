import { useRandomUser } from '../hooks/useRandomUser';
import { motion } from 'framer-motion';
import { WavingHandIcon } from '@/components/icons/CustomIcons';

export function RandomUserGreeting() {
  const { data, loading, error } = useRandomUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-24 text-curiosity-text-secondary animate-pulse">
        Loading greeting...
      </div>
    );
  }

  if (error || !data?.results?.[0]) {
    return null;
  }

  const user = data.results[0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 p-4 bg-theme-surface/50 rounded-xl border border-theme-border backdrop-blur-sm"
    >
      {user.picture && (
        <img
          src={user.picture.medium}
          alt={`Profile of ${user.name.first}`}
          className="w-16 h-16 rounded-full border-2 border-curiosity-primary"
        />
      )}
      <div className="flex-1">
        <p className="text-curiosity-text font-curiosity-body font-semibold flex items-center gap-2">
          Hello, I'm {user.name.first}!{' '}
          <WavingHandIcon className="w-5 h-5 text-curiosity-accent animate-bounce" />
        </p>
        <p className="text-sm font-curiosity-body text-curiosity-text-secondary">
          From {user.location.city}, {user.location.country}
        </p>
      </div>
    </motion.div>
  );
}

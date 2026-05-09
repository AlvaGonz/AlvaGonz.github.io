import { useRandomUser } from '@/hooks/useRandomUser';
import { motion } from 'framer-motion';

export function RandomUserGreeting() {
  const { data, loading, error } = useRandomUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-24 text-Curiosity-text-secondary animate-pulse">
        Loading greeting...
      </div>
    );
  }

  if (error || !data?.results?.[0]) {
    return null;
  }

  const user = data.results[0];
  const greeting = `Hello, I'm ${user.name.first}! 👋`;

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
          alt={greeting}
          className="w-16 h-16 rounded-full border-2 border-Curiosity-primary"
        />
      )}
      <div className="flex-1">
        <p className="text-Curiosity-text font-curiosity-body font-semibold">{greeting}</p>
        <p className="text-sm font-curiosity-body text-Curiosity-text-secondary">
          From {user.location.city}, {user.location.country}
        </p>
      </div>
    </motion.div>
  );
}

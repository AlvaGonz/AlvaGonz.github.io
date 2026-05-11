import { favoriteGames, Game } from '@/content/games';
import { motion } from 'framer-motion';
import { Gamepad2, Clock, Star } from 'lucide-react';

export function GamingShowcase() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-curiosity-display text-curiosity-text flex items-center gap-3">
        <Gamepad2 className="w-6 h-6 text-curiosity-primary" />
        {/* Gradient 1: Cloud Grey → Periwinkle from DESIGN.md */}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-curiosity-highlight to-curiosity-secondary">
          Gaming Collection
        </span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {favoriteGames.map((game: Game, index: number) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="group relative h-56 rounded-2xl overflow-hidden border border-theme-border hover:border-curiosity-primary/50 transition-all duration-500 shadow-lg hover:shadow-[0_0_15px_rgba(208,211,77,0.2)]"
          >
            {/* Background Image */}
            <img
              src={game.image}
              alt={game.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay — Gradient 4: Lime → Night Blue (hero) */}
            <div className="absolute inset-0 bg-gradient-to-t from-curiosity-bg/90 via-curiosity-bg/30 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-5 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-curiosity-display text-curiosity-text text-xl leading-tight max-w-[80%] drop-shadow-md">
                  {game.title}
                </h4>
                <span className="text-xs font-mono text-curiosity-primary bg-curiosity-primary/10 px-2 py-1 rounded border border-curiosity-primary/20 backdrop-blur-sm">
                  {game.year}
                </span>
              </div>

              <div className="flex items-center justify-between mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                <span className="text-xs text-curiosity-text-secondary font-medium flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {game.playtime}
                </span>
                {/* Rating uses curiosity-primary (Lime) for stars */}
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < (game.rating || 0)
                          ? 'text-curiosity-primary fill-curiosity-primary'
                          : 'text-curiosity-text-secondary/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

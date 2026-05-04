import { favoriteGames } from '../../content/games';
import { motion } from 'framer-motion';

export function GamingShowcase() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white flex items-center gap-3">
        <span className="i-lucide-gamepad-2 text-curiosity-primary"></span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Gaming Collection
        </span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {favoriteGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="group relative h-56 rounded-2xl overflow-hidden border border-white/10 hover:border-curiosity-primary/50 transition-all duration-500 shadow-lg hover:shadow-curiosity-primary/20"
          >
            {/* Background Image */}
            <img
              src={game.image}
              alt={game.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-5 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-white text-xl leading-tight max-w-[80%] drop-shadow-md">
                  {game.title}
                </h4>
                <span className="text-xs font-mono text-curiosity-primary bg-curiosity-primary/10 px-2 py-1 rounded border border-curiosity-primary/20 backdrop-blur-sm">
                  {game.year}
                </span>
              </div>

              <div className="flex items-center justify-between mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                <span className="text-xs text-gray-300 font-medium flex items-center gap-1.5">
                  <span className="i-lucide-clock w-3 h-3" />
                  {game.playtime}
                </span>
                <span className="text-yellow-400 text-sm tracking-widest">
                  {game.rating}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

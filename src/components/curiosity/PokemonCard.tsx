import { useState } from 'react';
import { usePokemon } from '@/hooks/usePokemon';
import { motion } from 'framer-motion';

const getTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    fire: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    water: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    grass: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    electric: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    ice: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
    fighting: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    poison: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    ground: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    flying: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
    psychic: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
    bug: 'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-300',
    rock: 'bg-stone-100 text-stone-700 dark:bg-stone-900/30 dark:text-stone-300',
    ghost: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300',
    dragon: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
    dark: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300',
    steel: 'bg-gray-200 text-gray-800 dark:bg-gray-800/30 dark:text-gray-200',
    fairy: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
    normal: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300',
  };
  return colors[type] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
};

export function PokemonCard() {
  const [pokemonId, setPokemonId] = useState<number>(Math.floor(Math.random() * 151) + 1);

  const { data: pokemon, loading } = usePokemon(pokemonId);

  const handleNextPokemon = () => {
    setPokemonId(Math.floor(Math.random() * 151) + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-curiosity-text-secondary animate-pulse">
        Loading Pokémon...
      </div>
    );
  }

  if (!pokemon) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800 text-center"
    >
      <h3 className="text-lg font-bold mb-4 text-curiosity-text flex items-center justify-center gap-2">
        <span className="text-2xl">⚡</span>
        Mi Pokémon del Día
      </h3>

      {pokemon.sprites.front_default && (
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-32 h-32 mx-auto mb-4"
        />
      )}

      <h2 className="text-2xl font-bold capitalize mb-2 text-curiosity-text">{pokemon.name}</h2>
      <p className="text-sm text-curiosity-text-secondary mb-4">#{pokemon.id}</p>

      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="bg-white/50 dark:bg-curiosity-surface/50 rounded p-2 border border-blue-200 dark:border-blue-800">
          <p className="text-curiosity-text-secondary">Altura</p>
          <p className="font-bold text-curiosity-text">{(pokemon.height / 10).toFixed(1)}m</p>
        </div>
        <div className="bg-white/50 dark:bg-curiosity-surface/50 rounded p-2 border border-blue-200 dark:border-blue-800">
          <p className="text-curiosity-text-secondary">Peso</p>
          <p className="font-bold text-curiosity-text">{(pokemon.weight / 10).toFixed(1)}kg</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-curiosity-text-secondary mb-2">Tipos:</p>
        <div className="flex gap-2 justify-center flex-wrap">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(t.type.name)} capitalize`}
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNextPokemon}
        className="px-4 py-2 bg-curiosity-primary hover:bg-curiosity-accent text-curiosity-bg rounded-lg text-sm font-semibold transition-colors"
      >
        Siguiente Pokémon
      </motion.button>
    </motion.div>
  );
}

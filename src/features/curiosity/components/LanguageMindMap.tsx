// Implemented from DESIGN.md — Curiosity scope (Neon Observatory)
import { useState, useRef, useMemo, useCallback } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { useGitHubStats } from '@/features/github/hooks/useGitHubStats';
import { FALLBACK_GITHUB_STATS } from '@/features/github/data/fallbackGitHubStats';
import { LanguageIcon } from '@/components/ui/LanguageIcon';
import { CelestialIcon } from '@/components/icons/CustomIcons';
import { Zap, Sparkles, X, Orbit } from 'lucide-react';

interface NodeData {
  id: string;
  initialAngle: number;
  radius: number;
  speed: number;
  r: number;
  color: string;
  name: string;
  percentage: number;
  bytes: number;
  fact: string;
  category: string;
}

const LANGUAGE_FACTS: Record<string, { fact: string; category: string }> = {
  TypeScript: {
    fact: 'Superset of JavaScript with compile-time static types, crafted by Anders Hejlsberg (architect of C#).',
    category: 'Full-Stack & Systems',
  },
  JavaScript: {
    fact: 'Created in 10 days by Brendan Eich in 1995. The universal execution runtime of the modern web.',
    category: 'Interactive Web Core',
  },
  Python: {
    fact: "Named after Monty Python's Flying Circus. King of AI, data engineering, and automation scripting.",
    category: 'AI & Automation',
  },
  HTML: {
    fact: 'HyperText Markup Language, introduced by Tim Berners-Lee in 1993. The backbone of all document semantics.',
    category: 'Semantic Architecture',
  },
  CSS: {
    fact: 'Cascading Style Sheets, designed by Håkon Wium Lie in 1994 to liberate web presentation from markup.',
    category: 'Design Systems',
  },
  Vue: {
    fact: 'Progressive reactive framework created by Evan You after working on AngularJS at Google.',
    category: 'Reactive Frontend',
  },
  React: {
    fact: 'Declarative component architecture created by Jordan Walke at Facebook in 2011.',
    category: 'Component Architecture',
  },
  Java: {
    fact: 'Originally codenamed Oak for interactive set-top boxes; today powers billions of enterprise backends.',
    category: 'Enterprise Runtime',
  },
  'C#': {
    fact: 'Type-safe object-oriented language developed by Microsoft; powers Unity game engines and .NET ecosystems.',
    category: 'Systems & Game Engine',
  },
  Go: {
    fact: 'Conceived at Google by Rob Pike and Ken Thompson with CSP-style goroutines for massive network scale.',
    category: 'Concurrent Microservices',
  },
  Rust: {
    fact: 'Memory-safe systems language with affine types and zero-cost abstractions; voted most loved for years.',
    category: 'Systems & WebAssembly',
  },
  Shell: {
    fact: 'Direct POSIX interface to unix kernel pipelines, automation glue, and terminal craft.',
    category: 'CLI & Infrastructure',
  },
  PHP: {
    fact: 'Born as Personal Home Page tools by Rasmus Lerdorf; still fuels over 70% of web content engines.',
    category: 'Server-Side Web',
  },
  Ruby: {
    fact: 'Designed by Yukihiro Matsumoto to maximize developer happiness and poetic syntax elegance.',
    category: 'Web Applications',
  },
  Swift: {
    fact: 'Apple modern compiled language replacing Objective-C with safety, speed, and expressive generics.',
    category: 'Native Apple Platforms',
  },
  Kotlin: {
    fact: 'JetBrains modern JVM language; officially designated preferred tier for modern Android development.',
    category: 'Mobile & JVM',
  },
  Dart: {
    fact: 'Google client-optimized language compiled AOT for multiplatform rendering in Flutter apps.',
    category: 'Cross-Platform UI',
  },
};

// Deterministic static stars matching Curiosity color palette (white, periwinkle, pale chartreuse)
const STATIC_STARS = Array.from({ length: 60 }).map((_, i) => ({
  id: i,
  top: `${((i * 17 + 23) % 96) + 2}%`,
  left: `${((i * 31 + 47) % 96) + 2}%`,
  size: ((i * 7) % 3) + 1,
  delay: ((i * 11) % 40) / 10,
  duration: 2.5 + ((i * 13) % 30) / 10,
  color: i % 5 === 0 ? 'bg-[#d0d34d]' : i % 4 === 0 ? 'bg-[#c7cee8]' : 'bg-white',
  opacity: 0.25 + ((i * 9) % 55) / 100,
}));

const Starfield = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {STATIC_STARS.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full animate-pulse ${star.color}`}
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

// Orbital tracks in SVG format
const OrbitalTracks = ({ scale = 1 }: { scale?: number }) => {
  const radii = [130, 185, 240, 295];
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
      <defs>
        <radialGradient id="orbit-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d0d34d" stopOpacity="0.1" />
          <stop offset="60%" stopColor="#157954" stopOpacity="0.05" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50%" cy="50%" r={320 * scale} fill="url(#orbit-glow)" />
      {radii.map((r, idx) => (
        <circle
          key={idx}
          cx="50%"
          cy="50%"
          r={r * scale}
          fill="none"
          stroke="#c7cee8"
          strokeWidth="1"
          strokeDasharray="4 8"
          className="transition-all"
        />
      ))}
    </svg>
  );
};

// Kinetic planet component responding to orbits and shockwave
function Planet({
  node,
  onHover,
  onSelect,
  isSelected,
  shockwaveTime,
  scaleFactor = 1,
}: {
  node: NodeData;
  onHover: (node: NodeData | null) => void;
  onSelect: (node: NodeData) => void;
  isSelected: boolean;
  shockwaveTime: number;
  scaleFactor?: number;
}) {
  const angle = useMotionValue(node.initialAngle);
  const radiusOffset = useMotionValue(0);
  const scaleImpulse = useMotionValue(1);

  useAnimationFrame((_t, delta) => {
    // Orbital rotation
    const angleDelta = (node.speed * delta) / 16;
    angle.set(angle.get() + angleDelta);

    // Shockwave physical blast wave
    const effectiveRadius = node.radius * scaleFactor;
    if (shockwaveTime > 0) {
      const now = performance.now();
      const timeSinceShock = now - shockwaveTime;
      const waveSpeed = 0.58; // px/ms
      const waveDistance = timeSinceShock * waveSpeed;

      const dist = Math.abs(waveDistance - effectiveRadius);
      if (dist < 60) {
        const factor = (60 - dist) / 60;
        radiusOffset.set(factor * 34);
        scaleImpulse.set(1 + factor * 0.35);
      } else {
        radiusOffset.set(radiusOffset.get() * 0.92);
        scaleImpulse.set(1 + (scaleImpulse.get() - 1) * 0.88);
      }
    }
  });

  const effectiveRadius = node.radius * scaleFactor;
  const x = useTransform([angle, radiusOffset], (values) => {
    const [a, rOff] = values as number[];
    return Math.cos(a) * (effectiveRadius + rOff) - node.r;
  });
  const y = useTransform([angle, radiusOffset], (values) => {
    const [a, rOff] = values as number[];
    return Math.sin(a) * (effectiveRadius + rOff) - node.r;
  });

  return (
    <motion.div
      style={{
        x,
        y,
        left: '50%',
        top: '50%',
        scale: scaleImpulse,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: isSelected ? 1.25 : 1, opacity: 1 }}
      whileHover={{ scale: 1.3, zIndex: 60 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => onHover(node)}
      onHoverEnd={() => onHover(null)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node);
      }}
      className="absolute rounded-full cursor-pointer flex items-center justify-center group focus:outline-none"
      role="button"
      tabIndex={0}
      aria-label={`Inspect ${node.name} telemetry (${node.percentage}%)`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(node);
        }
      }}
    >
      {/* Selected targeting reticle */}
      {isSelected && (
        <motion.div
          initial={{ scale: 1.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute -inset-3 rounded-full border-2 border-dashed border-curiosity-primary pointer-events-none animate-spin-slow"
        />
      )}

      <div
        style={{
          width: node.r * 2,
          height: node.r * 2,
          backgroundColor: '#161a29',
          border: `2px solid ${node.color}`,
          boxShadow: isSelected
            ? `0 0 24px ${node.color}, 0 0 8px #d0d34d`
            : `0 0 14px ${node.color}50`,
          borderRadius: '50%',
        }}
        className="relative flex items-center justify-center transition-shadow duration-300"
      >
        {/* Glow halo */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: `0 0 28px ${node.color}`,
          }}
        />

        {/* Language Icon */}
        <div className="w-1/2 h-1/2 relative z-10 opacity-90 group-hover:opacity-100 transition-opacity">
          <LanguageIcon language={node.name} />
        </div>

        {/* Subtle name badge */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
          <span className="text-white text-xs font-mono font-medium bg-[#161a29]/90 px-2 py-0.5 rounded-full border border-curiosity-secondary/30 backdrop-blur-sm shadow-md">
            {node.name} <span className="text-curiosity-primary font-bold">{node.percentage}%</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Particle spark radiating from the singularity explosion
interface Spark {
  id: number;
  angle: number;
  distance: number;
  size: number;
  color: string;
}

export function LanguageMindMap(): JSX.Element {
  const { data } = useGitHubStats();
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shockwaveTime, setShockwaveTime] = useState<number>(0);
  const [isPulsing, setIsPulsing] = useState<boolean>(false);
  const [sparks, setSparks] = useState<Spark[]>([]);

  // Choose active dataset: live data if available, fallback data for local dev / preview
  const activeDataset = useMemo(() => {
    if (data?.allLanguages && data.allLanguages.length > 0) {
      return data.allLanguages;
    }
    return FALLBACK_GITHUB_STATS.allLanguages;
  }, [data]);

  // Initialize or re-index nodes with pure useMemo
  const nodes = useMemo<NodeData[]>(() => {
    const rawLangs = activeDataset;
    if (!rawLangs || rawLangs.length === 0) return [];

    return rawLangs.map((lang, i) => {
      const initialAngle = (i / rawLangs.length) * Math.PI * 2;
      // Staggered radii from 135 to 290 px
      const radius = 135 + (i % 4) * 48 + (i % 2 === 0 ? 12 : -8);
      const baseSpeed = 0.0006 + (i % 3) * 0.0003;
      const speed = i % 2 === 0 ? baseSpeed : -baseSpeed;

      // Size scaled with log of bytes
      const r = Math.max(24, Math.min(42, 22 + Math.log(lang.bytes || 1000) * 2));
      const meta = LANGUAGE_FACTS[lang.name] || {
        fact: 'A powerful tool in the developer galaxy for crafting resilient software.',
        category: 'Core Language',
      };

      return {
        id: lang.name,
        initialAngle,
        radius,
        speed,
        r,
        color: lang.color || '#3178c6',
        name: lang.name,
        percentage: lang.count,
        bytes: lang.bytes,
        fact: meta.fact,
        category: meta.category,
      };
    });
  }, [activeDataset]);

  // Trigger cosmic shockwave and particle sparks on click
  const triggerShockwave = useCallback(() => {
    const now = performance.now();
    setShockwaveTime(now);
    setIsPulsing(true);

    // Generate radial celestial spark burst
    const colors = ['#d0d34d', '#2cc295', '#c7cee8', '#00df81', '#ffffff'];
    const newSparks: Spark[] = Array.from({ length: 22 }).map((_, i) => ({
      id: now + i,
      angle: (i / 22) * Math.PI * 2 + (Math.random() - 0.5) * 0.25,
      distance: 280 + Math.random() * 260,
      size: Math.random() * 3 + 2,
      color: colors[i % colors.length],
    }));
    setSparks(newSparks);

    setTimeout(() => {
      setIsPulsing(false);
    }, 2200);
  }, []);

  const activeInspectorNode = selectedNode || hoveredNode;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[620px] md:h-[680px] rounded-3xl overflow-hidden border border-curiosity-secondary/20 shadow-2xl select-none"
      style={{
        background:
          'radial-gradient(circle at 50% 50%, rgba(208, 211, 77, 0.07) 0%, rgba(21, 121, 84, 0.12) 32%, rgba(33, 38, 58, 0.88) 65%, #151928 100%)',
      }}
      onClick={() => setSelectedNode(null)}
    >
      {/* Background Starfield */}
      <Starfield />

      {/* Orbital Guides */}
      <OrbitalTracks scale={1} />

      {/* Top Observatory Control Bar */}
      <div className="absolute top-5 left-6 right-6 z-40 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2.5 bg-[#161a29]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-curiosity-secondary/20 shadow-sm pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-curiosity-primary animate-pulse" />
          <span className="text-xs font-mono text-curiosity-text uppercase tracking-wider">
            Neon Observatory
          </span>
          <span className="text-[10px] font-mono text-curiosity-text-secondary border-l border-white/10 pl-2">
            RA 14h 29m // DEC -62°40'
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              triggerShockwave();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-curiosity-primary/10 hover:bg-curiosity-primary/20 text-curiosity-primary border border-curiosity-primary/30 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-curiosity-primary/50"
            title="Unleash cosmic gravitational pulse"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Pulse Core</span>
          </button>

          {data?.isFallback !== false ? (
            <span
              className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-curiosity-secondary/10 text-curiosity-secondary border border-curiosity-secondary/30"
              title="Running with curated local telemetry archive (activates live GitHub sync when VITE_GITHUB_TOKEN is configured)"
            >
              Local Archive
            </span>
          ) : (
            <span
              className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-curiosity-accent/20 text-curiosity-text border border-curiosity-accent/40"
              title="Synchronized live with GitHub GraphQL API"
            >
              GitHub Live
            </span>
          )}
        </div>
      </div>

      {/* Dynamic Gravitational Wave Pulses */}
      <AnimatePresence>
        {isPulsing && (
          <>
            {/* Primary Shockwave Ring (Lime Chartreuse) */}
            <motion.div
              key={`shockwave-primary-${shockwaveTime}`}
              initial={{ width: 0, height: 0, opacity: 1, borderWidth: 4 }}
              animate={{
                width: 1300,
                height: 1300,
                opacity: 0,
                borderWidth: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-curiosity-primary z-10 pointer-events-none"
              style={{
                boxShadow:
                  '0 0 40px rgba(208, 211, 77, 0.6), inset 0 0 20px rgba(208, 211, 77, 0.3)',
              }}
            />

            {/* Secondary Ripple Ring (Emerald) */}
            <motion.div
              key={`shockwave-secondary-${shockwaveTime}`}
              initial={{ width: 0, height: 0, opacity: 0.8, borderWidth: 3 }}
              animate={{
                width: 1400,
                height: 1400,
                opacity: 0,
                borderWidth: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-curiosity-accent z-10 pointer-events-none"
              style={{
                boxShadow: '0 0 50px rgba(21, 121, 84, 0.7)',
              }}
            />

            {/* Radial Starlight Spark Burst */}
            {sparks.map((spark) => (
              <motion.div
                key={spark.id}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1.5,
                }}
                animate={{
                  x: Math.cos(spark.angle) * spark.distance,
                  y: Math.sin(spark.angle) * spark.distance,
                  opacity: 0,
                  scale: 0.2,
                }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-1/2 left-1/2 rounded-full pointer-events-none z-10"
                style={{
                  width: spark.size,
                  height: spark.size,
                  backgroundColor: spark.color,
                  boxShadow: `0 0 10px ${spark.color}`,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Singularity Core (Clickable Black Hole Engine) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center cursor-pointer group focus:outline-none"
        onClick={(e) => {
          e.stopPropagation();
          triggerShockwave();
        }}
        role="button"
        tabIndex={0}
        aria-label="Click core to unleash gravitational shockwave"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            triggerShockwave();
          }
        }}
      >
        <motion.div
          animate={
            isPulsing
              ? {
                scale: [1, 0.82, 1.28, 0.96, 1],
                filter: ['brightness(1)', 'brightness(2.2)', 'brightness(1.6)', 'brightness(1)'],
              }
              : { scale: 1 }
          }
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-44 h-44 flex items-center justify-center"
        >
          {/* Gravitational Lens Aura */}
          <div className="absolute inset-0 rounded-full bg-curiosity-primary/10 blur-2xl group-hover:bg-curiosity-primary/25 transition-colors duration-500" />

          {/* Outer Accretion Disk (Lime Chartreuse) */}
          <div
            className="absolute inset-1 rounded-full border-4 border-t-curiosity-primary/90 border-r-transparent border-b-curiosity-accent/70 border-l-transparent animate-spin-slow blur-[1px]"
            style={{
              filter: 'drop-shadow(0 0 12px rgba(208, 211, 77, 0.6))',
            }}
          />

          {/* Counter-rotating Inner Accretion Disk (Emerald) */}
          <div
            className="absolute inset-5 rounded-full border-2 border-b-curiosity-primary/80 border-l-transparent border-t-curiosity-secondary/70 border-r-transparent animate-spin-reverse-slow"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(21, 121, 84, 0.7))',
            }}
          />

          {/* Event Horizon Lens */}
          <div className="relative w-28 h-28 bg-[#0c0f17] rounded-full shadow-[0_0_50px_rgba(208,211,77,0.4)] border border-curiosity-secondary/20 flex flex-col items-center justify-center overflow-hidden z-20 group-hover:scale-105 group-active:scale-95 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-[#121624] via-curiosity-primary/10 to-[#0c0f17]" />
            <CelestialIcon
              size={42}
              className="z-30 text-curiosity-primary opacity-90 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </motion.div>

        {/* Core Prompt */}
        <div className="mt-3 text-center">
          <span className="text-xs font-mono tracking-widest text-curiosity-text-secondary group-hover:text-curiosity-primary transition-colors uppercase">
            Programming Logic
          </span>
        </div>
      </div>

      {/* Orbiting Language Planets */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {nodes.map((node) => (
          <div key={node.id} className="pointer-events-auto">
            <Planet
              node={node}
              onHover={setHoveredNode}
              onSelect={setSelectedNode}
              isSelected={selectedNode?.id === node.id}
              shockwaveTime={shockwaveTime}
            />
          </div>
        ))}
      </div>

      {/* Telemetry Inspector HUD */}
      <div className="absolute bottom-6 left-6 z-40 max-w-sm pointer-events-none">
        <AnimatePresence mode="wait">
          {activeInspectorNode ? (
            <motion.div
              key={activeInspectorNode.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-[#161a29]/90 backdrop-blur-xl border border-curiosity-secondary/30 rounded-2xl p-5 shadow-2xl pointer-events-auto"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl p-2 border flex items-center justify-center shadow-inner"
                    style={{
                      borderColor: `${activeInspectorNode.color}60`,
                      backgroundColor: `${activeInspectorNode.color}15`,
                    }}
                  >
                    <LanguageIcon language={activeInspectorNode.name} />
                  </div>
                  <div>
                    <h3 className="text-lg font-curiosity-display text-white font-semibold leading-tight">
                      {activeInspectorNode.name}
                    </h3>
                    <span className="text-xs font-mono text-curiosity-text-secondary">
                      {activeInspectorNode.category}
                    </span>
                  </div>
                </div>

                {selectedNode && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNode(null);
                    }}
                    className="text-curiosity-text-secondary hover:text-white p-1 rounded-md transition-colors"
                    title="Release target lock"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1">
                    <span className="text-curiosity-text-secondary">Codebase Share</span>
                    <span className="text-curiosity-primary font-bold">
                      {activeInspectorNode.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(activeInspectorNode.percentage, 4)}%` }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: activeInspectorNode.color }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs font-mono pt-2 border-t border-white/10">
                  <span className="text-curiosity-text-secondary">Volume</span>
                  <span className="text-white">
                    {(activeInspectorNode.bytes / 1024).toFixed(1)} KB
                  </span>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <p className="text-xs font-curiosity-body text-curiosity-text-secondary leading-relaxed italic">
                    "{activeInspectorNode.fact}"
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="observatory-idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-[#161a29]/80 backdrop-blur-md border border-curiosity-secondary/20 rounded-2xl p-4 shadow-xl pointer-events-auto"
            >
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-curiosity-primary">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="uppercase tracking-wider">Galaxy Inspector</span>
              </div>
              <p className="text-xs font-curiosity-body text-curiosity-text-secondary leading-relaxed">
                Click the central core to fire a gravitational pulse, or click any planet to lock
                telemetry.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                {nodes.slice(0, 4).map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNode(n);
                    }}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-1 transition-colors"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: n.color }}
                    />
                    <span>{n.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom-right interactive hint */}
      <div className="absolute bottom-5 right-6 text-right pointer-events-none hidden sm:block">
        <p className="text-xs font-mono text-curiosity-secondary/70">
          <Orbit className="w-3.5 h-3.5 inline mr-1 text-curiosity-primary" />
          {nodes.length} Planetary Bodies in Orbit
        </p>
        <p className="text-[11px] font-curiosity-body text-curiosity-text-secondary/60">
          Interactive WebGL-free CSS/Canvas Simulation
        </p>
      </div>
    </div>
  );
}

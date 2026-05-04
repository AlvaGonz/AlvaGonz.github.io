import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useGitHubStats } from '@/hooks/useGitHubStats';
import { LanguageIcon } from '../ui/LanguageIcon';

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
}

const LANGUAGE_FACTS: Record<string, string> = {
    TypeScript: "A superset of JavaScript that adds static types. It was created by Anders Hejlsberg, who also designed C#.",
    JavaScript: "Created in just 10 days by Brendan Eich in 1995. It's the only language that runs natively in web browsers.",
    Python: "Named after Monty Python's Flying Circus, not the snake. It emphasizes code readability and simplicity.",
    HTML: "The standard markup language for documents designed to be displayed in a web browser. It was created by Tim Berners-Lee.",
    CSS: "Describes how HTML elements are to be displayed on screen, paper, or in other media. It saves a lot of work.",
    Vue: "A progressive framework for building user interfaces. It was created by Evan You after working at Google.",
    React: "A JavaScript library for building user interfaces. It was created by Jordan Walke at Facebook.",
    Java: "Originally named Oak, it was designed for interactive television. It runs on 3 billion devices.",
    'C#': "A modern, object-oriented language developed by Microsoft. It's widely used for game development with Unity.",
    Go: "Designed at Google to improve programming productivity. It's known for its efficiency and concurrency.",
    Rust: "Focuses on safety and performance. It was voted the most loved programming language for several years.",
    Shell: "A command-line interpreter that provides a user interface for the Unix-like operating systems.",
    PHP: "Originally stood for Personal Home Page. It powers a significant portion of the web, including WordPress.",
    Ruby: "Designed to make programming happy and productive. It's known for its elegant syntax.",
    Swift: "Created by Apple for iOS and macOS development. It's designed to be safe, fast, and interactive.",
    Kotlin: "A modern language for the JVM. It's now the preferred language for Android app development.",
    Dart: "Developed by Google, it's used to build mobile, desktop, server, and web applications.",
};

// Lightweight CSS Starfield
const Starfield = () => {
    // Generate static stars once
    const stars = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 3,
            duration: Math.random() * 3 + 2,
        }));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute rounded-full bg-white animate-pulse"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: star.size,
                        height: star.size,
                        opacity: Math.random() * 0.5 + 0.2,
                        animationDelay: `${star.delay}s`,
                        animationDuration: `${star.duration}s`,
                    }}
                />
            ))}
        </div>
    );
};

// Separate component for each planet to isolate animations
function Planet({ node, onHover, shockwaveTime }: { node: NodeData; onHover: (node: NodeData | null) => void; shockwaveTime: number }) {
    const angle = useMotionValue(node.initialAngle);
    const radiusOffset = useMotionValue(0);

    // Update angle on every animation frame
    useAnimationFrame((_t, delta) => {
        // Orbital movement
        const angleDelta = (node.speed * delta) / 16;
        angle.set(angle.get() + angleDelta);

        // Shockwave effect
        if (shockwaveTime > 0) {
            const now = performance.now();
            const timeSinceShock = now - shockwaveTime;
            const waveSpeed = 0.5; // Speed of the shockwave
            const waveDistance = timeSinceShock * waveSpeed;

            // If the wave hits the planet (with some width)
            const dist = Math.abs(waveDistance - node.radius);
            if (dist < 50) {
                // Push the planet out temporarily
                const push = (50 - dist) * 2; // Strength of the push
                radiusOffset.set(push);
            } else {
                // Return to normal orbit
                radiusOffset.set(radiusOffset.get() * 0.9);
            }
        }
    });

    // Calculate position relative to the center (0,0)
    const x = useTransform([angle, radiusOffset], (values) => {
        const [a, rOff] = values as number[];
        return Math.cos(a) * (node.radius + rOff) - node.r;
    });
    const y = useTransform([angle, radiusOffset], (values) => {
        const [a, rOff] = values as number[];
        return Math.sin(a) * (node.radius + rOff) - node.r;
    });

    return (
        <motion.div
            style={{ x, y, left: '50%', top: '50%' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.2, zIndex: 50 }}
            onHoverStart={() => onHover(node)}
            onHoverEnd={() => onHover(null)}
            className="absolute rounded-full shadow-lg cursor-pointer flex items-center justify-center group"
        >
            <div
                style={{
                    width: node.r * 2,
                    height: node.r * 2,
                    backgroundColor: 'rgba(10, 10, 20, 0.8)',
                    border: `2px solid ${node.color}`,
                    boxShadow: `0 0 15px ${node.color}40`,
                    borderRadius: '50%',
                }}
                className="relative flex items-center justify-center"
            >
                {/* Glow effect */}
                <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        boxShadow: `0 0 30px ${node.color}80`,
                    }}
                />

                {/* Icon */}
                <div className="w-1/2 h-1/2 relative z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                    <LanguageIcon language={node.name} />
                </div>

                {/* Label (Always visible but small) */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white/80 text-xs font-bold bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
                        {node.name}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

export function LanguageMindMap() {
    const { data, loading } = useGitHubStats();
    const [nodes, setNodes] = useState<NodeData[]>([]);
    const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [shockwaveTime, setShockwaveTime] = useState(0);
    const [shockwaveActive, setShockwaveActive] = useState(false);

    // Initialize Nodes with Orbit Data
    useEffect(() => {
        if (!data?.allLanguages) return;

        const newNodes: NodeData[] = data.allLanguages.map((lang, i) => {
            // Orbit parameters
            const initialAngle = (i / data.allLanguages.length) * Math.PI * 2; // Distribute evenly
            const radius = 150 + Math.random() * 150; // Random distance from black hole
            const baseSpeed = 0.0005 + Math.random() * 0.001;
            const speed = (baseSpeed * 1.3); // 30% faster

            // Size based on percentage (log scaleish)
            const r = Math.max(25, Math.min(60, 25 + Math.log(lang.bytes) * 4));

            return {
                id: lang.name,
                initialAngle,
                radius,
                speed: i % 2 === 0 ? speed : -speed, // Some orbit clockwise, some counter-clockwise
                r,
                color: lang.color,
                name: lang.name,
                percentage: lang.count,
                bytes: lang.bytes,
                fact: LANGUAGE_FACTS[lang.name] || "A powerful programming language in your arsenal.",
            };
        });

        setNodes(newNodes);
    }, [data]);

    const triggerShockwave = () => {
        setShockwaveActive(true);
        setShockwaveTime(performance.now());
        setTimeout(() => setShockwaveActive(false), 2000); // Reset visual after 2s
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-curiosity-primary"></div>
            </div>
        );
    }

    if (!data?.allLanguages) return null;

    return (
        <div className="relative w-full h-[600px] bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl" ref={containerRef}>
            {/* CSS Starfield Background */}
            <Starfield />

            {/* Shockwave Visual */}
            <AnimatePresence>
                {shockwaveActive && (
                    <motion.div
                        initial={{ width: 0, height: 0, opacity: 0.8, borderWidth: 10 }}
                        animate={{ width: 1000, height: 1000, opacity: 0, borderWidth: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-purple-500 z-0 pointer-events-none"
                        style={{ borderStyle: "solid" }}
                    />
                )}
            </AnimatePresence>

            {/* Black Hole Center */}
            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center cursor-pointer group"
                onClick={triggerShockwave}
            >
                <div className="relative w-40 h-40 flex items-center justify-center">
                    {/* Event Horizon Glow */}
                    <div className="absolute inset-0 rounded-full bg-purple-900/40 blur-xl animate-pulse group-hover:bg-purple-800/60 transition-colors"></div>

                    {/* Accretion Disk - Outer */}
                    <div className="absolute inset-0 rounded-full border-4 border-t-purple-500/80 border-r-transparent border-b-blue-500/80 border-l-transparent animate-spin-slow blur-[2px]"></div>

                    {/* Accretion Disk - Inner */}
                    <div className="absolute inset-4 rounded-full border-2 border-b-purple-400/80 border-l-transparent border-t-blue-400/80 border-r-transparent animate-spin-reverse-slow blur-[1px]"></div>

                    {/* Black Hole Core */}
                    <div className="relative w-24 h-24 bg-black rounded-full shadow-[0_0_60px_rgba(139,92,246,0.6)] border border-white/5 flex items-center justify-center overflow-hidden z-20 group-active:scale-95 transition-transform">
                        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black"></div>
                        <span className="text-3xl z-30 opacity-80 group-hover:scale-110 transition-transform">🌌</span>
                    </div>
                </div>
                <span className="mt-6 text-white/60 font-mono text-sm tracking-[0.2em] uppercase glow-text group-hover:text-white transition-colors">Programming Logic</span>
            </div>

            {/* Orbiting Nodes */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                {nodes.map((node) => (
                    <div key={node.id} className="pointer-events-auto">
                        <Planet node={node} onHover={setHoveredNode} shockwaveTime={shockwaveTime} />
                    </div>
                ))}
            </div>

            {/* Detail Panel (Appears on Hover) */}
            <AnimatePresence>
                {hoveredNode && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-6 left-6 z-50 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-xs shadow-2xl pointer-events-none"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-white/5 p-2 border border-white/10">
                                <LanguageIcon language={hoveredNode.name} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{hoveredNode.name}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: hoveredNode.color }} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-white/60 text-sm">Usage</span>
                                <span className="text-white font-mono font-bold">{hoveredNode.percentage}%</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${hoveredNode.percentage}%` }}
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: hoveredNode.color }}
                                />
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-white/10">
                                <span className="text-white/60 text-sm">Code Volume</span>
                                <span className="text-white/80 text-xs font-mono">
                                    {(hoveredNode.bytes / 1024).toFixed(1)} KB
                                </span>
                            </div>

                            {/* Curious Fact */}
                            <div className="pt-3 border-t border-white/10">
                                <p className="text-white/70 text-xs italic leading-relaxed">
                                    "{hoveredNode.fact}"
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute top-6 right-6 text-white/30 text-xs text-right pointer-events-none">
                <p>Click the core to unleash energy</p>
                <p>Hover to analyze matter</p>
            </div>
        </div>
    );
}

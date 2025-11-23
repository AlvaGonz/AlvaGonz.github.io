import { motion } from 'framer-motion';

export function FireStreakEffect() {
    const flames = Array.from({ length: 20 }, (_, i) => i);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            {flames.map((i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        left: `${(i / flames.length) * 100}%`,
                        bottom: '-10px',
                        width: '40px',
                        height: '60px',
                    }}
                    animate={{
                        y: [-60, -120, -60],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: 'easeInOut',
                    }}
                >
                    <div className="relative w-full h-full">
                        {/* Outer flame */}
                        <div className="absolute inset-0 bg-gradient-to-t from-orange-600 via-orange-400 to-yellow-300 rounded-full blur-sm" />
                        {/* Inner flame */}
                        <div className="absolute inset-2 bg-gradient-to-t from-red-500 via-orange-300 to-yellow-200 rounded-full blur-xs" />
                    </div>
                </motion.div>
            ))}

            {/* Top flames */}
            {flames.map((i) => (
                <motion.div
                    key={`top-${i}`}
                    className="absolute"
                    style={{
                        left: `${(i / flames.length) * 100}%`,
                        top: '-10px',
                        width: '40px',
                        height: '60px',
                    }}
                    animate={{
                        y: [60, 120, 60],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1 + 1,
                        ease: 'easeInOut',
                    }}
                >
                    <div className="relative w-full h-full rotate-180">
                        <div className="absolute inset-0 bg-gradient-to-t from-orange-600 via-orange-400 to-yellow-300 rounded-full blur-sm" />
                        <div className="absolute inset-2 bg-gradient-to-t from-red-500 via-orange-300 to-yellow-200 rounded-full blur-xs" />
                    </div>
                </motion.div>
            ))}

            {/* Side flames */}
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={`left-${i}`}
                    className="absolute"
                    style={{
                        left: '-10px',
                        top: `${(i / 10) * 100}%`,
                        width: '60px',
                        height: '40px',
                    }}
                    animate={{
                        x: [-60, -120, -60],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: 'easeInOut',
                    }}
                >
                    <div className="relative w-full h-full rotate-90">
                        <div className="absolute inset-0 bg-gradient-to-t from-orange-600 via-orange-400 to-yellow-300 rounded-full blur-sm" />
                        <div className="absolute inset-2 bg-gradient-to-t from-red-500 via-orange-300 to-yellow-200 rounded-full blur-xs" />
                    </div>
                </motion.div>
            ))}

            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={`right-${i}`}
                    className="absolute"
                    style={{
                        right: '-10px',
                        top: `${(i / 10) * 100}%`,
                        width: '60px',
                        height: '40px',
                    }}
                    animate={{
                        x: [60, 120, 60],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.15 + 0.5,
                        ease: 'easeInOut',
                    }}
                >
                    <div className="relative w-full h-full -rotate-90">
                        <div className="absolute inset-0 bg-gradient-to-t from-orange-600 via-orange-400 to-yellow-300 rounded-full blur-sm" />
                        <div className="absolute inset-2 bg-gradient-to-t from-red-500 via-orange-300 to-yellow-200 rounded-full blur-xs" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

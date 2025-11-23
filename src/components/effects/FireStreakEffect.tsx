export function FireStreakEffect() {
    return (
        <div className="absolute inset-[-8px] pointer-events-none z-0 overflow-visible">
            {/* Animated Fire Border Container */}
            <div className="absolute inset-0 z-0">
                {/* CSS-based Fire Animation Layer */}
                <div className="absolute inset-0 w-full h-full opacity-90 mix-blend-screen overflow-visible">
                    <style>
                        {`
                @keyframes fire-rise {
                    0% { transform: translateY(0) scale(1); opacity: 0; }
                    20% { opacity: 1; }
                    100% { transform: translateY(-60px) scale(0); opacity: 0; }
                }
                @keyframes flicker {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(0.98); }
                }
                `}
                    </style>

                    {/* Main Fire Gradient Border */}
                    <div className="absolute inset-0 rounded-2xl border-[8px] border-transparent"
                        style={{
                            background: 'linear-gradient(#58cc02, #58cc02) padding-box, linear-gradient(to top, #ff9600, #ff4b00) border-box',
                            mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude'
                        }}
                    />

                    {/* Rising Flames Particles */}
                    {[...Array(25)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute bottom-[-10px] w-5 h-8 bg-gradient-to-t from-[#ff4b00] to-[#ff9600] rounded-full blur-[2px]"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animation: `fire-rise ${0.7 + Math.random() * 0.5}s ease-out infinite`,
                                animationDelay: `${Math.random() * 0.6}s`,
                                opacity: 0
                            }}
                        />
                    ))}

                    {/* Inner Glow */}
                    <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_25px_#ff4b00] opacity-60 animate-[flicker_0.2s_infinite]" />
                </div>
            </div>
        </div>
    );
}

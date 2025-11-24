import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';

// Global flag to prevent multiple script injections
let apiLoadStarted = false;

export function NFSWidget() {
    const [isPlaying, setIsPlaying] = useState(false);
    const bmwSoundRef = useRef<any>(null);
    const fadeOutTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const fadeInTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const fadeInInterval = useRef<ReturnType<typeof setInterval> | null>(null);
    const fadeOutInterval = useRef<ReturnType<typeof setInterval> | null>(null);

    // Initialize YouTube player
    useEffect(() => {
        // Inject YouTube IFrame API script if not already present
        if (!window.YT) {
            if (!apiLoadStarted) {
                apiLoadStarted = true;
                const tag = document.createElement('script');
                tag.src = 'https://www.youtube.com/iframe_api';
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
            }
        }

        const initBmwPlayer = () => {
            if (window.YT && window.YT.Player && !bmwSoundRef.current) {
                try {
                    bmwSoundRef.current = new window.YT.Player('bmw-sound-player-widget', {
                        height: '0',
                        width: '0',
                        videoId: 'KCAXDAvmCWs', // BMW M3 GTR Straight Cut Gears Sound
                        playerVars: {
                            autoplay: 0,
                            controls: 0,
                            start: 0,
                            end: 15,
                            playsinline: 1,
                            enablejsapi: 1,
                            origin: window.location.origin,
                        },
                        events: {
                            onReady: (e: any) => {
                                e.target.setVolume(100);
                            },
                        },
                    });
                } catch (e) {
                    console.warn('BMW Player init failed', e);
                }
            }
        };

        if (window.YT && window.YT.Player) {
            initBmwPlayer();
        } else {
            const prevCallback = (window as any).onYouTubeIframeAPIReady;
            (window as any).onYouTubeIframeAPIReady = () => {
                if (prevCallback) prevCallback();
                initBmwPlayer();
            };
        }

        // Cleanup on unmount
        return () => {
            // Clear all timeouts
            if (fadeOutTimeout.current) {
                clearTimeout(fadeOutTimeout.current);
                fadeOutTimeout.current = null;
            }
            if (fadeInTimeout.current) {
                clearTimeout(fadeInTimeout.current);
                fadeInTimeout.current = null;
            }
            // Clear all intervals
            if (fadeInInterval.current) {
                clearInterval(fadeInInterval.current);
                fadeInInterval.current = null;
            }
            if (fadeOutInterval.current) {
                clearInterval(fadeOutInterval.current);
                fadeOutInterval.current = null;
            }
        };
    }, []);

    // Helper to fade volume with improved smoothness
    const fadeVolume = (
        player: any,
        start: number,
        end: number,
        duration: number,
        onComplete?: () => void
    ): ReturnType<typeof setInterval> | undefined => {
        if (!player || typeof player.setVolume !== 'function') {
            if (onComplete) onComplete();
            return undefined;
        }

        const steps = 30; // More steps for smoother fade
        const stepTime = duration / steps;
        let currentStep = 0;
        const delta = (end - start) / steps;
        
        // Ensure volume is clamped between 0 and 100
        const clampVolume = (vol: number) => Math.max(0, Math.min(100, vol));
        
        const interval = setInterval(() => {
            currentStep++;
            const newVol = clampVolume(Math.round(start + delta * currentStep));
            
            try {
                player.setVolume(newVol);
            } catch (e) {
                console.warn('Error setting volume:', e);
                clearInterval(interval);
                if (onComplete) onComplete();
                return;
            }
            
            if (currentStep >= steps) {
                clearInterval(interval);
                // Ensure final volume is set correctly
                try {
                    player.setVolume(clampVolume(end));
                } catch (e) {
                    console.warn('Error setting final volume:', e);
                }
                if (onComplete) onComplete();
            }
        }, stepTime);
        
        return interval;
    };

    const playSound = () => {
        if (bmwSoundRef.current && typeof bmwSoundRef.current.playVideo === 'function') {
            // Clear any existing timeouts and intervals
            if (fadeOutTimeout.current) {
                clearTimeout(fadeOutTimeout.current);
                fadeOutTimeout.current = null;
            }
            if (fadeInTimeout.current) {
                clearTimeout(fadeInTimeout.current);
                fadeInTimeout.current = null;
            }
            if (fadeInInterval.current) {
                clearInterval(fadeInInterval.current);
                fadeInInterval.current = null;
            }
            if (fadeOutInterval.current) {
                clearInterval(fadeOutInterval.current);
                fadeOutInterval.current = null;
            }
            
            setIsPlaying(true);
            
            // Start completely silent
            try {
                bmwSoundRef.current.setVolume(0);
                bmwSoundRef.current.seekTo(0);
                bmwSoundRef.current.playVideo();
            } catch (e) {
                console.warn('Error starting video:', e);
                setIsPlaying(false);
                return;
            }

            // Wait a tiny bit for video to start, then fade in smoothly over 1.5s
            fadeInTimeout.current = setTimeout(() => {
                if (bmwSoundRef.current) {
                    fadeInInterval.current = fadeVolume(bmwSoundRef.current, 0, 100, 1500, () => {
                        // Clear interval reference after completion
                        fadeInInterval.current = null;
                    }) || null;
                }
            }, 100);

            // Start fade out at 13.5s (to complete fade out by 15s), then pause
            fadeOutTimeout.current = setTimeout(() => {
                if (bmwSoundRef.current) {
                    fadeOutInterval.current = fadeVolume(bmwSoundRef.current, 100, 0, 1500, () => {
                        try {
                            if (bmwSoundRef.current) {
                                bmwSoundRef.current.pauseVideo();
                                bmwSoundRef.current.setVolume(0);
                            }
                        } catch (e) {
                            console.warn('Error pausing video:', e);
                        }
                        setIsPlaying(false);
                        // Clear interval reference after completion
                        fadeOutInterval.current = null;
                    }) || null;
                }
            }, 13500); // Start fade out at 13.5s for 1.5s fade = 15s total
        }
    };

    return (
        <div className="relative">
            {/* Hidden YouTube player */}
            <div id="bmw-sound-player-widget" className="hidden" />

            <FadeInOnScroll variant="scale">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative overflow-hidden rounded-2xl bg-[#0c1214] border border-blue-500/30 shadow-2xl group cursor-pointer"
                    onClick={playSound}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src="/images/bmw-m3-gtr-nfs-hd-02.jpg"
                            alt="BMW M3 GTR"
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 h-full flex flex-col justify-end min-h-[300px]">
                        <div className="mb-auto flex items-start justify-between w-full">
                            <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">
                                NFS MW'S LEGENDARY RIDE
                            </span>
                            <img
                                src="/images/nfsmw-logo.png"
                                alt="NFS Most Wanted"
                                className="h-16 w-auto opacity-90 group-hover:opacity-100 transition-opacity rounded-lg"
                            />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                            BMW M3 GTR
                            {isPlaying && (
                                <span className="flex h-3 w-3 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500" />
                                </span>
                            )}
                        </h3>

                        <p className="text-gray-300 text-sm mb-4">
                            The straight-cut gears. The V8 whine. The most iconic car in racing game history.
                            Click to hear the beast roar.
                        </p>

                        <div className="flex items-center gap-4 text-xs text-blue-300 font-mono">
                            <span className="flex items-center gap-1">
                                <span className="i-lucide-gauge" /> 380 km/h
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="i-lucide-zap" /> 4.0L V8
                            </span>
                        </div>
                    </div>
                </motion.div>
            </FadeInOnScroll>
        </div>
    );
}

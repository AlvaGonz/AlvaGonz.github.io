import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';

// Global flag to prevent multiple script injections
let apiLoadStarted = false;

export function NFSWidget() {
    const [isPlaying, setIsPlaying] = useState(false);
    const bmwSoundRef = useRef<any>(null);

    useEffect(() => {
        // Inject YouTube API script if not present
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
            const prevCallback = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = () => {
                if (prevCallback) prevCallback();
                initBmwPlayer();
            };
        }
    }, []);

    const playSound = () => {
        if (bmwSoundRef.current && typeof bmwSoundRef.current.playVideo === 'function') {
            setIsPlaying(true);
            bmwSoundRef.current.seekTo(0);
            bmwSoundRef.current.setVolume(100);
            bmwSoundRef.current.playVideo();

            // Stop after 15 seconds
            setTimeout(() => {
                bmwSoundRef.current.pauseVideo();
                setIsPlaying(false);
            }, 15000);
        }
    };

    return (
        <div className="relative">
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

                    <div className="relative z-10 p-6 h-full flex flex-col justify-end min-h-[300px]">
                        <div className="mb-auto">
                            <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30 mb-2">
                                LEGENDARY RIDE
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                            BMW M3 GTR
                            {isPlaying && (
                                <span className="flex h-3 w-3 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                                </span>
                            )}
                        </h3>

                        <p className="text-gray-300 text-sm mb-4">
                            The straight-cut gears. The V8 whine. The most iconic car in racing game history.
                            Click to hear the beast roar.
                        </p>

                        <div className="flex items-center gap-4 text-xs text-blue-300 font-mono">
                            <span className="flex items-center gap-1">
                                <span className="i-lucide-gauge"></span> 380 km/h
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="i-lucide-zap"></span> 4.0L V8
                            </span>
                        </div>
                    </div>
                </motion.div>
            </FadeInOnScroll>
        </div>
    );
}

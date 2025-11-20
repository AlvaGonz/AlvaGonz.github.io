import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface BackgroundMusicProps {
  visible: boolean;
}

export function BackgroundMusic({ visible }: BackgroundMusicProps): JSX.Element {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('bg-music-player', {
        height: '0',
        width: '0',
        videoId: 'vVxJgEslixc',
        playerVars: {
          'autoplay': 1,
          'controls': 0,
          'loop': 1,
          'playlist': 'vVxJgEslixc',
          'playsinline': 1
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    };

    // If API is already loaded
    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady?.();
    }
  }, []);

  const onPlayerReady = (event: any) => {
    event.target.setVolume(20);
    setIsPlaying(true);
  };

  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  // Auto-play on first interaction if not playing
  useEffect(() => {
    const handleInteraction = () => {
      if (playerRef.current && typeof playerRef.current.playVideo === 'function' && !isPlaying) {
        playerRef.current.playVideo();
      }
    };

    window.addEventListener('click', handleInteraction, { once: true });
    return () => window.removeEventListener('click', handleInteraction);
  }, [isPlaying]);

  if (!visible) return <div id="bg-music-player" className="hidden" />;

  return (
    <>
      <div id="bg-music-player" className="hidden" />
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white hover:bg-black/70 transition-colors"
        onClick={togglePlay}
      >
        {isPlaying ? (
          <>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium">Playing</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
          </>
        ) : (
          <>
            <span className="h-3 w-3 rounded-full bg-gray-500"></span>
            <span className="text-sm font-medium">Paused</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
          </>
        )}
      </motion.button>
    </>
  );
}

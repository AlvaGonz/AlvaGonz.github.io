import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface BackgroundMusicProps {
  visible: boolean;
}

let apiLoadStarted = false;

export function BackgroundMusic({ visible }: BackgroundMusicProps): JSX.Element {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!window.YT) {
      if (!apiLoadStarted) {
        apiLoadStarted = true;
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }
    }

    const initPlayer = () => {
      if (!playerRef.current) {
        playerRef.current = new window.YT.Player('bg-music-player', {
          height: '0',
          width: '0',
          videoId: 'vVxJgEslixc',
          playerVars: {
            'autoplay': 0, // No auto-play, user must click
            'controls': 0,
            'loop': 1,
            'playlist': 'vVxJgEslixc',
            'playsinline': 1,
            'origin': window.location.origin
          },
          events: {
            'onReady': (e: any) => e.target.setVolume(30),
            'onStateChange': onPlayerStateChange,
            'onError': (e: any) => console.error('YT Error:', e)
          }
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };
    }
  }, []);

  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (!playerRef.current || typeof playerRef.current.playVideo !== 'function') return;
    
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  // Ensure visibility doesn't stop music if user started it, 
  // BUT user asked for music ONLY in Curiosity view via "visible" prop usage in parent.
  // If we want strictly "click to play", we respect the toggle.
  useEffect(() => {
    if (!visible && playerRef.current && isPlaying) {
      playerRef.current.pauseVideo();
    }
  }, [visible]);

  if (!visible) return <div id="bg-music-player" className="hidden" />;

  return (
    <>
      <div id="bg-music-player" className="hidden" />
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-black/60 backdrop-blur-md px-5 py-3 rounded-full border border-white/10 text-white hover:bg-black/80 transition-all shadow-2xl group cursor-pointer"
        onClick={togglePlay}
      >
        {isPlaying ? (
          <>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium">Playing</span>
            {/* Pause Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
          </>
        ) : (
          <>
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="text-sm font-medium">Paused</span>
            {/* Play Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </>
        )}
      </motion.button>
    </>
  );
}

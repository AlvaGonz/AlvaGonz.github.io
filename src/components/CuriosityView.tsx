import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { PSPBackground } from './PSPBackground';

export function CuriosityView(): JSX.Element {
  const [clicks, setClicks] = useState(0);
  const [showBSOD, setShowBSOD] = useState(false);
  const bmwSoundRef = useRef<any>(null);

  // Load BMW Sound (separate player)
  useEffect(() => {
    const initBmwPlayer = () => {
      // Ensure window.YT is available
      if (window.YT && window.YT.Player) {
         try {
            bmwSoundRef.current = new window.YT.Player('bmw-sound-player', {
              height: '0',
              width: '0',
        videoId: 'KCAXDAvmCWs', // BMW M3 GTR Straight Cut Gears Sound
        playerVars: {
          'autoplay': 0,
          'controls': 0,
          'start': 0, // Start from beginning
          'end': 15, // Play for 15 seconds
          'playsinline': 1
        },
              events: {
                'onReady': (e: any) => e.target.setVolume(100)
              }
            });
         } catch (e) {
           console.error("BMW Player init failed", e);
         }
      }
    };

    // Retry init if YT not ready immediately
    if (window.YT && window.YT.Player) {
      initBmwPlayer();
    } else {
      // Poll or wait for event (BackgroundMusic handles the script load)
      const interval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          initBmwPlayer();
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, []);

  const passions = [
    {
      id: 'jesus',
      title: 'Jesus',
      icon: '✝️',
      desc: 'The foundation of my life and values.',
      image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=800&auto=format&fit=crop',
      color: 'from-yellow-400/80 to-orange-500/80',
    },
    {
      id: 'ai',
      title: 'AI & Ethics',
      icon: '🤖',
      desc: 'Exploring the moral implications of artificial intelligence.',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
      color: 'from-cyan-400/80 to-blue-600/80',
    },
    {
      id: 'bmw',
      title: 'BMW M3 GTR',
      icon: '🏎️',
      desc: 'The legendary hero car from NFSMW. Pure engineering art.',
      image: '/images/bmw-m3-gtr-nfs-hd-02.jpg',
      color: 'from-blue-700/80 to-blue-900/80',
      isSound: true,
    },
    {
      id: 'gaming',
      title: 'NFS: Most Wanted',
      icon: '🎮',
      desc: 'More than a game, a masterpiece of chase and speed.',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
      color: 'from-yellow-600/80 to-red-700/80',
    },
    {
      id: 'pc',
      title: 'Tech Tinkering',
      icon: '🔨',
      desc: 'Expert at "fixing" computers... sometimes by breaking them first (jk).',
      image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=800&auto=format&fit=crop',
      color: 'from-green-400/80 to-emerald-600/80',
      isInteractive: true,
    },
  ];

  const handleCardClick = (passion: any) => {
    // Tech Tinkering Easter Egg
    if (passion.id === 'pc') {
      const newClicks = clicks + 1;
      setClicks(newClicks);
      if (newClicks >= 5) {
        triggerBSOD();
        setClicks(0);
      }
    }

    // BMW Sound Easter Egg
    if (passion.id === 'bmw') {
      if (bmwSoundRef.current && typeof bmwSoundRef.current.playVideo === 'function') {
        // If player is ready, play.
        bmwSoundRef.current.seekTo(0);
        bmwSoundRef.current.playVideo();
      } else {
         // Fallback: Just log error, don't redirect user
         console.warn('BMW Sound Player not ready');
      }
    }
  };

  const triggerBSOD = () => {
    setShowBSOD(true);
    setTimeout(() => setShowBSOD(false), 4000);
  };

  return (
    <div className="min-h-screen p-8 md:p-16 relative">
      <PSPBackground />
      <div id="bmw-sound-player" className="hidden" />
      
      {/* BSOD Overlay */}
      <AnimatePresence>
        {showBSOD && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0078d7] text-white font-mono p-10 md:p-20 flex flex-col justify-center items-start cursor-none"
          >
            <div className="text-8xl mb-8">:(</div>
            <h2 className="text-2xl md:text-4xl mb-8">
              Your PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for you.
            </h2>
            <p className="text-xl mb-4">0% complete</p>
            <div className="mt-8">
              <p>Stop code: CRITICAL_PROCESS_DIED</p>
              <p>What failed: user_patience.sys</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
            Curiosity
          </h2>
          <p className="text-xl text-secondary-pistachio">
            A glimpse into what drives me beyond code.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {passions.map((passion, index) => (
            <motion.div
              key={passion.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              onClick={() => handleCardClick(passion)}
              className={clsx(
                "relative overflow-hidden rounded-2xl h-80 shadow-xl group cursor-pointer select-none",
                (passion.isInteractive || passion.isSound) && "active:scale-95"
              )}
            >
              {/* Background Image */}
              <div className="absolute inset-0 bg-gray-800">
                 <img 
                  src={passion.image} 
                  alt={passion.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback if image load fails
                    e.currentTarget.src = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop";
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${passion.color} opacity-90 group-hover:opacity-70 transition-opacity duration-500`} />
              </div>
              
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <div className="text-5xl mb-4 transform group-hover:-translate-y-2 transition-transform duration-300">{passion.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2 transform group-hover:-translate-y-1 transition-transform duration-300">
                  {passion.title}
                </h3>
                <p className="text-white/90 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {passion.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <p className="text-center text-secondary-stone mt-12 text-sm opacity-50">
          Psst... try clicking the hammer a few times or revving the engine.
        </p>
      </div>
    </div>
  );
}

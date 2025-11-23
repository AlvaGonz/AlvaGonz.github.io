import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { PassionModal, PassionContent } from './PassionModal';
import { AboutCuriosity } from './sections/AboutCuriosity';
import { Roadmap } from './sections/Roadmap';
import { AnimatedBg } from './svg/AnimatedBg';
import { HeroIcon } from './svg/HeroIcon';
import { FloatingElements } from './svg/FloatingElements';
import { HeroCuriosity } from './sections/HeroCuriosity';
import { FadeInOnScroll } from './animations/FadeInOnScroll';
import { SpotifyNowPlaying } from './curiosity/SpotifyNowPlaying';
import { getDuolingoStats, DuolingoUser } from '../services/duolingo';
import { FireStreakEffect } from './effects/FireStreakEffect';

// Global flag to prevent multiple script injections
let apiLoadStarted = false;



export function CuriosityView(): JSX.Element {
  const [showBSOD, setShowBSOD] = useState(false);
  const [selectedPassion, setSelectedPassion] = useState<PassionContent | null>(null);
  const [duolingoStats, setDuolingoStats] = useState<DuolingoUser | null>(null);

  const bmwSoundRef = useRef<any>(null);

  useEffect(() => {
    getDuolingoStats().then(setDuolingoStats);
  }, []);

  // Load BMW Sound (separate player)
  useEffect(() => {
    // Inject YouTube API script if not present
    if (!window.YT) {
      if (!apiLoadStarted) {
        apiLoadStarted = true;
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }
    }

    const initBmwPlayer = () => {
      // Ensure window.YT is available
      if (window.YT && window.YT.Player && !bmwSoundRef.current) {
        try {
          bmwSoundRef.current = new window.YT.Player('bmw-sound-player', {
            height: '0',
            width: '0',
            videoId: 'KCAXDAvmCWs', // BMW M3 GTR Straight Cut Gears Sound
            playerVars: {
              'autoplay': 0, // Disable autoplay
              'controls': 0,
              'start': 0, // Start from beginning
              'end': 15, // Play for 15 seconds
              'playsinline': 1,
              'enablejsapi': 1,
              'origin': window.location.origin // Fix for origin mismatch
            },
            events: {
              'onReady': (e: any) => {
                try {
                  e.target.setVolume(100);
                } catch (err) {
                  console.warn("BMW Player setVolume failed", err);
                }
              },
              'onError': (e: any) => {
                console.warn("BMW Player error:", e.data);
              }
            }
          });
        } catch (e) {
          console.warn("BMW Player init failed", e);
        }
      }
    };

    // Retry init if YT not ready immediately
    if (window.YT && window.YT.Player) {
      initBmwPlayer();
    } else {
      // Hook into API ready callback
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initBmwPlayer();
      };
    }
  }, []);

  const passions: PassionContent[] = [
    {
      id: 'jesus',
      title: 'Jesus',
      icon: '✝️',
      shortDesc: 'The foundation of my life and values.',
      fullDesc: "My faith is not just a label, but the core of who I am. It guides my decisions, my work ethic, and how I treat others. I believe in coding with integrity and purpose, reflecting the creativity of the Creator in my own small way.",
      image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=800&auto=format&fit=crop',
      color: 'from-yellow-400/80 to-orange-500/80',
    },
    {
      id: 'ai',
      title: 'AI & Ethics',
      icon: '🤖',
      shortDesc: 'The future of development: managing AI agents as a team.',
      fullDesc: "We've evolved from manually writing every line and debugging for hours, to AI-powered troubleshooting and instant code generation. The breakthrough of late 2025 changed everything: single developers can now leverage multiple AI agents as a team, making large-scale solo projects feasible.\n\nThe most crucial skill for 2026 isn't just coding—it's learning to manage AI agents like a senior engineer manages a team. Assigning tasks, reviewing output, and orchestrating the workflow. It's about understanding application architecture and knowing how to divide and delegate work between human creativity and AI execution.\n\nUsing AI agents isn't optional anymore—it's as essential as calculators for math. The question isn't 'how' we build, but 'should' we build it, and how do we ensure technology elevates humanity rather than diminishing it.",
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
      color: 'from-cyan-400/80 to-blue-600/80',
    },
    {
      id: 'bmw',
      title: 'BMW M3 GTR',
      icon: '🏎️',
      shortDesc: 'The legendary hero car from NFSMW. Pure engineering art.',
      fullDesc: "The E46 M3 GTR is more than a car; it's a symbol of my childhood gaming peak. The straight-cut gears, the V8 whine, the iconic blue and silver livery. It represents the perfect fusion of aesthetics and raw performance that I aim for in my software engineering.",
      image: '/images/bmw-m3-gtr-nfs-hd-02.jpg',
      color: 'from-blue-700/80 to-blue-900/80',
      isSound: true,
    },
    {
      id: 'gaming',
      title: 'NFS: Most Wanted',
      icon: '🎮',
      shortDesc: 'More than a game, a masterpiece of chase and speed.',
      fullDesc: "Need for Speed: Most Wanted (2005) taught me about risk, reward, and the thrill of the chase. It's a masterclass in game design—the open world, the police AI, the progression system. I still analyze its mechanics today to understand what makes a user experience truly gripping.",
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
      color: 'from-yellow-600/80 to-red-700/80',
    },
    {
      id: 'pc',
      title: 'Tech Tinkering',
      icon: '🔨',
      shortDesc: 'Expert at "fixing" computers... sometimes by breaking them first (jk).',
      fullDesc: "There's something satisfying about taking apart a machine to see how it ticks. From building custom rigs to diagnosing hardware failures, I love the hands-on aspect of tech. And yes, I've seen my fair share of Blue Screens of Death (try clicking this card 5 times...).",
      image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=800&auto=format&fit=crop',
      color: 'from-green-400/80 to-emerald-600/80',
      isInteractive: true,
    },
  ];

  const playBmwSound = () => {
    if (bmwSoundRef.current && typeof bmwSoundRef.current.playVideo === 'function') {
      try {
        bmwSoundRef.current.seekTo(0);
        bmwSoundRef.current.setVolume(100);
        bmwSoundRef.current.playVideo();

        // Fade out logic
        const fadeOutStart = 12000; // Start fading at 12s
        const fadeOutDuration = 3000; // Fade over 3s (ends at 15s)
        const intervalTime = 100;
        const steps = fadeOutDuration / intervalTime;
        const volStep = 100 / steps;

        setTimeout(() => {
          let currentVol = 100;
          const fadeInterval = setInterval(() => {
            currentVol -= volStep;
            if (currentVol <= 0) {
              currentVol = 0;
              clearInterval(fadeInterval);
              try {
                bmwSoundRef.current.pauseVideo();
              } catch (e) { /* ignore */ }
            }
            try {
              bmwSoundRef.current.setVolume(currentVol);
            } catch (e) { /* ignore */ }
          }, intervalTime);
        }, fadeOutStart);

      } catch (e) {
        console.error("Error playing BMW sound", e);
      }
    }
  };

  const handleCardClick = (passion: PassionContent) => {
    setSelectedPassion(passion);
  };

  const triggerBSOD = () => {
    setShowBSOD(true);
    setTimeout(() => setShowBSOD(false), 4000);
  };

  return (
    <div className="min-h-screen p-0 md:p-0 relative overflow-hidden">
      {/* Dynamic SVG Background */}
      <AnimatedBg />

      {/* Floating Decorative Elements */}
      <FloatingElements />

      <div id="bmw-sound-player" className="hidden" />

      {/* BSOD Overlay */}
      <AnimatePresence>
        {showBSOD && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#0078d7] text-white font-mono p-10 md:p-20 flex flex-col justify-center items-start cursor-none"
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

      <div className="relative z-10">
        {/* Hero Section */}
        <HeroCuriosity />

        <div className="max-w-7xl mx-auto px-8 space-y-24 pb-24">
          {/* About Section */}
          <AboutCuriosity />

          {/* Passions Grid */}
          <section id="projects">
            <FadeInOnScroll variant="fadeUp">
              <div className="text-center mb-16 flex flex-col items-center">
                <div className="mb-6">
                  <HeroIcon />
                </div>
                <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-curiosity-primary via-pink-500 to-curiosity-secondary bg-clip-text text-transparent mb-4">
                  Curiosity
                </h2>
                <p className="text-xl text-theme-text-secondary">
                  A glimpse into what drives me beyond code.
                </p>
              </div>
            </FadeInOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {passions.map((passion, index) => (
                <FadeInOnScroll
                  key={passion.id}
                  delay={index * 0.1}
                  variant="scale"
                  className="h-full"
                >
                  <motion.div
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
                        {passion.shortDesc}
                      </p>
                    </div>
                  </motion.div>
                </FadeInOnScroll>
              ))}
            </div>
          </section>

          {/* Creative Languages Section */}
          <section id="languages" className="space-y-8">
            <FadeInOnScroll variant="fadeUp">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Spanish - Native */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 p-1 shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="bg-primary-rich-black h-full w-full rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                      <span className="text-9xl">ñ</span>
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-4xl">🇩🇴</span>
                          <h3 className="text-2xl font-bold text-white">Spanish</h3>
                        </div>
                        <p className="text-gray-300">
                          My mother tongue. The language of my thoughts, passion, and culture.
                        </p>
                      </div>
                      <div className="mt-6">
                        <div className="inline-block px-4 py-2 rounded-full bg-orange-500/20 text-orange-400 font-bold border border-orange-500/30">
                          Native Speaker
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* English - Duolingo Style */}
                <div
                  className="relative overflow-hidden rounded-2xl bg-[#58cc02] p-1 shadow-[0_8px_0_0_#46a302] transform hover:translate-y-1 hover:shadow-[0_4px_0_0_#46a302] transition-all duration-200 cursor-pointer group"
                >
                  {/* Fire Effect Around Card - Always visible if streak > 0 */}
                  {duolingoStats && duolingoStats.streak > 0 && <FireStreakEffect />}

                  <div className="bg-[#58cc02] h-full w-full rounded-xl p-6 relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={duolingoStats?.avatar || "/images/duo-face.png"}
                        alt="Duo Owl"
                        className="w-16 h-16 animate-bounce rounded-full border-2 border-white/20 group-hover:scale-110 transition-transform"
                        onError={(e) => {
                          e.currentTarget.src = "/images/duo-face.png";
                        }}
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-white">Duolingo Stats</h3>
                        <p className="text-white/80 font-medium">
                          {duolingoStats ? `${duolingoStats.streak} Day Streak 🔥` : 'Loading Streak...'}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm space-y-4">
                      {/* Total XP */}
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white">Total XP</span>
                        <span className="font-bold text-white">{duolingoStats?.totalXp.toLocaleString() || '...'}</span>
                      </div>

                      {/* XP Progress Bar Visual */}
                      <div className="w-full bg-black/20 rounded-full h-4 overflow-hidden">
                        <div className="bg-yellow-400 h-full rounded-full w-[85%] relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-full bg-white/30 animate-[shimmer_2s_infinite]"></div>
                        </div>
                      </div>

                      {/* Courses List */}
                      {duolingoStats?.courses && duolingoStats.courses.length > 0 ? (
                        <div className="space-y-3 mt-4">
                          <h4 className="text-white font-bold border-b border-white/20 pb-1">Active Courses</h4>
                          {duolingoStats.courses.map((course, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">
                                  {course.learningLanguage === 'en' ? '🇺🇸' :
                                    course.learningLanguage === 'ja' ? '🇯🇵' :
                                      course.learningLanguage === 'fr' ? '🇫🇷' :
                                        course.learningLanguage === 'ht' ? '🇭🇹' : '🌍'}
                                </span>
                                <div className="flex flex-col">
                                  <span className="text-white/90 font-medium flex items-center gap-2">
                                    {course.title}
                                    {course.learningLanguage === 'en' && (
                                      <span className="px-1.5 py-0.5 rounded bg-yellow-400 text-green-900 text-[10px] font-bold">
                                        B2 Basic
                                      </span>
                                    )}
                                  </span>
                                </div>
                              </div>
                              <span className="text-white font-mono bg-black/20 px-2 py-0.5 rounded text-xs">
                                {course.xp.toLocaleString()} XP
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">Current Focus</span>
                          <span className="px-3 py-1 rounded-full bg-yellow-400 text-green-900 font-bold text-sm">English</span>
                        </div>
                      )}

                      <p className="text-white/90 text-xs italic text-center pt-2 opacity-75">
                        "Learning a language is a marathon, not a sprint."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          </section>

          {/* Roadmap Section */}
          <Roadmap variant="curiosity" />
        </div>
      </div>

      <PassionModal
        isOpen={!!selectedPassion}
        onClose={() => setSelectedPassion(null)}
        passion={selectedPassion}
        onPlaySound={selectedPassion?.id === 'bmw' ? playBmwSound : undefined}
        onTriggerBSOD={triggerBSOD}
      />

      {/* Floating Spotify Player */}
      <SpotifyNowPlaying />
    </div>
  );
}

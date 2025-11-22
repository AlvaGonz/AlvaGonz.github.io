
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

export function SpotifyNowPlaying() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <div className="fixed bottom-4 left-4 z-[100] flex items-end gap-2 font-sans">
            <AnimatePresence mode="wait">
                {isOpen ? (
                    <motion.div
                        key="player"
                        initial={{ opacity: 0, scale: 0.8, x: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="origin-bottom-left"
                    >
                        <div className="relative group">
                            <div className="overflow-hidden rounded-xl shadow-2xl shadow-black/50 w-[300px]">
                                <iframe
                                    style={{ borderRadius: '12px' }}
                                    src="https://open.spotify.com/embed/playlist/3EX5tmywatH8OHNS2l7wU3?utm_source=generator&theme=0"
                                    width="100%"
                                    height="152"
                                    frameBorder="0"
                                    allowFullScreen
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                    className="bg-black/80 backdrop-blur-xl"
                                ></iframe>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute -top-3 -right-3 bg-white text-black rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-200"
                                aria-label="Close player"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        key="button"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="bg-[#1DB954] text-white p-3 rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center hover:bg-[#1ed760] transition-colors"
                        aria-label="Open Spotify Player"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.6-1.56.24z" />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>,
        document.body
    );
}

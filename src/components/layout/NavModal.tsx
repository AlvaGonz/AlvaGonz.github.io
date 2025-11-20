import { useState } from 'react';
import { useSide } from '@/hooks/useSide';
import { motion, AnimatePresence } from 'framer-motion';

export function NavModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { side } = useSide();

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Hamburger button */}
      <button
        className="md:hidden p-2 text-primary-anti-flash-white hover:text-primary-mountain-meadow transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-64 bg-primary-rich-black border-l border-white/10 shadow-2xl z-50 p-6 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-secondary-stone hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nav Links */}
              <nav className="space-y-6 flex-1">
                {navItems.map(item => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-xl font-medium text-primary-anti-flash-white hover:text-primary-mountain-meadow transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Footer: Side indicator */}
              <div className="border-t border-white/10 pt-6 mt-6">
                <p className="text-sm text-secondary-stone mb-2">Current Mode:</p>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  side === 'curiosity' 
                    ? 'bg-purple-900/30 text-purple-300 border border-purple-500/30' 
                    : 'bg-primary-dark-green text-primary-mountain-meadow border border-primary-mountain-meadow/30'
                }`}>
                  <span>{side === 'curiosity' ? '✨' : '💼'}</span>
                  <span className="capitalize">{side}</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}


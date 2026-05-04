import { useState } from 'react';
import { SideToggle } from '@/components/ui/SideToggle';
import { usePortfolioSide } from '@/hooks/usePortfolioSide';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

export function Navbar() {
  const { side, setSide } = usePortfolioSide();
  useTheme(); // Ensure theme effect is applied
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const formalItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const curiosityItems = [
    { label: 'About', href: '#about' },
    { label: 'Gaming', href: '#gaming' },
    { label: 'Creative', href: '#graphic-design' },
    { label: 'Hobbies', href: '#hobbies' },
    { label: 'Contact', href: '#contact' },
  ];

  const navItems = side === 'curiosity' ? curiosityItems : formalItems;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-theme-background/80 backdrop-blur-md border-b border-theme-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <button
              onClick={() => setSide(null)}
              className="flex items-center gap-2 group"
              aria-label="Return to selection"
            >
              <div className="bg-white rounded-full p-1.5 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg shadow-theme-primary/20">
                <img src="/logo.svg" alt="AAG Logo" className="h-6 w-6" />
              </div>
            </button>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-theme-text-secondary hover:text-theme-primary transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-theme-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <SideToggle />

            <div className="h-6 w-px bg-white/10 hidden sm:block" />

            <a
              href="https://github.com/AlvaGonz"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 text-theme-text-secondary hover:text-white transition-all"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-theme-text hover:text-theme-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-64 bg-theme-background border-l border-theme-border shadow-2xl z-50 p-6 flex flex-col md:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-theme-text-secondary hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <nav className="space-y-6 flex-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-xl font-medium text-theme-text hover:text-theme-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="border-t border-theme-border pt-6 mt-6">
                <p className="text-sm text-theme-text-secondary mb-2">Current Mode:</p>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${side === 'curiosity'
                    ? 'bg-curiosity-secondary/20 text-curiosity-secondary border border-curiosity-secondary/30'
                    : 'bg-primary-dark-green text-primary-mountain-meadow border border-primary-mountain-meadow/30'
                    }`}
                >
                  <span>{side === 'curiosity' ? '✨' : '💼'}</span>
                  <span className="capitalize">{side}</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

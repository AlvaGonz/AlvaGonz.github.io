import { useState } from 'react';
import { Menu, X, Sparkles, Briefcase } from 'lucide-react';
import { SideToggle } from '@/components/ui/SideToggle';
import { usePortfolioSide } from '@/hooks/usePortfolioSide';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

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

  const CuriosityItems = [
    { label: 'About', href: '#about' },
    { label: 'Gaming', href: '#gaming' },
    { label: 'Creative', href: '#graphic-design' },
    { label: 'Hobbies', href: '#hobbies' },
    { label: 'Contact', href: '#contact' },
  ];

  const navItems = side === 'curiosity' ? CuriosityItems : formalItems;

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
              <GithubIcon className="w-5 h-5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-theme-text hover:text-theme-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
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
                  <X className="h-6 w-6" />
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
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    side === 'curiosity'
                      ? 'bg-curiosity-secondary/20 text-curiosity-secondary border border-curiosity-secondary/30'
                      : 'bg-formal-primary-dark-green text-formal-primary-mountain-meadow border border-formal-primary-mountain-meadow/30'
                  }`}
                >
                  <span>{side === 'curiosity' ? <Sparkles className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}</span>
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


import { SideToggle } from '@/components/ui/SideToggle';
import { NavModal } from './NavModal';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-primary-rich-black/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 group">
              <img src="/logo.svg" alt="AAG Logo" className="h-8 w-8 transition-transform group-hover:scale-110" />
              <span className="font-bold text-lg text-primary-anti-flash-white font-axiforma tracking-tight group-hover:text-primary-mountain-meadow transition-colors">
                AAG
              </span>
            </a>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {['About', 'Skills', 'Projects', 'Roadmap', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-secondary-stone hover:text-primary-mountain-meadow transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-mountain-meadow transition-all group-hover:w-full" />
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
              className="hidden sm:flex items-center justify-center h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 text-secondary-stone hover:text-white transition-all"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            <NavModal />
          </div>
        </div>
      </div>
    </nav>
  );
}


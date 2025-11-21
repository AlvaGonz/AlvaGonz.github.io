# Alva Portfolio v3 – Formal & Curiosity Dual Experience

A modern dual-personality portfolio showcasing two distinct experiences: a professional **Formal** side and a creative **Curiosity** side, built with React 18, TypeScript, and cutting-edge web technologies.

## 🌐 Live Demo

**[Visit Portfolio](https://alvagonz.github.io/)**

- **Formal Experience**: [?side=formal](https://alvagonz.github.io/?side=formal) - Professional, minimalist showcase
- **Curiosity Experience**: [?side=curiosity](https://alvagonz.github.io/?side=curiosity) - Creative, vibrant exploration

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Custom CSS Modules
- **Animations**: Framer Motion
- **Fonts**: Axiforma (Custom OTF)
- **Testing**: Vitest (Unit), Playwright (E2E)
- **GitHub Integration**: Octokit REST API
- **Deployment**: GitHub Pages with automated CI/CD

## ✨ Concept: Formal vs Curiosity

This portfolio implements a unique **dual-experience architecture** where users can choose between two distinct presentations of the same professional profile:

### 🎯 The Central Hub
The **main landing page serves as the nexus** for both experiences. Users are presented with an elegant selector that routes them to either side via URL parameters:
- `?side=formal` - Professional, corporate-focused experience
- `?side=curiosity` - Creative, passion-driven experience

### 🏢 Formal Side
- **Purpose**: Professional showcase for recruiters, clients, and business contacts
- **Design**: Minimalist, clean, corporate aesthetics
- **Content**: Skills, experience, education, certifications, formal projects
- **Animations**: Subtle, professional transitions

### 🎨 Curiosity Side  
- **Purpose**: Creative exploration of passions, hobbies, and personal interests
- **Design**: Vibrant, dynamic, experimental visuals
- **Content**: Personal projects, creative endeavors, learning journey
- **Animations**: Bold, playful, interactive elements

## 🚀 Current Features (Implemented)

### ✅ Core Architecture
- **Dual Layout System**: Complete split-view implementation with seamless transitions
- **URL Deep Linking**: Direct access via `?side=formal` or `?side=curiosity` parameters
- **State Persistence**: localStorage saves user preference across sessions
- **Keyboard Navigation**: Arrow keys for accessibility (Left/Right to switch sides)

### ✅ User Experience
- **Responsive Design**: Mobile-first approach, works on all devices
- **Progressive Scroll Enhancement**: Styles and animations evolve as user scrolls
- **Smooth Transitions**: Framer Motion-powered page and component animations
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard support

### ✅ GitHub Integration
- **Repository Fetching**: Automated pinned repository data via GitHub API
- **Fallback System**: Graceful degradation when API limits are reached
- **Build-time Generation**: Pre-fetched data for optimal performance

### ✅ Performance
- **Lazy Loading**: Components and images load on demand
- **Optimized Builds**: Vite-powered bundling with tree shaking
- **Caching Strategy**: Smart caching for GitHub data and user preferences

## 🏗️ Architecture Overview

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              # Navigation with side toggle
│   │   └── SplitLayout.tsx         # Main dual-layout orchestrator
│   ├── sections/
│   │   ├── AboutFormal.tsx         # Professional about section
│   │   ├── AboutCuriosity.tsx      # Creative about section
│   │   └── Roadmap.tsx             # Visual timeline component
│   ├── github/
│   │   └── GithubStats.tsx         # GitHub integration components
│   ├── ui/
│   │   ├── Timeline.tsx            # Reusable timeline component
│   │   └── LanguageBadge.tsx       # Programming language badges
│   ├── LandingSelector.tsx         # Central hub selector
│   ├── CuriosityView.tsx           # Curiosity side main component
│   ├── FormalView.tsx              # Formal side main component
│   └── [12+ specialized components]
├── content/
│   ├── profile.ts                  # Personal information
│   ├── skills.ts                   # Technical skills data
│   ├── experience.ts               # Work experience
│   └── education.ts                # Educational background
├── hooks/
│   ├── useScrollProgress.ts        # Scroll-based animations
│   ├── useGitHubStats.ts           # GitHub API integration
│   └── useSide.ts                  # Side state management
├── context/
│   └── SideContext.tsx             # Global state for dual layout
└── data/generated/
    └── pinned.json                 # Pre-fetched GitHub data
```

The application is built with **React + TypeScript + Vite + Tailwind CSS** and deployed via **GitHub Pages** with automated CI/CD workflows.

## 🚀 Getting Started

### Prerequisites
- **Node.js** 20+
- **pnpm** 8+ (preferred package manager)

### Installation

```bash
# Clone the repository
git clone https://github.com/AlvaGonz/AlvaGonz.github.io.git
cd AlvaGonz.github.io

# Install dependencies
pnpm install

# Optional: Fetch GitHub data (requires GITHUB_TOKEN)
pnpm fetch-pinned

# Start development server
pnpm dev
```

### Environment Variables (Optional)

For enhanced GitHub integration, create a `.env.local` file:

```env
GITHUB_TOKEN=your_github_personal_access_token
```

**How to get a GitHub token:**
1. Go to GitHub.com → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `public_repo`, `read:user`
4. Copy token to `.env.local`

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run unit tests |
| `pnpm test:ui` | Run unit tests with UI |
| `pnpm test:e2e` | Run E2E tests |
| `pnpm test:e2e:ui` | Run E2E tests with UI |
| `pnpm fetch-pinned` | Fetch GitHub pinned repositories |

## 🗺️ Roadmap: Creative Phase 2 (Curiosity Focus)

The following enhancements are planned to elevate the **Curiosity side** with advanced visual effects and interactions:

### 🔄 Phase 1: Enhanced GitHub Integration (Planned)
- **Real-time GitHub API**: Complete Octokit REST client implementation
- **Dynamic Language Stats**: Top 5 programming languages with live data
- **Repository Showcase**: Top 6 repositories with stars, descriptions, and activity
- **Smart Caching**: 24-hour localStorage cache with automatic refresh

### 🎨 Phase 2: Dual Color System (Planned)
- **Theme Architecture**: Complete CSS variable system for formal/curiosity themes
- **Color Palettes**: 
  - Formal: Deep Blue (#1E40AF), Slate (#64748B), Cyan accent (#0891B2)
  - Curiosity: Purple (#7C3AED), Pink (#EC4899), Amber accent (#F59E0B)
- **Smooth Transitions**: 300ms theme switching with URL-driven persistence

### ⚡ Phase 3: Advanced Framer Motion Animations (Planned)
- **Hero Parallax**: Scroll-based Y transforms and scale animations
- **Staggered Entrances**: Skill pills, cards, and timeline elements
- **Hover Interactions**: Lift effects, color changes, and micro-feedback
- **Scroll Triggers**: Different animation timings for formal (subtle) vs curiosity (bold)
- **Modal Systems**: Scale + blur backdrop with AnimatePresence

### 🔮 Phase 4: Glassmorphism & Advanced CSS (Planned)
- **Frosted Glass Effects**: backdrop-filter blur with rgba backgrounds
- **Component Library**: Glass navbar, cards, modals, and badges
- **Blend Modes**: Creative color overlays and visual depth
- **Browser Fallbacks**: Graceful degradation for unsupported browsers

### 🎭 Phase 5: SVG Animations & Dynamic Icons (Planned)
- **Animated Backgrounds**: Flowing gradients and geometric patterns
- **Interactive Icons**: Rotating React logos, animated TypeScript arrows
- **Timeline Graphics**: SVG path drawing with scroll synchronization
- **Floating Elements**: Parallax-driven decorative shapes

### ✨ Phase 6: Micro-interactions & Polish (Planned)
- **Button Ripples**: Click-triggered radial expansion effects
- **Scroll Progress**: Visual progress bar with section-based color changes
- **Cursor Effects**: Custom cursor for Curiosity side with hover states
- **Loading States**: Skeleton screens and shimmer animations
- **Toast Notifications**: Slide-in feedback with auto-dismiss

## 🎯 Quality Standards

### Testing
- ✅ GitHub data integration works correctly
- ✅ URL parameter navigation (`?side=`) functions properly
- ✅ Animations maintain 60fps performance
- ✅ Responsive design across all device sizes
- ✅ No memory leaks in component lifecycle

### Accessibility
- ✅ Respects `prefers-reduced-motion` user preference
- ✅ Maintains contrast ratios ≥ 4.5:1 for text
- ✅ Full keyboard navigation support
- ✅ Proper ARIA labels on interactive elements

### Performance
- 🎯 Lighthouse score > 90
- 🎯 First Contentful Paint < 2s
- 🎯 Largest Contentful Paint < 3s
- 🎯 Cumulative Layout Shift < 0.1

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome! Feel free to:
- Open issues for bugs or enhancement ideas
- Submit pull requests for improvements
- Share feedback on the dual-experience concept

## 📄 License

MIT License - feel free to use this project as inspiration for your own portfolio!

---

**Built with ❤️ by Adrian A. A. González**
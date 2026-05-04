# Alva Portfolio v3 – Formal & curiousity Dual Experience

A modern dual-personality portfolio showcasing two distinct experiences: a professional **Formal** side and a curious **curiousity** side, built with React 18, TypeScript, and cutting-edge web technologies.

## 🌐 Live

**[Visit Portfolio](https://alvagonz.github.io/)**

- **Formal Experience**: [?side=formal](https://alvagonz.github.io/?side=formal) - Professional, minimalist showcase
- **curiousity Experience**: [?side=curiousity](https://alvagonz.github.io/?side=curiousity) - curious, vibrant exploration

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Custom CSS Modules
- **Animations**: Framer Motion
- **Fonts**: Axiforma (Custom OTF)
- **Testing**: Vitest (Unit), Playwright (E2E)
- **GitHub Integration**: Octokit REST API
- **Deployment**: GitHub Pages with automated CI/CD

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



### 🎨 Phase 2: Dual Color System (Planned)
- **Theme Architecture**: Complete CSS variable system for formal/curiousity themes
- **Color Palettes**: 
  - Formal: Deep Blue (#1E40AF), Slate (#64748B), Cyan accent (#0891B2)
  - curiousity: Purple (#7C3AED), Pink (#EC4899), Amber accent (#F59E0B)
- **Smooth Transitions**: 300ms theme switching with URL-driven persistence

### ⚡ Phase 3: Advanced Framer Motion Animations (Planned)
- **Hero Parallax**: Scroll-based Y transforms and scale animations
- **Staggered Entrances**: Skill pills, cards, and timeline elements
- **Hover Interactions**: Lift effects, color changes, and micro-feedback
- **Scroll Triggers**: Different animation timings for formal (subtle) vs curiousity (bold)
- **Modal Systems**: Scale + blur backdrop with AnimatePresence

### 🔮 Phase 4: Glassmorphism & Advanced CSS (Planned)
- **Frosted Glass Effects**: backdrop-filter blur with rgba backgrounds
- **Component Library**: Glass navbar, cards, modals, and badges
- **Blend Modes**: curious color overlays and visual depth
- **Browser Fallbacks**: Graceful degradation for unsupported browsers

### 🎭 Phase 5: SVG Animations & Dynamic Icons (Planned)
- **Animated Backgrounds**: Flowing gradients and geometric patterns
- **Interactive Icons**: Rotating React logos, animated TypeScript arrows
- **Timeline Graphics**: SVG path drawing with scroll synchronization
- **Floating Elements**: Parallax-driven decorative shapes

### ✨ Phase 6: Micro-interactions & Polish (Planned)
- **Button Ripples**: Click-triggered radial expansion effects
- **Scroll Progress**: Visual progress bar with section-based color changes
- **Cursor Effects**: Custom cursor for curiousity side with hover states
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

**Built with ❤️ by Adrian A. A. Gonzalez**
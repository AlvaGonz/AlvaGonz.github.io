# Design System Rules - Alva Portfolio v3

## Overview

This document defines the design system architecture for the Alva Portfolio dual-experience project. The system supports two distinct themes (Formal and Curiosity) with dynamic switching, progressive scroll enhancements, and comprehensive animation patterns.

## 1. Token Definitions

### 1.1 Color System Architecture

**Location**: `src/styles/theme.css` (CSS Custom Properties) + `tailwind.config.ts` (Tailwind Integration)

**Structure**: Three-tier color system:
1. **Semantic Theme Colors** (Dynamic, theme-aware)
2. **Palette-Specific Colors** (Static, theme-specific)
3. **Legacy Colors** (Backward compatibility)

```css
/* Semantic Theme Variables (Dynamic) */
:root {
  --theme-background: var(--c-primary-rich-black);
  --theme-surface: var(--c-primary-dark-green);
  --theme-primary: var(--c-primary-mountain-meadow);
  --theme-secondary: var(--c-secondary-stone);
  --theme-accent: var(--c-primary-caribbean-green);
  --theme-text: var(--c-primary-anti-flash-white);
  --theme-text-secondary: var(--c-secondary-pistachio);
  --theme-border: var(--c-secondary-basil);
}

/* Curiosity Theme Override */
[data-theme="curiosity"] {
  --theme-background: var(--c-curiosity-bg);
  --theme-primary: var(--c-curiosity-primary);
  /* ... */
}
```

**Usage in Tailwind**:
```typescript
// tailwind.config.ts
colors: {
  theme: {
    background: 'var(--theme-background)',
    surface: 'var(--theme-surface)',
    primary: 'var(--theme-primary)',
    text: {
      DEFAULT: 'var(--theme-text)',
      secondary: 'var(--theme-text-secondary)',
    },
  }
}
```

### 1.2 Typography System

**Font**: Axiforma (Custom OTF) with system fallbacks
**Weights**: 400 (Regular), 500 (Medium), 600 (SemiBold)
**Loading**: `font-display: swap` for performance

```css
@font-face {
  font-family: 'Axiforma';
  src: url('/fonts/axiforma/Axiforma-Regular.otf') format('opentype');
  font-weight: 400;
  font-display: swap;
}
```

### 1.3 Spacing & Layout Tokens

**Dynamic Tokens** (Scroll-responsive):
```css
:root {
  --border-radius-modern: 0.5rem;
  --shadow-modern: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --blur-modern: 0px;
  --gradient-intensity: 0;
}

/* Progressive enhancement based on scroll */
body[data-scroll-stage="3"] {
  --border-radius-modern: 2rem;
  --shadow-modern: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --blur-modern: 8px;
  --gradient-intensity: 1;
}
```

## 2. Component Library

### 2.1 Architecture Pattern

**Framework**: React 18 with TypeScript
**Pattern**: Compound Components + Composition
**Location**: `src/components/` (organized by feature/type)

```
src/components/
├── animations/          # Reusable animation wrappers
├── github/             # GitHub-specific components
├── layout/             # Layout components (Navbar, etc.)
├── sections/           # Page sections (About, Hero, etc.)
├── svg/               # SVG components and animations
└── ui/                # Base UI components
```

### 2.2 Component Patterns

**Base UI Component Pattern**:
```typescript
interface ComponentProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function Component({ 
  children, 
  className = '', 
  variant = 'primary',
  ...props 
}: ComponentProps) {
  return (
    <motion.div
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
```

### 2.3 Animation Component Wrappers

**Location**: `src/components/animations/`

```typescript
// FadeInOnScroll.tsx - Generic scroll-triggered animation
export function FadeInOnScroll({
  children,
  variant = 'fadeUp',
  delay = 0
}: FadeInOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  // ...
}

// GlassmorphicCard.tsx - Glassmorphism wrapper
export function GlassmorphicCard({ children, className }: Props) {
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-md border border-white/10"
      whileHover={hoverLift.whileHover}
    >
      {children}
    </motion.div>
  );
}
```

## 3. Frameworks & Libraries

### 3.1 Core Stack

- **React**: 18.3.1 (Latest stable)
- **TypeScript**: 5.6.2 (Strict mode enabled)
- **Vite**: 5.4.2 (Build tool & dev server)
- **Tailwind CSS**: 3.4.10 (Utility-first styling)

### 3.2 Animation & Interaction

- **Framer Motion**: 11.3.24 (Primary animation library)
- **Animation Patterns**: Defined in `src/lib/animation-variants.ts`

```typescript
// Standard animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const staggerContainer: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};
```

### 3.3 Build System

**Vite Configuration**:
- TypeScript path aliases (`@/` → `src/`)
- Asset optimization
- CSS processing (PostCSS + Tailwind)

## 4. Asset Management

### 4.1 Static Assets

**Location**: `public/` directory
**Structure**:
```
public/
├── fonts/axiforma/     # Custom font files (.otf)
├── images/            # Static images
├── favicon.svg        # Site favicon
└── logo.svg          # Brand logo
```

**Usage Pattern**:
```typescript
// Direct public path reference
<img src="/images/profile.png" alt="Profile" />

// For dynamic imports (if needed)
const imageSrc = new URL('/images/dynamic.png', import.meta.url).href;
```

### 4.2 Optimization

- **Font Loading**: `font-display: swap` for performance
- **Image Formats**: Modern formats preferred (WebP, AVIF when available)
- **Lazy Loading**: Implemented via Intersection Observer

## 5. Icon System

### 5.1 SVG Components

**Location**: `src/components/svg/`
**Pattern**: React components for complex/animated SVGs

```typescript
// Animated SVG component
export function HeroIcon() {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity }}
    >
      <path d="..." fill="currentColor" />
    </motion.svg>
  );
}
```

### 5.2 Icon Integration

**Language Badges**: Color-coded with predefined palette
```typescript
const languageColors: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  Python: '#3572A5',
  // ...
};
```

**Usage**:
```typescript
<LanguageBadge name="TypeScript" count={5} />
```

## 6. Styling Approach

### 6.1 CSS Architecture

**Primary**: Tailwind CSS utility classes
**Secondary**: CSS Custom Properties for theming
**Specialized**: CSS files for complex effects

```
src/styles/
├── index.css          # Main entry, imports
├── theme.css          # Color system, typography
└── glassmorphism.css  # Specialized effects
```

### 6.2 Glassmorphism System

**Location**: `src/styles/glassmorphism.css`

```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

/* Theme-specific variants */
[data-theme="curiosity"] .glass-panel {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border: 1px solid rgba(199, 206, 232, 0.15);
}
```

### 6.3 Responsive Design

**Approach**: Mobile-first with Tailwind breakpoints
**Breakpoints**: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

```typescript
// Responsive component example
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

### 6.4 Theme Switching

**Mechanism**: `data-theme` attribute on document root
**Implementation**: Context + URL parameters + localStorage

```typescript
// Theme context pattern
const { side, setSide } = useSide();

// CSS targeting
[data-theme="curiosity"] {
  --theme-primary: var(--c-curiosity-primary);
}
```

## 7. Project Structure

### 7.1 Feature Organization

```
src/
├── components/
│   ├── animations/     # Reusable animation components
│   ├── github/        # GitHub integration components
│   ├── layout/        # Layout components (Navbar, etc.)
│   ├── sections/      # Page sections (theme-specific)
│   ├── svg/          # SVG components and animations
│   └── ui/           # Base UI components
├── content/          # Static content and data
├── context/          # React contexts (theme, side)
├── hooks/           # Custom React hooks
├── lib/             # Utilities and configurations
├── styles/          # CSS files
└── types/           # TypeScript type definitions
```

### 7.2 Naming Conventions

**Components**: PascalCase (`ButtonWithRipple`)
**Files**: PascalCase for components, camelCase for utilities
**CSS Classes**: kebab-case for custom, Tailwind utilities as-is
**CSS Variables**: kebab-case with prefixes (`--theme-primary`, `--c-curiosity-bg`)

### 7.3 Import Patterns

**Path Aliases**: `@/` for `src/`
```typescript
import { fadeInUp } from '@/lib/animation-variants';
import { GlassmorphicCard } from '@/components/animations/GlassmorphicCard';
```

## 8. Animation System

### 8.1 Animation Variants

**Location**: `src/lib/animation-variants.ts`
**Categories**:
- **Entrance**: `fadeInUp`, `slideInLeft`, `scaleIn`
- **Containers**: `staggerContainer`
- **Interactions**: `hoverScale`, `hoverLift`

### 8.2 Scroll-Based Animations

**Implementation**: Framer Motion `useInView` + `useScroll`
**Pattern**: Progressive enhancement based on scroll position

```typescript
// Scroll-triggered animation
const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

// Scroll stage system
body[data-scroll-stage="0"] { /* Initial state */ }
body[data-scroll-stage="3"] { /* Fully enhanced */ }
```

### 8.3 Accessibility

**Reduced Motion**: Respects `prefers-reduced-motion`
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 9. Integration Guidelines for Figma

### 9.1 Color Token Mapping

**Figma → CSS Variables**:
- Map Figma color tokens to CSS custom properties
- Use semantic naming (`--theme-primary` vs `--color-blue-500`)
- Maintain theme switching capability

### 9.2 Component Mapping

**Figma Component → React Component**:
1. Extract design tokens (spacing, colors, typography)
2. Map to existing animation variants
3. Apply glassmorphism patterns where appropriate
4. Ensure theme compatibility (Formal vs Curiosity)

### 9.3 Animation Integration

**Figma Prototypes → Framer Motion**:
- Map Figma transitions to existing animation variants
- Use scroll-triggered animations for progressive enhancement
- Maintain performance (60fps target)

### 9.4 Asset Integration

**Figma Assets → Public Directory**:
- Export SVGs as React components for animations
- Optimize images for web (WebP/AVIF)
- Maintain consistent naming conventions

## 10. Development Workflow

### 10.1 Component Development

1. **Design Review**: Analyze Figma component
2. **Token Extraction**: Identify reusable tokens
3. **Component Creation**: Build with TypeScript + Tailwind
4. **Animation Integration**: Apply appropriate motion variants
5. **Theme Testing**: Verify both Formal and Curiosity themes
6. **Accessibility**: Test keyboard navigation and screen readers

### 10.2 Quality Standards

- **Performance**: Lighthouse score > 90
- **Accessibility**: WCAG 2.1 AA compliance
- **Browser Support**: Modern browsers with graceful degradation
- **Animation**: 60fps target, respects reduced motion preferences

This design system ensures consistency, maintainability, and seamless integration between Figma designs and the React codebase while supporting the unique dual-theme architecture of the Alva Portfolio project.

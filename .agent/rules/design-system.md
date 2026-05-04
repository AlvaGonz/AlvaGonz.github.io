# Design System & UX Rules — Alva Portfolio v3

## The Dual-Personality Contract
This portfolio presents two distinct visual identities. Both must feel intentional and polished — never accidental.

| Attribute        | Formal Side                                | Curiosity Side                              |
|------------------|--------------------------------------------|---------------------------------------------|
| Tone             | Professional, minimal, trustworthy         | Playful, vibrant, explorative               |
| Color palette    | Deep Blue (#1E40AF), Slate, Cyan accent    | Purple (#7C3AED), Pink (#EC4899), Amber     |
| Typography       | Axiforma — clean, geometric weights        | Axiforma — expressive weights, larger scale |
| Animations       | Subtle, purposeful, 200–300ms              | Bold, spring-based, interactive, 400–600ms  |
| Backgrounds      | Clean gradients, low noise                 | Glassmorphism, particle effects, SVG layers |
| Cards            | Sharp or very slight radius, solid borders | Frosted glass, glow shadows, layered depth  |

## Color System Rules (NON-NEGOTIABLE)
- All colors must be defined as CSS custom properties in `src/styles/theme.css`. Never use hardcoded hex values inside component files.
  - Example of WRONG: `className="bg-[#7C3AED]"` in a TSX file.
  - Example of CORRECT: `className="bg-Curiosity-primary"` mapped to `--color-Curiosity-primary: #7C3AED`.
- verify: `grep -rE "bg-\[#|text-\[#|border-\[#" src/components/` must return 0 matches.

## Typography Rules
- The primary font is **Axiforma** (custom OTF). It must be loaded via `@font-face` in `src/styles/` — never via a CDN at runtime.
- Font sizes, line heights, and letter spacing must use Tailwind's type scale (or CSS variables), never arbitrary values.
  - Example of WRONG: `style={{ fontSize: '14.5px' }}`
  - Example of CORRECT: `className="text-sm"` or `className="text-base"`

## Animation Rules (Framer Motion)
- All animations must respect the `prefers-reduced-motion` media query.
  - Use `useReducedMotion()` hook from Framer Motion in animated components.
  - verify: Every `motion.*` component or `useAnimation` hook checks `shouldReduceMotion` before applying transitions.
- Animation performance: All animations must target GPU-composited properties only (`transform`, `opacity`). Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`.
  - verify: `grep -r "animate={{ width\|height\|margin\|padding" src/` must return 0 matches.
- Formal side animations: `duration` ≤ 0.3s, `ease: "easeOut"`.
- Curiosity side animations: `type: "spring"` preferred, `stiffness` 100–300, `damping` 15–25.

## Glassmorphism Rules (Curiosity Side Only)
- Glassmorphism effects (`backdrop-filter: blur()`) are restricted to the Curiosity side. Never apply them to Formal side components.
- Glass components must have a fallback background color for browsers that don't support `backdrop-filter`.
  - verify: Every `.glass` class usage has a `@supports not (backdrop-filter: blur())` fallback in the stylesheet.

## Accessibility Requirements (WCAG 2.1 AA — non-negotiable)
- Text contrast ratio must be ≥ 4.5:1 for normal text and ≥ 3:1 for large text against its background.
  - This applies on BOTH sides. Curiosity's vibrant colors must still pass contrast checks.
- All interactive elements (buttons, links, toggles) must be fully keyboard-navigable (Tab, Enter, Space, Arrow keys where applicable).
- All images and SVGs must have descriptive `alt` text or `aria-label`. Decorative SVGs must use `aria-hidden="true"`.
- The side selector (PortfolioSelector) must announce the active side change to screen readers via `aria-live` or a role change.
  - verify: `axe-core` or Playwright accessibility audit returns 0 critical violations.

## Responsive Design
- Mobile-first approach: all components must be designed for mobile and scaled up via Tailwind breakpoints (`sm:`, `md:`, `lg:`).
- The SplitLayout must degrade gracefully on small screens — stack vertically, not overflow.
- verify: Chrome DevTools mobile emulation at 375px width must show no horizontal scroll on any page.

## Performance Budget
- Lighthouse Performance score must stay ≥ 90.
- First Contentful Paint (FCP) < 2.0s.
- Largest Contentful Paint (LCP) < 3.0s.
- Cumulative Layout Shift (CLS) < 0.1.
- Total JavaScript bundle size must stay < 400KB (gzipped). Check with `pnpm build && pnpm analyze`.
- Framer Motion must be lazy-loaded — never included in the initial bundle if avoidable.
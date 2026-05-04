# Design System: AlvaGonz — Dual-Personality Portfolio

**Repository:** `AlvaGonz/AlvaGonz.github.io`
**Stack:** React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion
**Theme Engine:** CSS custom properties via `data-theme` attribute (`formal` | `Curiosity`)

---

## 1. Visual Theme & Atmosphere

This portfolio is built around a **split-identity concept**: two fully distinct visual experiences coexist inside a single application, chosen by the visitor at the entry gate (`PortfolioSelector`).

### Formal — "Midnight Canopy"
> Dense, sophisticated, and still. Like a forest at midnight illuminated by bioluminescence.

- **Mood:** Professional, confident, restrained.
- **Density:** Medium — generous whitespace balanced by purposeful content blocks.
- **Aesthetic:** Dark-ground minimalism with emerald accent punctuation. Clean section boundaries. No decorative excess.

### Curiosity — "Neon Observatory"
> Electric yet contemplative. A late-night coding session under a star map drawn with highlighter pens.

- **Mood:** Curious, playful, experimental.
- **Density:** Higher — more widgets, animated elements, and layered surfaces.
- **Aesthetic:** Deep navy canvas with lime-chartreuse energy. Gradients flow between sections. Motion is intrinsic.

---

## 2. Color Palette & Roles

### 2.1 Formal Palette (Palette 1)

#### Primary Colors

| Descriptive Name | Hex | CSS Variable | Role |
|---|---|---|---|
| **Rich Black** | `#002f1a` | `--c-primary-rich-black` | Main page background. The darkest anchor of the palette. |
| **Dark Green** | `#032221` | `--c-primary-dark-green` | Surface / card backgrounds. A hair lighter than the canvas. |
| **Bangladesh Green** | `#03624c` | `--c-primary-bangladesh-green` | Interactive borders, hover states, section dividers. |
| **Mountain Meadow** | `#2cc295` | `--c-primary-mountain-meadow` | Primary accent — buttons, links, active indicators. The "hero" color. |
| **Caribbean Green** | `#00df81` | `--c-primary-caribbean-green` | High-energy highlight — badges, focus rings, success states. |
| **Anti-Flash White** | `#f1f7f6` | `--c-primary-anti-flash-white` | Primary text. Warm white with a faint green undertone. |

#### Secondary Colors

| Descriptive Name | Hex | CSS Variable | Role |
|---|---|---|---|
| **Pine** | `#06302b` | `--c-secondary-pine` | Deep container fills, navigation backgrounds. |
| **Basil** | `#0b453a` | `--c-secondary-basil` | Border color for cards and dividers. |
| **Forest** | `#095544` | `--c-secondary-forest` | Subtle section separators. |
| **Frog** | `#17876d` | `--c-secondary-frog` | Secondary interactive elements, tags. |
| **Mint** | `#2fa98c` | `--c-secondary-mint` | Hover highlights, progress indicators. |
| **Stone** | `#707d7d` | `--c-secondary-stone` | Secondary text, metadata, timestamps. |
| **Pistachio** | `#aacbc4` | `--c-secondary-pistachio` | Subdued body text, descriptions. |

---

### 2.2 Curiosity Palette (Palette 2)

| Descriptive Name | Hex | CSS Variable | Role |
|---|---|---|---|
| **Night Blue-Grey** | `#21263a` | `--c-Curiosity-bg` | Main background. Deep, inky navy with grey warmth. |
| **Lime Chartreuse** | `#d0d34d` | `--c-Curiosity-primary` | Primary accent — headings, CTAs, animated highlights. Electrifying energy. |
| **Periwinkle Mist** | `#c7cee8` | `--c-Curiosity-secondary` | Secondary text, card borders, soft UI chrome. |
| **Deep Emerald** | `#157954` | `--c-Curiosity-accent` | Accent for gradients, connection lines, tertiary interactive. |
| **Cloud Grey** | `#d6d9d8` | `--c-Curiosity-highlight` | Highlight text, badge backgrounds, tooltip surfaces. |
| **Slate White** | `#f1f5f9` | `--c-Curiosity-text` | Primary text on dark backgrounds. |
| **Slate 400** | `#94a3b8` | `--c-Curiosity-text-secondary` | Muted labels, captions, helper text. |

#### Curiosity Gradient System (Five Gradients)

| Gradient | From → To | Usage |
|---|---|---|
| **Gradient 1** | Cloud Grey `#d6d9d8` → Periwinkle `#c7cee8` | Soft overlays, skeleton loaders |
| **Gradient 2** | Periwinkle `#c7cee8` → Lime `#d0d34d` | CTA buttons, active section headers |
| **Gradient 3** | Periwinkle `#c7cee8` → Emerald `#157954` | Section dividers, decorative lines |
| **Gradient 4** | Lime `#d0d34d` → Night Blue `#21263a` | Hero backgrounds, ambient glow |
| **Gradient 5** | Emerald `#157954` → Night Blue `#21263a` | Footer fades, depth layers |

---

### 2.3 Semantic Token Layer

Both themes expose a unified set of CSS custom properties that shared components consume. The mapping switches via `[data-theme]`.

| Semantic Token | Formal Value | Curiosity Value | Tailwind Utility |
|---|---|---|---|
| `--theme-background` | Rich Black `#002f1a` | Night Blue `#21263a` | `bg-theme-background` |
| `--theme-surface` | Dark Green `#032221` | `rgba(33,38,58,0.8)` | `bg-theme-surface` |
| `--theme-primary` | Mountain Meadow `#2cc295` | Lime Chartreuse `#d0d34d` | `text-theme-primary` |
| `--theme-secondary` | Stone `#707d7d` | Periwinkle `#c7cee8` | `text-theme-secondary` |
| `--theme-accent` | Caribbean Green `#00df81` | Cloud Grey `#d6d9d8` | `text-theme-accent` |
| `--theme-text` | Anti-Flash White `#f1f7f6` | Slate White `#f1f5f9` | `text-theme-text` |
| `--theme-text-secondary` | Pistachio `#aacbc4` | Slate 400 `#94a3b8` | `text-theme-text-secondary` |
| `--theme-border` | Basil `#0b453a` | `rgba(199,206,232,0.2)` | `border-theme-border` |

---

## 3. Typography Rules

### Font Family

- **Primary:** `Axiforma` — A modern geometric sans-serif with optical balance and personality.
- **Fallback Stack:** `system-ui, -apple-system, sans-serif`
- **Weights Loaded:** Regular (400), Medium (500), SemiBold (600)
- **Format:** OpenType (.otf), served from `/fonts/axiforma/`
- **Rendering:** `font-display: swap` for performance; antialiased on all platforms.

### Type Scale

| Element | Weight | Size (Desktop) | Size (Mobile) | Usage |
|---|---|---|---|---|
| **Hero Title** | 600 (SemiBold) | `text-5xl` / `text-6xl` | `text-3xl` / `text-4xl` | Portfolio selector, primary headings |
| **Section Title** | 600 (SemiBold) | `text-3xl` | `text-2xl` | Section headers within views |
| **Card Title** | 600 (SemiBold) | `text-xl` / `text-2xl` | `text-lg` | Component headings |
| **Subtitle / Label** | 500 (Medium) | `text-base` / `text-lg` | `text-sm` / `text-base` | Category labels, card subtitles |
| **Body Text** | 400 (Regular) | `text-base` | `text-sm` | Descriptions, paragraphs |
| **Caption / Meta** | 400 (Regular) | `text-sm` / `text-xs` | `text-xs` | Timestamps, footnotes |

### Typography Character

- **Formal:** Measured line-heights with generous `leading-relaxed`. Sentences breathe. No decorative type.
- **Curiosity:** Slightly tighter spacing for energy. Occasional `font-medium` emphasis on descriptive text. Lime-colored headings draw the eye.

---

## 4. Component Stylings

### 4.1 Buttons

- **Shape:** Generously rounded corners (`rounded-3xl` for primary, `rounded-xl` for secondary). Pill-shaped feel.
- **Formal:** Solid `bg-primary-mountain-meadow` with `text-primary-rich-black`. Hover → subtle scale (`1.02`) + elevated shadow.
- **Curiosity:** Gradient fill from Lime → Periwinkle. Hover → scale (`1.02`) + neon glow (`shadow-[0_0_15px_rgba(208,211,77,0.4)]`).
- **Tap Feedback:** Scale down to `0.98` on press for tactile spring response.

### 4.2 Cards & Containers

- **Corner Radius:** Very rounded (`rounded-3xl` / `rounded-[20px]`). Softened, almost capsular edges.
- **Background:**
  - Formal → `bg-primary-dark-green` with subtle border `border-white/5`.
  - Curiosity → `bg-[#282e45]` (slightly lighter than canvas) with same border treatment.
- **Shadow:** Light ambient shadow (`shadow-2xl`). Hover state lifts card 8px with deeper shadow via `hoverLift` variant.
- **Hover:** Inner gradient overlay fades in (`opacity-0 → opacity-100`, `transition-opacity duration-500`). Background shifts subtly.
- **Progress Bar:** 1px-tall track with animated fill on hover interaction.

### 4.3 Inputs & Forms

- **Stroke:** 1px solid `theme-border` color.
- **Background:** `theme-surface` with slight transparency.
- **Focus Ring:** 2px outline using `theme-accent` color.
- **Corners:** Subtly rounded (`rounded-lg`).

### 4.4 Navigation (Navbar)

- Sticky at viewport top with `pt-16` content offset.
- Semi-transparent background with blur backdrop.
- Theme toggle button for switching between Formal ↔ Curiosity.
- Keyboard accessible: Arrow keys switch themes when focused.

### 4.5 Badges & Pills (SkillPills)

- **Shape:** Pill-shaped (`rounded-full`).
- **Formal:** `bg-secondary-basil` text `text-primary-anti-flash-white`.
- **Curiosity:** Gradient border with translucent fill.
- **Animation:** Spring-based scale-in (`scaleIn` variant) with staggered reveal.

---

## 5. Layout Principles

### Responsive Grid

- **Container:** `max-w-5xl` centered with `px-8` horizontal padding.
- **Selector Gate:** 2-column grid (`grid-cols-1 md:grid-cols-2 gap-8`) for the dual-card chooser.
- **Content Views:** Full-width column layouts within each theme, sections stack vertically.
- **Breakpoints:** Tailwind defaults — `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`.

### Whitespace Strategy

- **Formal:** More breathing room. Generous `mb-16` between hero and content. Sections separated by `py-12` or more.
- **Curiosity:** Denser but still clear. Sections at `py-8` to `py-12`. Widgets and cards pack tighter.

### Z-Index Layers

| Layer | z-index | Usage |
|---|---|---|
| Background effects | `z-0` | Blur blobs, PS2 retro background |
| Content | `z-10` | Cards, text, interactive elements |
| Navigation | `z-50` | Sticky navbar |
| Modals / Overlays | `z-100` | Skip link focus state |

---

## 6. Motion & Animation

### Animation Library
**Framer Motion** — Declarative animation via React component props.

### Variant Catalog

| Variant Name | Trigger | Properties | Easing |
|---|---|---|---|
| `fadeInUp` | Scroll / mount | `opacity: 0→1, y: 30→0` | Custom cubic-bezier `[0.22, 1, 0.36, 1]` |
| `fadeIn` | Mount | `opacity: 0→1` | Default (500ms) |
| `slideInLeft` | Scroll reveal | `opacity: 0→1, x: -50→0` | `easeOut` (500ms) |
| `slideInRight` | Scroll reveal | `opacity: 0→1, x: 50→0` | `easeOut` (500ms) |
| `scaleIn` | Mount | `opacity: 0→1, scale: 0.8→1` | Spring (stiffness: 300, damping: 20) |
| `staggerContainer` | Parent | Children stagger 100ms, delay 200ms | — |
| `hoverScale` | Hover / Tap | `scale: 1.05` (hover), `0.95` (tap) | Spring (stiffness: 400, damping: 17) |
| `hoverLift` | Hover | `y: -8`, elevated shadow | Spring (stiffness: 300, damping: 20) |

### Theme Transition

When switching between Formal and Curiosity, the active view exits with a **blur dissolve** (`filter: blur(10px)`, `opacity: 0`) and the incoming view enters with the reverse. Duration: `500ms`, easing: `easeInOut`. Managed by `AnimatePresence mode="wait"`.

### Scroll-Reactive Design

The CSS layer supports scroll-stage-driven design through `data-scroll-stage` attributes on `<body>`:

| Stage | Border Radius | Shadow Depth | Blur | Gradient Intensity |
|---|---|---|---|---|
| **0** (Top) | `0.5rem` | Light ambient | `0px` | `0` |
| **1** | `1rem` | Medium diffused | `2px` | `0.3` |
| **2** | `1.5rem` | Deep layered | `4px` | `0.6` |
| **3** (Deep) | `2rem` | Heavy dramatic | `8px` | `1.0` |

### Body Transition
Background and text colors transition smoothly on theme switch: `500ms cubic-bezier(0.4, 0, 0.2, 1)`.

### Custom Keyframes
- `spin-slow`: Full rotation in 8 seconds (decorative loaders).
- `spin-reverse-slow`: Reverse rotation in 10 seconds (orbital effects).

---

## 7. Depth & Elevation

- **Formal:** Whisper-soft elevation. Cards sit almost flush with the background. Depth is communicated through color value shifts (lighter surface on darker ground) rather than shadow.
- **Curiosity:** More pronounced elevation via `shadow-2xl` and ambient glow effects (`box-shadow` with color-tinted rgba). Neon glow on interactive hover (`shadow-[0_0_15px_rgba(208,211,77,0.4)]`).
- **Shared:** Both themes use the scroll-reactive shadow system to progressively deepen shadow intensity as the user scrolls.

---

## 8. Accessibility

### Keyboard Navigation
- Full arrow-key support for theme switching in `SplitLayout` (`ArrowLeft` / `ArrowRight`).
- Skip-link positioned at `top: -40px`, visible on `:focus` at `top: 0`.

### Reduced Motion
Global `@media (prefers-reduced-motion: reduce)` rule disables all animations and transitions (duration → `0.01ms`, iteration → `1`).

### Color Contrast
- Formal text (`#f1f7f6`) on background (`#002f1a`) → contrast ratio **≈ 14.5:1** ✅ (AAA)
- Curiosity text (`#f1f5f9`) on background (`#21263a`) → contrast ratio **≈ 11.8:1** ✅ (AAA)
- Accent Mountain Meadow (`#2cc295`) on Rich Black → **≈ 7.2:1** ✅ (AA Large)
- Lime (`#d0d34d`) on Night Blue (`#21263a`) → **≈ 8.3:1** ✅ (AA Large)

### Semantic HTML
- Skip link for screen readers.
- Alt text on profile images (`"Formal"`, `"Curiosity"`).
- Button elements for interactive cards (not `<div onClick>`).

---

## 9. Theme Switching Architecture

```
┌──────────────────┐
│  URL ?side=...   │ ←── Source of truth (search param)
└────────┬─────────┘
         ▼
┌──────────────────┐
│   SideContext    │ ←── React Context (SideProvider)
│ side: Side|null  │     Stores 'formal' | 'Curiosity' | null
│ setSide()        │     Syncs → URL param + localStorage
│ toggleSide()     │
└────────┬─────────┘
         ▼
┌──────────────────┐
│   SplitLayout    │ ←── Renders PortfolioSelector (null)
│                  │     or FormalView / CuriosityView
└────────┬─────────┘
         ▼
┌──────────────────┐
│ data-theme attr  │ ←── Applied to root element
│ 'formal' or      │     Activates CSS variable overrides
│ 'Curiosity'      │     in theme.css
└──────────────────┘
```

**State Flow:**
1. `getInitialSide()` reads `?side=` from URL on mount.
2. If no param → render `PortfolioSelector` (chooser gate).
3. On selection → `setSide()` updates state, URL param, and `localStorage`.
4. `data-theme` attribute on root triggers CSS variable swap.
5. `AnimatePresence` handles the blur-dissolve transition between views.

---

## 10. Asset Inventory

### Fonts
- `/fonts/axiforma/Axiforma-Regular.otf` (400)
- `/fonts/axiforma/Axiforma-Medium.otf` (500)
- `/fonts/axiforma/Axiforma-SemiBold.otf` (600)

### Images
- `/images/Perfil 2.png` — Formal profile avatar
- `/images/hipters.png` — Curiosity profile avatar

### Source Files
- `src/styles/theme.css` — All CSS custom properties and @font-face declarations
- `src/lib/color-system.ts` — TypeScript color constants and semantic mapping
- `src/lib/animation-variants.ts` — Framer Motion variant presets
- `src/context/SideContext.tsx` — Theme state management
- `tailwind.config.ts` — Tailwind token extensions

---

## 11. Design Principles (Summary)

| Principle | Formal | Curiosity |
|---|---|---|
| **Emotion** | Trust, competence, clarity | Curiosity, warmth, creativity |
| **Density** | Spacious, editorial | Compact, dashboard-like |
| **Color Energy** | Low-chroma greens (calm) | High-chroma lime (electric) |
| **Motion** | Subtle fades, minimal | Staggered reveals, springs, glow |
| **Typography** | SemiBold titles, Regular body | Medium emphasis, tighter leading |
| **Depth** | Flat with color contrast | Elevated with shadow + glow |
| **Interaction** | Restrained hover states | Energetic hover with gradient reveals |

---

*Last updated: 2026-05-04 ·

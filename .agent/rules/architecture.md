# Architecture Rules — Alva Portfolio v3

## Project Nature (CRITICAL CONTEXT)
This is a **100% client-side, no-backend** portfolio. There is no server, no database, no API routes.
All data is either:
- Static TypeScript content files under `src/content/`
- Pre-fetched JSON at build time under `src/data/generated/`
- Fetched at runtime from public APIs (GitHub, Leetcode, Duolingo) via custom hooks in `src/hooks/`

## Dual-Side Architecture (NON-NEGOTIABLE)
The portfolio has two distinct visual experiences driven by a `side` URL parameter and managed via `SideContext`:
- `?side=formal` — Professional, minimalist, corporate aesthetic
- `?side=Curiosity` — Vibrant, playful, experimental aesthetic

Every component that renders differently per side MUST read from `SideContext` or accept a `side` prop.
Never hardcode visual behavior for one side inside a component that belongs to both.
- verify: `grep -r "side==='formal'" src/components/` — any match in a shared component is a boundary violation.

## Directory Structure (NON-NEGOTIABLE)
```
src/
├── components/
│   ├── formal/          # Components exclusive to the Formal side
│   ├── Curiosity/       # Components exclusive to the Curiosity side
│   ├── layout/          # Shared structural components (Navbar, SplitLayout, etc.)
│   ├── sections/        # Shared section-level components
│   ├── ui/              # Primitive, headless UI components (no side logic)
│   ├── svg/             # SVG and animated graphic components
│   └── animations/      # Framer Motion wrappers and animation primitives
├── content/             # Static data: profile, skills, experience, education
├── context/             # React Context providers (SideContext, ThemeContext, etc.)
├── data/generated/      # Build-time generated data (pinned.json, etc.)
├── hooks/               # Custom React hooks (data fetching, scroll, side state)
├── lib/                 # Pure utility functions and helpers (no React)
├── styles/              # Global CSS, theme tokens, glassmorphism utilities
└── types/               # TypeScript interfaces and enums
```

## Component Placement Rules
- A component that is ONLY used on the Formal side → `src/components/formal/`
- A component that is ONLY used on the Curiosity side → `src/components/Curiosity/`
- A component used on BOTH sides → `src/components/sections/`, `src/components/layout/`, or `src/components/ui/`
- verify: No import from `components/formal/` exists inside any file under `components/Curiosity/`, and vice versa.

## Data Flow (HARD RULE)
- Static content → import directly from `src/content/*.ts`
- GitHub data → use `useGitHubStats` hook only. Never call GitHub API directly from a component.
- External APIs (Leetcode, Duolingo) → use the dedicated hook in `src/hooks/`. Never call `fetch()` directly in a component.
- verify: `grep -r "fetch(" src/components/` must return 0 matches (all fetches must live in hooks).

## Import Paths
- All internal imports must use the `@/` alias for paths deeper than 1 level.
  - Example of WRONG: `import { profile } from '../../content/profile'`
  - Example of CORRECT: `import { profile } from '@/content/profile'`
- verify: `grep -rE "from '\.\./\.\." src/` must return 0 matches.

## State Management
- `SideContext` — the single source of truth for the current active side (`formal` | `Curiosity`).
- No other global state library is installed. Use React `useState` + `useContext` + `useMemo` as needed.
- `localStorage` is used only for persisting the user's side preference across sessions.

## Business Logic Placement
- All data transformations and filtering logic must live in `src/lib/` or in hooks (`src/hooks/`).
- Never put complex logic (sorting, filtering, mapping) inline inside JSX return statements.
- verify: No `.filter(`, `.sort(`, `.reduce(` calls found inside JSX return blocks.

# Git Conventions — Alva Portfolio v3

## 1. Branch Naming Strategy
All new work must be performed on a feature branch. Use the following prefixes:

- `feature/`: New features or new sections (e.g., `feature/curiosity-stats-panel`)
- `fix/`: Bug fixes (e.g., `fix/side-toggle-keyboard-nav`)
- `refactor/`: Code improvements without behavior changes (e.g., `refactor/split-layout-cleanup`)
- `chore/`: Maintenance, dependency updates (e.g., `chore/update-framer-motion`)
- `docs/`: Documentation only (e.g., `docs/update-readme`)
- `test/`: Adding or updating tests (e.g., `test/curiosity-view-e2e`)
- `ci/`: Continuous Integration / GitHub Actions changes
- `design/`: Pure visual / CSS / animation changes (e.g., `design/glassmorphism-navbar`)

## 2. Conventional Commits (MANDATORY)
Commit messages must follow the format: `<type>(<scope>): <short summary>`

### Registered Types
- `feat`: New feature or section
- `fix`: Bug fix
- `refactor`: Refactoring without behavior change
- `perf`: Performance improvement (animations, bundle size, LCP)
- `docs`: Documentation
- `test`: Adding or updating tests
- `build`: Build system, Vite config, or dependency changes
- `ci`: GitHub Actions / workflow changes
- `chore`: Chores (cleanup, housekeeping)
- `style`: Formatting, CSS, Tailwind changes (no logic change)
- `design`: Visual design changes (colors, layouts, animations)
- `a11y`: Accessibility improvements

### Scopes
Use one of the following established scopes — match the component area or domain:

| Scope        | When to Use                                          |
|--------------|------------------------------------------------------|
| `formal`     | Changes to the Formal side experience                |
| `curiosity`  | Changes to the Curiosity side experience             |
| `layout`     | Changes to `components/layout/`                      |
| `selector`   | Changes to the `PortfolioSelector` landing page      |
| `github`     | Changes to GitHub API integration or `useGitHubStats`|
| `content`    | Changes to `src/content/` static data files          |
| `animations` | Changes to Framer Motion animations or CSS keyframes |
| `theme`      | Changes to `src/styles/` or Tailwind config          |
| `ci`         | Changes to `.github/workflows/`                      |
| `deps`       | Dependency updates                                   |

Example: `feat(curiosity): Add animated stats panel with Leetcode data`
Example: `fix(formal): Resolve ExperienceTimeline overflow on mobile`
Example: `design(theme): Implement glassmorphism card system for Curiosity side`

## 3. Formatting Rules
- Header: Max 70 chars, imperative mood, no ending period.
- Body: Optional but recommended for complex changes. Explain "why", not "what".
- Footer: Use `Fixes #123` or `Refs #456` to link GitHub issues.

## 4. Branch Lifecycle
- `main` — Production branch. Reflects what is live at `alvagonz.github.io`. Only merge via PR.
- `develop` — Integration branch. All feature branches merge here first.
- Feature branches → merge to `develop` → deploy/review → merge to `main`.
- Never commit directly to `main` or `develop`.

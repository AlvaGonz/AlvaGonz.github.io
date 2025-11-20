# Adrian A. A. González - Portfolio

A modern dual-portfolio built with React, TypeScript, Vite, and Tailwind CSS. Features a creative/formal split layout with progressive scroll-based modernization.

## Features

- **Dual Layout**: Toggle between creative and formal views
- **Progressive Modernization**: Styles evolve as you scroll
- **GitHub Integration**: Fetches pinned repositories automatically
- **Responsive Design**: Works on all devices
- **Accessibility**: WCAG compliant with keyboard navigation
- **Performance**: Optimized with lazy loading and modern techniques

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Vitest (Unit Tests)
- Playwright (E2E Tests)

## Development

### Prerequisites

- Node.js 20+
- pnpm 8+

### Setup

```bash
# Install dependencies
pnpm install

# Fetch GitHub pinned repos (optional, requires GITHUB_TOKEN)
pnpm fetch-pinned

# Start development server
pnpm dev
```

### Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Testing

```bash
# Run unit tests
pnpm test

# Run unit tests with UI
pnpm test:ui

# Run E2E tests
pnpm test:e2e

# Run E2E tests with UI
pnpm test:e2e:ui
```

## Fonts

Place Axiforma font files in `public/fonts/axiforma/`:
- `Axiforma-Regular.otf`
- `Axiforma-Medium.otf`
- `Axiforma-SemiBold.otf`

## GitHub Token (Optional)

To fetch pinned repositories via GraphQL API:

1. Create a GitHub Personal Access Token
   - **Classic Token**: Select `public_repo` scope.
   - **Fine-grained Token**: "Read-only" access to "Contents" and "Metadata" for the specific repository.
2. Set `GITHUB_TOKEN` environment variable
3. Run `pnpm fetch-pinned` before build

Without token, the script falls back to REST API or uses fallback data.

## Deployment

### Netlify

The project is configured for Netlify deployment with:

- Build command: `pnpm install && pnpm fetch-pinned && pnpm build`
- Publish directory: `dist`
- SPA redirects configured

Set environment variables in Netlify dashboard:
- `GITHUB_TOKEN` (optional): GitHub Personal Access Token

## Project Structure

```
├── public/
│   ├── fonts/axiforma/    # Axiforma font files
│   └── images/            # Static assets
├── src/
│   ├── components/        # React components
│   ├── content/          # Content data (profile, skills)
│   ├── data/generated/   # Generated data (GitHub repos)
│   ├── hooks/            # Custom React hooks
│   ├── styles/           # CSS and theme
│   └── test/             # Test utilities
├── scripts/              # Build scripts
└── e2e/                  # E2E tests
```

## License

MIT

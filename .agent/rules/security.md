# Security Rules — Alva Portfolio v3

## Secrets Management (ABSOLUTE — zero tolerance)
- This project's only secret is the `GITHUB_TOKEN` used by the `pnpm fetch-pinned` build script.
- `GITHUB_TOKEN` must be stored in `.env.local` (never `.env`) and `.env.local` must be in `.gitignore`.
  - verify: `git ls-files .env.local` must return empty (file must never be tracked).
  - verify: `grep -r "ghp_\|github_pat_" src/ scripts/` must return 0 matches (no hardcoded tokens).
- In CI/CD (GitHub Actions), the token must come from `${{ secrets.GITHUB_TOKEN }}`. Never interpolate it as plaintext in workflow YAML.

## Environment Variable Access
- In the browser, only variables prefixed with `VITE_` are accessible (e.g., `VITE_GITHUB_TOKEN`).
- Never expose a secret via a `VITE_` prefix — `VITE_` vars are bundled into the client bundle and visible to all users.
- `GITHUB_TOKEN` is ONLY used in the `scripts/fetch-pinned.js` build script (Node.js context), never in Vite client code.
  - verify: `grep -r "VITE_GITHUB" src/` must return 0 matches.

## XSS Prevention (Client-Side Rendering)
- Never use `dangerouslySetInnerHTML` with any data that originates from an external API (GitHub, Leetcode, Duolingo).
  - Example of WRONG: `<div dangerouslySetInnerHTML={{ __html: repo.description }} />`
  - Example of CORRECT: `<p>{repo.description}</p>` (React escapes by default)
  - verify: `grep -r "dangerouslySetInnerHTML" src/` must return 0 matches unless the value is a hardcoded, trusted string literal.
- All content from GitHub API responses (repo names, descriptions, bio) must be rendered as plain text, never as raw HTML.

## Dependency Hygiene
- `pnpm audit` must run on every CI build. Any HIGH or CRITICAL severity CVE blocks the merge.
  - verify: CI workflow includes `pnpm audit --audit-level=high` before the build step.
  - verify: `pnpm audit` locally returns 0 HIGH/CRITICAL vulnerabilities before any PR.

## Content Security Policy (CSP)
- The deployed site must serve a Content-Security-Policy header or meta tag that restricts:
  - `script-src`: to `'self'` and trusted CDN origins only.
  - `style-src`: to `'self'` and Google Fonts.
  - `img-src`: to `'self'`, `data:`, and `avatars.githubusercontent.com` (GitHub avatars).
  - `connect-src`: to `'self'`, `api.github.com`, and any other used external APIs.

## External API Error Handling
- All external API calls (GitHub, Leetcode, Duolingo) must have:
  - A timeout threshold to prevent indefinite loading states.
  - A graceful fallback UI (e.g., static fallback data from `src/data/generated/`) when the API fails.
  - verify: Every hook in `src/hooks/` that calls an external API has a `catch` block and returns fallback data.

## localStorage Security
- `localStorage` is used only for persisting the user's side preference (`formal` | `curiosity`).
- Never store sensitive data (tokens, personal info) in `localStorage`.
  - verify: `grep -r "localStorage.setItem" src/` items must only relate to side/theme preferences.

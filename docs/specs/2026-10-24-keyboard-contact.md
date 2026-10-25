# Spec — Live Duolingo stats + 3D keyboard contact

Date: 2026-10-24
Branch: `feat/duolingo-sync-keyboard-contact`

## Problem

1. Duolingo data is committed once and never refreshed. Streak, XP, and the displayed language level are stale (`B2` is hardcoded). The public Duolingo profile is the only free source that exposes streak, XP, courses, and avatar.
2. The site has no playful contact entry point. The existing contact cards only link to profiles.

## Scope

In:

- Fetch real Duolingo stats at build time (public endpoint, no key).
- Estimate a per-course CEFR level from real course XP, always labelled `est.`.
- Run the fetch daily in the existing Pages workflow before the build.
- Port the 3D keyboard from `3-d-keyboard-chat` as a lazy-loaded section.
- Turn the terminal into a contact composer for email, WhatsApp, and Telegram.
- Render the section immediately before `DailyVerse` in both views.

Out:

- AI chat, streaming, rate limiting, Upstash, ai-elements.
- Anakin API. It cannot return CEFR levels without a connected account, so it adds a secret without solving the level problem.
- Backend or serverless functions. GitHub Pages is static.
- Global keyboard capture. The keyboard only listens while its input is focused.

## Tickets

### T1 — Duolingo sync

- Rewrite `scripts/fetch-duolingo.ts` to map the public endpoint.
- Output `{ username, streak, totalXp, learningLanguage, avatar, courses[{title, learningLanguage, xp, level}], motivation, lastUpdated }`.
- Fail soft: keep the previous JSON when the request fails.
- Add `schedule: cron('17 5 * * *')` and a `pnpm fetch-duolingo` step to `.github/workflows/deploy.yml`.
- Replace hardcoded `B2` and fallback objects in `DuolingoFireWidget` and `DuolingoWidget`.

Acceptance: a deploy without code changes refreshes streak/XP; both widgets read only generated JSON; no fake levels.

### T2 — 3D keyboard contact

- Port `keyboard-layout.ts`, `key.tsx`, `keyboard-3d.tsx` into `src/features/keyboard/`.
- Replace chat with a controlled input inside the terminal.
- Clicking a 3D key edits the same input. Physical typing works through the input, not a window listener.
- Send via `mailto:adrian.aalvarezgonz@gmail.com`, `https://wa.me/18299247374`, or `https://t.me/+18299247374`.
- Telegram has no prefilled text on phone links: copy the message and tell the user to paste it.
- Lazy-load the scene when the section approaches the viewport.
- Place `<LazyKeyboardContact />` before `<DailyVerse />` in `FormalView` and `CuriosityView`.

Acceptance: no network request for three.js until the section is near the viewport; Enter sends through the default channel; each channel button produces a valid encoded URL; empty messages do nothing.

### T3 — Validation and delivery

- Unit tests for message trimming and channel URL builders.
- `pnpm type-check`, `pnpm lint`, `pnpm test --run`, `pnpm build`.
- Run graphify against `src` with output ignored by git.
- Code review, then commit on the feature branch. No direct push to `main`.

## Notes

- `crowns: 9999` from the public API is bogus and is not used.
- The public API does not expose CEFR. Levels are estimates from course XP and are labelled as such.
- The Anakin key pasted in chat must be rotated and must never be committed.

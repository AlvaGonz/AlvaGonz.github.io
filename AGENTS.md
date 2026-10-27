# Agent Guidelines

## Agent skills

### Issue tracker

Issues and specs for this repo live as GitHub issues. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical triage roles mapped to GitHub issue labels (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context domain documentation (`GLOSSARY.md` + `docs/adr/`). See `docs/agents/domain.md`.

## Context & Repository Exploration

For every task requiring context of this repository or project, agents must consult:

1. **Graphify Knowledge Graph**: Check `graphify-out/` (`graph.html`, graph metadata) first to understand component dependencies, modules, and architecture relationships.
2. **Skills Instructions**: Consult the relevant skill instructions in `.agents/skills/` before executing tasks or workflows.

This structure is intended to give agents immediate, high-fidelity comprehension of the codebase without unnecessary trial-and-error exploration.

## Architectural Invariants

### Client-Side Secrets (`VITE_*`)

Environment variables prefixed with `VITE_` are embedded directly into client-side JavaScript artifacts by Vite at build time. Never place private keys, authentication tokens, or elevated credentials in `VITE_*`. All client requests must be unauthenticated, use public read-only scopes, or be generated as static data at build time.

### Telemetry & Offline Resilience

External data (GitHub contributions, Duolingo statistics) uses build-time snapshots (`src/data/generated/`) and curated fallback datasets (`src/features/github/data/fallbackGitHubStats.ts`). Any modifications to data fetching must maintain complete offline functionality and graceful fallback states when live APIs or tokens are absent.

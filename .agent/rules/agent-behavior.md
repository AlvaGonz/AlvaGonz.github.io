# Agent Behavior Rules — Alva Portfolio v3
# Loaded at the start of every session. All rules apply to all agents.

1. **PLAN FIRST.** Any task touching 3+ files or both the `formal/` and `Curiosity/` sides must enter Planning mode before execution. Never start editing files on a multi-step task without a written plan.
   - Example of WRONG: Starting to edit 5 components before stating a plan.
   - Example of CORRECT: "I will: (1) identify affected components, (2) propose change, (3) implement, (4) verify build and visual."

2. **ONE GOAL PER SUBAGENT.** Each agent receives exactly one well-defined objective. Never mix Formal-side work and Curiosity-side work in the same agent run — they are distinct visual personalities.
   - verify: Agent task description contains exactly one "Objective:" statement.

3. **READ LESSONS FIRST.** Open `tasks/lessons.md` (if it exists) at the start of any non-trivial task. Never repeat a mistake that has already been logged as a LESSON: entry.

4. **TEST BEFORE DONE.** Never mark a task complete without running lint, TypeScript check, and the unit test suite.
   - verify: `pnpm lint && pnpm type-check && pnpm test` all exit 0 before claiming DONE.
   - For visual changes, take a browser screenshot and confirm the change looks correct on both sides.

5. **MINIMAL IMPACT.** Change at most 3 files per task without explicit user approval. If more files must change, stop and ask the user to confirm scope before proceeding. No opportunistic refactors that were not part of the stated task.
   - verify: `git diff --name-only` must list ≤ 3 files per commit unless user explicitly expanded scope.

6. **NO SECRETS IN REPO.** Never commit `.env`, hardcoded API tokens (GitHub PAT), or credentials.
   - The only secret this project uses is `GITHUB_TOKEN` for fetching pinned repos — it lives in `.env.local` only, and `.env.local` is gitignored.
   - verify: Before every push — search for literal token strings in source files. Must return 0 matches outside `*.md` and `*.example` files.

7. **DUAL-SIDE PARITY.** Every structural change (layout, typography, spacing system) must be reviewed for impact on BOTH the `formal` and `Curiosity` sides. A change that looks great on one side but breaks the other is not acceptable.
   - verify: After any layout change, visually confirm both `?side=formal` and `?side=Curiosity` render correctly.

8. **ROOT CAUSE FIRST.** When fixing a bug, identify the root cause before writing the fix. A band-aid that masks a deeper issue is not acceptable.
   - Example of WRONG: Catching an animation error silently to stop the test from failing.
   - Example of CORRECT: Tracing the error to its source (wrong prop type, missing key, etc.) and fixing the condition there.
   - verify: Bug fix commit message includes "Root cause:" in the description.

9. **WRITE LESSONS.** When a correction is made or a reversal occurs, write one durable rule to `tasks/lessons.md`. Always format as: `LESSON: <domain> — <what happened> — <durable rule derived>`

10. **SENIOR APPROVAL TEST.** Before finalizing any implementation, ask: "Would a senior frontend engineer approve this?" If the answer is uncertain, simplify before submitting.
    - verify: If uncertain, reduce scope and resubmit rather than guessing approval.

# Testing Rules — Alva Portfolio v3

## Test Stack
- **Unit / Component**: Vitest + React Testing Library
- **End-to-End**: Playwright (tests in `e2e/` or `src/test/`)
- **Type checking**: `pnpm type-check` (tsc --noEmit)

## Unit & Component Testing (Vitest + RTL)
- Coverage must be maintained at ≥ 80% on all metrics. Never merge a PR that drops below 80%.
  - verify: `pnpm test --coverage` exits 0 and coverage summary shows ≥ 80% lines, functions, branches.
- Test files must be colocated alongside their source file (`MyComponent.test.tsx` next to `MyComponent.tsx`) OR inside the nearest `__tests__/` folder.
- Only test observable behavior: rendered output, user events, context state changes. Never test implementation details (internal state variables, private functions).
- Components that conditionally render based on `side` (formal/Curiosity) MUST be tested for BOTH sides.
  - Example: A `HeroCuriosity.tsx` test must render with `side="Curiosity"` in the `SideContext` and verify the correct elements appear.

## Dual-Side Test Requirement (NON-NEGOTIABLE)
- Any component that reads from `SideContext` must have test cases for BOTH `side="formal"` and `side="Curiosity"`.
  - verify: `grep -r "formal" src/components/__tests__/` — components that branch on `side` must have at least one formal test and one Curiosity test.

## Hook Testing
- Custom hooks in `src/hooks/` must be tested using `@testing-library/react`'s `renderHook` utility.
- API-fetching hooks (`useGitHubStats`, `useLeetcodeStats`, `useDuolingoStats`) must mock the underlying `fetch` and test:
  1. The loading state while the request is pending.
  2. The success state with mocked response data.
  3. The error/fallback state when the request fails.

## End-to-End Testing (Playwright)
- Critical user flows must have a corresponding Playwright test:
  - [ ] Landing selector renders and both side buttons are clickable.
  - [ ] Navigating to `?side=formal` renders the Formal experience.
  - [ ] Navigating to `?side=Curiosity` renders the Curiosity experience.
  - [ ] Side preference is persisted in `localStorage` and survives a page reload.
  - [ ] Keyboard navigation (arrow keys) switches between sides correctly.
- verify: `pnpm test:e2e` exits 0 on `develop` branch before merging features.
- E2E tests run only on PRs targeting `develop` or `main` to avoid unnecessary CI cost.

## Animation & Performance Testing
- Framer Motion animations must not cause layout shift or console errors during tests.
  - Use `prefers-reduced-motion: reduce` media query in test environments to disable animations.
  - verify: No `useAnimation` or `motion` component causes a React act() warning in test output.
- Lighthouse CI (if configured) must report scores ≥ 90 for Performance, Accessibility, and Best Practices.

## TDD Requirement (RED → GREEN → REFACTOR)
- For any new feature or bug fix: write a failing test first. Do not write implementation code until the test fails.
  - verify: The first test run after writing a test (before writing the fix) must produce ≥ 1 FAIL result.
- Refactor only after GREEN — never refactor a failing test to make it pass.

## Accessibility Testing
- Every interactive component must be tested with at minimum:
  - A keyboard interaction test (tab, enter, space, arrow keys where applicable).
  - An ARIA attribute check (correct `role`, `aria-label`, `aria-expanded`, etc.).
- verify: `pnpm test:e2e --grep "@a11y"` must pass for all tagged accessibility tests.

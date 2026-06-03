---
name: project-md3
description: Core decisions for the @poncegl/material-design-3 React component library
metadata:
  type: project
---

React component library reimplementing Material Design 3. Published as `@poncegl/material-design-3` on npm.

**Why:** Bring M3 components to React (M3 was originally designed for Kotlin/Jetpack Compose).

**Key decisions:**

- npm scope: `@poncegl` (matches GitHub handle PonceGL)
- Package manager: pnpm with monorepo workspaces
- Monorepo structure: `packages/` (publishable), `apps/` (example, storybook), `tooling/` (shared configs)
- Build: Vite lib mode, ESM + CJS outputs, compatible with Vite/Next/Astro
- Styling: Tailwind v4 + CSS custom properties (M3 system tokens as CSS vars, @theme for Tailwind utilities)
- Theming: three supported approaches (CSS var override, ThemeProvider, no config / baseline). All three must work.
- ThemeProvider implementation: applies tokens via `useLayoutEffect` on `document.documentElement` — NOT via React context — so no re-renders in children
- Component structure: colocation pattern (implementation, types, tests, stories all in same folder)
- Testing: Vitest + React Testing Library + axe-core
- Storybook: 8.x with a11y, docs, interactions addons
- Jira: Scrum project, created and initialized

**How to apply:** Reference docs/architecture.md, docs/theming.md, docs/component-template.md for implementation decisions.

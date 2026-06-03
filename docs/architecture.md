# Project Architecture

## Monorepo Structure

pnpm monorepo. The root `package.json` is private and never published.

```
material-design-3-react/
├── packages/
│   └── material-design-3/          # @poncegl/material-design-3
│       ├── src/
│       │   ├── components/
│       │   │   └── [ComponentName]/
│       │   │       ├── [ComponentName].tsx        # Implementation
│       │   │       ├── [ComponentName].test.tsx   # Vitest + RTL + axe
│       │   │       ├── [ComponentName].stories.tsx# Storybook
│       │   │       ├── [ComponentName].types.ts   # TypeScript types
│       │   │       └── index.ts                   # Public API re-exports
│       │   ├── tokens/             # CSS variables (M3 system tokens)
│       │   ├── theme/              # ThemeProvider + createMD3Theme
│       │   └── index.ts            # Library root export
│       ├── package.json
│       ├── vite.config.ts
│       └── tsconfig.json
├── apps/
│   ├── example/                    # Dev playground
│   └── storybook/                  # Storybook instance
├── tooling/                        # Shared dev configs (not published)
│   ├── eslint-config/
│   └── tsconfig/
├── docs/                           # Project documentation (this folder)
├── .github/
│   └── workflows/                  # CI/CD pipelines
├── package.json                    # Root workspace (private, never published)
└── pnpm-workspace.yaml
```

## Core Principles

### 1. Colocation

Every component owns all of its files. Implementation, types, tests, and stories live together in one folder. This makes it easy to find everything related to a component and removes the need to navigate across multiple directories for a single change.

```
Button/
├── Button.tsx          ← implementation
├── Button.types.ts     ← types
├── Button.test.tsx     ← tests
├── Button.stories.tsx  ← Storybook stories
└── index.ts            ← public API
```

**Rule:** Never import from a component's internal files. Always import from its `index.ts`.

### 2. Token-based styling

No hardcoded colors, border-radii, shadows, or font sizes. Every visual value comes from an M3 system token (CSS custom property).

```css
/* Wrong */
background-color: #6750a4;

/* Right */
background-color: var(--md-sys-color-primary);
```

Tokens are defined in `packages/material-design-3/src/tokens/` and mapped to Tailwind v4 utilities in `styles.css`. See [theming.md](./theming.md) for the full system.

### 3. M3 spec compliance

Every component is built to match the Material Design 3 specification exactly. Before implementing a component, read its spec at [m3.material.io](https://m3.material.io/components). Key things to verify:

- All documented variants are implemented
- State layer opacities are correct (hover 8%, focus 12%, pressed 12%, disabled 38%)
- Touch target minimum is 48×48px
- ARIA roles and keyboard behavior match the ARIA Authoring Practices Guide

### 4. Accessibility first

Accessibility is not an afterthought — it is a requirement. Every component must:

- Have the correct ARIA role and attributes
- Be fully keyboard navigable
- Pass an automated axe-core audit (no violations)
- Have a visible focus indicator

### 5. TypeScript strict mode

The library is TypeScript-first. `strict: true` is enabled. No `any` types. All props, variants, and states have explicit types defined in `[ComponentName].types.ts`.

## Build output

The library is built with Vite in library mode. It outputs:

| File              | Format                  | Purpose                                    |
| ----------------- | ----------------------- | ------------------------------------------ |
| `dist/index.js`   | ESM                     | For modern bundlers (Vite, Next.js, Astro) |
| `dist/index.cjs`  | CJS                     | For CommonJS environments                  |
| `dist/index.d.ts` | TypeScript declarations | For type checking                          |
| `dist/styles.css` | CSS                     | Tokens + Tailwind @theme                   |

Both `react` and `react-dom` are peer dependencies and are excluded from the bundle.

## Testing strategy

| Layer         | Tool         | What it covers                           |
| ------------- | ------------ | ---------------------------------------- |
| Unit          | Vitest + RTL | Component rendering, props, interactions |
| Accessibility | axe-core     | Automated a11y audit per variant         |
| Visual        | Storybook    | Manual review of all variants and states |

Tests live alongside components (colocation). Run with `pnpm test`.

## Storybook

Storybook lives in `apps/storybook/` and serves two purposes:

1. **Development environment** — build and inspect components in isolation during development
2. **Component documentation** — the published Storybook (GitHub Pages) is the interactive reference for users

Every component must have stories covering all variants, all meaningful states, and at least one composition example. See [component-template.md](./component-template.md) for the full requirement.

## CI/CD pipelines

| Workflow        | Trigger               | Steps                                    |
| --------------- | --------------------- | ---------------------------------------- |
| `ci.yml`        | PR and push to `main` | lint → typecheck → test → build          |
| `release.yml`   | Push to `main`        | Changesets version → publish to npm      |
| `storybook.yml` | Push to `main`        | Build Storybook → deploy to GitHub Pages |

## Workspace includes

| Glob         | Purpose                               |
| ------------ | ------------------------------------- |
| `packages/*` | Publishable packages                  |
| `apps/*`     | Internal applications (not published) |
| `tooling/*`  | Shared dev configs (not published)    |

## Package naming

All packages use the `@poncegl` npm scope — the same as the GitHub handle (@PonceGL). New packages added to `packages/` follow the same convention: `@poncegl/package-name`.

## Key decisions log

| Decision                         | Rationale                                                                        |
| -------------------------------- | -------------------------------------------------------------------------------- |
| pnpm over npm/yarn               | Better monorepo support, strict dependency isolation, faster                     |
| Tailwind v4                      | Native CSS variables support, no config file, works with our token system        |
| CSS custom properties for tokens | Framework-agnostic, supports all 3 theming approaches simultaneously             |
| No React Context for theming     | Prevents unnecessary re-renders; components read from CSS variables, not context |
| Changesets over semantic-release | Better monorepo support, human-readable changeset files, PR-based workflow       |
| Storybook 8                      | Latest stable, best framework integration, strong addon ecosystem                |
| axe-core in tests                | Catches accessibility regressions automatically before they reach production     |

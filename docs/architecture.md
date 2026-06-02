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
│       │   ├── tokens/             # CSS variables + TS constants
│       │   ├── theme/              # ThemeProvider + createMD3Theme
│       │   └── index.ts            # Library root export
│       ├── package.json
│       ├── vite.config.ts
│       └── tsconfig.json
├── apps/
│   ├── example/                    # Dev playground (moved from /example)
│   └── storybook/                  # Storybook instance
├── tooling/
│   ├── eslint-config/              # Shared ESLint config
│   └── tsconfig/                   # Shared TypeScript base config
├── docs/                           # Project documentation (this folder)
├── .github/
│   └── workflows/                  # CI/CD pipelines
├── package.json                    # Root workspace (private, never published)
└── pnpm-workspace.yaml
```

## Design Principles

- **Colocation**: each component owns all its files in one folder (implementation, types, tests, stories)
- **Single package, scalable scope**: only one publishable package today; new `@poncegl/*` packages are added under `packages/` without changing the root
- **Shared tooling**: ESLint and TypeScript configs live in `tooling/`, extended by each package — defined once, used everywhere
- **Clear boundary**: `apps/` is never published; `packages/` is the only publishable surface

## Workspace Includes

| Glob | Purpose |
|---|---|
| `packages/*` | Publishable packages |
| `apps/*` | Internal applications |
| `tooling/*` | Shared dev tooling (not published) |

## Package Naming

All packages in this repository use the `@poncegl` npm scope — same as the GitHub handle.

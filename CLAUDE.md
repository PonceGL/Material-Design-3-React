# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev              # Start example app (hot-reload)
pnpm storybook        # Start Storybook

# Quality checks
pnpm lint             # ESLint across all packages
pnpm typecheck        # TypeScript (all packages)
pnpm test             # Vitest (library only)
pnpm test:coverage    # Vitest with coverage report
pnpm format:check     # Prettier dry-run

# Build
pnpm build            # Build the library for npm
pnpm build:local      # typecheck + test + build (pre-publish gate)

# Run a single test file
pnpm --filter @poncegl/material-design-3 test -- Button.test.tsx

# Releases
pnpm changeset        # Create a changeset (required for published-package changes)
```

**Always use pnpm.** `npm install` and `yarn` are blocked by a preinstall script.

## Architecture

pnpm monorepo. Only `packages/material-design-3` is published to npm as `@poncegl/material-design-3`.

```
packages/material-design-3/src/
├── components/
│   └── Buttons/          # Component family — Button, ButtonGroup, ToggleButton, ...
│       ├── Button/
│       ├── ButtonGroup/
│       └── index.ts      # re-exports every component + types in the family
├── theme/
│   ├── MD3Provider/      # React wrapper that applies tokens to :root
│   ├── create-md3-theme/ # Generates light/dark token maps from a hex color
│   └── palette-generator/# Adapter over @material/material-color-utilities
├── tokens/               # TypeScript types for M3 system token keys
├── lib/cn.ts             # cn() = clsx + tailwind-merge
└── styles.css            # Tailwind entry + all M3 CSS custom properties

apps/
├── example/              # Dev playground (Vite + React)
└── storybook/            # Storybook instance

tooling/                  # Shared ESLint and TypeScript configs (not published)
```

### Component Families

Related M3 components are grouped under a shared **family folder** in `src/components/` (e.g. `Buttons/` holds `Button`, `ButtonGroup`, `ToggleButton` — all distinct M3 components from the same M3 category, not variants of one another). Each component keeps its own colocated folder; the family folder adds a single `index.ts` that re-exports every component's public API (imported through each component's own `index.ts`, never their internal files).

A component that doesn't belong to an existing family gets its own top-level folder under `src/components/` directly.

## Theming System

Three layers work together:

1. **`styles.css`** defines all `--md-sys-color-*`, `--md-sys-shape-*`, and `--md-sys-elevation-*` CSS custom properties on `:root`. This file is the single source of truth for default M3 tokens. It's bundled as `dist/styles.css` and must be imported by consumers.

2. **`createMD3Theme(input)`** takes a `{ primary: "#hex" }` input, calls `@material/material-color-utilities` via the adapter, and returns `{ light: MD3Theme, dark: MD3Theme }` — plain objects mapping `--md-sys-color-*` keys to hex values.

3. **`MD3Provider`** receives the theme object and a `colorScheme` prop (`'light' | 'dark' | 'system'`), then writes the resolved token values directly onto `document.documentElement` via `useLayoutEffect`. There is no React Context — components read CSS variables, not context. Theming is purely CSS.

## Component Structure

Every component is a **colocated folder** with exactly these five files:

```
ComponentName/
├── ComponentName.tsx         # Implementation
├── ComponentName.css         # Structural styles — outside any @layer
├── ComponentName.types.ts    # TypeScript interfaces and variant types
├── ComponentName.test.tsx    # Vitest + RTL + axe-core
├── ComponentName.stories.tsx # Storybook
└── index.ts                  # Public API: re-exports component + types only
```

**Never import from a component's internal files. Always import through `index.ts`.**

`Button` is the canonical reference implementation.

### Props Pattern

Every component's props interface extends `BaseComponentProps` (from `src/components/shared/BaseComponent.types.ts`) and the matching native HTML attribute interface:

```typescript
export interface ButtonProps
  extends BaseComponentProps, ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}
```

`BaseComponentProps` provides `testId?: string`, which is always forwarded as `data-testid` on the root element. All remaining props pass through via `...rest`.

### Variant Pattern

Variants are defined as `Record<VariantType, string>` with **complete literal class name strings only** — never construct a class name dynamically (Tailwind's scanner would miss it):

```typescript
const variantClasses: Record<ButtonVariant, string> = {
  filled: 'md3-button--filled bg-md-primary text-md-on-primary',
  outlined: 'md3-button--outlined bg-transparent text-md-primary',
};
```

Do not use `cva`. `Record` + `cn()` covers all current use cases.

### CSS Isolation Pattern

Tailwind v4 compiles utilities into `@layer utilities`. Consumer CSS resets (`* { padding: 0 }`) are un-layered and always beat layered styles. To survive any consumer reset, structural styles live in `ComponentName.css` **outside any `@layer`**, using `md3-*` class selectors (specificity `0,1,0`):

| `ComponentName.css` — structural, un-layered                                                          | Tailwind in `.tsx` — visual only                                                            |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `display`, `padding`, `min-height`, `border-radius`, `border`, `cursor`, font properties, transitions | `bg-md-*`, `text-md-*`, `shadow-md-elevation-*`, `focus-visible:*`, `hover:*`, `disabled:*` |

CSS class naming: `md3-{component}` (base) and `md3-{component}--{variant}` (variant modifier).

### `cn()` Utility

`src/lib/cn.ts` wraps `clsx` + `tailwind-merge`. **Always use `cn()` to compose class strings** — never string concatenation, template literals, or `.join()` to combine Tailwind utilities.

### CSS Transitions Limitation

`--md-sys-shape-*` and `--radius-md-*` tokens are unregistered CSS custom properties (opaque strings — not interpolatable). **Do not use `rounded-md-*` utilities as transition targets.** Use concrete Tailwind values (`rounded-3xl`) for animated properties. To fix this properly, register the token with `@property`.

## Testing

Vitest + React Testing Library + axe-core. Tests run in jsdom.

Every test file must cover: render without crash, each variant, prop passthrough (`className`, `onClick`, `aria-*`), `testId` → `data-testid`, and an `axe-core` accessibility audit with zero violations per variant.

```bash
pnpm test                                                    # All tests
pnpm --filter @poncegl/material-design-3 test -- Button      # Single file
pnpm test:coverage                                           # With coverage
```

## Naming Conventions

### Branches

Format: `<type>/<ticket-id>-<short-description>` (English, hyphen-separated)

```
feat/RCL-45-card-component
fix/RCL-12-button-focus-ring
docs/RCL-67-update-theming-guide
```

### Pull Request Titles

Format: `<type>(<ticket-id>): <description>`

```
feat(RCL-45): add Card component with elevated and filled variants
fix(RCL-12): correct focus ring color in outlined Button
```

### File and Folder Names

| Context                              | Convention                        |
| ------------------------------------ | --------------------------------- |
| React components (`src/components/`) | PascalCase — `UserCard/`          |
| Non-component source files           | camelCase — `paletteGenerator.ts` |
| Config / tooling files               | kebab-case — `eslint.config.js`   |

## Commit Convention

Format: `type(scope): description` — enforced by commitlint (Conventional Commits).

| Type       | When                         |
| ---------- | ---------------------------- |
| `feat`     | New component or feature     |
| `fix`      | Bug fix                      |
| `docs`     | Documentation only           |
| `chore`    | Build, tooling, dependencies |
| `refactor` | No feature, no bug fix       |
| `test`     | Tests only                   |
| `style`    | Formatting, whitespace       |
| `perf`     | Performance improvement      |

## Adding a New Component — Checklist

1. Read the M3 spec at m3.material.io/components — extract variants, anatomy, states, ARIA role, color tokens.
2. Create `packages/material-design-3/src/components/ComponentName/` with all five files — or, if the component belongs to an existing family (see [Component Families](#component-families)), `src/components/<Family>/ComponentName/`.
3. Export from the family's `index.ts` (if applicable) and from `packages/material-design-3/src/index.ts`.
4. Run `pnpm typecheck && pnpm test:coverage && pnpm storybook`.
5. Open a PR linked to the Jira task. Every item in `docs/component-template.md` Definition of Done must be met.

## PR Checklist (before marking ready)

- `pnpm lint` passes
- `pnpm typecheck` passes
- `pnpm test` passes
- `pnpm build` succeeds
- A changeset exists if the published package changed (`pnpm changeset`)
- PR description links to the Jira task (e.g. `RCL-45`)

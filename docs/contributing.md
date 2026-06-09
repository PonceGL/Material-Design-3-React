# Contributing Guide

## Prerequisites

- Node.js 20+
- pnpm 9+ (`npm install -g pnpm`)
- Git

**Important:** This project uses pnpm exclusively. Running `npm install` or `yarn` will be blocked by a preinstall script.

## Setup

```bash
git clone https://github.com/PonceGL/material-design-3-react.git
cd material-design-3-react
pnpm install
```

## Project structure

```
material-design-3-react/
├── packages/
│   └── material-design-3/   # @poncegl/material-design-3 (the library)
├── apps/
│   ├── example/             # Dev playground — run with pnpm dev
│   └── storybook/           # Component explorer — run with pnpm storybook
├── tooling/                 # Shared ESLint and TypeScript configs
└── docs/                    # This documentation
```

## Development workflow

### Running the dev environment

```bash
pnpm dev          # Starts the example app (hot-reload)
pnpm storybook    # Starts Storybook
pnpm test         # Runs all tests
pnpm test:watch   # Runs tests in watch mode
pnpm build        # Builds the library
```

### Making a change

1. Create a branch from `main`: `git checkout -b feat/your-feature`
2. Make your changes
3. Make sure tests pass: `pnpm test`
4. Make sure the build works: `pnpm build`
5. Create a changeset: `pnpm changeset` (required for changes that affect the published package)
6. Open a PR — the CI must pass before merging

## Commit convention

We use [Conventional Commits](https://www.conventionalcommits.org/). Commitlint enforces this automatically.

Format: `type(scope): description`

| Type       | When to use                                         |
| ---------- | --------------------------------------------------- |
| `feat`     | A new component or feature                          |
| `fix`      | A bug fix                                           |
| `docs`     | Documentation changes only                          |
| `chore`    | Build process, tooling, dependencies                |
| `refactor` | Code change that doesn't add a feature or fix a bug |
| `test`     | Adding or updating tests                            |
| `style`    | Formatting, whitespace (no logic change)            |
| `perf`     | Performance improvement                             |

**Examples:**

```
feat: add Card component with elevated and filled variants
fix: correct focus ring color in outlined Button
docs: update theming examples in overview
chore: upgrade Tailwind to v4.2
test: add accessibility tests for Button
```

## Naming conventions

### Branches

Format: `<type>/<ticket-id>-<short-description>`

- Types mirror commit types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`, `perf`
- Ticket ID matches the Jira task (e.g. `RCL-45`)
- Description is lowercase, hyphen-separated, in English

```
feat/RCL-45-card-component
fix/RCL-12-button-focus-ring
docs/RCL-67-update-theming-guide
```

### Pull request titles

Format: `<type>(<ticket-id>): <description>`

```
feat(RCL-45): add Card component with elevated and filled variants
fix(RCL-12): correct focus ring color in outlined Button
docs(RCL-67): update theming examples in overview
```

### File and folder names

| Context                              | Convention | Example                                    |
| ------------------------------------ | ---------- | ------------------------------------------ |
| React components (`src/components/`) | PascalCase | `src/components/UserCard/`                 |
| Non-component source files           | camelCase  | `src/theme/paletteGenerator.ts`            |
| Config and tooling files             | kebab-case | `eslint.config.js`, `commitlint.config.js` |

```
src/components/UserCard/      ✓  (React component)
src/components/user_card/     ✗
src/theme/paletteGenerator.ts ✓  (not a component)
src/theme/palette-generator   ✗
```

## Adding a new component

Follow the process in [component-template.md](./component-template.md). Every component requires:

1. Review the M3 spec at m3.material.io for the component
2. Create the folder `packages/material-design-3/src/components/ComponentName/`
3. Create all 5 files (implementation, types, tests, stories, index)
4. Export from `packages/material-design-3/src/index.ts`
5. Open a PR linked to the Jira task

Do not open a PR for a component unless all 5 files exist and the Definition of Done in [component-template.md](./component-template.md) is met.

## Pull request checklist

Before marking a PR as ready for review:

- [ ] `pnpm lint` passes with no errors
- [ ] `pnpm typecheck` passes
- [ ] `pnpm test` passes
- [ ] `pnpm build` succeeds
- [ ] A changeset exists if the change affects the published package
- [ ] The PR description links to the Jira task (e.g. RCL-45)

## Release process

Releases are automated. You do not need to bump versions manually.

1. Create a changeset alongside your PR: `pnpm changeset`
2. Select the package and the type of change (major/minor/patch)
3. Write a short description of the change
4. Commit the generated `.changeset/*.md` file with your PR
5. After merge to `main`, Changesets creates a "Version Packages" PR automatically
6. When that PR is merged, the package is published to npm

See [docs/releasing.md](./releasing.md) for the full explanation.

## Code style

- Prettier handles formatting automatically (runs on pre-commit)
- ESLint handles code quality (also runs on pre-commit)
- TypeScript strict mode is enabled
- No `any` types — use `unknown` or proper types
- No comments that explain _what_ the code does — only _why_ if it's non-obvious

## Questions?

Open a [GitHub Discussion](https://github.com/PonceGL/material-design-3-react/discussions) or create a Jira task if you find a bug.

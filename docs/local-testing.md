# Local Testing with pnpm link

This document describes how to test the library locally in an external project before publishing to npm.

> **Verified with:** pnpm 11.1.3, React 19, Vite 8 (Electron), Next.js 16 (see [framework notes](#framework-notes)).

---

## Prerequisites

- pnpm 11 or higher installed globally
- An external React project (React ≥ 18.2)
- The library built at least once (see step 1)

---

## Step 1 — Build and verify the library

From the **monorepo root**, run the single verification command:

```bash
pnpm build:local
```

This command runs in sequence and stops immediately if any step fails:

1. **Typecheck** — validates all TypeScript files including tests
2. **Tests** — runs the full test suite
3. **Build** — compiles and bundles the library into `dist/`

The output after a successful run:

```
dist/
  index.js        # ESM entry point
  index.cjs       # CommonJS entry point
  index.d.ts      # TypeScript type declarations
  styles.css      # Component styles (must be imported explicitly)
  components/     # Individual component type declarations
```

> Use `pnpm build` if you only need to compile without running tests (e.g., in CI or when iterating on styles).

---

## Step 2 — Link the package

From the **root of your external project**, run:

```bash
pnpm link /absolute/path/to/Material-Design-3-React/packages/material-design-3
```

**Example** (adjust the path to your machine):

```bash
pnpm link /Users/yourname/projects/Material-Design-3-React/packages/material-design-3
```

pnpm will modify three files in your project:

1. `package.json` — adds the dependency using the `link:` protocol.
2. `pnpm-workspace.yaml` — adds an override pointing to the local path (pnpm 11 behavior).
3. `pnpm-lock.yaml` — updated lockfile.

You will see a confirmation line in the output:

```
dependencies:
+ @poncegl/material-design-3 0.1.0 <- ../Material-Design-3-React/packages/material-design-3
```

> **Do not commit these changes to your main branch.** The paths in `package.json` and `pnpm-workspace.yaml` are machine-specific. They are only valid during local testing. See [Step 6](#step-6--disconnect-the-link) for cleanup.

> **Note about peer dependency warnings:** pnpm will display a warning about `react` and `react-dom` peer dependencies not resolving through the link. This is expected — the consuming project's own React installation is used at runtime and there is no actual issue as long as React is already installed.

---

## Step 3 — Import in your project

### Components

```tsx
import { Button } from '@poncegl/material-design-3';
```

### Styles

The CSS must be imported explicitly. Add this import once in your app entry point (e.g. `main.tsx`, `App.tsx`):

```tsx
import '@poncegl/material-design-3/styles.css';
```

---

## Step 4 — Verify TypeScript types

Run the type checker in your external project:

```bash
pnpm typecheck
# or
npx tsc --noEmit
```

A successful run (no output, exit code 0) confirms that `dist/index.d.ts` is resolving correctly and all exported types are available.

---

## Step 5 — Rebuild after changes

Run the same command as step 1. This re-validates everything and updates `dist/`. No re-linking required — the symlink already points to `dist/`.

```bash
pnpm build:local
```

---

## Step 6 — Disconnect the link

When you no longer need the local link:

1. Open `package.json` and **remove** the `link:` entry:

   ```diff
   - "@poncegl/material-design-3": "link:../path/to/packages/material-design-3",
   ```

2. Open `pnpm-workspace.yaml` and **remove** the override block:

   ```diff
   - overrides:
   -   '@poncegl/material-design-3': link:../path/to/packages/material-design-3
   ```

3. Run `pnpm install` to restore the project to its original state:

   ```bash
   pnpm install
   ```

> **Why not `pnpm unlink`?** `pnpm unlink <package>` does not remove the `link:` entry from `package.json` or the override from `pnpm-workspace.yaml`. Always clean these up manually and re-run `pnpm install`.

---

## Package contents

To see exactly which files would be included in a published release, run from the library package directory:

```bash
cd packages/material-design-3
pnpm pack:preview
```

Expected output:

```
Tarball Contents
dist/components/Button.d.ts
dist/index.cjs
dist/index.d.ts
dist/index.js
dist/styles.css
package.json
```

Only `dist/` files and `package.json` are published. Source files, tests, config files, and the example app are not included.

The `prepublishOnly` lifecycle hook runs `pnpm build:local` automatically before every `pnpm publish`, so the package is always verified and built before it reaches npm.

---

## Framework notes

### Next.js / Turbopack

Next.js 15+ uses Turbopack by default for production builds. Turbopack does not resolve symlinks that point outside the project root, so `pnpm link` (which uses the `link:` protocol) will fail at build time with `Module not found`.

**Workaround:** use the `file:` protocol directly instead of `pnpm link`.

1. Add the dependency manually to `package.json`:

   ```diff
   + "@poncegl/material-design-3": "file:../path/to/packages/material-design-3",
   ```

2. Run `pnpm install`:

   ```bash
   pnpm install
   ```

3. After each rebuild of the library, refresh the pnpm store:

   ```bash
   pnpm update @poncegl/material-design-3
   ```

   > Unlike `link:`, the `file:` protocol copies files into the pnpm virtual store using hardlinks. When the library is rebuilt (new inodes), you must run `pnpm update` to refresh the hardlinks. A plain `pnpm install` is not enough.

4. To disconnect, remove the `file:` entry and any override from `pnpm-workspace.yaml`, then run `pnpm install`.

---

## Quick reference

| Task                            | Command                                                                                       |
| ------------------------------- | --------------------------------------------------------------------------------------------- |
| Build + verify (recommended)    | `pnpm build:local` (from monorepo root)                                                       |
| Build only (fast)               | `pnpm build` (from monorepo root)                                                             |
| Link to external project        | `pnpm link <abs-path>` (from external project root)                                           |
| Verify types                    | `pnpm typecheck` (in external project)                                                        |
| Rebuild + verify after changes  | `pnpm build:local` — no re-link needed                                                        |
| Preview published files         | `pnpm pack:preview` (from `packages/material-design-3`)                                       |
| Disconnect                      | Remove `link:` from `package.json` + override from `pnpm-workspace.yaml`, then `pnpm install` |
| Rebuild after changes (Next.js) | `pnpm build:local` → `pnpm update @poncegl/material-design-3`                                 |

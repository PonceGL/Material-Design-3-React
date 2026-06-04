# Local Testing with pnpm

This document describes how to test the library locally in an external project before publishing to npm.

> **Verified with:** pnpm 11.1.3, React 19, Vite 8 (Electron), Next.js 16.

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

Two approaches are available. Use this table to choose:

| Situation                                   | Use         |
| ------------------------------------------- | ----------- |
| Windows (any framework)                     | `file:` (A) |
| macOS / Linux + Next.js / Turbopack         | `file:` (A) |
| macOS / Linux + Vite (Electron, plain Vite) | Either      |

### Option A — `file:` protocol (recommended, works on all platforms)

1. Add the dependency manually to `package.json`. **Use forward slashes on all platforms, including Windows** (avoids escaping issues):

   **macOS / Linux:**

   ```json
   "@poncegl/material-design-3": "file:../relative/path/to/packages/material-design-3"
   ```

   **Windows (use forward slashes, not backslashes):**

   ```json
   "@poncegl/material-design-3": "file:C:/Users/yourname/Documents/DEV/Material-Design-3-React/packages/material-design-3"
   ```

2. Run `pnpm install`:

   ```bash
   pnpm install
   ```

   You will see a confirmation line in the output:

   ```
   + @poncegl/material-design-3 0.1.0
   ```

> **Why `file:` works everywhere:** pnpm copies the package files into its virtual store (`.pnpm/` inside the project) using hardlinks, then symlinks from `node_modules/@poncegl/material-design-3` to that local store. The symlink never crosses the project root, so Vite resolves it on any OS.

> **Why `link:` fails on Windows and Next.js:** `link:` creates a symlink that points directly to the external path. Vite on Windows and Next.js / Turbopack do not follow symlinks that cross the project root boundary.

> **Do not commit these changes to your main branch.** The paths in `package.json` are machine-specific and only valid during local testing. See [Step 6](#step-6--disconnect-the-link) for cleanup.

---

### Option B — `pnpm link` (macOS / Linux + Vite only)

> **Does not work on Windows** — Vite cannot follow symlinks that point outside the project root on Windows, even with Developer Mode enabled. Use Option A instead.
>
> **Does not work with Next.js / Turbopack** — same symlink restriction. Use Option A instead.

From the **root of your external project**, run:

```bash
pnpm link /absolute/path/to/Material-Design-3-React/packages/material-design-3
```

pnpm will modify three files: `package.json` (`link:` protocol), `pnpm-workspace.yaml` (override), and `pnpm-lock.yaml`.

After rebuilds, no refresh step is needed — the symlink already points directly to `dist/`.

To disconnect, see [Step 6](#step-6--disconnect-the-link).

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

From the **monorepo root**, run:

```bash
pnpm build:local
```

**If you used Option A (`file:`)**, run this additional command in your external project after each rebuild:

```bash
pnpm update @poncegl/material-design-3
```

> `file:` copies files into the pnpm virtual store using hardlinks. After a rebuild (new inodes), `pnpm update` re-copies the files. A plain `pnpm install` is not enough.

**If you used Option B (`pnpm link`)**, no extra step is needed — the symlink already points to `dist/`.

---

## Step 6 — Disconnect the link

### Option A (`file:`)

1. Open `package.json` and remove the `file:` entry:

   ```diff
   - "@poncegl/material-design-3": "file:../path/to/packages/material-design-3",
   ```

2. Remove the override block from `pnpm-workspace.yaml` if present:

   ```diff
   - overrides:
   -   '@poncegl/material-design-3': file:../path/to/packages/material-design-3
   ```

3. Run `pnpm install`:

   ```bash
   pnpm install
   ```

### Option B (`pnpm link`)

> **Why not `pnpm unlink`?** `pnpm unlink <package>` does not remove the `link:` entry from `package.json` or the override from `pnpm-workspace.yaml`. Always clean these up manually.

1. Open `package.json` and remove the `link:` entry:

   ```diff
   - "@poncegl/material-design-3": "link:../path/to/packages/material-design-3",
   ```

2. Open `pnpm-workspace.yaml` and remove the override block:

   ```diff
   - overrides:
   -   '@poncegl/material-design-3': link:../path/to/packages/material-design-3
   ```

3. Run `pnpm install`:

   ```bash
   pnpm install
   ```

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

## Quick reference

| Task                                             | Command                                                                                       |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Build + verify (recommended)                     | `pnpm build:local` (from monorepo root)                                                       |
| Build only (fast)                                | `pnpm build` (from monorepo root)                                                             |
| Link — Option A, all platforms (file:)           | Add `file:<path>` to `package.json`, then `pnpm install`                                      |
| Link — Option B, macOS/Linux + Vite only (link:) | `pnpm link <abs-path>` (from external project root)                                           |
| Verify types                                     | `pnpm typecheck` (in external project)                                                        |
| Rebuild after changes — Option A                 | `pnpm build:local` → `pnpm update @poncegl/material-design-3`                                 |
| Rebuild after changes — Option B                 | `pnpm build:local` — no extra step needed                                                     |
| Preview published files                          | `pnpm pack:preview` (from `packages/material-design-3`)                                       |
| Disconnect — Option A                            | Remove `file:` from `package.json` + override from `pnpm-workspace.yaml`, then `pnpm install` |
| Disconnect — Option B                            | Remove `link:` from `package.json` + override from `pnpm-workspace.yaml`, then `pnpm install` |

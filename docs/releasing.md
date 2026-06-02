# Release Process

Releases are handled automatically by [Changesets](https://github.com/changesets/changesets). You do not bump versions manually.

## How it works

1. Developer makes a change and creates a **changeset** alongside their PR
2. The changeset describes the type of change (major/minor/patch) and what changed
3. After merge to `main`, Changesets creates a **"Version Packages" PR** that bumps versions and updates `CHANGELOG.md`
4. When the "Version Packages" PR is merged, the CI **publishes to npm** automatically

## When to create a changeset

Create a changeset when your change affects the published package (`@poncegl/material-design-3`). This includes:

- New components or features → `minor`
- Bug fixes → `patch`
- Breaking API changes → `major`

**Do NOT create a changeset for:**
- Documentation changes in `docs/`
- Internal tooling changes (`tooling/`, GitHub Actions)
- Changes only in `apps/example/` or `apps/storybook/`

## Creating a changeset

Run this command from the repo root:

```bash
pnpm changeset
```

The interactive CLI will ask you:
1. Which package is affected (`@poncegl/material-design-3`)
2. What type of change (major / minor / patch)
3. A short description of the change (this appears in the CHANGELOG)

A file is created in `.changeset/` — commit this file with your PR.

## Semantic versioning

| Change type | Example | Version bump |
|---|---|---|
| `major` | Removed a prop, renamed a component, changed behavior | `1.0.0` → `2.0.0` |
| `minor` | New component, new variant, new prop (backward compatible) | `1.0.0` → `1.1.0` |
| `patch` | Bug fix, visual correction, accessibility fix | `1.0.0` → `1.0.1` |

When in doubt, use `patch`. When adding a new component, use `minor`.

## Publishing manually (emergency only)

If the automated release fails, you can publish manually:

```bash
pnpm build
pnpm changeset publish
```

You must be authenticated with npm (`npm login`) and have access to the `@poncegl` scope.

## Verifying a release

After the "Version Packages" PR is merged and the CI runs:

1. Check that the package appears on npmjs.com: `https://www.npmjs.com/package/@poncegl/material-design-3`
2. Verify the version: `pnpm info @poncegl/material-design-3 version`
3. Test the published package in a fresh project: `pnpm add @poncegl/material-design-3`

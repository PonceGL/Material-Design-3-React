# Project Overview

## What is this?

`@poncegl/material-design-3` is a React component library that implements [Material Design 3](https://m3.material.io/) — Google's latest design system, originally built for Android with Kotlin and Jetpack Compose.

This project brings that same design system to the React ecosystem, giving web developers access to the full M3 component set with proper theming support, accessibility, and Tailwind v4 integration.

## Why does this exist?

Material Design 3 is a mature, well-documented design system used across billions of Google products. It provides:

- A comprehensive set of components (buttons, cards, dialogs, navigation, etc.)
- A scientifically designed color system (HCT color space)
- Clear accessibility requirements
- Consistent interaction patterns (state layers, motion, etc.)

Existing React implementations of M3 are incomplete, poorly maintained, or tightly coupled to specific build tools. This library aims to be the definitive M3 implementation for React — built professionally, maintained actively, and usable in any React project regardless of framework.

## Goals

1. **Complete M3 coverage** — implement every component documented at m3.material.io
2. **Framework-agnostic** — works in Next.js, Vite, Astro, Remix, and any other React-compatible environment
3. **Themeable** — users can apply their brand colors with minimal configuration
4. **Accessible** — every component meets WCAG 2.1 AA requirements
5. **Developer experience** — clear API, TypeScript-first, well-documented, testable

## What we are NOT building

- A design tool or Figma integration
- A CSS framework (we use Tailwind internally but users don't need to know that)
- A clone of Material UI (MUI) — this implements M3 spec precisely, not a general-purpose design system

## Tech stack

| Concern | Tool |
|---|---|
| Language | TypeScript |
| Framework | React 18+ |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Build | Vite (library mode) |
| Testing | Vitest + React Testing Library + axe-core |
| Documentation | Storybook 8 |
| Package manager | pnpm (monorepo) |
| Versioning | Changesets |
| CI/CD | GitHub Actions |
| Registry | npm (`@poncegl` scope) |

## Package

The library is published as a single package:

```
@poncegl/material-design-3
```

It exports components, TypeScript types, and theming utilities. Styles are exported separately as `@poncegl/material-design-3/styles.css`.

## Who uses this?

Any React developer who wants to build an app following the Material Design 3 spec without implementing the components from scratch. The target user:

- Is building a web app with React
- Wants to follow Material Design 3 guidelines
- May or may not be using Tailwind CSS in their project
- Needs TypeScript support
- Cares about accessibility

## Status

The project is in active development. The current priority is setting up the development infrastructure before implementing components. The component rollout starts with Button (the most commonly used component in any app) and progresses through the full M3 catalog.

See the [Jira project](https://poncegl.atlassian.net/jira/software/projects/RCL) for the current backlog and sprint status.

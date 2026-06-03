# Theming System

## Material Design 3 Token Hierarchy

M3 uses three token levels:

1. **Reference tokens** — raw palette (all tonal steps of a color, e.g. `primary10`, `primary40`, `primary99`)
2. **System tokens** — semantic roles that map to the palette (`primary`, `on-primary`, `surface`, `error`, etc.)
3. **Component tokens** — per-component overrides (`button.container.color`, etc.)

This library operates at the **system token** level (~30 color tokens, plus typography, shape, and elevation tokens).

## Implementation Strategy

All system tokens are CSS custom properties. Components use those variables internally. Tailwind v4 utilities are generated from those same variables.

### What our `styles.css` ships

```css
/* Default M3 baseline theme */
:root {
  /* Color — Light scheme */
  --md-sys-color-primary: #6750a4;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-primary-container: #eaddff;
  --md-sys-color-on-primary-container: #21005d;
  --md-sys-color-secondary: #625b71;
  --md-sys-color-on-secondary: #ffffff;
  --md-sys-color-secondary-container: #e8def8;
  --md-sys-color-on-secondary-container: #1d192b;
  --md-sys-color-tertiary: #7d5260;
  --md-sys-color-on-tertiary: #ffffff;
  --md-sys-color-tertiary-container: #ffd8e4;
  --md-sys-color-on-tertiary-container: #31111d;
  --md-sys-color-error: #b3261e;
  --md-sys-color-on-error: #ffffff;
  --md-sys-color-error-container: #f9dedc;
  --md-sys-color-on-error-container: #410e0b;
  --md-sys-color-background: #fffbfe;
  --md-sys-color-on-background: #1c1b1f;
  --md-sys-color-surface: #fffbfe;
  --md-sys-color-on-surface: #1c1b1f;
  --md-sys-color-surface-variant: #e7e0ec;
  --md-sys-color-on-surface-variant: #49454f;
  --md-sys-color-outline: #79747e;
  --md-sys-color-outline-variant: #cac4d0;
  --md-sys-color-inverse-surface: #313033;
  --md-sys-color-inverse-on-surface: #f4eff4;
  --md-sys-color-inverse-primary: #d0bcff;
  --md-sys-color-shadow: #000000;
  --md-sys-color-scrim: #000000;

  /* Shape */
  --md-sys-shape-corner-none: 0px;
  --md-sys-shape-corner-extra-small: 4px;
  --md-sys-shape-corner-small: 8px;
  --md-sys-shape-corner-medium: 12px;
  --md-sys-shape-corner-large: 16px;
  --md-sys-shape-corner-extra-large: 28px;
  --md-sys-shape-corner-full: 9999px;

  /* Elevation — expressed as box-shadow values */
  --md-sys-elevation-level0: none;
  --md-sys-elevation-level1:
    0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  --md-sys-elevation-level2:
    0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
  --md-sys-elevation-level3:
    0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3);
  --md-sys-elevation-level4:
    0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3);
  --md-sys-elevation-level5:
    0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3);
}

/* Tailwind v4 — map system tokens to utility classes */
@theme {
  --color-md-primary: var(--md-sys-color-primary);
  --color-md-on-primary: var(--md-sys-color-on-primary);
  --color-md-primary-container: var(--md-sys-color-primary-container);
  --color-md-on-primary-container: var(--md-sys-color-on-primary-container);
  --color-md-secondary: var(--md-sys-color-secondary);
  --color-md-on-secondary: var(--md-sys-color-on-secondary);
  --color-md-secondary-container: var(--md-sys-color-secondary-container);
  --color-md-on-secondary-container: var(--md-sys-color-on-secondary-container);
  --color-md-tertiary: var(--md-sys-color-tertiary);
  --color-md-on-tertiary: var(--md-sys-color-on-tertiary);
  --color-md-tertiary-container: var(--md-sys-color-tertiary-container);
  --color-md-on-tertiary-container: var(--md-sys-color-on-tertiary-container);
  --color-md-error: var(--md-sys-color-error);
  --color-md-on-error: var(--md-sys-color-on-error);
  --color-md-error-container: var(--md-sys-color-error-container);
  --color-md-on-error-container: var(--md-sys-color-on-error-container);
  --color-md-background: var(--md-sys-color-background);
  --color-md-on-background: var(--md-sys-color-on-background);
  --color-md-surface: var(--md-sys-color-surface);
  --color-md-on-surface: var(--md-sys-color-on-surface);
  --color-md-surface-variant: var(--md-sys-color-surface-variant);
  --color-md-on-surface-variant: var(--md-sys-color-on-surface-variant);
  --color-md-outline: var(--md-sys-color-outline);
  --color-md-outline-variant: var(--md-sys-color-outline-variant);
  --color-md-inverse-surface: var(--md-sys-color-inverse-surface);
  --color-md-inverse-on-surface: var(--md-sys-color-inverse-on-surface);
  --color-md-inverse-primary: var(--md-sys-color-inverse-primary);

  --shadow-md-elevation-0: var(--md-sys-elevation-level0);
  --shadow-md-elevation-1: var(--md-sys-elevation-level1);
  --shadow-md-elevation-2: var(--md-sys-elevation-level2);
  --shadow-md-elevation-3: var(--md-sys-elevation-level3);
  --shadow-md-elevation-4: var(--md-sys-elevation-level4);
  --shadow-md-elevation-5: var(--md-sys-elevation-level5);

  --radius-md-none: var(--md-sys-shape-corner-none);
  --radius-md-xs: var(--md-sys-shape-corner-extra-small);
  --radius-md-sm: var(--md-sys-shape-corner-small);
  --radius-md-md: var(--md-sys-shape-corner-medium);
  --radius-md-lg: var(--md-sys-shape-corner-large);
  --radius-md-xl: var(--md-sys-shape-corner-extra-large);
  --radius-md-full: var(--md-sys-shape-corner-full);
}
```

This means Tailwind utilities like `bg-md-primary`, `text-md-on-surface`, `shadow-md-elevation-2`, `rounded-md-lg` work automatically.

## Applying a Custom Theme

All three options are fully supported. Choose the one that fits your project.

### Option A — CSS variable override

No dependencies, no JavaScript. Works in any framework.

```css
@import '@poncegl/material-design-3/styles.css';

:root {
  --md-sys-color-primary: #0066cc;
  --md-sys-color-on-primary: #ffffff;
  /* override only what you need — unset tokens fall back to the baseline */
}
```

Best for: projects that manage their design tokens in CSS, or non-React contexts.

### Option B — ThemeProvider + createMD3Theme

Generates a complete M3 palette from a single source color, using the same HCT algorithm as [Material Theme Builder](https://m3.material.io/theme-builder).

```tsx
import { MD3Provider, createMD3Theme } from '@poncegl/material-design-3';

const theme = createMD3Theme({ primary: '#0066CC' });

function App() {
  return <MD3Provider theme={theme}>{/* your app */}</MD3Provider>;
}
```

**Implementation note**: `MD3Provider` applies tokens as CSS variables on `document.documentElement` via `useLayoutEffect` — it does not distribute values through React context. Components read from CSS variables, not from React state. Theme changes do not trigger re-renders in child components.

`createMD3Theme` uses `@material/material-color-utilities` (Google's official package) to generate the full tonal palette.

Best for: projects that want automatic palette generation from a brand color.

### Option C — No configuration (baseline M3 theme)

```tsx
import '@poncegl/material-design-3/styles.css';

<Button variant="filled">Hello</Button>;
```

Ships with the default M3 purple baseline theme out of the box. Zero configuration.

Best for: prototypes, quick starts, or projects that are fine with the baseline M3 aesthetic.

## Dark Mode

System tokens have two schemes: light and dark. Dark mode support is provided via the `prefers-color-scheme` media query and an optional `data-theme="dark"` attribute.

```css
@media (prefers-color-scheme: dark) {
  :root {
    --md-sys-color-primary: #d0bcff;
    --md-sys-color-on-primary: #381e72;
    /* ... dark scheme overrides */
  }
}
```

`MD3Provider` handles this automatically when `colorScheme` is passed:

```tsx
<MD3Provider theme={theme} colorScheme="dark">
```

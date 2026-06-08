# Component Template

Every component in this library follows the same structure and must meet the same checklist before it can be considered done.

## Before You Start — Read the M3 Spec

Go to [m3.material.io/components](https://m3.material.io/components) and open the component page. Extract the following before writing a single line of code:

| What to look for                  | Where to find it                   | Why it matters                                               |
| --------------------------------- | ---------------------------------- | ------------------------------------------------------------ |
| **Variants**                      | "Overview" or "Types" tab          | Drives the `variant` union type and story list               |
| **Anatomy**                       | "Specs" or "Anatomy" section       | Reveals the DOM structure and required slots                 |
| **States**                        | "Interaction states" section       | Determines which CSS state layers you need                   |
| **ARIA role & keyboard behavior** | "Accessibility" section            | Required for correct `role`, `aria-*`, and keyboard handling |
| **Color tokens**                  | "Design tokens" or "Color" section | Lists every `--md-sys-color-*` the component uses            |
| **Sizing & spacing**              | "Specs" section                    | Touch target minimums, padding, border-radius                |

Once you have this extracted, you can map it directly to props, types, and CSS.

## Visual Variants vs. Behavioral Types

This is the most important decision when structuring a component family.

| Concept             | What it means                                                                                                                        | How it is implemented                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| **Visual variant**  | Same component, different appearance. Same behavior, same HTML element, same props shape. Only colors, borders, or elevation change. | A `variant` prop (union type). All variants live in the same `ComponentName.tsx` file. |
| **Behavioral type** | Different interaction model, internal state, ARIA role, or DOM structure.                                                            | A separate component in its own subfolder with its own complete set of 5 files.        |

**Rule of thumb:** if two apparent "variants" have different event handlers, different internal state, different ARIA roles, or different DOM structure — they are behavioral types, not visual variants. Give each its own subfolder.

## Flat vs. Nested Structure

| Situation                                                                 | Structure to use                                              |
| ------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Component has only visual variants (same behavior, different look)        | Flat — single `ComponentName/` folder with 5 files            |
| Component has behavioral subtypes (different interaction, state, or HTML) | Nested — `ComponentName/` with subfolders per behavioral type |
| Component has no variants at all                                          | Flat — single folder, no `variant` prop needed                |

## Folder Structure

### Flat (single behavioral type, visual variants only)

```
src/components/ComponentName/
├── ComponentName.tsx        # Implementation + all visual variants
├── ComponentName.types.ts   # TypeScript interfaces and types
├── ComponentName.test.tsx   # Unit tests
├── ComponentName.stories.tsx# Storybook stories
└── index.ts                 # Public API re-exports
```

### Nested (multiple behavioral types)

The Button family is the canonical example:

```
src/components/Button/
├── Button.tsx                   ← Base primitive: renders <button>, handles variant + state layers
├── Button.types.ts              ← ButtonVariant + ButtonProps
├── Button.test.tsx
├── Button.stories.tsx
├── index.ts                     ← Re-exports base + all subfamilies
│
├── ToggleButton/
│   ├── ToggleButton.tsx         ← Wraps base, adds selected/unselected logic
│   ├── ToggleButton.types.ts
│   ├── ToggleButton.test.tsx
│   ├── ToggleButton.stories.tsx
│   └── index.ts
│
├── IconButton/
│   ├── IconButton.tsx           ← Wraps base, icon-only layout, own variant set
│   ├── IconButton.types.ts
│   ├── IconButton.test.tsx
│   ├── IconButton.stories.tsx
│   └── index.ts
│
└── FAB/
    ├── FAB.tsx
    ├── FAB.types.ts
    ├── FAB.test.tsx
    ├── FAB.stories.tsx
    └── index.ts
```

Each behavioral type is consumed independently — the visual variant is always a prop:

```tsx
import { Button, ToggleButton, IconButton, FAB } from '@poncegl/material-design-3';

<Button variant="filled" onClick={handle}>Save</Button>
<ToggleButton variant="outlined" selected={isActive}>Bold</ToggleButton>
<IconButton variant="filled" icon={<EditIcon />} aria-label="Edit" />
<FAB variant="primary" icon={<AddIcon />} aria-label="Create" />
```

**Rule:** Never import from a component's internal files. Always import through `index.ts`.

## BaseComponentProps — The Required Base Interface

Every component's `Props` interface **must** extend `BaseComponentProps` from `@/components/shared/BaseComponent.types`. This interface provides the single transversal prop the DOM does not offer natively: `testId`, which is forwarded to the root element as `data-testid`.

```typescript
// src/components/shared/BaseComponent.types.ts
export interface BaseComponentProps {
  /** Forwarded to the root element as data-testid for test selectors. */
  testId?: string;
}
```

In addition to `BaseComponentProps`, each component extends the native HTML attribute interface that matches its root element. This gives consumers full access to the element's native API at no extra cost.

```typescript
// Example: Button.types.ts
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import type { BaseComponentProps } from '@/components/shared/BaseComponent.types';

export interface ButtonProps
  extends BaseComponentProps, ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
}
```

Use this table to pick the right HTML interface:

| Component type                          | Extends                                                                                  | Root element                     |
| --------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------- |
| Interactive — buttons, FAB, chips       | `ButtonHTMLAttributes<HTMLButtonElement>`                                                | `<button>`                       |
| Form controls — checkbox, radio, switch | `InputHTMLAttributes<HTMLInputElement>`                                                  | `<input>`                        |
| Text input                              | `InputHTMLAttributes<HTMLInputElement>` or `TextareaHTMLAttributes<HTMLTextAreaElement>` | `<input>` / `<textarea>`         |
| Containers — cards, dialogs, sheets     | `HTMLAttributes<HTMLDivElement>`                                                         | `<div>`, `<article>`, `<dialog>` |
| App bars, navigation                    | `HTMLAttributes<HTMLElement>`                                                            | `<header>`, `<nav>`              |
| Lists                                   | `HTMLAttributes<HTMLUListElement>`                                                       | `<ul>` / `<ol>`                  |
| List items                              | `LiHTMLAttributes<HTMLLIElement>`                                                        | `<li>`                           |
| Decorative / separators                 | `HTMLAttributes<HTMLHRElement>`                                                          | `<hr>`                           |

## Variant Types — One Per Component

Each component that has visual variants defines its own union type in its `.types.ts` file. Types are **not** shared across components, even when names look similar — they can diverge as the M3 spec evolves.

```typescript
// Button.types.ts
export type ButtonVariant =
  | 'filled'
  | 'outlined'
  | 'text'
  | 'elevated'
  | 'filled-tonal';

// IconButton/IconButton.types.ts — different set, not reused from Button
export type IconButtonVariant =
  | 'standard'
  | 'filled'
  | 'filled-tonal'
  | 'outlined';

// FAB/FAB.types.ts — completely different domain
export type FABVariant = 'primary' | 'secondary' | 'tertiary' | 'surface';
```

## File Responsibilities

### `ComponentName.tsx`

- Contains only the component implementation
- Imports types from `ComponentName.types.ts`
- No business logic, no data fetching, no side effects beyond DOM interaction
- All M3 visual variants implemented in the same file (unless size justifies splitting)
- Forwards `testId` to the root element as `data-testid`
- Passes all remaining props to the root element via `...rest` spread

```tsx
export function Button({
  testId,
  variant = 'filled',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button data-testid={testId} data-variant={variant} {...rest}>
      {children}
    </button>
  );
}
```

### `ComponentName.types.ts`

- All TypeScript interfaces and types for this component
- Extends `BaseComponentProps` + the correct native HTML attribute interface
- Variant union, state types, prop interface
- Exported — consumed by `ComponentName.tsx` and re-exported from `index.ts`

### `ComponentName.test.tsx`

Each test file must cover:

- [ ] Renders without crashing (smoke test)
- [ ] Each variant renders correctly
- [ ] Each interactive state (hover, focus, pressed, disabled)
- [ ] Props passthrough (`className`, `onClick`, `aria-*`, etc.)
- [ ] `testId` is forwarded as `data-testid` on the root element
- [ ] Keyboard navigation (where applicable)
- [ ] Accessibility audit via `axe-core` (zero violations per variant)

Tools: Vitest + React Testing Library + axe-core

### `ComponentName.stories.tsx`

Each stories file must include:

- [ ] Default export with `autodocs` enabled
- [ ] One story per variant
- [ ] One story per meaningful state (disabled, loading, etc.)
- [ ] Interactive playground story with all controls wired via `argTypes`
- [ ] At least one composition story (component inside a real-world layout)
- [ ] Accessibility check with the `@storybook/addon-a11y` addon

### `index.ts`

```ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName.types';
```

Only exports the component and its public types. Never exports internal helpers or constants.

## M3 State Layer Model

M3 interactive states are expressed as a semi-transparent overlay on the container color:

| State    | Opacity                                     |
| -------- | ------------------------------------------- |
| Hover    | 8%                                          |
| Focus    | 12%                                         |
| Pressed  | 12%                                         |
| Dragged  | 16%                                         |
| Disabled | 38% (content), container may be transparent |

Implementation: use Tailwind's opacity modifier (`bg-md-primary/[0.08]` for hover) or a CSS variable-based overlay.

## Definition of Done

A component is **done** when all of the following are true:

### Structure

- [ ] All five files exist and follow the colocation pattern
- [ ] Props interface extends `BaseComponentProps` + the correct native HTML interface
- [ ] `testId` is forwarded as `data-testid` on the root element
- [ ] All HTML attributes pass through via `...rest`
- [ ] Exported from the library root `src/index.ts`

### M3 Compliance

- [ ] All variants from the M3 spec are implemented
- [ ] State layers match M3 spec (hover 8%, focus 12%, pressed 12%, dragged 16%, disabled 38%)
- [ ] Uses system tokens only — no hardcoded colors (`var(--md-sys-color-*)`)
- [ ] Supports light and dark schemes via CSS variables
- [ ] Touch target minimum 48×48px for all interactive elements
- [ ] `disabled` state uses `pointer-events-none` + `opacity-[0.38]`

### Accessibility

- [ ] Correct ARIA role and attributes per ARIA Authoring Practices Guide
- [ ] Fully keyboard navigable
- [ ] Visible focus indicator
- [ ] Zero `axe-core` violations on every variant

### Tests & Documentation

- [ ] All test cases listed in `ComponentName.test.tsx` are covered
- [ ] Storybook stories cover all variants, states, and at least one composition
- [ ] `pnpm typecheck` passes with no errors
- [ ] `pnpm test:coverage` passes with no regressions

## Adding a New Component — Step by Step

1. **Read the M3 spec** for the component at [m3.material.io/components](https://m3.material.io/components). Extract variants, anatomy, states, ARIA role, and tokens using the table in the first section of this document.
2. **Decide flat or nested** using the Visual Variants vs. Behavioral Types rule above.
3. **Create the folder(s)**: `src/components/NewComponent/` (and subfolders if nested).
4. **Create all five files** following the templates in the File Responsibilities section.
5. **Export from `src/index.ts`**: add `export { NewComponent }` and `export type { NewComponentProps }`.
6. **Run checks**: `pnpm typecheck`, `pnpm test:coverage`, `pnpm storybook` (visual review).
7. **Open a PR** linked to the Jira task and verify every item in the Definition of Done.

## Reference: Button

The `Button` component is the reference implementation. When in doubt, look at how Button does it. It demonstrates:

- Flat structure with a `variant` prop
- `BaseComponentProps` + `ButtonHTMLAttributes` extension pattern
- `testId` forwarded as `data-testid`
- M3 state layers via Tailwind opacity modifiers
- axe-core accessibility audit in tests

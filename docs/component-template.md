# Component Template

Every component in this library follows the same structure and must meet the same checklist before it can be considered done.

## Folder Structure (Colocation)

```
src/components/ComponentName/
├── ComponentName.tsx        # Implementation
├── ComponentName.types.ts   # TypeScript interfaces and types
├── ComponentName.test.tsx   # Unit tests
├── ComponentName.stories.tsx# Storybook stories
└── index.ts                 # Public API re-exports
```

Each component lives entirely in its own folder. No file from this folder is imported by other components except through `index.ts`.

## File Responsibilities

### `ComponentName.tsx`
- Contains only the component implementation
- Imports types from `ComponentName.types.ts`
- No business logic, no data fetching, no side effects beyond DOM interaction
- All M3 variants implemented in the same file (unless size justifies splitting)
- HTML attributes passthrough via `...rest` spread

### `ComponentName.types.ts`
- All TypeScript interfaces and types for this component
- Variant unions, state types, prop interfaces
- Extends the relevant HTML element's attribute interface
- Exported — consumed by `ComponentName.tsx` and re-exported from `index.ts`

### `ComponentName.test.tsx`
Each test file must cover:
- [ ] Renders without crashing (smoke test)
- [ ] Each variant renders correctly
- [ ] Each interactive state (hover, focus, pressed, disabled)
- [ ] Props passthrough (className, onClick, aria-*, etc.)
- [ ] Keyboard navigation (where applicable)
- [ ] Accessibility audit via `@axe-core/react` or `jest-axe`
- [ ] Snapshot or visual regression (TBD)

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
export { ComponentName } from './ComponentName'
export type { ComponentNameProps } from './ComponentName.types'
```

Only exports the component and its public types. Never exports internal helpers or constants.

## M3 Compliance Checklist

Before marking a component as done:

- [ ] All variants from the M3 spec are implemented
- [ ] All interactive states match M3 state layer spec (hover 8%, pressed 12%, focused 12%, dragged 16%)
- [ ] Uses system tokens only (no hardcoded colors)
- [ ] Supports both light and dark color schemes via CSS variables
- [ ] Touch target minimum 48×48px (M3 accessibility requirement)
- [ ] Correct ARIA role, label, and keyboard behavior per ARIA Authoring Practices
- [ ] `disabled` state uses `pointer-events-none` + `opacity-[0.38]` (M3 spec)

## M3 State Layer Model

M3 interactive states are expressed as a semi-transparent overlay on the container color:

| State    | Opacity |
|----------|---------|
| Hover    | 8%      |
| Focus    | 12%     |
| Pressed  | 12%     |
| Dragged  | 16%     |
| Disabled | 38% (content), container may be transparent |

Implementation: use Tailwind's opacity modifier (`bg-md-primary/[0.08]` for hover) or CSS variable-based overlay.

## Adding a New Component

1. Create the folder: `src/components/NewComponent/`
2. Create all five files following the template above
3. Export from `src/index.ts`
4. Open a Jira task and link the PR

## Reference: Button

The `Button` component is the reference implementation. When in doubt, look at how Button does it.

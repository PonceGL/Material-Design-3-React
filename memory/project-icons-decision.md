---
name: project-icons-decision
description: Decision on how icons are handled in the component library — ReactNode slots, no icon dependency, future package possibility
metadata:
  type: project
---

All icon slots in every component accept `ReactNode`. No icon library dependency is forced on consumers.

**Why:** Consumers may have their own custom icons (brand, company). ReactNode is maximally flexible — same philosophy as Jetpack Compose where `content: @Composable () -> Unit` accepts any composable. If it looks bad, that's the developer's responsibility; the component won't break.

**How to apply:** Any component that has an icon slot (Button, FAB, IconButton, ToggleIconButton, SegmentedButton, SplitButton, ExtendedFAB, FABMenu items, etc.) declares it as `icon: ReactNode` or `icon?: ReactNode`. Never import or depend on a specific icon library.

**Future:** A separate package `packages/material-design-3-icons` may (or may not) be created in the future with Material Symbols-inspired icons compatible with this library. This is NOT a current task and should NOT be created as a dependency for any existing component task. See [[project-md3]].

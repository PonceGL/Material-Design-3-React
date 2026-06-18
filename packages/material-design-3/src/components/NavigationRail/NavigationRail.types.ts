import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  Ref,
} from 'react';

import type { BaseComponentProps } from '@/components/shared/BaseComponent.types';

/**
 * Layout configuration of a `NavigationRail`.
 *
 * - `collapsed` — 96px wide, items laid out vertically (icon above label).
 * - `expanded`  — 220-360px wide, items laid out horizontally (icon beside
 *   label). Combine with `modal` for the overlay variant.
 */
export type NavigationRailVariant = 'collapsed' | 'expanded';

/**
 * Imperative handle exposed by `NavigationRail` via `ref` (React 19
 * ref-as-prop, no `forwardRef`). Lets a non-controlled rail be driven from
 * outside its render tree.
 */
export interface NavigationRailHandle {
  /** Current resolved variant. */
  variant: NavigationRailVariant;
  /** Forces the rail into the `expanded` variant. */
  expand: () => void;
  /** Forces the rail into the `collapsed` variant. */
  collapse: () => void;
  /** Switches between `collapsed` and `expanded`. */
  toggle: () => void;
}

/** Return value of the `useNavigationRail()` hook. */
export interface UseNavigationRailReturn {
  /** Current resolved variant. */
  variant: NavigationRailVariant;
  /** Forces the rail into the `expanded` variant. */
  expand: () => void;
  /** Forces the rail into the `collapsed` variant. */
  collapse: () => void;
  /** Switches between `collapsed` and `expanded`. */
  toggle: () => void;
}

export interface NavigationRailProps
  extends BaseComponentProps, HTMLAttributes<HTMLElement> {
  /**
   * Controlled variant. When provided together with `onVariantChange`, the
   * consumer owns the state and `defaultVariant` is ignored.
   */
  variant?: NavigationRailVariant;
  /**
   * Initial variant for non-controlled usage. Ignored when `variant` is
   * provided. Defaults to `'collapsed'`.
   */
  defaultVariant?: NavigationRailVariant;
  /** Called with the new variant whenever it changes (controlled usage). */
  onVariantChange?: (variant: NavigationRailVariant) => void;
  /**
   * Renders the `expanded` variant as a modal overlay (`surface-container`
   * background, level2 elevation, large corners). Has no effect when the
   * resolved variant is `collapsed`.
   */
  modal?: boolean;
  /**
   * Slot for the menu control that toggles `collapsed`/`expanded` (e.g. an
   * `IconButton`). The rail renders it but does not supply its logic.
   */
  menu?: ReactNode;
  /**
   * Slot for a floating action button rendered above the destinations (e.g.
   * a future `FAB`/`ExtendedFAB`). The rail renders it but does not supply
   * its logic.
   */
  fab?: ReactNode;
  /** Imperative handle for non-controlled usage. See `NavigationRailHandle`. */
  ref?: Ref<NavigationRailHandle>;
  /** `NavigationRailItem` destinations (3-7 recommended). */
  children: ReactNode;
}

export interface NavigationRailItemProps
  extends BaseComponentProps, ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon shown when the item is not selected. */
  icon: ReactNode;
  /** Icon shown when the item is selected. Falls back to `icon` when omitted. */
  activeIcon?: ReactNode;
  /** Text shown beside/below the icon, depending on the rail's variant. */
  label: string;
  /** Whether this item represents the current destination. */
  selected: boolean;
  /** Called when the item is activated. */
  onClick: () => void;
}

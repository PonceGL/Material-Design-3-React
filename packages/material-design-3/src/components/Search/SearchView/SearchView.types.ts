import type { HTMLAttributes, ReactNode } from 'react';

import type { BaseComponentProps } from '@/components/shared/BaseComponent.types';

/**
 * Where the results/suggestions container is positioned and sized.
 * - `'full-screen'` — compact screens (<600dp). Takes up the full viewport.
 * - `'docked'` — medium/expanded screens (≥600dp). Constrained width, anchored
 *   below the search bar.
 */
export type SearchViewLayout = 'docked' | 'full-screen';

/**
 * Visual style of the results/suggestions container.
 * - `'contained'` — M3 Expressive, recommended. Persistent filled container.
 * - `'divided'` — Baseline, not recommended. A 1px divider separates the
 *   search bar from the results instead of a filled container.
 */
export type SearchViewStyle = 'contained' | 'divided';

export interface SearchViewProps
  extends BaseComponentProps, Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
  /** Controls the visibility of the results panel. Always a controlled prop. */
  open: boolean;
  /** Defaults to `'full-screen'`. */
  layout?: SearchViewLayout;
  /**
   * M3 visual style. Defaults to `'contained'`.
   *
   * Shadows the native `style` (inline `CSSProperties`) attribute on
   * purpose — pass a `className` instead for one-off layout tweaks.
   */
  style?: SearchViewStyle;
  /** The `SearchBar` associated with this `SearchView`. */
  searchBar: ReactNode;
  /** Suggestions/results content (e.g. a `List`). */
  children?: ReactNode;
  /** Called when the "back"/close action is activated. */
  onClose?: () => void;
}

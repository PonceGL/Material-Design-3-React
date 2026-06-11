import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

import type { BaseComponentProps } from '@/components/shared/BaseComponent.types';

/**
 * Selection behavior for the items inside a `SegmentedButton`.
 *
 * Shares the same vocabulary as `ButtonGroupSelectionMode`.
 *
 * - `single-select`      — At most one item can be selected at a time.
 * - `multi-select`       — Any number of items can be selected.
 * - `selection-required` — Like `single-select`, but exactly one item must
 *   always remain selected.
 */
export type SegmentedButtonSelectionMode =
  | 'single-select'
  | 'multi-select'
  | 'selection-required';

export interface SegmentedButtonProps
  extends BaseComponentProps, HTMLAttributes<HTMLDivElement> {
  /** Selection behavior of the items inside the group. */
  selectionMode: SegmentedButtonSelectionMode;
  /** `SegmentedButtonItem` items (2-5 recommended). */
  children: ReactNode;
}

export interface SegmentedButtonItemProps
  extends BaseComponentProps, ButtonHTMLAttributes<HTMLButtonElement> {
  testId?: string;
  /** Whether this item is currently selected. */
  selected: boolean;
  /** Called when the item is activated. */
  onClick: () => void;
  /** Text shown inside the item. */
  label: string;
  /**
   * Leading icon shown before `label`. Optional — when `selected` is
   * `true`, the system checkmark replaces (or accompanies) this icon.
   */
  icon?: ReactNode;
}

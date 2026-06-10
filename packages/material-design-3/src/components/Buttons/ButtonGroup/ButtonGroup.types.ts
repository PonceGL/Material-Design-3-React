import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

import type { BaseComponentProps } from '@/components/shared/BaseComponent.types';
import type {
  ButtonShape,
  ButtonSize,
  CommonVariants,
} from '@/components/shared/variants.types';

export type { ButtonShape, ButtonSize };

/**
 * Layout variants for `ButtonGroup`.
 *
 * - `standard`  — Gap between items scales with `size`. Pressing or
 *   selecting an item animates its width and shape together with its
 *   neighbors (squish-expand).
 * - `connected` — Fixed 2px gap. Each item gets a corner-radius on its
 *   outer edges based on `size`. Selecting an item only changes its own
 *   shape — neighbors are unaffected.
 */
export type ButtonGroupVariant = 'standard' | 'connected';

/**
 * Selection behavior for the items inside a `ButtonGroup`.
 *
 * Shares the same vocabulary as `SegmentedButtonSelectionMode`.
 *
 * - `single-select`      — At most one item can be selected at a time.
 * - `multi-select`       — Any number of items can be selected.
 * - `selection-required` — Like `single-select`, but exactly one item must
 *   always remain selected.
 */
export type ButtonGroupSelectionMode =
  | 'single-select'
  | 'multi-select'
  | 'selection-required';

export interface ButtonGroupProps
  extends BaseComponentProps, HTMLAttributes<HTMLDivElement> {
  /** Layout variant. Defaults to `'standard'`. */
  variant?: ButtonGroupVariant;
  /**
   * M3 Expressive size, shared with `Button`/`ToggleButton`. Drives the gap
   * between items (`standard`) or the per-item outer corner-radius
   * (`connected`). Defaults to `'m'`.
   */
  size?: ButtonSize;
  /** Shape of the items at rest. Defaults to `'round'`. */
  shape?: ButtonShape;
  /** Selection behavior of the items inside the group. */
  selectionMode?: ButtonGroupSelectionMode;
  /** `Button`, `IconButton` or `ToggleButton` items (2-5 recommended). */
  children: ReactNode;
}

/**
 * Visual variants for `ToggleButton`.
 *
 * Same set as `CommonVariants` (`elevated | filled | filled-tonal | outlined`).
 * `ToggleButton` does not support the `text` variant — M3 doesn't define a
 * toggle text button.
 */
export type ToggleButtonVariant = CommonVariants;

export interface ToggleButtonProps
  extends BaseComponentProps, ButtonHTMLAttributes<HTMLButtonElement> {
  testId?: string;
  /** Visual style of the button. Defaults to `'filled'`. */
  variant?: ToggleButtonVariant;
  /**
   * M3 Expressive size, shared with `Button`/`ButtonGroup`. Drives the
   * button's `min-height` (touch target) and horizontal padding, both at
   * rest and while pressed. Defaults to `'m'`.
   */
  size?: ButtonSize;
  /**
   * Shape at rest when unselected. Selecting the button morphs it to the
   * opposite shape (`round` ↔ `square`). Defaults to `'round'`.
   */
  shape?: ButtonShape;
  /** Whether the button is currently selected. Reflected as `aria-pressed`. */
  selected: boolean;
  /** Called with the next selected state when the button is activated. */
  onSelectedChange: (selected: boolean) => void;
  /** Icon rendered before the label. Accepts any ReactNode. */
  icon?: ReactNode;
  children: ReactNode;
}

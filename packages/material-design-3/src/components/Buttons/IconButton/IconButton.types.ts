import type { ButtonHTMLAttributes, ReactNode } from 'react';

import type { BaseComponentProps } from '@/components/shared/BaseComponent.types';

/**
 * The four visual variants of the M3 Icon Button component.
 *
 * Based on Jetpack Compose Material3's `IconButton`, `FilledIconButton`,
 * `FilledTonalIconButton` and `OutlinedIconButton`.
 *
 * - `standard` — No container. Use for low-emphasis actions, often inside
 *   other components (e.g. app bars, list items).
 * - `filled`   — Highest emphasis. Use for the primary action of a group of
 *   icon buttons.
 * - `tonal`    — Medium-high emphasis. Use for secondary actions that still
 *   need a visible container.
 * - `outlined` — Medium emphasis. Use for important actions that are not the
 *   primary one.
 */
export type IconButtonVariant = 'standard' | 'filled' | 'tonal' | 'outlined';

export interface IconButtonProps
  extends BaseComponentProps, ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button. Defaults to `'standard'`. */
  variant?: IconButtonVariant;
  /** Icon rendered inside the button. Accepts any ReactNode (e.g. an SVG icon component). */
  icon: ReactNode;
}

export interface ToggleIconButtonProps
  extends
    BaseComponentProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  testId?: string;
  /** Visual style of the button. Defaults to `'standard'`. */
  variant?: IconButtonVariant;
  /** Icon rendered while `checked` is `false`. Accepts any ReactNode. */
  icon: ReactNode;
  /**
   * Icon rendered while `checked` is `true`. Falls back to `icon` when not
   * provided.
   */
  checkedIcon?: ReactNode;
  /** Whether the button is currently checked. Reflected as `aria-pressed`. */
  checked: boolean;
  /** Called with the next checked state when the button is activated. */
  onCheckedChange: (checked: boolean) => void;
}

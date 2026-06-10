import type { ButtonHTMLAttributes, ReactNode } from 'react';

import type { BaseComponentProps } from '@/components/shared/BaseComponent.types';

import {
  type ButtonShape,
  type ButtonSize,
  CommonVariants,
} from '../shared/variants.types';

export type { ButtonShape, ButtonSize };

/**
 * The five visual variants of the M3 Button component.
 *
 * Choose based on the action's emphasis level:
 *
 * - `filled`       — Highest emphasis. Use for the primary, most important action on a screen.
 * - `filled-tonal` — Medium-high emphasis. Use for secondary actions that still need prominence.
 * - `elevated`     — Medium emphasis. Similar to filled-tonal but with a shadow instead of a tonal fill.
 * - `outlined`     — Medium emphasis. Use for important actions that are not the primary one.
 * - `text`         — Lowest emphasis. Use for optional or supplementary actions.
 */
export type ButtonVariant = CommonVariants | 'text';

export interface ButtonProps
  extends BaseComponentProps, ButtonHTMLAttributes<HTMLButtonElement> {
  testId?: string;
  /** Visual style of the button. Defaults to `'filled'`. */
  variant?: ButtonVariant;
  /**
   * M3 Expressive size. Drives the button's `min-height` (touch target)
   * and horizontal padding, both at rest and while pressed.
   * Defaults to `'m'`.
   */
  size?: ButtonSize;
  /**
   * M3 Expressive shape at rest. Drives the button's corner-radius,
   * both at rest and while pressed. Defaults to `'round'`.
   */
  shape?: ButtonShape;
  /** Leading icon rendered before the label. Accepts any ReactNode (e.g. an SVG icon component). */
  icon?: ReactNode;
  /** Trailing icon rendered after the label. Accepts any ReactNode. */
  iconTrailing?: ReactNode;
}

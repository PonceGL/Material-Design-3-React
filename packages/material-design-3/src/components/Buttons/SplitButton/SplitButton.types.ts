import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

import type { BaseComponentProps } from '@/components/shared/BaseComponent.types';

import type { ButtonVariant } from '../Button/Button.types';

export type { ButtonVariant };

export interface SplitButtonProps
  extends BaseComponentProps, HTMLAttributes<HTMLDivElement> {
  /**
   * Gap between `SplitButton.Leading` and `SplitButton.Trailing`. Defaults
   * to no gap, so the two parts sit flush against each other and read as a
   * single continuous button.
   */
  spacing?: string;
  /** `SplitButton.Leading` and `SplitButton.Trailing`. */
  children: ReactNode;
}

export interface SplitButtonLeadingProps
  extends BaseComponentProps, ButtonHTMLAttributes<HTMLButtonElement> {
  testId?: string;
  /**
   * Visual style. Must match `SplitButton.Trailing`'s `variant` so both
   * parts read as a single button. Defaults to `'filled'`.
   */
  variant?: ButtonVariant;
  /** Leading icon rendered before the label. Accepts any ReactNode. */
  icon?: ReactNode;
  children: ReactNode;
}

export interface SplitButtonTrailingProps
  extends BaseComponentProps, ButtonHTMLAttributes<HTMLButtonElement> {
  testId?: string;
  /**
   * Visual style. Must match `SplitButton.Leading`'s `variant` so both
   * parts read as a single button. Defaults to `'filled'`.
   */
  variant?: ButtonVariant;
  /**
   * Icon rendered inside the trailing part. The consumer provides it,
   * typically a chevron or menu icon.
   */
  icon?: ReactNode;
  /** Whether the trailing part is currently toggled on. */
  checked?: boolean;
  /**
   * Called with the next checked state when the trailing part is activated
   * as a toggle, in addition to `onClick`.
   */
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * Border-radius pair for one of `SplitButton`'s shape-morphing corners:
 * `shape` at rest and `pressedShape` while pressed.
 */
export interface SplitButtonShapes {
  shape: string;
  pressedShape?: string;
}

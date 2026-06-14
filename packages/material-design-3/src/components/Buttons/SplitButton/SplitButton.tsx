import type { CSSProperties, MouseEventHandler } from 'react';

import { cn } from '@/lib/cn';

import type { ButtonVariant } from '../Button/Button.types';
import './SplitButton.css';
import type {
  SplitButtonLeadingProps,
  SplitButtonProps,
  SplitButtonTrailingProps,
} from './SplitButton.types';

const variantClasses: Record<ButtonVariant, string> = {
  filled: [
    'bg-md-primary text-md-on-primary',
    'focus-visible:outline-md-primary',
  ].join(' '),
  elevated: [
    'bg-md-surface text-md-primary',
    'shadow-md-elevation-1 hover:shadow-md-elevation-2 active:shadow-md-elevation-3',
    'focus-visible:outline-md-primary',
  ].join(' '),
  'filled-tonal': [
    'bg-md-secondary-container text-md-primary',
    'focus-visible:outline-md-primary',
  ].join(' '),
  outlined: [
    'md3-button--outlined',
    'bg-transparent text-md-on-surface-variant',
    'focus-visible:outline-md-primary',
  ].join(' '),
  text: [
    'bg-transparent text-md-primary',
    'focus-visible:outline-md-primary',
  ].join(' '),
};

const leadingBase = [
  'md3-button',
  'md3-button--size-m',
  'md3-split-button__leading',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  'disabled:pointer-events-none disabled:opacity-[0.38]',
].join(' ');

const trailingBase = [
  'md3-icon-button',
  'md3-split-button__trailing',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  'disabled:pointer-events-none disabled:opacity-[0.38]',
].join(' ');

/**
 * Material Design 3 split button — root container.
 *
 * Lays out `SplitButton.Leading` and `SplitButton.Trailing` as a single
 * visually-fused control, based on `SplitButtonLayout` from Jetpack Compose
 * Material3 Expressive. The 2dp gap between both parts comes from
 * `SplitButton.css`; pass `spacing` to override it with a custom CSS length.
 *
 * @example
 * ```tsx
 * <SplitButton>
 *   <SplitButton.Leading onClick={handleConfirm}>Confirmar</SplitButton.Leading>
 *   <SplitButton.Trailing icon={<ArrowDropDownIcon />} onClick={openMenu} aria-label="Más opciones" />
 * </SplitButton>
 * ```
 */
function Root({
  testId,
  spacing,
  children,
  className,
  style,
  ...rest
}: SplitButtonProps) {
  const mergedStyle: CSSProperties | undefined = spacing
    ? { ...style, gap: spacing }
    : style;

  return (
    <div
      data-testid={testId}
      className={cn('md3-split-button', className)}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </div>
  );
}

/**
 * Primary action of a `SplitButton`.
 *
 * Renders a `<button>` sharing `Button`'s size (`m`) and color rules, with
 * `corner-full` outer corners and `corner-extra-small` inner corners that
 * morph to `1rem` while pressed (`SplitButton.css`).
 */
function Leading({
  testId,
  variant = 'filled',
  icon,
  children,
  className,
  type = 'button',
  ...rest
}: SplitButtonLeadingProps) {
  return (
    <button
      data-testid={testId}
      type={type}
      className={cn(leadingBase, variantClasses[variant], className)}
      {...rest}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}

/**
 * Secondary trigger of a `SplitButton`, typically opening a menu.
 *
 * Renders a square 48x48dp `<button>` with `corner-full` outer corners and
 * `corner-extra-small` inner corners that morph to `1rem` while pressed
 * (`SplitButton.css`).
 *
 * When `checked`/`onCheckedChange` are provided, it also behaves as a
 * toggle: `aria-pressed` and `data-checked` reflect `checked`, and
 * `onCheckedChange` is called with the next state on click, in addition to
 * `onClick`.
 */
function Trailing({
  testId,
  variant = 'filled',
  icon,
  checked,
  onCheckedChange,
  onClick,
  className,
  type = 'button',
  ...rest
}: SplitButtonTrailingProps) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event);
    onCheckedChange?.(!checked);
  };

  return (
    <button
      data-testid={testId}
      type={type}
      aria-pressed={checked}
      data-checked={checked}
      onClick={handleClick}
      className={cn(trailingBase, variantClasses[variant], className)}
      {...rest}
    >
      <span className="relative">{icon}</span>
    </button>
  );
}

export const SplitButton = Object.assign(Root, { Leading, Trailing });

import type {
  ButtonShape,
  ButtonSize,
} from '@/components/shared/variants.types';
import { cn } from '@/lib/cn';

import './IconButton.css';
import type { IconButtonProps, IconButtonVariant } from './IconButton.types';

const base = [
  'md3-icon-button',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  'focus-visible:outline-md-primary',
  'disabled:pointer-events-none disabled:opacity-[0.38]',
].join(' ');

const variantClasses: Record<IconButtonVariant, string> = {
  standard: ['md3-icon-button--standard', 'text-md-on-surface-variant'].join(
    ' ',
  ),
  filled: ['md3-icon-button--filled', 'bg-md-primary text-md-on-primary'].join(
    ' ',
  ),
  tonal: [
    'md3-icon-button--tonal',
    'bg-md-secondary-container text-md-on-secondary-container',
  ].join(' '),
  outlined: [
    'md3-icon-button--outlined',
    'md3-button--outlined',
    'bg-transparent text-md-on-surface-variant',
  ].join(' '),
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'md3-icon-button--size-xs',
  s: 'md3-icon-button--size-s',
  m: 'md3-icon-button--size-m',
  l: 'md3-icon-button--size-l',
  xl: 'md3-icon-button--size-xl',
};

const shapeClasses: Record<ButtonShape, string> = {
  round: 'md3-button--shape-round',
  square: 'md3-button--shape-square',
};

/**
 * Material Design 3 icon button.
 *
 * Renders a native `<button>` containing a single icon, in one of the four
 * M3 visual variants (`standard`, `filled`, `tonal`, `outlined`).
 *
 * `size` (`xs`–`xl`) and `shape` (`round` | `square`) are shared with
 * `Button`/`ButtonGroup`/`ToggleButton`: `size` drives the square
 * width/height of the button, and `shape` drives the corner-radius, both
 * at rest and while pressed.
 *
 * All standard `ButtonHTMLAttributes` (`onClick`, `disabled`, `type`,
 * `aria-*`, etc.) pass through to the root element via `...rest`.
 *
 * @example Provide an accessible name via `aria-label` — the icon alone
 * conveys no text to assistive technology.
 * ```tsx
 * <IconButton variant="filled" icon={<FavoriteIcon />} aria-label="Favorito" />
 * ```
 */
export function IconButton({
  testId,
  variant = 'standard',
  size = 'm',
  shape = 'round',
  icon,
  className,
  type = 'button',
  ...rest
}: IconButtonProps) {
  return (
    <button
      data-testid={testId}
      className={cn(
        base,
        variantClasses[variant],
        sizeClasses[size],
        shapeClasses[shape],
        className,
      )}
      type={type}
      {...rest}
    >
      <span className="relative">{icon}</span>
    </button>
  );
}

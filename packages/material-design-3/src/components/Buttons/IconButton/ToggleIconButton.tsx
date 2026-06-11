import type {
  ButtonShape,
  ButtonSize,
} from '@/components/shared/variants.types';
import { cn } from '@/lib/cn';

import type {
  IconButtonVariant,
  ToggleIconButtonProps,
} from './IconButton.types';
import './ToggleIconButton.css';

const base = [
  'md3-icon-button',
  'md3-toggle-icon-button',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  'focus-visible:outline-md-primary',
  'disabled:pointer-events-none disabled:opacity-[0.38]',
].join(' ');

interface ToggleIconButtonStateClasses {
  unchecked: string;
  checked: string;
}

const variantClasses: Record<IconButtonVariant, ToggleIconButtonStateClasses> =
  {
    standard: {
      unchecked: 'text-md-on-surface-variant',
      checked: 'md3-icon-button--checked text-md-primary',
    },
    filled: {
      unchecked: [
        'md3-icon-button--filled',
        'bg-md-surface-variant text-md-on-surface-variant',
      ].join(' '),
      checked: [
        'md3-icon-button--filled-checked',
        'bg-md-primary text-md-on-primary',
      ].join(' '),
    },
    tonal: {
      unchecked: [
        'md3-icon-button--tonal',
        'bg-md-secondary-container text-md-on-secondary-container',
      ].join(' '),
      checked: [
        'md3-icon-button--tonal-checked',
        'bg-md-secondary text-md-on-secondary',
      ].join(' '),
    },
    outlined: {
      unchecked: [
        'md3-button--outlined',
        'bg-transparent text-md-on-surface-variant',
      ].join(' '),
      checked: [
        'md3-icon-button--outlined-checked',
        'bg-md-inverse-surface text-md-inverse-on-surface',
        'border border-transparent',
      ].join(' '),
    },
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
 * Material Design 3 toggle icon button.
 *
 * Renders a native `<button>` with `aria-pressed` reflecting the `checked`
 * state. Color follows the M3 "Toggle" table (`variant` × `checked`), and
 * the resting shape morphs between `round` and `square` when checked,
 * reusing the same `size`/`shape` corner-radius tokens as `IconButton`.
 *
 * @example Provide an accessible name via `aria-label` — the icon alone
 * conveys no text to assistive technology.
 * ```tsx
 * <ToggleIconButton
 *   variant="tonal"
 *   icon={<FavoriteBorderIcon />}
 *   checkedIcon={<FavoriteIcon />}
 *   checked={isFavorite}
 *   onCheckedChange={setIsFavorite}
 *   aria-label="Favorito"
 * />
 * ```
 */
export function ToggleIconButton({
  testId,
  variant = 'standard',
  size = 'm',
  shape = 'round',
  icon,
  checkedIcon,
  checked,
  onCheckedChange,
  className,
  type = 'button',
  ...rest
}: ToggleIconButtonProps) {
  return (
    <button
      data-testid={testId}
      aria-pressed={checked}
      className={cn(
        base,
        checked
          ? variantClasses[variant].checked
          : variantClasses[variant].unchecked,
        sizeClasses[size],
        shapeClasses[shape],
        className,
      )}
      type={type}
      onClick={() => onCheckedChange(!checked)}
      {...rest}
    >
      <span className="relative">{checked ? (checkedIcon ?? icon) : icon}</span>
    </button>
  );
}

import type {
  ButtonShape,
  ButtonSize,
} from '@/components/shared/variants.types';
import { cn } from '@/lib/cn';

import type {
  ToggleButtonProps,
  ToggleButtonVariant,
} from './ButtonGroup.types';
import './ToggleButton.css';

const base = [
  'md3-button',
  'md3-toggle-button',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  'focus-visible:outline-md-primary',
  'disabled:pointer-events-none disabled:opacity-[0.38]',
].join(' ');

interface ToggleButtonStateClasses {
  unselected: string;
  selected: string;
}

const variantClasses: Record<ToggleButtonVariant, ToggleButtonStateClasses> = {
  elevated: {
    unselected: [
      'md3-toggle-button--elevated',
      'bg-md-surface text-md-primary',
      'shadow-md-elevation-1 hover:shadow-md-elevation-2',
    ].join(' '),
    selected: [
      'md3-toggle-button--elevated-selected',
      'bg-md-primary text-md-on-primary',
      'shadow-md-elevation-1 hover:shadow-md-elevation-2',
    ].join(' '),
  },
  filled: {
    unselected: [
      'md3-toggle-button--filled',
      'bg-md-surface-variant text-md-on-surface-variant',
    ].join(' '),
    selected: [
      'md3-toggle-button--filled-selected',
      'bg-md-primary text-md-on-primary',
    ].join(' '),
  },
  'filled-tonal': {
    unselected: [
      'md3-toggle-button--filled-tonal',
      'bg-md-secondary-container text-md-on-secondary-container',
    ].join(' '),
    selected: [
      'md3-toggle-button--filled-tonal-selected',
      'bg-md-secondary text-md-on-secondary',
    ].join(' '),
  },
  outlined: {
    unselected: [
      'md3-button--outlined',
      'bg-transparent text-md-on-surface-variant',
      'focus-visible:outline-md-primary',
    ].join(' '),
    selected: [
      'md3-toggle-button--outlined-selected',
      'bg-md-inverse-surface text-md-inverse-on-surface',
      'border border-transparent',
    ].join(' '),
  },
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'md3-button--size-xs',
  s: 'md3-button--size-s',
  m: 'md3-button--size-m',
  l: 'md3-button--size-l',
  xl: 'md3-button--size-xl',
};

const shapeClasses: Record<ButtonShape, string> = {
  round: 'md3-button--shape-round',
  square: 'md3-button--shape-square',
};

/**
 * Material Design 3 toggle button.
 *
 * Renders a native `<button>` with `aria-pressed` reflecting the `selected`
 * state. Color follows the M3 "Toggle" table (`variant` × `selected`), and
 * the resting shape morphs between `round` and `square` when selected,
 * reusing the same `size`/`shape` corner-radius tokens as `Button`.
 *
 * @example
 * ```tsx
 * <ToggleButton variant="outlined" selected={isBold} onSelectedChange={setIsBold}>
 *   Bold
 * </ToggleButton>
 * ```
 */
export function ToggleButton({
  testId,
  variant = 'filled',
  size = 'm',
  shape = 'round',
  selected,
  onSelectedChange,
  icon,
  children,
  className,
  type = 'button',
  onClick,
  ...rest
}: ToggleButtonProps) {
  return (
    <button
      data-testid={testId}
      aria-pressed={selected}
      className={cn(
        base,
        selected
          ? variantClasses[variant].selected
          : variantClasses[variant].unselected,
        sizeClasses[size],
        shapeClasses[shape],
        className,
      )}
      type={type}
      onClick={(event) => {
        onClick?.(event);
        onSelectedChange(!selected);
      }}
      {...rest}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}

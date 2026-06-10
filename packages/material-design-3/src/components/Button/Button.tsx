import type {
  ButtonShape,
  ButtonSize,
} from '@/components/shared/variants.types';
import { cn } from '@/lib/cn';

import './Button.css';
import type { ButtonProps, ButtonVariant } from './Button.types';

const base = [
  'md3-button',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  'disabled:pointer-events-none disabled:opacity-[0.38]',
].join(' ');

const variantClasses: Record<ButtonVariant, string> = {
  filled: [
    'md3-button--filled',
    'bg-md-primary text-md-on-primary',
    'focus-visible:outline-md-primary',
  ].join(' '),
  elevated: [
    'md3-button--elevated',
    'bg-md-surface text-md-primary',
    'shadow-md-elevation-1 hover:shadow-md-elevation-2 active:shadow-md-elevation-3',
    'focus-visible:outline-md-primary',
  ].join(' '),
  'filled-tonal': [
    'md3-button--filled-tonal',
    'bg-md-secondary-container text-md-primary',
    'focus-visible:outline-md-primary',
  ].join(' '),
  outlined: [
    'md3-button--outlined',
    'bg-transparent text-md-on-surface-variant',
    'focus-visible:outline-md-primary',
  ].join(' '),
  text: [
    'md3-button--text',
    'bg-transparent text-md-primary',
    'focus-visible:outline-md-primary',
  ].join(' '),
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

export function Button({
  testId,
  variant = 'filled',
  size = 'm',
  shape = 'round',
  icon,
  iconTrailing,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
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
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconTrailing && <span className="shrink-0">{iconTrailing}</span>}
    </button>
  );
}

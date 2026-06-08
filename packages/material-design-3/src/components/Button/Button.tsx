import { cn } from '@/lib/cn';

import type { ButtonProps, ButtonVariant } from './Button.types';

const base = [
  'group relative inline-flex min-h-[48px] items-center justify-center gap-2',
  'overflow-hidden rounded-md-full text-sm font-medium leading-none',
  'transition-shadow',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  'disabled:pointer-events-none disabled:opacity-[0.38]',
].join(' ');

const variantClasses: Record<ButtonVariant, string> = {
  filled: [
    'px-6 bg-md-primary text-md-on-primary',
    'shadow-md-elevation-1 hover:shadow-md-elevation-2',
    'focus-visible:outline-md-primary',
  ].join(' '),
  elevated: [
    'px-6 bg-md-surface text-md-primary',
    'shadow-md-elevation-1 hover:shadow-md-elevation-2',
    'focus-visible:outline-md-primary',
  ].join(' '),
  'filled-tonal': [
    'px-6 bg-md-secondary-container text-md-on-secondary-container',
    'hover:shadow-md-elevation-1',
    'focus-visible:outline-md-primary',
  ].join(' '),
  outlined: [
    'px-6 border border-md-outline bg-transparent text-md-primary',
    'focus-visible:outline-md-primary',
  ].join(' '),
  text: [
    'px-3 bg-transparent text-md-primary',
    'focus-visible:outline-md-primary',
  ].join(' '),
};

const stateLayer = [
  'pointer-events-none absolute inset-0 rounded-[inherit] bg-current opacity-0',
  'transition-opacity',
  'group-hover:opacity-[0.08]',
  'group-focus-visible:opacity-[0.12]',
  'group-active:opacity-[0.12]',
].join(' ');

export function Button({
  testId,
  variant = 'filled',
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
      className={cn(base, variantClasses[variant], className)}
      type={type}
      {...rest}
    >
      <span aria-hidden className={stateLayer} />
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconTrailing && <span className="shrink-0">{iconTrailing}</span>}
    </button>
  );
}

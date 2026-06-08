import { cn } from '@/lib/cn';

import type { ButtonProps, ButtonVariant } from './Button.types';

const base = [
  'min-h-[48px] group relative inline-flex items-center justify-center gap-2',
  'overflow-hidden rounded-3xl text-sm font-medium leading-none',
  'transition-all duration-150 ease-in-out',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  'disabled:pointer-events-none disabled:opacity-[0.38]',
  'cursor-pointer',
  'active:rounded-xl',
].join(' ');

const variantClasses: Record<ButtonVariant, string> = {
  filled: [
    'px-6 bg-md-primary text-md-on-primary',
    'focus-visible:outline-md-primary',
    'active:px-8',
  ].join(' '),
  elevated: [
    'px-6 bg-md-surface text-md-primary',
    'shadow-md-elevation-1 hover:shadow-md-elevation-2 active:shadow-md-elevation-3',
    'focus-visible:outline-md-primary',
    'active:px-8',
  ].join(' '),
  'filled-tonal': [
    'px-6 bg-md-secondary-container text-md-primary',
    'focus-visible:outline-md-primary',
    'active:px-8',
  ].join(' '),
  outlined: [
    'px-6 border border-md-primary bg-transparent text-md-primary',
    'focus-visible:outline-md-primary',
    'active:px-8',
  ].join(' '),
  text: [
    'min-h-auto',
    'px-1 bg-transparent text-md-primary',
    'focus-visible:outline-md-primary',
    'active:px-2',
    'active:opacity-70',
  ].join(' '),
};

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
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconTrailing && <span className="shrink-0">{iconTrailing}</span>}
    </button>
  );
}

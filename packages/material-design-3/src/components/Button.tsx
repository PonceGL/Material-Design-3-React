import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'filled' | 'tonal' | 'outlined' | 'text';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
}

const baseClasses =
  'inline-flex h-10 items-center justify-center gap-2 rounded-md-full px-6 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-[0.38]';

const variantClasses: Record<ButtonVariant, string> = {
  filled:
    'bg-md-primary text-md-on-primary shadow-md-elevation-1 hover:bg-md-primary/[0.92] focus-visible:outline-md-primary',
  tonal:
    'bg-md-secondary-container text-md-on-secondary-container hover:bg-md-secondary-container/80 focus-visible:outline-md-primary',
  outlined:
    'border border-md-outline bg-transparent text-md-primary hover:bg-md-primary/[0.08] focus-visible:outline-md-primary',
  text: 'bg-transparent px-3 text-md-primary hover:bg-md-primary/[0.08] focus-visible:outline-md-primary',
};

export function Button({
  children,
  className,
  icon,
  variant = 'filled',
  type = 'button',
  ...props
}: ButtonProps) {
  const classes = [baseClasses, variantClasses[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} type={type} {...props}>
      {icon}
      {children}
    </button>
  );
}

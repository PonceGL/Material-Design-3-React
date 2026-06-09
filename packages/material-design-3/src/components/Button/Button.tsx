import { cn } from '@/lib/cn';

import './Button.css';
import type { ButtonProps, ButtonVariant } from './Button.types';

const variantClasses: Record<ButtonVariant, string> = {
  filled: 'md3-button--filled',
  elevated: 'md3-button--elevated',
  'filled-tonal': 'md3-button--filled-tonal',
  outlined: 'md3-button--outlined',
  text: 'md3-button--text',
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
      className={cn('md3-button', variantClasses[variant], className)}
      type={type}
      {...rest}
    >
      {icon && <span className="md3-button__icon">{icon}</span>}
      {children}
      {iconTrailing && <span className="md3-button__icon">{iconTrailing}</span>}
    </button>
  );
}

import { cn } from '@/lib/cn';

import './ListItem.css';
import type { ListItemProps } from './ListItem.types';

const selectionStateClasses: Record<
  'default' | 'selected',
  { label: string; variant: string; stateLayer: string }
> = {
  default: {
    label: 'text-md-on-surface',
    variant: 'text-md-on-surface-variant',
    stateLayer:
      'hover:bg-md-on-surface/[0.08] focus-visible:bg-md-on-surface/[0.1] active:bg-md-on-surface/[0.1]',
  },
  selected: {
    label: 'text-md-on-secondary-container',
    variant: 'text-md-on-secondary-container',
    stateLayer:
      'hover:bg-md-on-secondary-container/[0.08] focus-visible:bg-md-on-secondary-container/[0.1] active:bg-md-on-secondary-container/[0.1]',
  },
};

export function ListItem({
  testId,
  leading,
  overline,
  label,
  supportingText,
  trailing,
  selected,
  disabled,
  onClick,
  className,
  ...rest
}: ListItemProps) {
  const heightClass = overline
    ? 'md3-list-item--three-line'
    : supportingText
      ? 'md3-list-item--two-line'
      : 'md3-list-item--one-line';

  const state = selectionStateClasses[selected ? 'selected' : 'default'];

  // Leading + texto únicamente — el trailing queda fuera del área primaria.
  const primaryContent = (
    <>
      {leading && (
        <span className={cn('md3-list-item__leading', state.variant)}>
          {leading}
        </span>
      )}
      <span className="md3-list-item__text">
        {overline && (
          <span className={cn('md3-list-item__overline', state.variant)}>
            {overline}
          </span>
        )}
        <span className={cn('md3-list-item__label', state.label)}>{label}</span>
        {supportingText && (
          <span className={cn('md3-list-item__supporting-text', state.variant)}>
            {supportingText}
          </span>
        )}
      </span>
    </>
  );

  return (
    <div
      role="listitem"
      data-testid={testId}
      className={cn(
        'md3-list-item',
        heightClass,
        selected &&
          'md3-list-item--selected bg-md-secondary-container rounded-3xl',
        disabled && 'opacity-[0.38]',
        className,
      )}
      {...rest}
    >
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className={cn(
            'md3-list-item__body',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-md-primary',
            'disabled:pointer-events-none',
            state.stateLayer,
          )}
        >
          {primaryContent}
        </button>
      ) : (
        <div className="md3-list-item__body">{primaryContent}</div>
      )}
      {trailing && (
        <span className={cn('md3-list-item__trailing', state.variant)}>
          {trailing}
        </span>
      )}
    </div>
  );
}

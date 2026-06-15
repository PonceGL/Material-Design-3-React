import { cn } from '@/lib/cn';

import './ListItem.css';
import type { ListItemProps } from './ListItem.types';

/**
 * A single row inside a `List`.
 *
 * Height is derived automatically from its content: one-line (56dp) by
 * default, two-line (72dp) when `supportingText` is set, three-line (88dp)
 * when `overline` is set.
 *
 * When `onClick` is provided, the item renders an inner full-size `<button>`
 * (single-action item) with hover/focus/pressed state layers and a
 * focus-visible ring. Without `onClick`, the content is static.
 *
 * @example
 * ```tsx
 * <ListItem
 *   leading={<InboxIcon />}
 *   label="Inbox"
 *   supportingText="124 unread messages"
 *   trailing="2h"
 *   onClick={() => navigate('/inbox')}
 * />
 * ```
 */
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

  const labelColor = selected
    ? 'text-md-on-secondary-container'
    : 'text-md-on-surface';
  const variantColor = selected
    ? 'text-md-on-secondary-container'
    : 'text-md-on-surface-variant';
  const stateLayerClasses = selected
    ? [
        'hover:bg-md-on-secondary-container/[0.08]',
        'focus-visible:bg-md-on-secondary-container/[0.1]',
        'active:bg-md-on-secondary-container/[0.1]',
      ]
    : [
        'hover:bg-md-on-surface/[0.08]',
        'focus-visible:bg-md-on-surface/[0.1]',
        'active:bg-md-on-surface/[0.1]',
      ];

  const content = (
    <>
      {leading && (
        <span className={cn('md3-list-item__leading', variantColor)}>
          {leading}
        </span>
      )}
      <span className="md3-list-item__text">
        {overline && (
          <span className={cn('md3-list-item__overline', variantColor)}>
            {overline}
          </span>
        )}
        <span className={cn('md3-list-item__label', labelColor)}>{label}</span>
        {supportingText && (
          <span className={cn('md3-list-item__supporting-text', variantColor)}>
            {supportingText}
          </span>
        )}
      </span>
      {trailing && (
        <span className={cn('md3-list-item__trailing', variantColor)}>
          {trailing}
        </span>
      )}
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
            'md3-list-item__action',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-md-primary',
            'disabled:pointer-events-none',
            stateLayerClasses,
          )}
        >
          {content}
        </button>
      ) : (
        <div className="md3-list-item__action">{content}</div>
      )}
    </div>
  );
}

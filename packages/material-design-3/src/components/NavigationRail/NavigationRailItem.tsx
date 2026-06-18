import { memo } from 'react';

import { cn } from '@/lib/cn';

import type { NavigationRailItemProps } from './NavigationRail.types';
import './NavigationRailItem.css';

const base = [
  'md3-navigation-rail-item',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  'focus-visible:outline-md-primary',
  'disabled:pointer-events-none disabled:opacity-[0.38]',
].join(' ');

/**
 * A single destination of `NavigationRail`.
 *
 * Renders a native `<button>` with `aria-current="page"` when `selected` —
 * a navigation destination, not a toggle, so `aria-pressed` does not apply.
 *
 * Color (indicator, icon, label) is driven directly by the `selected` prop
 * via plain conditional classes, like every other component in this
 * library — no pseudo-elements involved. Only the LAYOUT (icon-above-label
 * vs. icon-beside-label) and the active indicator/state-layer's size and
 * position come from CSS, since those depend on the parent `NavigationRail`'s
 * `data-variant`, which this component never receives as a prop (see
 * `NavigationRailItem.css`).
 *
 * Wrapped in `React.memo`: in a rail with many destinations, changing the
 * selection only re-renders the item that loses it and the one that gains
 * it, not every other item.
 *
 * @example
 * ```tsx
 * <NavigationRailItem
 *   icon={<HomeOutlineIcon />}
 *   activeIcon={<HomeIcon />}
 *   label="Home"
 *   selected={page === 'home'}
 *   onClick={() => setPage('home')}
 * />
 * ```
 */
export const NavigationRailItem = memo(function NavigationRailItem({
  testId,
  icon,
  activeIcon,
  label,
  selected,
  onClick,
  className,
  type = 'button',
  ...rest
}: NavigationRailItemProps) {
  return (
    <button
      data-testid={testId}
      type={type}
      aria-current={selected ? 'page' : undefined}
      onClick={onClick}
      className={cn(base, className)}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={cn(
          'md3-navigation-rail-item__indicator',
          selected && 'bg-md-secondary-container',
        )}
      />
      <span
        aria-hidden="true"
        className="md3-navigation-rail-item__state-layer bg-md-on-secondary-container"
      />
      <span
        className={cn(
          'md3-navigation-rail-item__icon',
          selected
            ? 'text-md-on-secondary-container'
            : 'text-md-on-surface-variant',
        )}
      >
        {selected ? (activeIcon ?? icon) : icon}
      </span>
      <span
        className={cn(
          'md3-navigation-rail-item__label',
          !selected && 'text-md-on-surface-variant',
        )}
      >
        {label}
      </span>
    </button>
  );
});

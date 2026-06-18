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
 * Layout (icon-above-label vs. icon-beside-label), the active-indicator
 * shape and all selected/hover/focus colors are resolved entirely in CSS
 * from the parent `NavigationRail`'s `data-variant` (see
 * `NavigationRailItem.css`) — this component never needs to know its own
 * layout.
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
      <span className="md3-navigation-rail-item__icon">
        {selected ? (activeIcon ?? icon) : icon}
      </span>
      <span className="md3-navigation-rail-item__label">{label}</span>
    </button>
  );
});

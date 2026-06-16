import { cn } from '@/lib/cn';

import './List.css';
import type { ListProps, ListVariant } from './List.types';

const variantClasses: Record<ListVariant, string> = {
  standard: 'md3-list--standard',
  segmented: 'md3-list--segmented bg-md-surface',
};

/**
 * Material Design 3 list container.
 *
 * Renders a vertical `role="list"` container for `ListItem` elements.
 * `variant="standard"` (default) renders items flush against each other
 * with no background of its own. `variant="segmented"` gives the list its
 * own `surface` container with a gap between items.
 *
 * @example
 * ```tsx
 * <List variant="segmented">
 *   <ListItem label="Inbox" />
 *   <ListItem label="Sent" />
 * </List>
 * ```
 */
export function List({
  testId,
  variant = 'standard',
  className,
  children,
  ...rest
}: ListProps) {
  return (
    <div
      role="list"
      data-testid={testId}
      className={cn(
        'md3-list',
        'rounded-3xl',
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

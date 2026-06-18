import type { KeyboardEvent } from 'react';

import { cn } from '@/lib/cn';

import './SearchView.css';
import type { SearchViewLayout, SearchViewProps } from './SearchView.types';

/**
 * Only the `contained` style paints a filled background — `divided` relies
 * solely on the separator line, per the M3 spec ("the contained style has
 * a persistent, filled container" vs. "the divided style uses a divider").
 */
const containedLayoutBackground: Record<SearchViewLayout, string> = {
  'full-screen': 'bg-md-surface-container-low',
  docked: 'bg-md-surface-container-high',
};

/**
 * Material Design 3 search view.
 *
 * Wraps a persistent `SearchBar` (always visible, passed via the
 * `searchBar` prop) and a "focused search" panel with suggestions or
 * results that appears below it. The panel is always mounted in the DOM —
 * its visibility is driven by the `open` prop (reflected as `data-state`
 * and animated in CSS) plus `inert` for accessibility while closed. Empty
 * by default; pass result items as `children` (e.g. `List`/`ListItem` from
 * this library).
 *
 * Pressing Escape anywhere inside (including the search bar's input) while
 * the view is open calls `onClose`, but no close button is rendered
 * automatically — wire one through `SearchBar`'s `leadingIcon` (a
 * back/close `IconButton`) if you need a visible trigger.
 *
 * @example
 * ```tsx
 * <SearchView
 *   open={open}
 *   searchBar={<SearchBar aria-label="Search" onFocus={() => setOpen(true)} />}
 *   onClose={() => setOpen(false)}
 * >
 *   <List>
 *     <ListItem label="Result 1" />
 *   </List>
 * </SearchView>
 * ```
 */
export function SearchView({
  testId,
  open,
  layout = 'full-screen',
  style = 'contained',
  searchBar,
  children,
  className,
  onClose,
  onKeyDown,
  ...rest
}: SearchViewProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (open && event.key === 'Escape') {
      onClose?.();
    }
  };

  return (
    <div
      data-testid={testId}
      onKeyDown={handleKeyDown}
      className={cn('md3-search-view', className)}
      {...rest}
    >
      <div className="md3-search-view__header">{searchBar}</div>
      <div
        data-state={open ? 'open' : 'closed'}
        data-layout={layout}
        data-style={style}
        inert={!open}
        className={cn(
          'md3-search-view__panel',
          style === 'contained' && containedLayoutBackground[layout],
        )}
      >
        {style === 'divided' && (
          <div
            aria-hidden="true"
            className="md3-search-view__divider bg-md-outline-variant"
          />
        )}
        <div className="md3-search-view__results">{children}</div>
      </div>
    </div>
  );
}

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
 * The "focused search" panel that appears below a `SearchBar` with
 * suggestions or results. Always mounted in the DOM — visibility is driven
 * by the `open` prop (reflected as `data-state` and animated in CSS) plus
 * `inert` for accessibility while closed. Empty by default; pass result
 * items as `children` (e.g. `List`/`ListItem` from this library).
 *
 * Pressing Escape while the view is open calls `onClose`, but no close
 * button is rendered automatically — wire one through `SearchBar`'s
 * `leadingIcon` (a back/close `IconButton`) if you need a visible trigger.
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
      data-state={open ? 'open' : 'closed'}
      data-layout={layout}
      data-style={style}
      inert={!open}
      onKeyDown={handleKeyDown}
      className={cn(
        'md3-search-view',
        style === 'contained' && containedLayoutBackground[layout],
        className,
      )}
      {...rest}
    >
      <div className="md3-search-view__header">{searchBar}</div>
      {style === 'divided' && (
        <div
          aria-hidden="true"
          className="md3-search-view__divider bg-md-outline-variant"
        />
      )}
      <div className="md3-search-view__results">{children}</div>
    </div>
  );
}

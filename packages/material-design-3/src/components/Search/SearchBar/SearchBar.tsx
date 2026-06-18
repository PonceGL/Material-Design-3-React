import { cn } from '@/lib/cn';

import './SearchBar.css';
import type { SearchBarProps } from './SearchBar.types';

/**
 * Material Design 3 search bar.
 *
 * Renders a persistent, pill-shaped (`corner-full`) search field — a native
 * `<input type="search">` with an optional leading icon and up to two
 * trailing actions (e.g. an `IconButton` from this library, and/or an
 * avatar). On focus, the M3 Expressive "grow" animation shrinks the
 * horizontal padding from 24dp to 12dp.
 *
 * Pair it with `SearchView` (via the `searchBar` prop) to show suggestions
 * or results below it — `SearchBar` itself has no notion of an open/closed
 * panel.
 *
 * @example Prefer an explicit `aria-label` over relying on `placeholder`
 * alone — `placeholder` is only a last-resort fallback in the accessible
 * name computation, and disappears once the field has a value.
 * ```tsx
 * <SearchBar leadingIcon={<SearchIcon />} placeholder="Search" aria-label="Search" />
 * ```
 */
export function SearchBar({
  testId,
  leadingIcon,
  trailingActions,
  className,
  type = 'search',
  ...rest
}: SearchBarProps) {
  return (
    <div
      data-testid={testId}
      className={cn(
        'md3-search-bar',
        'bg-md-surface-container-high text-md-on-surface',
        className,
      )}
    >
      {leadingIcon && (
        <span
          aria-hidden="true"
          className="md3-search-bar__icon shrink-0 text-md-on-surface-variant"
        >
          {leadingIcon}
        </span>
      )}
      <input type={type} className="md3-search-bar__input" {...rest} />
      {trailingActions && (
        <span className="md3-search-bar__actions">{trailingActions}</span>
      )}
    </div>
  );
}

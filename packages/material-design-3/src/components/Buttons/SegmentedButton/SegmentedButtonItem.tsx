import { cn } from '@/lib/cn';

import type { SegmentedButtonItemProps } from './SegmentedButton.types';
import './SegmentedButtonItem.css';

const base = [
  'md3-segmented-button-item',
  'bg-transparent text-md-on-surface',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  'focus-visible:outline-md-primary',
  'disabled:pointer-events-none disabled:opacity-[0.38]',
].join(' ');

const selectedClasses =
  'bg-md-secondary-container text-md-on-secondary-container';

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}

/**
 * A single segment of `SegmentedButton`.
 *
 * Renders a `<button>` whose shape depends on its position within the
 * group (handled via `:first-child`/`:last-child` in `SegmentedButtonItem.css`
 * — leading/trailing get fully-rounded outer corners, middle items get
 * `corner-extra-small`).
 *
 * Color follows the fixed M3 "classic" table: unselected is outlined with
 * `on-surface` text/icon; selected fills with `secondary-container` /
 * `on-secondary-container`. `aria-pressed` reflects `selected`.
 *
 * When `selected` is `true`, a checkmark replaces `icon` as the leading
 * graphic (matching `SingleChoiceSegmentedButtonRow`/
 * `MultiChoiceSegmentedButtonRow` from Jetpack Compose Material3).
 *
 * @example
 * ```tsx
 * <SegmentedButtonItem label="Day" selected={view === 'day'} onClick={() => setView('day')} />
 * ```
 */
export function SegmentedButtonItem({
  testId,
  selected,
  onClick,
  label,
  icon,
  className,
  type = 'button',
  ...rest
}: SegmentedButtonItemProps) {
  const leadingIcon = selected ? <CheckIcon /> : icon;

  return (
    <button
      data-testid={testId}
      type={type}
      aria-pressed={selected}
      onClick={onClick}
      className={cn(base, selected && selectedClasses, className)}
      {...rest}
    >
      {leadingIcon && <span className="shrink-0">{leadingIcon}</span>}
      {label}
    </button>
  );
}

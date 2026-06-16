import { cn } from '@/lib/cn';

import './SegmentedButton.css';
import type { SegmentedButtonProps } from './SegmentedButton.types';

const base = 'md3-segmented-button';

/**
 * Material Design 3 segmented button (classic style).
 *
 * Renders a `role="group"` row of equal-width `SegmentedButtonItem`s. Unlike
 * `ButtonGroup`, the visual style is fixed (outlined, single height) and is
 * not configurable via `variant`/`size`/`shape` — see `SegmentedButtonItem`
 * for the per-item color and shape rules.
 *
 * `selectionMode` does not drive any behavior here — the consumer owns
 * selection state via each item's `selected`/`onClick` props. It is exposed
 * as `data-selection-mode` for styling/testing hooks, mirroring `ButtonGroup`.
 *
 * @example
 * ```tsx
 * <SegmentedButton selectionMode="single-select">
 *   <SegmentedButtonItem label="Day" selected={view === 'day'} onClick={() => setView('day')} />
 *   <SegmentedButtonItem label="Week" selected={view === 'week'} onClick={() => setView('week')} />
 *   <SegmentedButtonItem label="Month" selected={view === 'month'} onClick={() => setView('month')} />
 * </SegmentedButton>
 * ```
 */
export function SegmentedButton({
  testId,
  selectionMode,
  children,
  className,
  ...rest
}: SegmentedButtonProps) {
  return (
    <div
      data-testid={testId}
      role="group"
      data-selection-mode={selectionMode}
      className={cn(base, className)}
      {...rest}
    >
      {children}
    </div>
  );
}

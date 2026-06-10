import type {
  ButtonShape,
  ButtonSize,
} from '@/components/shared/variants.types';
import { cn } from '@/lib/cn';

import './ButtonGroup.css';
import type { ButtonGroupProps, ButtonGroupVariant } from './ButtonGroup.types';

const base = 'md3-button-group';

const variantClasses: Record<ButtonGroupVariant, string> = {
  standard: 'md3-button-group--standard',
  connected: 'md3-button-group--connected',
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'md3-button-group--size-xs',
  s: 'md3-button-group--size-s',
  m: 'md3-button-group--size-m',
  l: 'md3-button-group--size-l',
  xl: 'md3-button-group--size-xl',
};

const shapeClasses: Record<ButtonShape, string> = {
  round: 'md3-button-group--shape-round',
  square: 'md3-button-group--shape-square',
};

/**
 * Material Design 3 button group.
 *
 * Lays out `Button`, `IconButton` or `ToggleButton` items as a single
 * `role="group"` container. Button groups have no color properties of
 * their own — all color comes from the items inside.
 *
 * - `variant="standard"` spaces items apart with a gap that scales with
 *   `size`, and grows a selected (`aria-pressed="true"`) item relative to
 *   its neighbors (squish-expand).
 * - `variant="connected"` packs items with a fixed 2px gap and gives each
 *   item an outer corner-radius based on `size`. When `shape="round"`,
 *   the first and last items additionally get fully-rounded outer corners.
 *
 * @example
 * ```tsx
 * <ButtonGroup variant="connected" selectionMode="single-select">
 *   <ToggleButton selected={view === 'list'} onSelectedChange={() => setView('list')}>
 *     List
 *   </ToggleButton>
 *   <ToggleButton selected={view === 'grid'} onSelectedChange={() => setView('grid')}>
 *     Grid
 *   </ToggleButton>
 * </ButtonGroup>
 * ```
 */
export function ButtonGroup({
  testId,
  variant = 'standard',
  size = 'm',
  shape = 'round',
  selectionMode,
  children,
  className,
  ...rest
}: ButtonGroupProps) {
  return (
    <div
      data-testid={testId}
      role="group"
      data-selection-mode={selectionMode}
      className={cn(
        base,
        variantClasses[variant],
        sizeClasses[size],
        shapeClasses[shape],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

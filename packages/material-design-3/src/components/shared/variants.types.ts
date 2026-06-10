export type FilledVariant = 'filled';
export type FilledTonalVariant = 'filled-tonal';
export type ElevatedVariant = 'elevated';
export type OutlinedVariant = 'outlined';

/**
 * Visual variants for Material Design 3 components.
 *
 * Choose based on the action's emphasis level:
 *
 * - `filled`       — Highest emphasis. Use for the primary, most important action on a screen.
 * - `filled-tonal` — Medium-high emphasis. Use for secondary actions that still need prominence.
 * - `elevated`     — Medium emphasis. Similar to filled-tonal but with a shadow instead of a tonal fill.
 * - `outlined`     — Medium emphasis. Use for important actions that are not the primary one.
 */
export type CommonVariants =
  | FilledVariant
  | FilledTonalVariant
  | ElevatedVariant
  | OutlinedVariant;

/**
 * M3 Expressive button sizes, from smallest to largest.
 *
 * Drives the corner-radius (resting and pressed) of `Button` and is shared
 * with `ButtonGroup`/`ToggleButton` so the whole family stays in sync.
 *
 * - `xs` — Extra small
 * - `s`  — Small
 * - `m`  — Medium
 * - `l`  — Large
 * - `xl` — Extra large
 */
export type ButtonSize = 'xs' | 's' | 'm' | 'l' | 'xl';

/**
 * M3 Expressive button shapes.
 *
 * - `round`  — Fully-rounded corners at rest (default, matches the pre-Expressive shape).
 * - `square` — Rounded-rectangle corners at rest, sized per `ButtonSize`.
 *
 * Both shapes morph to the same "pressed" corner radius for a given size.
 */
export type ButtonShape = 'round' | 'square';

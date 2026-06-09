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

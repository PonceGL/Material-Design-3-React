// Cadena de prioridad del sistema de theming:
//   Option C (baseline :root CSS)        ← menor prioridad
//   Option A (user CSS override, cascade) ← prioridad media
//   Option B (MD3Provider, inline style)  ← mayor prioridad, siempre gana
//
// Option B gana porque escribe en document.documentElement.style (inline),
// que tiene mayor especificidad que cualquier regla CSS.

const M3_BASELINE_PRIMARY = '#6750a4';

export function assertCSSTokensLoaded(): void {
  if (process.env.NODE_ENV === 'production') return;
  if (typeof window === 'undefined') return;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue('--md-sys-color-primary')
    .trim();
  if (!value) {
    console.error(
      '[@poncegl/material-design-3] CSS tokens not found.\n' +
        'Did you forget to import the stylesheet?\n\n' +
        "  import '@poncegl/material-design-3/styles.css';\n\n" +
        'Without this import, components will render without any theme.',
    );
  }
}

export function detectOptionAConflict(): void {
  if (process.env.NODE_ENV === 'production') return;
  if (typeof window === 'undefined') return;
  const computed = getComputedStyle(document.documentElement)
    .getPropertyValue('--md-sys-color-primary')
    .trim();
  if (computed && computed !== M3_BASELINE_PRIMARY) {
    console.warn(
      '[@poncegl/material-design-3] MD3Provider detected existing CSS theme overrides (Option A).\n' +
        'MD3Provider (Option B) will override them — your CSS overrides will not apply.\n' +
        'Consider using only one theming method.',
    );
  }
}

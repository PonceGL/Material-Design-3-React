import type { MD3Theme } from '@/tokens';
import {
  type Scheme,
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
} from '@material/material-color-utilities';

import type { MD3ThemeInput, PaletteGeneratorAdapter } from './types';

function schemeToMD3Theme(scheme: Scheme): MD3Theme {
  return {
    '--md-sys-color-primary': hexFromArgb(scheme.primary),
    '--md-sys-color-on-primary': hexFromArgb(scheme.onPrimary),
    '--md-sys-color-primary-container': hexFromArgb(scheme.primaryContainer),
    '--md-sys-color-on-primary-container': hexFromArgb(
      scheme.onPrimaryContainer,
    ),
    '--md-sys-color-secondary': hexFromArgb(scheme.secondary),
    '--md-sys-color-on-secondary': hexFromArgb(scheme.onSecondary),
    '--md-sys-color-secondary-container': hexFromArgb(
      scheme.secondaryContainer,
    ),
    '--md-sys-color-on-secondary-container': hexFromArgb(
      scheme.onSecondaryContainer,
    ),
    '--md-sys-color-tertiary': hexFromArgb(scheme.tertiary),
    '--md-sys-color-on-tertiary': hexFromArgb(scheme.onTertiary),
    '--md-sys-color-tertiary-container': hexFromArgb(scheme.tertiaryContainer),
    '--md-sys-color-on-tertiary-container': hexFromArgb(
      scheme.onTertiaryContainer,
    ),
    '--md-sys-color-error': hexFromArgb(scheme.error),
    '--md-sys-color-on-error': hexFromArgb(scheme.onError),
    '--md-sys-color-error-container': hexFromArgb(scheme.errorContainer),
    '--md-sys-color-on-error-container': hexFromArgb(scheme.onErrorContainer),
    '--md-sys-color-background': hexFromArgb(scheme.background),
    '--md-sys-color-on-background': hexFromArgb(scheme.onBackground),
    '--md-sys-color-surface': hexFromArgb(scheme.surface),
    '--md-sys-color-on-surface': hexFromArgb(scheme.onSurface),
    '--md-sys-color-surface-variant': hexFromArgb(scheme.surfaceVariant),
    '--md-sys-color-on-surface-variant': hexFromArgb(scheme.onSurfaceVariant),
    '--md-sys-color-outline': hexFromArgb(scheme.outline),
    '--md-sys-color-outline-variant': hexFromArgb(scheme.outlineVariant),
    '--md-sys-color-inverse-surface': hexFromArgb(scheme.inverseSurface),
    '--md-sys-color-inverse-on-surface': hexFromArgb(scheme.inverseOnSurface),
    '--md-sys-color-inverse-primary': hexFromArgb(scheme.inversePrimary),
    '--md-sys-color-shadow': hexFromArgb(scheme.shadow),
    '--md-sys-color-scrim': hexFromArgb(scheme.scrim),
  };
}

export class MaterialColorUtilitiesAdapter implements PaletteGeneratorAdapter {
  generate(input: MD3ThemeInput): MD3Theme {
    const argb = argbFromHex(input.primary);
    const theme = themeFromSourceColor(argb);
    const scheme =
      input.scheme === 'dark' ? theme.schemes.dark : theme.schemes.light;
    return schemeToMD3Theme(scheme);
  }
}

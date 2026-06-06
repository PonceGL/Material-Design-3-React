export type MD3SystemColorToken =
  | '--md-sys-color-primary'
  | '--md-sys-color-on-primary'
  | '--md-sys-color-primary-container'
  | '--md-sys-color-on-primary-container'
  | '--md-sys-color-secondary'
  | '--md-sys-color-on-secondary'
  | '--md-sys-color-secondary-container'
  | '--md-sys-color-on-secondary-container'
  | '--md-sys-color-tertiary'
  | '--md-sys-color-on-tertiary'
  | '--md-sys-color-tertiary-container'
  | '--md-sys-color-on-tertiary-container'
  | '--md-sys-color-error'
  | '--md-sys-color-on-error'
  | '--md-sys-color-error-container'
  | '--md-sys-color-on-error-container'
  | '--md-sys-color-background'
  | '--md-sys-color-on-background'
  | '--md-sys-color-surface'
  | '--md-sys-color-on-surface'
  | '--md-sys-color-surface-variant'
  | '--md-sys-color-on-surface-variant'
  | '--md-sys-color-outline'
  | '--md-sys-color-outline-variant'
  | '--md-sys-color-inverse-surface'
  | '--md-sys-color-inverse-on-surface'
  | '--md-sys-color-inverse-primary'
  | '--md-sys-color-shadow'
  | '--md-sys-color-scrim';

export type MD3ColorScheme = 'light' | 'dark';

export type MD3Theme = Partial<Record<MD3SystemColorToken, string>>;

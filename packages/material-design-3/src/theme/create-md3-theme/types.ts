import type { MD3Theme } from '@/tokens';

export interface CreateMD3ThemeInput {
  primary: string;
  secondary?: string;
  tertiary?: string;
}

export interface MD3ThemeResult {
  light: MD3Theme;
  dark: MD3Theme;
}

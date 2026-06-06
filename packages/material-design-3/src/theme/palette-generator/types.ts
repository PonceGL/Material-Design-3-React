import type { MD3ColorScheme, MD3Theme } from '@/tokens';

export interface MD3ThemeInput {
  primary: string;
  scheme: MD3ColorScheme;
}

export interface PaletteGeneratorAdapter {
  generate(input: MD3ThemeInput): MD3Theme;
}

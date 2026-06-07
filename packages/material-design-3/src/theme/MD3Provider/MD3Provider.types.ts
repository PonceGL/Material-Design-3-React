import type { ReactNode } from 'react';

import type { MD3ThemeResult } from '@/theme/create-md3-theme';

export type MD3ProviderColorScheme = 'light' | 'dark' | 'system';

export interface MD3ProviderProps {
  theme: MD3ThemeResult;
  colorScheme?: MD3ProviderColorScheme;
  children: ReactNode;
}

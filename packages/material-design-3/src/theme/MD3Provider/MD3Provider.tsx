import { useLayoutEffect } from 'react';

import {
  assertCSSTokensLoaded,
  detectOptionAConflict,
} from '@/theme/validation';
import type { MD3Theme } from '@/tokens';

import type {
  MD3ProviderColorScheme,
  MD3ProviderProps,
} from './MD3Provider.types';

function resolveIsDark(colorScheme: MD3ProviderColorScheme): boolean {
  if (colorScheme === 'dark') return true;
  if (colorScheme === 'light') return false;
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
}

function applyTokens(tokens: MD3Theme): void {
  const el = document.documentElement;
  Object.entries(tokens).forEach(([token, value]) => {
    if (value !== undefined) {
      el.style.setProperty(token, value);
    }
  });
}

function removeTokens(tokens: MD3Theme): void {
  const el = document.documentElement;
  Object.keys(tokens).forEach((token) => {
    el.style.removeProperty(token);
  });
}

export function MD3Provider({
  theme,
  colorScheme = 'system',
  children,
}: MD3ProviderProps) {
  useLayoutEffect(() => {
    assertCSSTokensLoaded();
    detectOptionAConflict();
    const isDark = resolveIsDark(colorScheme);
    applyTokens(isDark ? theme.dark : theme.light);

    if (colorScheme !== 'system' || typeof window === 'undefined') {
      return () => removeTokens(theme.light);
    }

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      applyTokens(e.matches ? theme.dark : theme.light);
    };
    mql.addEventListener('change', handler);

    return () => {
      mql.removeEventListener('change', handler);
      removeTokens(theme.light);
    };
  }, [theme, colorScheme]);

  return <>{children}</>;
}

import { MaterialColorUtilitiesAdapter } from '@/theme/palette-generator';

import type { CreateMD3ThemeInput, MD3ThemeResult } from './types';

const M3_BASELINE_PRIMARY = '#6750A4';
const HEX_REGEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function isValidHex(hex: string): boolean {
  return HEX_REGEX.test(hex);
}

function warnDev(message: string): void {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[MD3] ${message}`);
  }
}

const adapter = new MaterialColorUtilitiesAdapter();

export function createMD3Theme(input: CreateMD3ThemeInput): MD3ThemeResult {
  let primary = input.primary;

  if (!isValidHex(primary)) {
    warnDev(
      `Invalid hex color for "primary": "${primary}". Using M3 baseline as fallback.`,
    );
    primary = M3_BASELINE_PRIMARY;
  }

  if (input.secondary !== undefined && !isValidHex(input.secondary)) {
    warnDev(
      `Invalid hex color for "secondary": "${input.secondary}". Override ignored.`,
    );
  }

  if (input.tertiary !== undefined && !isValidHex(input.tertiary)) {
    warnDev(
      `Invalid hex color for "tertiary": "${input.tertiary}". Override ignored.`,
    );
  }

  const light = adapter.generate({ primary, scheme: 'light' });
  const dark = adapter.generate({ primary, scheme: 'dark' });

  return { light, dark };
}

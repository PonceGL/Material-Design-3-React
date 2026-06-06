import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createMD3Theme } from './create-md3-theme';

const VALID_PRIMARY = '#6750A4';
const M3_BASELINE_PRIMARY = '#6750A4';
const HEX_PATTERN = /^#[0-9a-f]{6}$/i;

describe('createMD3Theme', () => {
  describe('happy path', () => {
    it('returns an object with light and dark schemes', () => {
      const result = createMD3Theme({ primary: VALID_PRIMARY });
      expect(result).toHaveProperty('light');
      expect(result).toHaveProperty('dark');
    });

    it('light scheme includes all 29 MD3 system color tokens', () => {
      const { light } = createMD3Theme({ primary: VALID_PRIMARY });
      expect(Object.keys(light)).toHaveLength(29);
    });

    it('dark scheme includes all 29 MD3 system color tokens', () => {
      const { dark } = createMD3Theme({ primary: VALID_PRIMARY });
      expect(Object.keys(dark)).toHaveLength(29);
    });

    it('all light scheme token values are valid hex colors', () => {
      const { light } = createMD3Theme({ primary: VALID_PRIMARY });
      for (const value of Object.values(light)) {
        expect(value).toMatch(HEX_PATTERN);
      }
    });

    it('all dark scheme token values are valid hex colors', () => {
      const { dark } = createMD3Theme({ primary: VALID_PRIMARY });
      for (const value of Object.values(dark)) {
        expect(value).toMatch(HEX_PATTERN);
      }
    });

    it('light and dark schemes produce different primary tokens', () => {
      const { light, dark } = createMD3Theme({ primary: VALID_PRIMARY });
      expect(light['--md-sys-color-primary']).not.toBe(
        dark['--md-sys-color-primary'],
      );
    });

    it('returns deterministic results for the same input', () => {
      const first = createMD3Theme({ primary: VALID_PRIMARY });
      const second = createMD3Theme({ primary: VALID_PRIMARY });
      expect(first.light).toEqual(second.light);
      expect(first.dark).toEqual(second.dark);
    });
  });

  describe('optional secondary and tertiary', () => {
    it('works without secondary or tertiary', () => {
      expect(() => createMD3Theme({ primary: VALID_PRIMARY })).not.toThrow();
    });

    it('accepts input with secondary only', () => {
      expect(() =>
        createMD3Theme({ primary: VALID_PRIMARY, secondary: '#006399' }),
      ).not.toThrow();
    });

    it('accepts input with tertiary only', () => {
      expect(() =>
        createMD3Theme({ primary: VALID_PRIMARY, tertiary: '#7D5260' }),
      ).not.toThrow();
    });

    it('accepts input with both secondary and tertiary', () => {
      expect(() =>
        createMD3Theme({
          primary: VALID_PRIMARY,
          secondary: '#006399',
          tertiary: '#7D5260',
        }),
      ).not.toThrow();
    });
  });

  describe('invalid hex handling', () => {
    beforeEach(() => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
      vi.unstubAllEnvs();
    });

    it('emits console.warn in DEV for invalid primary hex', () => {
      createMD3Theme({ primary: 'not-a-hex' });
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('[MD3]'),
      );
    });

    it('warn message identifies the invalid field as "primary"', () => {
      createMD3Theme({ primary: 'not-a-hex' });
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('"primary"'),
      );
    });

    it('uses M3 baseline fallback when primary hex is invalid', () => {
      const { light: withInvalid } = createMD3Theme({ primary: 'not-a-hex' });
      vi.restoreAllMocks();
      const { light: withBaseline } = createMD3Theme({
        primary: M3_BASELINE_PRIMARY,
      });
      expect(withInvalid['--md-sys-color-primary']).toBe(
        withBaseline['--md-sys-color-primary'],
      );
    });

    it('does not throw for invalid primary hex', () => {
      expect(() => createMD3Theme({ primary: 'not-a-hex' })).not.toThrow();
    });

    it('does not warn in production for invalid primary hex', () => {
      vi.stubEnv('NODE_ENV', 'production');
      createMD3Theme({ primary: 'not-a-hex' });
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('emits console.warn for invalid secondary hex', () => {
      createMD3Theme({ primary: VALID_PRIMARY, secondary: 'bad-hex' });
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('"secondary"'),
      );
    });

    it('emits console.warn for invalid tertiary hex', () => {
      createMD3Theme({ primary: VALID_PRIMARY, tertiary: 'bad-hex' });
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('"tertiary"'),
      );
    });

    it('does not warn for valid optional hex values', () => {
      createMD3Theme({
        primary: VALID_PRIMARY,
        secondary: '#006399',
        tertiary: '#7D5260',
      });
      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  describe('return value shape', () => {
    it('light scheme contains the primary token', () => {
      const { light } = createMD3Theme({ primary: VALID_PRIMARY });
      expect(light['--md-sys-color-primary']).toMatch(HEX_PATTERN);
    });

    it('dark scheme contains the primary token', () => {
      const { dark } = createMD3Theme({ primary: VALID_PRIMARY });
      expect(dark['--md-sys-color-primary']).toMatch(HEX_PATTERN);
    });

    it('all token values are strings (no library types leaked)', () => {
      const { light, dark } = createMD3Theme({ primary: VALID_PRIMARY });
      for (const value of [...Object.values(light), ...Object.values(dark)]) {
        expect(typeof value).toBe('string');
      }
    });
  });
});

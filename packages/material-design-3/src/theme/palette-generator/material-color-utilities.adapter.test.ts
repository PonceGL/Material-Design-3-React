import { describe, expect, it } from 'vitest';

import { MaterialColorUtilitiesAdapter } from './material-color-utilities.adapter';

const PRIMARY_HEX = '#6750a4';

describe('MaterialColorUtilitiesAdapter', () => {
  const adapter = new MaterialColorUtilitiesAdapter();

  describe('generate - light scheme', () => {
    it('returns an MD3Theme object for the light scheme', () => {
      const theme = adapter.generate({ primary: PRIMARY_HEX, scheme: 'light' });
      expect(theme).toBeDefined();
      expect(typeof theme).toBe('object');
    });

    it('produces a valid hex color for --md-sys-color-primary', () => {
      const theme = adapter.generate({ primary: PRIMARY_HEX, scheme: 'light' });
      expect(theme['--md-sys-color-primary']).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it('includes all 29 MD3 system color tokens', () => {
      const theme = adapter.generate({ primary: PRIMARY_HEX, scheme: 'light' });
      expect(Object.keys(theme)).toHaveLength(29);
    });

    it('all token values are valid hex colors', () => {
      const theme = adapter.generate({ primary: PRIMARY_HEX, scheme: 'light' });
      for (const value of Object.values(theme)) {
        expect(value).toMatch(/^#[0-9a-f]{6}$/i);
      }
    });
  });

  describe('generate - dark scheme', () => {
    it('returns an MD3Theme object for the dark scheme', () => {
      const theme = adapter.generate({ primary: PRIMARY_HEX, scheme: 'dark' });
      expect(theme).toBeDefined();
      expect(typeof theme).toBe('object');
    });

    it('produces a valid hex color for --md-sys-color-primary', () => {
      const theme = adapter.generate({ primary: PRIMARY_HEX, scheme: 'dark' });
      expect(theme['--md-sys-color-primary']).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it('includes all 29 MD3 system color tokens', () => {
      const theme = adapter.generate({ primary: PRIMARY_HEX, scheme: 'dark' });
      expect(Object.keys(theme)).toHaveLength(29);
    });

    it('all token values are valid hex colors', () => {
      const theme = adapter.generate({ primary: PRIMARY_HEX, scheme: 'dark' });
      for (const value of Object.values(theme)) {
        expect(value).toMatch(/^#[0-9a-f]{6}$/i);
      }
    });
  });

  it('light and dark schemes produce different primary colors', () => {
    const light = adapter.generate({ primary: PRIMARY_HEX, scheme: 'light' });
    const dark = adapter.generate({ primary: PRIMARY_HEX, scheme: 'dark' });
    expect(light['--md-sys-color-primary']).not.toBe(
      dark['--md-sys-color-primary'],
    );
  });

  it('adapter is the only consumer — does not leak library types in output', () => {
    const theme = adapter.generate({ primary: PRIMARY_HEX, scheme: 'light' });
    for (const value of Object.values(theme)) {
      expect(typeof value).toBe('string');
    }
  });
});

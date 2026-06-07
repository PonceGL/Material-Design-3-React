import { afterEach, describe, expect, it, vi } from 'vitest';

import { assertCSSTokensLoaded, detectOptionAConflict } from './validation';

function mockComputedPrimary(value: string) {
  return vi.spyOn(window, 'getComputedStyle').mockReturnValue({
    getPropertyValue: () => value,
  } as unknown as CSSStyleDeclaration);
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('assertCSSTokensLoaded', () => {
  it('logs error when --md-sys-color-primary is not set', () => {
    mockComputedPrimary('');
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    assertCSSTokensLoaded();
    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0]).toContain('@poncegl/material-design-3');
  });

  it('does not log error when --md-sys-color-primary is set', () => {
    mockComputedPrimary('#6750a4');
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    assertCSSTokensLoaded();
    expect(spy).not.toHaveBeenCalled();
  });

  it('does nothing in production', () => {
    vi.stubEnv('NODE_ENV', 'production');
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    assertCSSTokensLoaded();
    expect(spy).not.toHaveBeenCalled();
  });

  it('does nothing in SSR (window undefined)', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('window', undefined);
    assertCSSTokensLoaded();
    expect(spy).not.toHaveBeenCalled();
  });
});

describe('detectOptionAConflict', () => {
  it('warns when value differs from baseline (#6750a4)', () => {
    mockComputedPrimary('#custom-color');
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    detectOptionAConflict();
    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0]).toContain('@poncegl/material-design-3');
  });

  it('does not warn when value equals baseline (#6750a4)', () => {
    mockComputedPrimary('#6750a4');
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    detectOptionAConflict();
    expect(spy).not.toHaveBeenCalled();
  });

  it('does not warn when no CSS tokens are loaded (empty value)', () => {
    mockComputedPrimary('');
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    detectOptionAConflict();
    expect(spy).not.toHaveBeenCalled();
  });

  it('does nothing in production', () => {
    vi.stubEnv('NODE_ENV', 'production');
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    detectOptionAConflict();
    expect(spy).not.toHaveBeenCalled();
  });
});

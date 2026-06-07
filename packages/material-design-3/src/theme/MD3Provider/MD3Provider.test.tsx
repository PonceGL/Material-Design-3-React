import type { MD3ThemeResult } from '@/theme/create-md3-theme';
import { act, render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MD3Provider } from './MD3Provider';

const theme: MD3ThemeResult = {
  light: {
    '--md-sys-color-primary': '#6750A4',
    '--md-sys-color-on-primary': '#FFFFFF',
  },
  dark: {
    '--md-sys-color-primary': '#D0BCFF',
    '--md-sys-color-on-primary': '#381E72',
  },
};

type ChangeHandler = (e: MediaQueryListEvent) => void;

function setupMatchMedia(matchesDark: boolean) {
  const listeners: ChangeHandler[] = [];
  const mql = {
    matches: matchesDark,
    addEventListener: vi.fn((_: string, handler: ChangeHandler) => {
      listeners.push(handler);
    }),
    removeEventListener: vi.fn((_: string, handler: ChangeHandler) => {
      const index = listeners.indexOf(handler);
      if (index !== -1) listeners.splice(index, 1);
    }),
    dispatchChange(matches: boolean) {
      listeners.forEach((h) => h({ matches } as MediaQueryListEvent));
    },
  };

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn(() => mql),
  });

  return mql;
}

beforeEach(() => {
  document.documentElement.removeAttribute('style');
});

describe('MD3Provider', () => {
  it('renders children without adding DOM wrapper elements', () => {
    setupMatchMedia(false);

    const { container } = render(
      <MD3Provider theme={theme}>
        <span>hello</span>
      </MD3Provider>,
    );

    expect((container.firstChild as HTMLElement).tagName).toBe('SPAN');
  });

  it('applies theme.light tokens when colorScheme="light"', () => {
    render(
      <MD3Provider theme={theme} colorScheme="light">
        <div />
      </MD3Provider>,
    );

    expect(
      document.documentElement.style.getPropertyValue('--md-sys-color-primary'),
    ).toBe('#6750A4');
    expect(
      document.documentElement.style.getPropertyValue(
        '--md-sys-color-on-primary',
      ),
    ).toBe('#FFFFFF');
  });

  it('applies theme.dark tokens when colorScheme="dark"', () => {
    render(
      <MD3Provider theme={theme} colorScheme="dark">
        <div />
      </MD3Provider>,
    );

    expect(
      document.documentElement.style.getPropertyValue('--md-sys-color-primary'),
    ).toBe('#D0BCFF');
    expect(
      document.documentElement.style.getPropertyValue(
        '--md-sys-color-on-primary',
      ),
    ).toBe('#381E72');
  });

  it('applies light tokens when colorScheme="system" and system prefers light', () => {
    setupMatchMedia(false);

    render(
      <MD3Provider theme={theme} colorScheme="system">
        <div />
      </MD3Provider>,
    );

    expect(
      document.documentElement.style.getPropertyValue('--md-sys-color-primary'),
    ).toBe('#6750A4');
  });

  it('applies dark tokens when colorScheme="system" and system prefers dark', () => {
    setupMatchMedia(true);

    render(
      <MD3Provider theme={theme} colorScheme="system">
        <div />
      </MD3Provider>,
    );

    expect(
      document.documentElement.style.getPropertyValue('--md-sys-color-primary'),
    ).toBe('#D0BCFF');
  });

  it('updates tokens when system color scheme changes from light to dark', () => {
    const mql = setupMatchMedia(false);

    render(
      <MD3Provider theme={theme} colorScheme="system">
        <div />
      </MD3Provider>,
    );

    expect(
      document.documentElement.style.getPropertyValue('--md-sys-color-primary'),
    ).toBe('#6750A4');

    act(() => {
      mql.dispatchChange(true);
    });

    expect(
      document.documentElement.style.getPropertyValue('--md-sys-color-primary'),
    ).toBe('#D0BCFF');
  });

  it('removes tokens from DOM on unmount', () => {
    render(
      <MD3Provider theme={theme} colorScheme="light">
        <div />
      </MD3Provider>,
    ).unmount();

    expect(
      document.documentElement.style.getPropertyValue('--md-sys-color-primary'),
    ).toBe('');
    expect(
      document.documentElement.style.getPropertyValue(
        '--md-sys-color-on-primary',
      ),
    ).toBe('');
  });

  it('removes matchMedia listener on unmount', () => {
    const mql = setupMatchMedia(false);

    render(
      <MD3Provider theme={theme} colorScheme="system">
        <div />
      </MD3Provider>,
    ).unmount();

    expect(mql.removeEventListener).toHaveBeenCalledOnce();
  });

  it('updates tokens in DOM when theme prop changes', () => {
    const newTheme: MD3ThemeResult = {
      light: {
        '--md-sys-color-primary': '#0066CC',
        '--md-sys-color-on-primary': '#FFFFFF',
      },
      dark: {
        '--md-sys-color-primary': '#99C3FF',
        '--md-sys-color-on-primary': '#003063',
      },
    };

    const { rerender } = render(
      <MD3Provider theme={theme} colorScheme="light">
        <div />
      </MD3Provider>,
    );

    expect(
      document.documentElement.style.getPropertyValue('--md-sys-color-primary'),
    ).toBe('#6750A4');

    rerender(
      <MD3Provider theme={newTheme} colorScheme="light">
        <div />
      </MD3Provider>,
    );

    expect(
      document.documentElement.style.getPropertyValue('--md-sys-color-primary'),
    ).toBe('#0066CC');
  });
});

import { act, renderHook } from '@testing-library/react';

import { useNavigationRail } from './useNavigationRail';

describe('useNavigationRail — Initial state', () => {
  it('defaults to "collapsed"', () => {
    const { result } = renderHook(() => useNavigationRail());
    expect(result.current.variant).toBe('collapsed');
  });

  it('honors a custom initialVariant', () => {
    const { result } = renderHook(() => useNavigationRail('expanded'));
    expect(result.current.variant).toBe('expanded');
  });
});

describe('useNavigationRail — expand/collapse/toggle', () => {
  it('expand() sets variant to "expanded"', () => {
    const { result } = renderHook(() => useNavigationRail());
    act(() => result.current.expand());
    expect(result.current.variant).toBe('expanded');
  });

  it('collapse() sets variant to "collapsed"', () => {
    const { result } = renderHook(() => useNavigationRail('expanded'));
    act(() => result.current.collapse());
    expect(result.current.variant).toBe('collapsed');
  });

  it('toggle() flips between collapsed and expanded', () => {
    const { result } = renderHook(() => useNavigationRail());
    expect(result.current.variant).toBe('collapsed');

    act(() => result.current.toggle());
    expect(result.current.variant).toBe('expanded');

    act(() => result.current.toggle());
    expect(result.current.variant).toBe('collapsed');
  });
});

describe('useNavigationRail — Stable identity', () => {
  it('keeps expand/collapse/toggle referentially stable across re-renders', () => {
    const { result, rerender } = renderHook(() => useNavigationRail());
    const first = {
      expand: result.current.expand,
      collapse: result.current.collapse,
      toggle: result.current.toggle,
    };

    rerender();

    expect(result.current.expand).toBe(first.expand);
    expect(result.current.collapse).toBe(first.collapse);
    expect(result.current.toggle).toBe(first.toggle);
  });

  it('keeps expand/collapse/toggle stable even after variant changes', () => {
    const { result } = renderHook(() => useNavigationRail());
    const first = {
      expand: result.current.expand,
      collapse: result.current.collapse,
      toggle: result.current.toggle,
    };

    act(() => result.current.expand());

    expect(result.current.expand).toBe(first.expand);
    expect(result.current.collapse).toBe(first.collapse);
    expect(result.current.toggle).toBe(first.toggle);
  });
});

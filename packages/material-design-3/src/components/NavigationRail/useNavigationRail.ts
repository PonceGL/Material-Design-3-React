import { useCallback, useState } from 'react';

import type {
  NavigationRailVariant,
  UseNavigationRailReturn,
} from './NavigationRail.types';

/**
 * Controlled-state helper for `NavigationRail`.
 *
 * Owns the `collapsed`/`expanded` state and returns it alongside
 * `expand`/`collapse`/`toggle` helpers. Pass `variant={rail.variant}` to
 * `NavigationRail` to wire it up — this is the recommended way to drive a
 * rail from outside its own subtree without using `ref`.
 *
 * @param initialVariant - Starting variant. Defaults to `'collapsed'`.
 *
 * @example
 * ```tsx
 * const rail = useNavigationRail();
 *
 * <NavigationRail aria-label="Main" variant={rail.variant} menu={<MenuToggle onClick={rail.toggle} />}>
 *   <NavigationRailItem icon={<HomeIcon />} label="Home" selected onClick={() => {}} />
 * </NavigationRail>
 * ```
 */
export function useNavigationRail(
  initialVariant: NavigationRailVariant = 'collapsed',
): UseNavigationRailReturn {
  const [variant, setVariant] = useState<NavigationRailVariant>(initialVariant);

  const expand = useCallback(() => setVariant('expanded'), []);
  const collapse = useCallback(() => setVariant('collapsed'), []);
  const toggle = useCallback(
    () =>
      setVariant((current) =>
        current === 'collapsed' ? 'expanded' : 'collapsed',
      ),
    [],
  );

  return { variant, expand, collapse, toggle };
}

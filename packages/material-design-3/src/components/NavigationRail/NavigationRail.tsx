import { useCallback, useImperativeHandle, useState } from 'react';

import { cn } from '@/lib/cn';

import './NavigationRail.css';
import type {
  NavigationRailProps,
  NavigationRailVariant,
} from './NavigationRail.types';

const base = 'md3-navigation-rail';

const containerVariantClasses = {
  standard: 'bg-md-surface shadow-md-elevation-0',
  modal: 'bg-md-surface-container shadow-md-elevation-2',
};

/**
 * Material Design 3 navigation rail.
 *
 * Vertical navigation container anchored to the leading edge of the
 * window, for `medium`/`expanded`/`large`/`extra-large` breakpoints
 * (tablets/desktop). Renders 3-7 `NavigationRailItem` destinations as
 * `children`, plus optional `menu` and `fab` slots — the consumer decides
 * what to render in them (e.g. an `IconButton` to toggle the variant) and
 * owns their logic.
 *
 * Supports controlled (`variant`/`onVariantChange`) and non-controlled
 * (`defaultVariant` + `ref`) usage. `aria-label` has no default — always
 * provide one, since `<nav>` has no visible label of its own.
 *
 * Layout has no React Context: `NavigationRailItem` reads the resolved
 * `data-variant`/`data-modal` reflected on this `<nav>` and adapts its
 * own layout purely via CSS (same pattern as `ButtonGroup`/`ToggleButton`).
 *
 * @example Non-controlled, driven by `ref`
 * ```tsx
 * const railRef = useRef<NavigationRailHandle>(null);
 *
 * <NavigationRail
 *   ref={railRef}
 *   aria-label="Main"
 *   menu={
 *     <IconButton
 *       icon={<MenuIcon />}
 *       aria-label="Toggle navigation"
 *       onClick={() => railRef.current?.toggle()}
 *     />
 *   }
 * >
 *   <NavigationRailItem icon={<HomeIcon />} label="Home" selected onClick={() => {}} />
 * </NavigationRail>
 * ```
 *
 * @example Controlled, via `useNavigationRail()`
 * ```tsx
 * const rail = useNavigationRail();
 *
 * <NavigationRail
 *   aria-label="Main"
 *   variant={rail.variant}
 *   menu={
 *     <IconButton
 *       icon={<MenuIcon />}
 *       aria-label="Toggle navigation"
 *       onClick={rail.toggle}
 *     />
 *   }
 * >
 *   <NavigationRailItem icon={<HomeIcon />} label="Home" selected onClick={() => {}} />
 * </NavigationRail>
 * ```
 */
export function NavigationRail({
  testId,
  variant: controlledVariant,
  defaultVariant = 'collapsed',
  onVariantChange,
  modal = false,
  menu,
  fab,
  ref,
  children,
  className,
  ...rest
}: NavigationRailProps) {
  const [uncontrolledVariant, setUncontrolledVariant] =
    useState<NavigationRailVariant>(defaultVariant);
  const variant = controlledVariant ?? uncontrolledVariant;
  const isModalExpanded = modal && variant === 'expanded';

  const setVariant = useCallback(
    (next: NavigationRailVariant) => {
      if (controlledVariant === undefined) {
        setUncontrolledVariant(next);
      }
      onVariantChange?.(next);
    },
    [controlledVariant, onVariantChange],
  );

  useImperativeHandle(
    ref,
    () => ({
      variant,
      expand: () => setVariant('expanded'),
      collapse: () => setVariant('collapsed'),
      toggle: () =>
        setVariant(variant === 'collapsed' ? 'expanded' : 'collapsed'),
    }),
    [variant, setVariant],
  );

  return (
    <nav
      data-testid={testId}
      data-variant={variant}
      data-modal={isModalExpanded ? true : undefined}
      className={cn(
        base,
        containerVariantClasses[isModalExpanded ? 'modal' : 'standard'],
        className,
      )}
      {...rest}
    >
      {(menu || fab) && (
        <div className="md3-navigation-rail__header">
          {menu}
          {fab}
        </div>
      )}
      <div className="md3-navigation-rail__items">{children}</div>
    </nav>
  );
}

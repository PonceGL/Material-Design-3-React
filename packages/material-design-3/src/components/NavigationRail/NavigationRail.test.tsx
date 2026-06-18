import { createRef } from 'react';

import { act, render, screen } from '@testing-library/react';
import axe from 'axe-core';

import { NavigationRail } from './NavigationRail';
import type { NavigationRailHandle } from './NavigationRail.types';
import { NavigationRailItem } from './NavigationRailItem';

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('NavigationRail — Rendering', () => {
  it('renders children inside the items container', () => {
    render(
      <NavigationRail aria-label="Main">
        <NavigationRailItem
          icon={<svg aria-hidden="true" />}
          label="Home"
          selected
          onClick={() => {}}
        />
      </NavigationRail>,
    );
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
  });

  it('applies the md3-navigation-rail base class to the root <nav>', () => {
    render(<NavigationRail aria-label="Main">{null}</NavigationRail>);
    expect(screen.getByRole('navigation')).toHaveClass('md3-navigation-rail');
  });

  it('defaults to the collapsed variant', () => {
    render(<NavigationRail aria-label="Main">{null}</NavigationRail>);
    expect(screen.getByRole('navigation')).toHaveAttribute(
      'data-variant',
      'collapsed',
    );
  });

  it('honors a custom defaultVariant', () => {
    render(
      <NavigationRail aria-label="Main" defaultVariant="expanded">
        {null}
      </NavigationRail>,
    );
    expect(screen.getByRole('navigation')).toHaveAttribute(
      'data-variant',
      'expanded',
    );
  });
});

// ─── data-modal ───────────────────────────────────────────────────────────────

describe('NavigationRail — data-modal', () => {
  it('omits data-modal when collapsed, even with modal=true', () => {
    render(
      <NavigationRail aria-label="Main" modal defaultVariant="collapsed">
        {null}
      </NavigationRail>,
    );
    expect(screen.getByRole('navigation')).not.toHaveAttribute('data-modal');
  });

  it('omits data-modal when expanded without modal', () => {
    render(
      <NavigationRail aria-label="Main" defaultVariant="expanded">
        {null}
      </NavigationRail>,
    );
    expect(screen.getByRole('navigation')).not.toHaveAttribute('data-modal');
  });

  it('sets data-modal="true" when expanded and modal=true', () => {
    render(
      <NavigationRail aria-label="Main" modal defaultVariant="expanded">
        {null}
      </NavigationRail>,
    );
    expect(screen.getByRole('navigation')).toHaveAttribute(
      'data-modal',
      'true',
    );
  });
});

// ─── menu/fab slots ─────────────────────────────────────────────────────────────

describe('NavigationRail — menu/fab slots', () => {
  it('does not render a header when neither menu nor fab is provided', () => {
    const { container } = render(
      <NavigationRail aria-label="Main">{null}</NavigationRail>,
    );
    expect(
      container.querySelector('.md3-navigation-rail__header'),
    ).not.toBeInTheDocument();
  });

  it('renders the menu slot inside the header', () => {
    render(
      <NavigationRail aria-label="Main" menu={<button>Toggle</button>}>
        {null}
      </NavigationRail>,
    );
    expect(screen.getByRole('button', { name: 'Toggle' })).toBeInTheDocument();
  });

  it('renders the fab slot inside the header', () => {
    render(
      <NavigationRail aria-label="Main" fab={<button>Compose</button>}>
        {null}
      </NavigationRail>,
    );
    expect(screen.getByRole('button', { name: 'Compose' })).toBeInTheDocument();
  });

  it('renders both menu and fab together', () => {
    render(
      <NavigationRail
        aria-label="Main"
        menu={<button>Toggle</button>}
        fab={<button>Compose</button>}
      >
        {null}
      </NavigationRail>,
    );
    expect(screen.getByRole('button', { name: 'Toggle' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Compose' })).toBeInTheDocument();
  });
});

// ─── Controlled vs. non-controlled ──────────────────────────────────────────────

describe('NavigationRail — Controlled vs. non-controlled', () => {
  it('the variant prop overrides defaultVariant (controlled)', () => {
    render(
      <NavigationRail
        aria-label="Main"
        variant="expanded"
        defaultVariant="collapsed"
      >
        {null}
      </NavigationRail>,
    );
    expect(screen.getByRole('navigation')).toHaveAttribute(
      'data-variant',
      'expanded',
    );
  });

  it('ref.expand()/collapse()/toggle() update data-variant when non-controlled', () => {
    const ref = createRef<NavigationRailHandle>();
    render(
      <NavigationRail aria-label="Main" ref={ref}>
        {null}
      </NavigationRail>,
    );
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('data-variant', 'collapsed');

    act(() => ref.current?.expand());
    expect(nav).toHaveAttribute('data-variant', 'expanded');

    act(() => ref.current?.collapse());
    expect(nav).toHaveAttribute('data-variant', 'collapsed');

    act(() => ref.current?.toggle());
    expect(nav).toHaveAttribute('data-variant', 'expanded');

    act(() => ref.current?.toggle());
    expect(nav).toHaveAttribute('data-variant', 'collapsed');
  });

  it('onVariantChange fires on ref calls when non-controlled', () => {
    const onVariantChange = vi.fn();
    const ref = createRef<NavigationRailHandle>();
    render(
      <NavigationRail
        aria-label="Main"
        ref={ref}
        onVariantChange={onVariantChange}
      >
        {null}
      </NavigationRail>,
    );

    act(() => ref.current?.expand());
    expect(onVariantChange).toHaveBeenCalledWith('expanded');
  });

  it('onVariantChange fires but data-variant stays put when controlled', () => {
    const onVariantChange = vi.fn();
    const ref = createRef<NavigationRailHandle>();
    render(
      <NavigationRail
        aria-label="Main"
        ref={ref}
        variant="collapsed"
        onVariantChange={onVariantChange}
      >
        {null}
      </NavigationRail>,
    );
    const nav = screen.getByRole('navigation');

    act(() => ref.current?.expand());
    expect(onVariantChange).toHaveBeenCalledWith('expanded');
    expect(nav).toHaveAttribute('data-variant', 'collapsed');
  });

  it('ref.current.variant reflects the current value', () => {
    const ref = createRef<NavigationRailHandle>();
    render(
      <NavigationRail aria-label="Main" ref={ref}>
        {null}
      </NavigationRail>,
    );
    expect(ref.current?.variant).toBe('collapsed');
    act(() => ref.current?.expand());
    expect(ref.current?.variant).toBe('expanded');
  });
});

// ─── Props ────────────────────────────────────────────────────────────────────

describe('NavigationRail — Props', () => {
  it('forwards testId as data-testid on the root element', () => {
    render(
      <NavigationRail aria-label="Main" testId="my-rail">
        {null}
      </NavigationRail>,
    );
    const root = screen.getByTestId('my-rail');
    expect(root).toBeInTheDocument();
    expect(root.tagName).toBe('NAV');
  });

  it('forwards aria-label', () => {
    render(<NavigationRail aria-label="Main">{null}</NavigationRail>);
    expect(
      screen.getByRole('navigation', { name: 'Main' }),
    ).toBeInTheDocument();
  });

  it('merges consumer className without breaking the base class', () => {
    render(
      <NavigationRail aria-label="Main" className="custom-class">
        {null}
      </NavigationRail>,
    );
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('custom-class');
    expect(nav).toHaveClass('md3-navigation-rail');
  });

  it('passes arbitrary HTML attributes to the root element', () => {
    render(
      <NavigationRail aria-label="Main" data-analytics="rail">
        {null}
      </NavigationRail>,
    );
    expect(screen.getByRole('navigation')).toHaveAttribute(
      'data-analytics',
      'rail',
    );
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('NavigationRail — Accessibility', () => {
  it('has no axe violations — collapsed', async () => {
    const { container } = render(
      <NavigationRail aria-label="Main">
        <NavigationRailItem
          icon={<svg aria-hidden="true" />}
          label="Home"
          selected
          onClick={() => {}}
        />
        <NavigationRailItem
          icon={<svg aria-hidden="true" />}
          label="Search"
          selected={false}
          onClick={() => {}}
        />
      </NavigationRail>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — expanded', async () => {
    const { container } = render(
      <NavigationRail aria-label="Main" defaultVariant="expanded">
        <NavigationRailItem
          icon={<svg aria-hidden="true" />}
          label="Home"
          selected
          onClick={() => {}}
        />
      </NavigationRail>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — expanded + modal', async () => {
    const { container } = render(
      <NavigationRail aria-label="Main" modal defaultVariant="expanded">
        <NavigationRailItem
          icon={<svg aria-hidden="true" />}
          label="Home"
          selected
          onClick={() => {}}
        />
      </NavigationRail>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

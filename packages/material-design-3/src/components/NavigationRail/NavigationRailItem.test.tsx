import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';

import { NavigationRail } from './NavigationRail';
import { NavigationRailItem } from './NavigationRailItem';

const Icon = () => <svg aria-hidden="true" data-testid="icon" />;
const ActiveIcon = () => <svg aria-hidden="true" data-testid="active-icon" />;

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('NavigationRailItem — Rendering', () => {
  it('renders the icon and label', () => {
    render(
      <NavigationRailItem
        icon={<Icon />}
        label="Home"
        selected={false}
        onClick={() => {}}
      />,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders a native button', () => {
    render(
      <NavigationRailItem
        icon={<Icon />}
        label="Home"
        selected={false}
        onClick={() => {}}
      />,
    );
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
  });

  it('applies the md3-navigation-rail-item base class', () => {
    render(
      <NavigationRailItem
        icon={<Icon />}
        label="Home"
        selected={false}
        onClick={() => {}}
      />,
    );
    expect(screen.getByRole('button')).toHaveClass('md3-navigation-rail-item');
  });
});

// ─── Selected state ───────────────────────────────────────────────────────────

describe('NavigationRailItem — Selected state', () => {
  it('sets aria-current="page" when selected', () => {
    render(
      <NavigationRailItem
        icon={<Icon />}
        label="Home"
        selected
        onClick={() => {}}
      />,
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-current', 'page');
  });

  it('omits aria-current when not selected', () => {
    render(
      <NavigationRailItem
        icon={<Icon />}
        label="Home"
        selected={false}
        onClick={() => {}}
      />,
    );
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-current');
  });

  it('swaps to activeIcon when selected and activeIcon is provided', () => {
    render(
      <NavigationRailItem
        icon={<Icon />}
        activeIcon={<ActiveIcon />}
        label="Home"
        selected
        onClick={() => {}}
      />,
    );
    expect(screen.getByTestId('active-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('falls back to icon when selected but activeIcon is not provided', () => {
    render(
      <NavigationRailItem
        icon={<Icon />}
        label="Home"
        selected
        onClick={() => {}}
      />,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders icon (not activeIcon) when not selected', () => {
    render(
      <NavigationRailItem
        icon={<Icon />}
        activeIcon={<ActiveIcon />}
        label="Home"
        selected={false}
        onClick={() => {}}
      />,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.queryByTestId('active-icon')).not.toBeInTheDocument();
  });
});

// ─── Layout integration (driven by the parent NavigationRail) ──────────────────

describe('NavigationRailItem — Layout integration', () => {
  it('is rendered under a collapsed NavigationRail by default', () => {
    const { container } = render(
      <NavigationRail aria-label="Main">
        <NavigationRailItem
          icon={<Icon />}
          label="Home"
          selected
          onClick={() => {}}
        />
      </NavigationRail>,
    );
    expect(
      container.querySelector(
        'nav[data-variant="collapsed"] .md3-navigation-rail-item',
      ),
    ).toBeInTheDocument();
  });

  it('is rendered under an expanded NavigationRail when variant="expanded"', () => {
    const { container } = render(
      <NavigationRail aria-label="Main" variant="expanded">
        <NavigationRailItem
          icon={<Icon />}
          label="Home"
          selected
          onClick={() => {}}
        />
      </NavigationRail>,
    );
    expect(
      container.querySelector(
        'nav[data-variant="expanded"] .md3-navigation-rail-item',
      ),
    ).toBeInTheDocument();
  });
});

// ─── Props ────────────────────────────────────────────────────────────────────

describe('NavigationRailItem — Props', () => {
  it('calls onClick when activated', async () => {
    const onClick = vi.fn();
    render(
      <NavigationRailItem
        icon={<Icon />}
        label="Home"
        selected={false}
        onClick={onClick}
      />,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn();
    render(
      <NavigationRailItem
        icon={<Icon />}
        label="Home"
        selected={false}
        onClick={onClick}
        disabled
      />,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('forwards testId as data-testid on the root element', () => {
    render(
      <NavigationRailItem
        icon={<Icon />}
        label="Home"
        selected={false}
        onClick={() => {}}
        testId="my-item"
      />,
    );
    const root = screen.getByTestId('my-item');
    expect(root).toBeInTheDocument();
    expect(root.tagName).toBe('BUTTON');
  });

  it('merges consumer className without breaking the base class', () => {
    render(
      <NavigationRailItem
        icon={<Icon />}
        label="Home"
        selected={false}
        onClick={() => {}}
        className="custom-class"
      />,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('md3-navigation-rail-item');
  });

  it('passes arbitrary HTML attributes to the root element', () => {
    render(
      <NavigationRailItem
        icon={<Icon />}
        label="Home"
        selected={false}
        onClick={() => {}}
        data-analytics="nav-item"
      />,
    );
    expect(screen.getByRole('button')).toHaveAttribute(
      'data-analytics',
      'nav-item',
    );
  });
});

// ─── Optimization for long lists ────────────────────────────────────────────────

describe('NavigationRailItem — Optimization for long lists', () => {
  it('is wrapped in React.memo', () => {
    // React.memo() returns an object tagged with this symbol (same check
    // the `react-is` package uses internally) — a deeply nested child
    // can't reliably prove "did the parent's function run" from the
    // outside: a child whose own props stay referentially stable across
    // renders (a requirement for the parent's memo to bail in the first
    // place) gets its own independent React bailout regardless of
    // whether the parent actually re-executed. Asserting the memo
    // wrapper directly is the reliable signal for this criterion.
    expect(
      (NavigationRailItem as unknown as { $$typeof: symbol }).$$typeof,
    ).toBe(Symbol.for('react.memo'));
  });

  it('updates only the previously selected and newly selected items when toggling selection in a long list', () => {
    const ITEM_COUNT = 50;
    const noop = Array.from({ length: ITEM_COUNT }, () => () => {});

    function Harness({ selectedIndex }: { selectedIndex: number }) {
      return (
        <NavigationRail aria-label="Main">
          {Array.from({ length: ITEM_COUNT }, (_, index) => (
            <NavigationRailItem
              key={index}
              icon={<svg aria-hidden="true" />}
              label={`Item ${index}`}
              selected={index === selectedIndex}
              onClick={noop[index]}
            />
          ))}
        </NavigationRail>
      );
    }

    const { rerender } = render(<Harness selectedIndex={0} />);
    const items = screen.getAllByRole('button');
    expect(items[0]).toHaveAttribute('aria-current', 'page');

    rerender(<Harness selectedIndex={1} />);

    expect(items[0]).not.toHaveAttribute('aria-current');
    expect(items[1]).toHaveAttribute('aria-current', 'page');
    for (let index = 2; index < ITEM_COUNT; index += 1) {
      expect(items[index]).not.toHaveAttribute('aria-current');
    }
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('NavigationRailItem — Accessibility', () => {
  it.each([
    { selected: true, variant: 'collapsed' as const },
    { selected: false, variant: 'collapsed' as const },
    { selected: true, variant: 'expanded' as const },
    { selected: false, variant: 'expanded' as const },
  ])(
    'has no axe violations — selected=$selected, variant=$variant',
    async ({ selected, variant }) => {
      const { container } = render(
        <NavigationRail aria-label="Main" variant={variant}>
          <NavigationRailItem
            icon={<Icon />}
            label="Home"
            selected={selected}
            onClick={() => {}}
          />
        </NavigationRail>,
      );
      const results = await axe.run(container);
      expect(results.violations).toHaveLength(0);
    },
  );
});

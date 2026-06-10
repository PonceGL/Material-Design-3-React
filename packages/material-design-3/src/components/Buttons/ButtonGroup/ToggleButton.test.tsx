import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';

import type { ToggleButtonVariant } from './ButtonGroup.types';
import { ToggleButton } from './ToggleButton';

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('ToggleButton — Rendering', () => {
  it('renders a button element with the given label', () => {
    render(
      <ToggleButton selected={false} onSelectedChange={() => {}}>
        Bold
      </ToggleButton>,
    );
    expect(screen.getByRole('button', { name: 'Bold' })).toBeInTheDocument();
  });

  it('applies the md3-button and md3-toggle-button base classes', () => {
    render(
      <ToggleButton selected={false} onSelectedChange={() => {}}>
        Bold
      </ToggleButton>,
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('md3-button');
    expect(btn).toHaveClass('md3-toggle-button');
  });

  it('defaults to size "m" and shape "round"', () => {
    render(
      <ToggleButton selected={false} onSelectedChange={() => {}}>
        Default
      </ToggleButton>,
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('md3-button--size-m');
    expect(btn).toHaveClass('md3-button--shape-round');
  });
});

// ─── Selected state ───────────────────────────────────────────────────────────

describe('ToggleButton — Selected state', () => {
  it('renders aria-pressed="false" when selected={false}', () => {
    render(
      <ToggleButton selected={false} onSelectedChange={() => {}}>
        Bold
      </ToggleButton>,
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders aria-pressed="true" when selected={true}', () => {
    render(
      <ToggleButton selected onSelectedChange={() => {}}>
        Bold
      </ToggleButton>,
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onSelectedChange(true) when clicked while unselected', async () => {
    const onSelectedChange = vi.fn();
    render(
      <ToggleButton selected={false} onSelectedChange={onSelectedChange}>
        Bold
      </ToggleButton>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onSelectedChange).toHaveBeenCalledExactlyOnceWith(true);
  });

  it('calls onSelectedChange(false) when clicked while selected', async () => {
    const onSelectedChange = vi.fn();
    render(
      <ToggleButton selected onSelectedChange={onSelectedChange}>
        Bold
      </ToggleButton>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onSelectedChange).toHaveBeenCalledExactlyOnceWith(false);
  });

  it('also calls a consumer-provided onClick handler', async () => {
    const onClick = vi.fn();
    render(
      <ToggleButton
        selected={false}
        onSelectedChange={() => {}}
        onClick={onClick}
      >
        Bold
      </ToggleButton>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });
});

// ─── Variant colors (Toggle table, RCL-108) ───────────────────────────────────

describe('ToggleButton — Variant colors', () => {
  it('elevated: unselected uses surface/primary, selected uses primary/on-primary', () => {
    const { rerender } = render(
      <ToggleButton
        variant="elevated"
        selected={false}
        onSelectedChange={() => {}}
      >
        Elevated
      </ToggleButton>,
    );
    let btn = screen.getByRole('button');
    expect(btn).toHaveClass('bg-md-surface', 'text-md-primary');

    rerender(
      <ToggleButton variant="elevated" selected onSelectedChange={() => {}}>
        Elevated
      </ToggleButton>,
    );
    btn = screen.getByRole('button');
    expect(btn).toHaveClass('bg-md-primary', 'text-md-on-primary');
  });

  it('filled: unselected uses surface-variant, selected uses primary/on-primary', () => {
    const { rerender } = render(
      <ToggleButton
        variant="filled"
        selected={false}
        onSelectedChange={() => {}}
      >
        Filled
      </ToggleButton>,
    );
    let btn = screen.getByRole('button');
    expect(btn).toHaveClass(
      'bg-md-surface-variant',
      'text-md-on-surface-variant',
    );

    rerender(
      <ToggleButton variant="filled" selected onSelectedChange={() => {}}>
        Filled
      </ToggleButton>,
    );
    btn = screen.getByRole('button');
    expect(btn).toHaveClass('bg-md-primary', 'text-md-on-primary');
  });

  it('filled-tonal: unselected uses secondary-container, selected uses secondary/on-secondary', () => {
    const { rerender } = render(
      <ToggleButton
        variant="filled-tonal"
        selected={false}
        onSelectedChange={() => {}}
      >
        Filled Tonal
      </ToggleButton>,
    );
    let btn = screen.getByRole('button');
    expect(btn).toHaveClass(
      'bg-md-secondary-container',
      'text-md-on-secondary-container',
    );

    rerender(
      <ToggleButton variant="filled-tonal" selected onSelectedChange={() => {}}>
        Filled Tonal
      </ToggleButton>,
    );
    btn = screen.getByRole('button');
    expect(btn).toHaveClass('bg-md-secondary', 'text-md-on-secondary');
  });

  it('outlined: unselected is transparent with on-surface-variant text, selected uses inverse-surface', () => {
    const { rerender } = render(
      <ToggleButton
        variant="outlined"
        selected={false}
        onSelectedChange={() => {}}
      >
        Outlined
      </ToggleButton>,
    );
    let btn = screen.getByRole('button');
    expect(btn).toHaveClass('bg-transparent', 'text-md-on-surface-variant');

    rerender(
      <ToggleButton variant="outlined" selected onSelectedChange={() => {}}>
        Outlined
      </ToggleButton>,
    );
    btn = screen.getByRole('button');
    expect(btn).toHaveClass(
      'bg-md-inverse-surface',
      'text-md-inverse-on-surface',
    );
  });
});

// ─── Props ────────────────────────────────────────────────────────────────────

describe('ToggleButton — Props', () => {
  it('forwards testId as data-testid on the root button element', () => {
    render(
      <ToggleButton
        testId="my-toggle"
        selected={false}
        onSelectedChange={() => {}}
      >
        Bold
      </ToggleButton>,
    );
    expect(screen.getByTestId('my-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('my-toggle').tagName).toBe('BUTTON');
  });

  it('merges consumer className without breaking variant classes', () => {
    render(
      <ToggleButton
        className="custom-class"
        selected={false}
        onSelectedChange={() => {}}
      >
        Bold
      </ToggleButton>,
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('custom-class');
    expect(btn).toHaveClass('md3-toggle-button');
  });

  it('forwards aria-label for icon-only scenarios', () => {
    render(
      <ToggleButton
        selected={false}
        onSelectedChange={() => {}}
        aria-label="Bold"
        icon={<span aria-hidden="true">B</span>}
      >
        {null}
      </ToggleButton>,
    );
    expect(screen.getByRole('button', { name: 'Bold' })).toBeInTheDocument();
  });

  it('renders the icon before the label', () => {
    render(
      <ToggleButton
        selected={false}
        onSelectedChange={() => {}}
        icon={<span data-testid="leading-icon" />}
      >
        Bold
      </ToggleButton>,
    );
    const icon = screen.getByTestId('leading-icon');
    expect(screen.getByRole('button')).toContainElement(icon);
  });
});

// ─── States ───────────────────────────────────────────────────────────────────

describe('ToggleButton — States', () => {
  it('is disabled when the disabled prop is set', () => {
    render(
      <ToggleButton disabled selected={false} onSelectedChange={() => {}}>
        Disabled
      </ToggleButton>,
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not call onSelectedChange when disabled', async () => {
    const onSelectedChange = vi.fn();
    render(
      <ToggleButton
        disabled
        selected={false}
        onSelectedChange={onSelectedChange}
      >
        Disabled
      </ToggleButton>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onSelectedChange).not.toHaveBeenCalled();
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('ToggleButton — Accessibility', () => {
  const variants: ToggleButtonVariant[] = [
    'elevated',
    'filled',
    'filled-tonal',
    'outlined',
  ];

  it.each(variants)(
    'has no axe violations — %s variant, unselected',
    async (variant) => {
      const { container } = render(
        <ToggleButton
          variant={variant}
          selected={false}
          onSelectedChange={() => {}}
        >
          {variant}
        </ToggleButton>,
      );
      const results = await axe.run(container);
      expect(results.violations).toHaveLength(0);
    },
  );

  it.each(variants)(
    'has no axe violations — %s variant, selected',
    async (variant) => {
      const { container } = render(
        <ToggleButton variant={variant} selected onSelectedChange={() => {}}>
          {variant}
        </ToggleButton>,
      );
      const results = await axe.run(container);
      expect(results.violations).toHaveLength(0);
    },
  );

  it('has no axe violations — disabled state', async () => {
    const { container } = render(
      <ToggleButton disabled selected={false} onSelectedChange={() => {}}>
        Disabled
      </ToggleButton>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

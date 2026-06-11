import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';

import type { IconButtonVariant } from './IconButton.types';
import { ToggleIconButton } from './ToggleIconButton';

const Icon = () => <span data-testid="icon">○</span>;
const CheckedIcon = () => <span data-testid="checked-icon">●</span>;

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('ToggleIconButton — Rendering', () => {
  it('renders a button element with the given icon', () => {
    render(
      <ToggleIconButton
        icon={<Icon />}
        checked={false}
        onCheckedChange={() => {}}
        aria-label="Favorito"
      />,
    );
    const btn = screen.getByRole('button', { name: 'Favorito' });
    expect(btn).toBeInTheDocument();
    expect(btn).toContainElement(screen.getByTestId('icon'));
  });

  it('applies the md3-icon-button and md3-toggle-icon-button base classes', () => {
    render(
      <ToggleIconButton
        icon={<Icon />}
        checked={false}
        onCheckedChange={() => {}}
        aria-label="Favorito"
      />,
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('md3-icon-button');
    expect(btn).toHaveClass('md3-toggle-icon-button');
  });

  it('defaults to size "m" and shape "round"', () => {
    render(
      <ToggleIconButton
        icon={<Icon />}
        checked={false}
        onCheckedChange={() => {}}
        aria-label="Favorito"
      />,
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('md3-icon-button--size-m');
    expect(btn).toHaveClass('md3-button--shape-round');
  });
});

// ─── Checked state ────────────────────────────────────────────────────────────

describe('ToggleIconButton — Checked state', () => {
  it('renders aria-pressed="false" when checked={false}', () => {
    render(
      <ToggleIconButton
        icon={<Icon />}
        checked={false}
        onCheckedChange={() => {}}
        aria-label="Favorito"
      />,
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders aria-pressed="true" when checked={true}', () => {
    render(
      <ToggleIconButton
        icon={<Icon />}
        checked
        onCheckedChange={() => {}}
        aria-label="Favorito"
      />,
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders the icon (not checkedIcon) when checked={false}', () => {
    render(
      <ToggleIconButton
        icon={<Icon />}
        checkedIcon={<CheckedIcon />}
        checked={false}
        onCheckedChange={() => {}}
        aria-label="Favorito"
      />,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.queryByTestId('checked-icon')).not.toBeInTheDocument();
  });

  it('renders checkedIcon when checked={true} and checkedIcon is provided', () => {
    render(
      <ToggleIconButton
        icon={<Icon />}
        checkedIcon={<CheckedIcon />}
        checked
        onCheckedChange={() => {}}
        aria-label="Favorito"
      />,
    );
    expect(screen.getByTestId('checked-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('falls back to icon when checked={true} and checkedIcon is not provided', () => {
    render(
      <ToggleIconButton
        icon={<Icon />}
        checked
        onCheckedChange={() => {}}
        aria-label="Favorito"
      />,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('calls onCheckedChange(true) when clicked while unchecked', async () => {
    const onCheckedChange = vi.fn();
    render(
      <ToggleIconButton
        icon={<Icon />}
        checked={false}
        onCheckedChange={onCheckedChange}
        aria-label="Favorito"
      />,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onCheckedChange).toHaveBeenCalledExactlyOnceWith(true);
  });

  it('calls onCheckedChange(false) when clicked while checked', async () => {
    const onCheckedChange = vi.fn();
    render(
      <ToggleIconButton
        icon={<Icon />}
        checked
        onCheckedChange={onCheckedChange}
        aria-label="Favorito"
      />,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onCheckedChange).toHaveBeenCalledExactlyOnceWith(false);
  });
});

// ─── Variant colors (Toggle table) ────────────────────────────────────────────

describe('ToggleIconButton — Variant colors', () => {
  it('standard: unchecked uses on-surface-variant text, checked uses primary text', () => {
    const { rerender } = render(
      <ToggleIconButton
        variant="standard"
        icon={<Icon />}
        checked={false}
        onCheckedChange={() => {}}
        aria-label="Favorito"
      />,
    );
    let btn = screen.getByRole('button');
    expect(btn).toHaveClass('text-md-on-surface-variant');

    rerender(
      <ToggleIconButton
        variant="standard"
        icon={<Icon />}
        checked
        onCheckedChange={() => {}}
        aria-label="Favorito"
      />,
    );
    btn = screen.getByRole('button');
    expect(btn).toHaveClass('text-md-primary');
  });

  it('filled: unchecked uses surface-variant, checked uses primary/on-primary', () => {
    const { rerender } = render(
      <ToggleIconButton
        variant="filled"
        icon={<Icon />}
        checked={false}
        onCheckedChange={() => {}}
        aria-label="Favorito"
      />,
    );
    let btn = screen.getByRole('button');
    expect(btn).toHaveClass(
      'bg-md-surface-variant',
      'text-md-on-surface-variant',
    );

    rerender(
      <ToggleIconButton
        variant="filled"
        icon={<Icon />}
        checked
        onCheckedChange={() => {}}
        aria-label="Favorito"
      />,
    );
    btn = screen.getByRole('button');
    expect(btn).toHaveClass('bg-md-primary', 'text-md-on-primary');
  });

  it('tonal: unchecked uses secondary-container, checked uses secondary/on-secondary', () => {
    const { rerender } = render(
      <ToggleIconButton
        variant="tonal"
        icon={<Icon />}
        checked={false}
        onCheckedChange={() => {}}
        aria-label="Favorito"
      />,
    );
    let btn = screen.getByRole('button');
    expect(btn).toHaveClass(
      'bg-md-secondary-container',
      'text-md-on-secondary-container',
    );

    rerender(
      <ToggleIconButton
        variant="tonal"
        icon={<Icon />}
        checked
        onCheckedChange={() => {}}
        aria-label="Favorito"
      />,
    );
    btn = screen.getByRole('button');
    expect(btn).toHaveClass('bg-md-secondary', 'text-md-on-secondary');
  });

  it('outlined: unchecked is transparent with on-surface-variant text, checked uses inverse-surface', () => {
    const { rerender } = render(
      <ToggleIconButton
        variant="outlined"
        icon={<Icon />}
        checked={false}
        onCheckedChange={() => {}}
        aria-label="Favorito"
      />,
    );
    let btn = screen.getByRole('button');
    expect(btn).toHaveClass('bg-transparent', 'text-md-on-surface-variant');

    rerender(
      <ToggleIconButton
        variant="outlined"
        icon={<Icon />}
        checked
        onCheckedChange={() => {}}
        aria-label="Favorito"
      />,
    );
    btn = screen.getByRole('button');
    expect(btn).toHaveClass(
      'bg-md-inverse-surface',
      'text-md-inverse-on-surface',
    );
  });
});

// ─── Props ────────────────────────────────────────────────────────────────────

describe('ToggleIconButton — Props', () => {
  it('forwards testId as data-testid on the root button element', () => {
    render(
      <ToggleIconButton
        testId="my-toggle-icon-button"
        icon={<Icon />}
        checked={false}
        onCheckedChange={() => {}}
        aria-label="Favorito"
      />,
    );
    expect(screen.getByTestId('my-toggle-icon-button')).toBeInTheDocument();
    expect(screen.getByTestId('my-toggle-icon-button').tagName).toBe('BUTTON');
  });

  it('merges consumer className without breaking variant classes', () => {
    render(
      <ToggleIconButton
        className="custom-class"
        icon={<Icon />}
        checked={false}
        onCheckedChange={() => {}}
        aria-label="Favorito"
      />,
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('custom-class');
    expect(btn).toHaveClass('md3-toggle-icon-button');
  });
});

// ─── States ───────────────────────────────────────────────────────────────────

describe('ToggleIconButton — States', () => {
  it('is disabled when the disabled prop is set', () => {
    render(
      <ToggleIconButton
        disabled
        icon={<Icon />}
        checked={false}
        onCheckedChange={() => {}}
        aria-label="Favorito"
      />,
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not call onCheckedChange when disabled', async () => {
    const onCheckedChange = vi.fn();
    render(
      <ToggleIconButton
        disabled
        icon={<Icon />}
        checked={false}
        onCheckedChange={onCheckedChange}
        aria-label="Favorito"
      />,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('ToggleIconButton — Accessibility', () => {
  const variants: IconButtonVariant[] = [
    'standard',
    'filled',
    'tonal',
    'outlined',
  ];

  it.each(variants)(
    'has no axe violations — %s variant, unchecked',
    async (variant) => {
      const { container } = render(
        <ToggleIconButton
          variant={variant}
          icon={<Icon />}
          checked={false}
          onCheckedChange={() => {}}
          aria-label={`Favorito (${variant})`}
        />,
      );
      const results = await axe.run(container);
      expect(results.violations).toHaveLength(0);
    },
  );

  it.each(variants)(
    'has no axe violations — %s variant, checked',
    async (variant) => {
      const { container } = render(
        <ToggleIconButton
          variant={variant}
          icon={<Icon />}
          checked
          onCheckedChange={() => {}}
          aria-label={`Favorito (${variant})`}
        />,
      );
      const results = await axe.run(container);
      expect(results.violations).toHaveLength(0);
    },
  );

  it('has no axe violations — disabled state', async () => {
    const { container } = render(
      <ToggleIconButton
        disabled
        icon={<Icon />}
        checked={false}
        onCheckedChange={() => {}}
        aria-label="Favorito"
      />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

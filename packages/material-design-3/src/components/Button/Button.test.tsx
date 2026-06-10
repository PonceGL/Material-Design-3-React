import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';

import { Button } from './Button';
import type { ButtonShape, ButtonSize, ButtonVariant } from './Button.types';

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('Button — Rendering', () => {
  it('renders a button element with the given label', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it.each<ButtonVariant>([
    'filled',
    'elevated',
    'filled-tonal',
    'outlined',
    'text',
  ])('renders the %s variant without crashing', (variant) => {
    render(<Button variant={variant}>{variant}</Button>);
    expect(screen.getByRole('button', { name: variant })).toBeInTheDocument();
  });

  it('applies the md3-button base class', () => {
    render(<Button>Shape</Button>);
    expect(screen.getByRole('button')).toHaveClass('md3-button');
  });

  it('does not apply shadow-md-elevation-1 for the filled variant', () => {
    render(<Button variant="filled">Filled</Button>);
    expect(screen.getByRole('button')).not.toHaveClass('shadow-md-elevation-1');
  });

  it('applies shadow-md-elevation-1 for the elevated variant', () => {
    render(<Button variant="elevated">Elevated</Button>);
    expect(screen.getByRole('button')).toHaveClass('shadow-md-elevation-1');
  });

  it('does not apply a hardcoded shadow class', () => {
    render(<Button>No shadow</Button>);
    expect(screen.getByRole('button')).not.toHaveClass('shadow');
  });

  it('applies the md3-button variant class for each variant', () => {
    render(<Button variant="filled">Filled</Button>);
    expect(screen.getByRole('button')).toHaveClass('md3-button--filled');
  });

  it('renders the outlined variant with on-surface-variant text and not primary text', () => {
    render(<Button variant="outlined">Outlined</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('text-md-on-surface-variant');
    expect(btn).not.toHaveClass('text-md-primary');
  });
});

// ─── Size & Shape ─────────────────────────────────────────────────────────────

describe('Button — Size & Shape', () => {
  it('defaults to size "s" and shape "round"', () => {
    render(<Button>Default</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('md3-button--size-s');
    expect(btn).toHaveClass('md3-button--shape-round');
  });

  it.each<ButtonSize>(['xs', 's', 'm', 'l', 'xl'])(
    'applies the md3-button--size-%s class for size "%s"',
    (size) => {
      render(<Button size={size}>{size}</Button>);
      expect(screen.getByRole('button')).toHaveClass(
        `md3-button--size-${size}`,
      );
    },
  );

  it.each<ButtonShape>(['round', 'square'])(
    'applies the md3-button--shape-%s class for shape "%s"',
    (shape) => {
      render(<Button shape={shape}>{shape}</Button>);
      expect(screen.getByRole('button')).toHaveClass(
        `md3-button--shape-${shape}`,
      );
    },
  );
});

// ─── Props ────────────────────────────────────────────────────────────────────

describe('Button — Props', () => {
  it('forwards testId as data-testid on the root button element', () => {
    render(<Button testId="my-button">Submit</Button>);
    expect(screen.getByTestId('my-button')).toBeInTheDocument();
    expect(screen.getByTestId('my-button').tagName).toBe('BUTTON');
  });

  it('merges consumer className without breaking variant classes', () => {
    render(<Button className="custom-class">Custom</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('custom-class');
    expect(btn).toHaveClass('md3-button');
  });

  it('forwards onClick handler', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('forwards aria-label for icon-only scenarios', () => {
    render(<Button aria-label="Close dialog">×</Button>);
    expect(
      screen.getByRole('button', { name: 'Close dialog' }),
    ).toBeInTheDocument();
  });

  it('defaults type to "button" to prevent accidental form submission', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('respects an explicit type="submit"', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('passes arbitrary HTML attributes to the root element', () => {
    render(<Button data-analytics="cta-hero">CTA</Button>);
    expect(screen.getByRole('button')).toHaveAttribute(
      'data-analytics',
      'cta-hero',
    );
  });
});

// ─── Icons ────────────────────────────────────────────────────────────────────

describe('Button — Icons', () => {
  it('renders a leading icon inside the button', () => {
    render(
      <Button icon={<span data-testid="leading-icon" />}>With Icon</Button>,
    );
    const icon = screen.getByTestId('leading-icon');
    expect(icon).toBeInTheDocument();
    expect(screen.getByRole('button')).toContainElement(icon);
  });

  it('renders a trailing icon after the label', () => {
    render(
      <Button iconTrailing={<span data-testid="trailing-icon" />}>
        With Icon
      </Button>,
    );
    expect(screen.getByTestId('trailing-icon')).toBeInTheDocument();
  });

  it('renders both leading and trailing icons simultaneously', () => {
    render(
      <Button
        icon={<span data-testid="leading" />}
        iconTrailing={<span data-testid="trailing" />}
      >
        Both
      </Button>,
    );
    expect(screen.getByTestId('leading')).toBeInTheDocument();
    expect(screen.getByTestId('trailing')).toBeInTheDocument();
  });

  it('renders without icons when neither prop is provided', () => {
    const { container } = render(<Button>No Icons</Button>);
    const iconWrappers = container.querySelectorAll('span.shrink-0');
    expect(iconWrappers).toHaveLength(0);
  });
});

// ─── States ───────────────────────────────────────────────────────────────────

describe('Button — States', () => {
  it('is disabled when the disabled prop is set', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('carries the disabled:pointer-events-none Tailwind class', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'disabled:pointer-events-none',
    );
  });

  it('carries the disabled:opacity-[0.38] Tailwind class', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toHaveClass('disabled:opacity-[0.38]');
  });

  it('fires onClick when Enter key is pressed', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Keyboard</Button>);
    screen.getByRole('button').focus();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('fires onClick when Space key is pressed', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Keyboard</Button>);
    screen.getByRole('button').focus();
    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalledOnce();
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('Button — Accessibility', () => {
  const variants: ButtonVariant[] = [
    'filled',
    'elevated',
    'filled-tonal',
    'outlined',
    'text',
  ];

  it.each(variants)('has no axe violations — %s variant', async (variant) => {
    const { container } = render(<Button variant={variant}>{variant}</Button>);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — disabled state', async () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — with icon and aria-label', async () => {
    const { container } = render(
      <Button aria-label="Add item" icon={<span aria-hidden="true">+</span>} />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it.each<ButtonSize>(['xs', 's', 'm', 'l', 'xl'])(
    'has no axe violations — square shape, size %s',
    async (size) => {
      const { container } = render(
        <Button shape="square" size={size}>
          {size}
        </Button>,
      );
      const results = await axe.run(container);
      expect(results.violations).toHaveLength(0);
    },
  );
});

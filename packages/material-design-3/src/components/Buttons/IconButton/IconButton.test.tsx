import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';

import { IconButton } from './IconButton';
import type {
  ButtonShape,
  ButtonSize,
  IconButtonVariant,
} from './IconButton.types';

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('IconButton — Rendering', () => {
  it('renders a button element with the given icon', () => {
    render(
      <IconButton
        icon={<span data-testid="icon" />}
        aria-label="Configuración"
      />,
    );
    const btn = screen.getByRole('button', { name: 'Configuración' });
    expect(btn).toBeInTheDocument();
    expect(btn).toContainElement(screen.getByTestId('icon'));
  });

  it('applies the md3-icon-button base class', () => {
    render(<IconButton icon={<span />} aria-label="Configuración" />);
    expect(screen.getByRole('button')).toHaveClass('md3-icon-button');
  });

  it.each<IconButtonVariant>(['standard', 'filled', 'tonal', 'outlined'])(
    'renders the %s variant without crashing',
    (variant) => {
      render(
        <IconButton variant={variant} icon={<span />} aria-label={variant} />,
      );
      expect(screen.getByRole('button', { name: variant })).toBeInTheDocument();
    },
  );
});

// ─── Variant classes ──────────────────────────────────────────────────────────

describe('IconButton — Variant classes', () => {
  it('standard: applies on-surface-variant text and no background', () => {
    render(
      <IconButton variant="standard" icon={<span />} aria-label="Standard" />,
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('md3-icon-button--standard');
    expect(btn).toHaveClass('text-md-on-surface-variant');
    expect(btn).not.toHaveClass('bg-md-primary');
  });

  it('filled: applies primary background and on-primary text', () => {
    render(<IconButton variant="filled" icon={<span />} aria-label="Filled" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('md3-icon-button--filled');
    expect(btn).toHaveClass('bg-md-primary', 'text-md-on-primary');
  });

  it('tonal: applies secondary-container background and on-secondary-container text', () => {
    render(<IconButton variant="tonal" icon={<span />} aria-label="Tonal" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('md3-icon-button--tonal');
    expect(btn).toHaveClass(
      'bg-md-secondary-container',
      'text-md-on-secondary-container',
    );
  });

  it('outlined: applies transparent background and on-surface-variant text', () => {
    render(
      <IconButton variant="outlined" icon={<span />} aria-label="Outlined" />,
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('md3-button--outlined');
    expect(btn).toHaveClass('bg-transparent', 'text-md-on-surface-variant');
  });
});

// ─── Size & Shape ─────────────────────────────────────────────────────────────

describe('IconButton — Size & Shape', () => {
  it('defaults to size "m" and shape "round"', () => {
    render(<IconButton icon={<span />} aria-label="Default" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('md3-icon-button--size-m');
    expect(btn).toHaveClass('md3-button--shape-round');
  });

  it.each<ButtonSize>(['xs', 's', 'm', 'l', 'xl'])(
    'applies the md3-icon-button--size-%s class for size "%s"',
    (size) => {
      render(<IconButton size={size} icon={<span />} aria-label={size} />);
      expect(screen.getByRole('button')).toHaveClass(
        `md3-icon-button--size-${size}`,
      );
    },
  );

  it.each<ButtonShape>(['round', 'square'])(
    'applies the md3-button--shape-%s class for shape "%s"',
    (shape) => {
      render(<IconButton shape={shape} icon={<span />} aria-label={shape} />);
      expect(screen.getByRole('button')).toHaveClass(
        `md3-button--shape-${shape}`,
      );
    },
  );
});

// ─── Props ────────────────────────────────────────────────────────────────────

describe('IconButton — Props', () => {
  it('forwards testId as data-testid on the root button element', () => {
    render(
      <IconButton
        testId="my-icon-button"
        icon={<span />}
        aria-label="Configuración"
      />,
    );
    expect(screen.getByTestId('my-icon-button')).toBeInTheDocument();
    expect(screen.getByTestId('my-icon-button').tagName).toBe('BUTTON');
  });

  it('merges consumer className without breaking variant classes', () => {
    render(
      <IconButton
        className="custom-class"
        icon={<span />}
        aria-label="Configuración"
      />,
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('custom-class');
    expect(btn).toHaveClass('md3-icon-button');
  });

  it('forwards onClick handler', async () => {
    const onClick = vi.fn();
    render(
      <IconButton
        onClick={onClick}
        icon={<span />}
        aria-label="Configuración"
      />,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('forwards aria-label for icon-only scenarios', () => {
    render(
      <IconButton
        aria-label="Cerrar diálogo"
        icon={<span aria-hidden="true">×</span>}
      />,
    );
    expect(
      screen.getByRole('button', { name: 'Cerrar diálogo' }),
    ).toBeInTheDocument();
  });

  it('defaults type to "button" to prevent accidental form submission', () => {
    render(<IconButton icon={<span />} aria-label="Configuración" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('respects an explicit type="submit"', () => {
    render(
      <IconButton type="submit" icon={<span />} aria-label="Configuración" />,
    );
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('passes arbitrary HTML attributes to the root element', () => {
    render(
      <IconButton
        data-analytics="cta-icon"
        icon={<span />}
        aria-label="Configuración"
      />,
    );
    expect(screen.getByRole('button')).toHaveAttribute(
      'data-analytics',
      'cta-icon',
    );
  });
});

// ─── States ───────────────────────────────────────────────────────────────────

describe('IconButton — States', () => {
  it('is disabled when the disabled prop is set', () => {
    render(<IconButton disabled icon={<span />} aria-label="Deshabilitado" />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn();
    render(
      <IconButton
        disabled
        onClick={onClick}
        icon={<span />}
        aria-label="Deshabilitado"
      />,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('carries the disabled:pointer-events-none Tailwind class', () => {
    render(<IconButton disabled icon={<span />} aria-label="Deshabilitado" />);
    expect(screen.getByRole('button')).toHaveClass(
      'disabled:pointer-events-none',
    );
  });

  it('carries the disabled:opacity-[0.38] Tailwind class', () => {
    render(<IconButton disabled icon={<span />} aria-label="Deshabilitado" />);
    expect(screen.getByRole('button')).toHaveClass('disabled:opacity-[0.38]');
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('IconButton — Accessibility', () => {
  const variants: IconButtonVariant[] = [
    'standard',
    'filled',
    'tonal',
    'outlined',
  ];

  it.each(variants)('has no axe violations — %s variant', async (variant) => {
    const { container } = render(
      <IconButton
        variant={variant}
        icon={<span aria-hidden="true">●</span>}
        aria-label={variant}
      />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — disabled state', async () => {
    const { container } = render(
      <IconButton
        disabled
        icon={<span aria-hidden="true">●</span>}
        aria-label="Deshabilitado"
      />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it.each<ButtonSize>(['xs', 's', 'm', 'l', 'xl'])(
    'has no axe violations — square shape, size %s',
    async (size) => {
      const { container } = render(
        <IconButton
          shape="square"
          size={size}
          icon={<span aria-hidden="true">●</span>}
          aria-label={size}
        />,
      );
      const results = await axe.run(container);
      expect(results.violations).toHaveLength(0);
    },
  );
});

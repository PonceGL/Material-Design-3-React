import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';

import type { ButtonVariant } from '../Button/Button.types';
import { SplitButton } from './SplitButton';

const ChevronIcon = () => (
  <span data-testid="icon" aria-hidden="true">
    ▾
  </span>
);

const variants: ButtonVariant[] = [
  'filled',
  'elevated',
  'filled-tonal',
  'outlined',
  'text',
];

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('SplitButton — Rendering', () => {
  it('renders SplitButton.Leading and SplitButton.Trailing as children', () => {
    render(
      <SplitButton>
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    expect(
      screen.getByRole('button', { name: 'Confirmar' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Más opciones' }),
    ).toBeInTheDocument();
  });

  it('the container is a div and does not render a button itself', () => {
    render(
      <SplitButton testId="split-button">
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    const container = screen.getByTestId('split-button');
    expect(container.tagName).toBe('DIV');
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('applies the md3-split-button base class to the container', () => {
    render(
      <SplitButton testId="split-button">
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    expect(screen.getByTestId('split-button')).toHaveClass('md3-split-button');
  });
});

// ─── Root props ───────────────────────────────────────────────────────────────

describe('SplitButton — Root props', () => {
  it('forwards testId as data-testid on the container', () => {
    render(
      <SplitButton testId="my-split-button">
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    expect(screen.getByTestId('my-split-button')).toBeInTheDocument();
  });

  it('merges consumer className without breaking the base class', () => {
    render(
      <SplitButton testId="split-button" className="custom-class">
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    const container = screen.getByTestId('split-button');
    expect(container).toHaveClass('custom-class');
    expect(container).toHaveClass('md3-split-button');
  });

  it('applies a custom gap when spacing is provided', () => {
    render(
      <SplitButton testId="split-button" spacing="0.5rem">
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    expect(screen.getByTestId('split-button')).toHaveStyle({ gap: '0.5rem' });
  });

  it('does not set an inline gap when spacing is not provided', () => {
    render(
      <SplitButton testId="split-button">
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    expect(screen.getByTestId('split-button').style.gap).toBe('');
  });

  it('passes arbitrary HTML attributes to the container', () => {
    render(
      <SplitButton testId="split-button" data-analytics="split-action">
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    expect(screen.getByTestId('split-button')).toHaveAttribute(
      'data-analytics',
      'split-action',
    );
  });
});

// ─── Leading ──────────────────────────────────────────────────────────────────

describe('SplitButton.Leading — Rendering', () => {
  it('renders a button element with its children', () => {
    render(
      <SplitButton>
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    const btn = screen.getByRole('button', { name: 'Confirmar' });
    expect(btn.tagName).toBe('BUTTON');
    expect(btn).toHaveAttribute('type', 'button');
  });

  it('renders the icon before the children when provided', () => {
    render(
      <SplitButton>
        <SplitButton.Leading icon={<ChevronIcon />}>
          Agregar
        </SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    expect(screen.getByRole('button', { name: 'Agregar' })).toContainElement(
      screen.getAllByTestId('icon')[0],
    );
  });

  it('does not render an icon wrapper when icon is not provided', () => {
    render(
      <SplitButton>
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    expect(screen.queryAllByTestId('icon')).toHaveLength(1); // only Trailing's icon
  });

  it('applies the md3-button and md3-split-button__leading base classes', () => {
    render(
      <SplitButton>
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    const btn = screen.getByRole('button', { name: 'Confirmar' });
    expect(btn).toHaveClass('md3-button');
    expect(btn).toHaveClass('md3-split-button__leading');
  });

  it('defaults to the filled variant', () => {
    render(
      <SplitButton>
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    const btn = screen.getByRole('button', { name: 'Confirmar' });
    expect(btn).toHaveClass('bg-md-primary', 'text-md-on-primary');
  });

  it.each(variants)('applies the %s variant classes', (variant) => {
    render(
      <SplitButton>
        <SplitButton.Leading variant={variant}>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          variant={variant}
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    const btn = screen.getByRole('button', { name: 'Confirmar' });
    expect(btn.className.length).toBeGreaterThan(0);
  });

  it('forwards testId as data-testid', () => {
    render(
      <SplitButton>
        <SplitButton.Leading testId="leading">Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    const el = screen.getByTestId('leading');
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe('BUTTON');
  });

  it('merges consumer className without breaking variant classes', () => {
    render(
      <SplitButton>
        <SplitButton.Leading className="custom-class">
          Confirmar
        </SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    const btn = screen.getByRole('button', { name: 'Confirmar' });
    expect(btn).toHaveClass('custom-class');
    expect(btn).toHaveClass('md3-split-button__leading');
  });
});

describe('SplitButton.Leading — Interactions', () => {
  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(
      <SplitButton>
        <SplitButton.Leading onClick={onClick}>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Confirmar' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when the disabled prop is set', () => {
    render(
      <SplitButton>
        <SplitButton.Leading disabled>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    expect(screen.getByRole('button', { name: 'Confirmar' })).toBeDisabled();
  });

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn();
    render(
      <SplitButton>
        <SplitButton.Leading disabled onClick={onClick}>
          Confirmar
        </SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Confirmar' }));
    expect(onClick).not.toHaveBeenCalled();
  });
});

// ─── Trailing ─────────────────────────────────────────────────────────────────

describe('SplitButton.Trailing — Rendering', () => {
  it('renders a button element with the given icon', () => {
    render(
      <SplitButton>
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    const btn = screen.getByRole('button', { name: 'Más opciones' });
    expect(btn.tagName).toBe('BUTTON');
    expect(btn).toHaveAttribute('type', 'button');
    expect(btn).toContainElement(screen.getByTestId('icon'));
  });

  it('applies the md3-icon-button and md3-split-button__trailing base classes', () => {
    render(
      <SplitButton>
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    const btn = screen.getByRole('button', { name: 'Más opciones' });
    expect(btn).toHaveClass('md3-icon-button');
    expect(btn).toHaveClass('md3-split-button__trailing');
  });

  it('defaults to the filled variant', () => {
    render(
      <SplitButton>
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    const btn = screen.getByRole('button', { name: 'Más opciones' });
    expect(btn).toHaveClass('bg-md-primary', 'text-md-on-primary');
  });

  it.each(variants)('applies the %s variant classes', (variant) => {
    render(
      <SplitButton>
        <SplitButton.Leading variant={variant}>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          variant={variant}
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    const btn = screen.getByRole('button', { name: 'Más opciones' });
    expect(btn.className.length).toBeGreaterThan(0);
  });

  it('forwards testId as data-testid', () => {
    render(
      <SplitButton>
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          testId="trailing"
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    const el = screen.getByTestId('trailing');
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe('BUTTON');
  });

  it('merges consumer className without breaking variant classes', () => {
    render(
      <SplitButton>
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          className="custom-class"
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    const btn = screen.getByRole('button', { name: 'Más opciones' });
    expect(btn).toHaveClass('custom-class');
    expect(btn).toHaveClass('md3-split-button__trailing');
  });
});

describe('SplitButton.Trailing — Toggle state', () => {
  it('does not render aria-pressed or data-checked when checked is not provided', () => {
    render(
      <SplitButton>
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    const btn = screen.getByRole('button', { name: 'Más opciones' });
    expect(btn).not.toHaveAttribute('aria-pressed');
    expect(btn).not.toHaveAttribute('data-checked');
  });

  it('renders aria-pressed="false" and data-checked="false" when checked={false}', () => {
    render(
      <SplitButton>
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          checked={false}
          onCheckedChange={() => {}}
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    const btn = screen.getByRole('button', { name: 'Más opciones' });
    expect(btn).toHaveAttribute('aria-pressed', 'false');
    expect(btn).toHaveAttribute('data-checked', 'false');
  });

  it('renders aria-pressed="true" and data-checked="true" when checked={true}', () => {
    render(
      <SplitButton>
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          checked
          onCheckedChange={() => {}}
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    const btn = screen.getByRole('button', { name: 'Más opciones' });
    expect(btn).toHaveAttribute('aria-pressed', 'true');
    expect(btn).toHaveAttribute('data-checked', 'true');
  });

  it('calls onCheckedChange(true) when clicked while unchecked', async () => {
    const onCheckedChange = vi.fn();
    render(
      <SplitButton>
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          checked={false}
          onCheckedChange={onCheckedChange}
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Más opciones' }));
    expect(onCheckedChange).toHaveBeenCalledExactlyOnceWith(true);
  });

  it('calls onCheckedChange(false) when clicked while checked', async () => {
    const onCheckedChange = vi.fn();
    render(
      <SplitButton>
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          checked
          onCheckedChange={onCheckedChange}
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Más opciones' }));
    expect(onCheckedChange).toHaveBeenCalledExactlyOnceWith(false);
  });

  it('calls both onClick and onCheckedChange when clicked', async () => {
    const onClick = vi.fn();
    const onCheckedChange = vi.fn();
    render(
      <SplitButton>
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          checked={false}
          onClick={onClick}
          onCheckedChange={onCheckedChange}
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Más opciones' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledExactlyOnceWith(true);
  });
});

describe('SplitButton.Trailing — Interactions', () => {
  it('is disabled when the disabled prop is set', () => {
    render(
      <SplitButton>
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          disabled
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    expect(screen.getByRole('button', { name: 'Más opciones' })).toBeDisabled();
  });

  it('does not call onCheckedChange when disabled', async () => {
    const onCheckedChange = vi.fn();
    render(
      <SplitButton>
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          disabled
          checked={false}
          onCheckedChange={onCheckedChange}
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Más opciones' }));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('SplitButton — Accessibility', () => {
  it.each(variants)(
    'has no axe violations for Leading + Trailing — %s variant',
    async (variant) => {
      const { container } = render(
        <SplitButton>
          <SplitButton.Leading variant={variant}>Confirmar</SplitButton.Leading>
          <SplitButton.Trailing
            variant={variant}
            icon={<ChevronIcon />}
            aria-label="Más opciones"
          />
        </SplitButton>,
      );
      const results = await axe.run(container);
      expect(results.violations).toHaveLength(0);
    },
  );

  it('has no axe violations when Trailing acts as a toggle (checked)', async () => {
    const { container } = render(
      <SplitButton>
        <SplitButton.Leading>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          checked
          onCheckedChange={() => {}}
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations when both parts are disabled', async () => {
    const { container } = render(
      <SplitButton>
        <SplitButton.Leading disabled>Confirmar</SplitButton.Leading>
        <SplitButton.Trailing
          disabled
          icon={<ChevronIcon />}
          aria-label="Más opciones"
        />
      </SplitButton>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

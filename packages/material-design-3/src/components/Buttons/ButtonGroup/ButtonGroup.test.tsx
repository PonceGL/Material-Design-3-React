import type {
  ButtonShape,
  ButtonSize,
} from '@/components/shared/variants.types';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';

import { ButtonGroup } from './ButtonGroup';
import { ToggleButton } from './ToggleButton';

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('ButtonGroup — Rendering', () => {
  it('renders its children', () => {
    render(
      <ButtonGroup aria-label="View">
        <ToggleButton selected={false} onSelectedChange={() => {}}>
          List
        </ToggleButton>
        <ToggleButton selected onSelectedChange={() => {}}>
          Grid
        </ToggleButton>
      </ButtonGroup>,
    );
    expect(screen.getByRole('button', { name: 'List' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Grid' })).toBeInTheDocument();
  });

  it('applies role="group" to the container', () => {
    render(
      <ButtonGroup aria-label="View">
        <ToggleButton selected={false} onSelectedChange={() => {}}>
          List
        </ToggleButton>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group', { name: 'View' })).toBeInTheDocument();
  });

  it('applies the md3-button-group base class', () => {
    render(
      <ButtonGroup aria-label="View">
        <ToggleButton selected={false} onSelectedChange={() => {}}>
          List
        </ToggleButton>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group')).toHaveClass('md3-button-group');
  });

  it('defaults to variant "standard", size "m" and shape "round"', () => {
    render(
      <ButtonGroup aria-label="View">
        <ToggleButton selected={false} onSelectedChange={() => {}}>
          List
        </ToggleButton>
      </ButtonGroup>,
    );
    const group = screen.getByRole('group');
    expect(group).toHaveClass('md3-button-group--standard');
    expect(group).toHaveClass('md3-button-group--size-m');
    expect(group).toHaveClass('md3-button-group--shape-round');
  });
});

// ─── Variant ──────────────────────────────────────────────────────────────────

describe('ButtonGroup — Variant', () => {
  it('applies the md3-button-group--connected class for variant="connected"', () => {
    render(
      <ButtonGroup aria-label="View" variant="connected">
        <ToggleButton selected={false} onSelectedChange={() => {}}>
          List
        </ToggleButton>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group')).toHaveClass(
      'md3-button-group--connected',
    );
  });
});

// ─── Size ─────────────────────────────────────────────────────────────────────

describe('ButtonGroup — Size', () => {
  it.each<ButtonSize>(['xs', 's', 'm', 'l', 'xl'])(
    'applies the md3-button-group--size-%s class for size "%s" (variant="standard")',
    (size) => {
      render(
        <ButtonGroup aria-label="View" size={size}>
          <ToggleButton selected={false} onSelectedChange={() => {}}>
            List
          </ToggleButton>
        </ButtonGroup>,
      );
      expect(screen.getByRole('group')).toHaveClass(
        `md3-button-group--size-${size}`,
      );
    },
  );

  it.each<ButtonSize>(['xs', 's', 'm', 'l', 'xl'])(
    'applies the md3-button-group--size-%s class for size "%s" (variant="connected")',
    (size) => {
      render(
        <ButtonGroup aria-label="View" variant="connected" size={size}>
          <ToggleButton selected={false} onSelectedChange={() => {}}>
            List
          </ToggleButton>
        </ButtonGroup>,
      );
      const group = screen.getByRole('group');
      expect(group).toHaveClass('md3-button-group--connected');
      expect(group).toHaveClass(`md3-button-group--size-${size}`);
    },
  );
});

// ─── Shape ────────────────────────────────────────────────────────────────────

describe('ButtonGroup — Shape', () => {
  it.each<ButtonShape>(['round', 'square'])(
    'applies the md3-button-group--shape-%s class for shape "%s"',
    (shape) => {
      render(
        <ButtonGroup aria-label="View" shape={shape}>
          <ToggleButton selected={false} onSelectedChange={() => {}}>
            List
          </ToggleButton>
        </ButtonGroup>,
      );
      expect(screen.getByRole('group')).toHaveClass(
        `md3-button-group--shape-${shape}`,
      );
    },
  );
});

// ─── Selection mode ───────────────────────────────────────────────────────────

describe('ButtonGroup — Selection mode', () => {
  it('forwards selectionMode as data-selection-mode', () => {
    render(
      <ButtonGroup aria-label="View" selectionMode="single-select">
        <ToggleButton selected={false} onSelectedChange={() => {}}>
          List
        </ToggleButton>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group')).toHaveAttribute(
      'data-selection-mode',
      'single-select',
    );
  });

  it('does not render data-selection-mode when selectionMode is not set', () => {
    render(
      <ButtonGroup aria-label="View">
        <ToggleButton selected={false} onSelectedChange={() => {}}>
          List
        </ToggleButton>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group')).not.toHaveAttribute(
      'data-selection-mode',
    );
  });
});

// ─── Props ────────────────────────────────────────────────────────────────────

describe('ButtonGroup — Props', () => {
  it('forwards testId as data-testid on the root element', () => {
    render(
      <ButtonGroup testId="my-group" aria-label="View">
        <ToggleButton selected={false} onSelectedChange={() => {}}>
          List
        </ToggleButton>
      </ButtonGroup>,
    );
    expect(screen.getByTestId('my-group')).toBeInTheDocument();
    expect(screen.getByTestId('my-group').tagName).toBe('DIV');
  });

  it('merges consumer className without breaking variant classes', () => {
    render(
      <ButtonGroup aria-label="View" className="custom-class">
        <ToggleButton selected={false} onSelectedChange={() => {}}>
          List
        </ToggleButton>
      </ButtonGroup>,
    );
    const group = screen.getByRole('group');
    expect(group).toHaveClass('custom-class');
    expect(group).toHaveClass('md3-button-group');
  });

  it('passes arbitrary HTML attributes to the root element', () => {
    render(
      <ButtonGroup aria-label="View" data-analytics="view-toggle">
        <ToggleButton selected={false} onSelectedChange={() => {}}>
          List
        </ToggleButton>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group')).toHaveAttribute(
      'data-analytics',
      'view-toggle',
    );
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('ButtonGroup — Accessibility', () => {
  it('has no axe violations — variant="standard"', async () => {
    const { container } = render(
      <ButtonGroup aria-label="View">
        <ToggleButton selected={false} onSelectedChange={() => {}}>
          List
        </ToggleButton>
        <ToggleButton selected onSelectedChange={() => {}}>
          Grid
        </ToggleButton>
      </ButtonGroup>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — variant="connected"', async () => {
    const { container } = render(
      <ButtonGroup aria-label="View" variant="connected">
        <ToggleButton selected={false} onSelectedChange={() => {}}>
          List
        </ToggleButton>
        <ToggleButton selected onSelectedChange={() => {}}>
          Grid
        </ToggleButton>
      </ButtonGroup>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

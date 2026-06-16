import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';

import { SegmentedButtonItem } from './SegmentedButtonItem';

const Icon = () => <span data-testid="icon" />;

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('SegmentedButtonItem — Rendering', () => {
  it('renders a button element with the given label', () => {
    render(
      <SegmentedButtonItem label="Day" selected={false} onClick={() => {}} />,
    );
    expect(screen.getByRole('button', { name: 'Day' })).toBeInTheDocument();
  });

  it('applies the md3-segmented-button-item base class', () => {
    render(
      <SegmentedButtonItem label="Day" selected={false} onClick={() => {}} />,
    );
    expect(screen.getByRole('button')).toHaveClass('md3-segmented-button-item');
  });
});

// ─── Selected state ───────────────────────────────────────────────────────────

describe('SegmentedButtonItem — Selected state', () => {
  it('renders aria-pressed="false" when selected={false}', () => {
    render(
      <SegmentedButtonItem label="Day" selected={false} onClick={() => {}} />,
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders aria-pressed="true" when selected={true}', () => {
    render(<SegmentedButtonItem label="Day" selected onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders the provided icon when selected={false}', () => {
    render(
      <SegmentedButtonItem
        label="Day"
        icon={<Icon />}
        selected={false}
        onClick={() => {}}
      />,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('does not render a checkmark when selected={false}', () => {
    const { container } = render(
      <SegmentedButtonItem label="Day" selected={false} onClick={() => {}} />,
    );
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('replaces the icon with a checkmark when selected={true}', () => {
    const { container } = render(
      <SegmentedButtonItem
        label="Day"
        icon={<Icon />}
        selected
        onClick={() => {}}
      />,
    );
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('shows a checkmark when selected={true} even without an icon prop', () => {
    const { container } = render(
      <SegmentedButtonItem label="Day" selected onClick={() => {}} />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies the selected color classes when selected={true}', () => {
    render(<SegmentedButtonItem label="Day" selected onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveClass(
      'bg-md-secondary-container',
      'text-md-on-secondary-container',
    );
  });
});

// ─── Interaction ──────────────────────────────────────────────────────────────

describe('SegmentedButtonItem — Interaction', () => {
  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(
      <SegmentedButtonItem label="Day" selected={false} onClick={onClick} />,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn();
    render(
      <SegmentedButtonItem
        label="Day"
        disabled
        selected={false}
        onClick={onClick}
      />,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});

// ─── States ───────────────────────────────────────────────────────────────────

describe('SegmentedButtonItem — States', () => {
  it('is disabled when the disabled prop is set', () => {
    render(
      <SegmentedButtonItem
        label="Day"
        disabled
        selected={false}
        onClick={() => {}}
      />,
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

// ─── Position (leading/trailing shape) ────────────────────────────────────────

describe('SegmentedButtonItem — Position', () => {
  it('renders as the first element when first among siblings', () => {
    const { container } = render(
      <div>
        <SegmentedButtonItem label="Day" selected={false} onClick={() => {}} />
        <SegmentedButtonItem label="Week" selected={false} onClick={() => {}} />
      </div>,
    );
    const buttons = screen.getAllByRole('button');
    expect(container.firstElementChild?.firstElementChild).toBe(buttons[0]);
  });

  it('renders as the last element when last among siblings', () => {
    const { container } = render(
      <div>
        <SegmentedButtonItem label="Day" selected={false} onClick={() => {}} />
        <SegmentedButtonItem label="Week" selected={false} onClick={() => {}} />
      </div>,
    );
    const buttons = screen.getAllByRole('button');
    expect(container.firstElementChild?.lastElementChild).toBe(buttons[1]);
  });
});

// ─── Props ────────────────────────────────────────────────────────────────────

describe('SegmentedButtonItem — Props', () => {
  it('forwards testId as data-testid on the root button element', () => {
    render(
      <SegmentedButtonItem
        testId="my-item"
        label="Day"
        selected={false}
        onClick={() => {}}
      />,
    );
    expect(screen.getByTestId('my-item')).toBeInTheDocument();
    expect(screen.getByTestId('my-item').tagName).toBe('BUTTON');
  });

  it('merges consumer className without breaking base classes', () => {
    render(
      <SegmentedButtonItem
        label="Day"
        className="custom-class"
        selected={false}
        onClick={() => {}}
      />,
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('custom-class');
    expect(btn).toHaveClass('md3-segmented-button-item');
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('SegmentedButtonItem — Accessibility', () => {
  it('has no axe violations — unselected', async () => {
    const { container } = render(
      <SegmentedButtonItem label="Day" selected={false} onClick={() => {}} />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — selected', async () => {
    const { container } = render(
      <SegmentedButtonItem label="Day" selected onClick={() => {}} />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — disabled', async () => {
    const { container } = render(
      <SegmentedButtonItem
        label="Day"
        disabled
        selected={false}
        onClick={() => {}}
      />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

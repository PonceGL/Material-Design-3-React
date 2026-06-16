import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';

import { List } from '../List';
import { ListItem } from './ListItem';

const LeadingIcon = () => <span data-testid="leading-icon">★</span>;
const TrailingIcon = () => <span data-testid="trailing-icon">›</span>;

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('ListItem — Rendering', () => {
  it('renders without crash', () => {
    render(<ListItem label="Inbox" />);
    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });

  it('applies the md3-list-item base class', () => {
    render(<ListItem label="Inbox" />);
    expect(screen.getByRole('listitem')).toHaveClass('md3-list-item');
  });

  it('renders the label text', () => {
    render(<ListItem label="Inbox" />);
    expect(screen.getByText('Inbox')).toBeInTheDocument();
  });
});

// ─── Height classes ───────────────────────────────────────────────────────────

describe('ListItem — Height classes', () => {
  it('applies one-line class when no overline or supportingText', () => {
    render(<ListItem label="Inbox" />);
    expect(screen.getByRole('listitem')).toHaveClass('md3-list-item--one-line');
  });

  it('applies two-line class when supportingText is provided', () => {
    render(<ListItem label="Inbox" supportingText="124 unread messages" />);
    expect(screen.getByRole('listitem')).toHaveClass('md3-list-item--two-line');
  });

  it('applies three-line class when overline is provided', () => {
    render(
      <ListItem
        overline="Priority"
        label="Inbox"
        supportingText="124 unread messages"
      />,
    );
    expect(screen.getByRole('listitem')).toHaveClass(
      'md3-list-item--three-line',
    );
  });

  it('applies three-line class when only overline is provided (no supportingText)', () => {
    render(<ListItem overline="Priority" label="Inbox" />);
    expect(screen.getByRole('listitem')).toHaveClass(
      'md3-list-item--three-line',
    );
  });
});

// ─── Content slots ────────────────────────────────────────────────────────────

describe('ListItem — Content slots', () => {
  it('does not render overline when not provided', () => {
    render(<ListItem label="Inbox" />);
    expect(screen.queryByText(/priority/i)).not.toBeInTheDocument();
  });

  it('renders overline when provided', () => {
    render(<ListItem overline="Priority" label="Inbox" />);
    expect(screen.getByText('Priority')).toBeInTheDocument();
  });

  it('does not render supportingText when not provided', () => {
    render(<ListItem label="Inbox" />);
    expect(screen.queryByText('124 unread messages')).not.toBeInTheDocument();
  });

  it('renders supportingText when provided', () => {
    render(<ListItem label="Inbox" supportingText="124 unread messages" />);
    expect(screen.getByText('124 unread messages')).toBeInTheDocument();
  });

  it('renders the leading slot when provided', () => {
    render(<ListItem leading={<LeadingIcon />} label="Inbox" />);
    expect(screen.getByTestId('leading-icon')).toBeInTheDocument();
  });

  it('does not render a leading wrapper when leading is not provided', () => {
    render(<ListItem label="Inbox" />);
    expect(screen.queryByTestId('leading-icon')).not.toBeInTheDocument();
  });

  it('renders the trailing slot when provided as a ReactNode', () => {
    render(<ListItem label="Inbox" trailing={<TrailingIcon />} />);
    expect(screen.getByTestId('trailing-icon')).toBeInTheDocument();
  });

  it('renders the trailing slot when provided as a string', () => {
    render(<ListItem label="Inbox" trailing="2h" />);
    expect(screen.getByText('2h')).toBeInTheDocument();
  });

  it('does not render a trailing wrapper when trailing is not provided', () => {
    render(<ListItem label="Inbox" />);
    expect(screen.queryByTestId('trailing-icon')).not.toBeInTheDocument();
  });
});

// ─── Selected state ───────────────────────────────────────────────────────────

describe('ListItem — Selected state', () => {
  it('applies md3-list-item--selected class when selected', () => {
    render(<ListItem label="Inbox" selected />);
    expect(screen.getByRole('listitem')).toHaveClass('md3-list-item--selected');
  });

  it('applies bg-md-secondary-container class when selected', () => {
    render(<ListItem label="Inbox" selected />);
    expect(screen.getByRole('listitem')).toHaveClass(
      'bg-md-secondary-container',
    );
  });

  it('does not apply selected classes when selected is false', () => {
    render(<ListItem label="Inbox" selected={false} />);
    const item = screen.getByRole('listitem');
    expect(item).not.toHaveClass('md3-list-item--selected');
    expect(item).not.toHaveClass('bg-md-secondary-container');
  });
});

// ─── Disabled state ───────────────────────────────────────────────────────────

describe('ListItem — Disabled state', () => {
  it('applies opacity class when disabled', () => {
    render(<ListItem label="Inbox" disabled />);
    expect(screen.getByRole('listitem')).toHaveClass('opacity-[0.38]');
  });

  it('disables the inner button when disabled and onClick are both set', () => {
    render(<ListItem label="Inbox" disabled onClick={() => {}} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not apply opacity class when disabled is false', () => {
    render(<ListItem label="Inbox" disabled={false} />);
    expect(screen.getByRole('listitem')).not.toHaveClass('opacity-[0.38]');
  });
});

// ─── Interactions ─────────────────────────────────────────────────────────────

describe('ListItem — Interactions', () => {
  it('renders an inner button when onClick is provided', () => {
    render(<ListItem label="Inbox" onClick={() => {}} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('the inner button has type="button"', () => {
    render(<ListItem label="Inbox" onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('does not render a button when onClick is not provided', () => {
    render(<ListItem label="Inbox" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('fires onClick when the button is clicked', async () => {
    const onClick = vi.fn();
    render(<ListItem label="Inbox" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn();
    render(<ListItem label="Inbox" disabled onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});

// ─── Props ────────────────────────────────────────────────────────────────────

describe('ListItem — Props', () => {
  it('forwards testId as data-testid on the root element', () => {
    render(<ListItem testId="my-item" label="Inbox" />);
    expect(screen.getByTestId('my-item')).toBeInTheDocument();
    expect(screen.getByTestId('my-item').tagName).toBe('DIV');
  });

  it('merges consumer className without breaking the base class', () => {
    render(<ListItem label="Inbox" className="custom-class" />);
    const item = screen.getByRole('listitem');
    expect(item).toHaveClass('custom-class');
    expect(item).toHaveClass('md3-list-item');
  });

  it('passes arbitrary HTML attributes to the root element', () => {
    render(<ListItem label="Inbox" data-analytics="inbox-item" />);
    expect(screen.getByRole('listitem')).toHaveAttribute(
      'data-analytics',
      'inbox-item',
    );
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('ListItem — Accessibility', () => {
  it('has no axe violations — one-line', async () => {
    const { container } = render(
      <List aria-label="Test list">
        <ListItem label="Inbox" />
      </List>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — two-line', async () => {
    const { container } = render(
      <List aria-label="Test list">
        <ListItem label="Inbox" supportingText="124 unread messages" />
      </List>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — three-line', async () => {
    const { container } = render(
      <List aria-label="Test list">
        <ListItem
          overline="Priority"
          label="Inbox"
          supportingText="124 unread messages"
        />
      </List>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — selected', async () => {
    const { container } = render(
      <List aria-label="Test list">
        <ListItem label="Inbox" selected />
        <ListItem label="Sent" />
      </List>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — disabled with onClick', async () => {
    const { container } = render(
      <List aria-label="Test list">
        <ListItem label="Inbox" disabled onClick={() => {}} />
      </List>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — interactive with leading and trailing', async () => {
    const { container } = render(
      <List aria-label="Test list">
        <ListItem
          leading={<LeadingIcon />}
          label="Inbox"
          supportingText="124 unread messages"
          trailing={<TrailingIcon />}
          onClick={() => {}}
        />
      </List>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

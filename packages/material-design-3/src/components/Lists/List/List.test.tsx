import { render, screen } from '@testing-library/react';
import axe from 'axe-core';

import { ListItem } from '../ListItem';
import { List } from './List';
import type { ListVariant } from './List.types';

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('List — Rendering', () => {
  it('renders without crash', () => {
    render(
      <List aria-label="Test list">
        <ListItem label="Item" />
      </List>,
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('applies the md3-list base class', () => {
    render(
      <List aria-label="Test list">
        <ListItem label="Item" />
      </List>,
    );
    expect(screen.getByRole('list')).toHaveClass('md3-list');
  });

  it('renders children', () => {
    render(
      <List aria-label="Inbox list">
        <ListItem label="Inbox" />
        <ListItem label="Sent" />
        <ListItem label="Drafts" />
      </List>,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });
});

// ─── Variants ─────────────────────────────────────────────────────────────────

describe('List — Variants', () => {
  it.each<[ListVariant, string]>([
    ['standard', 'md3-list--standard'],
    ['segmented', 'md3-list--segmented'],
  ])('variant="%s" applies class "%s"', (variant, expectedClass) => {
    render(
      <List variant={variant} aria-label="Test list">
        <ListItem label="Item" />
      </List>,
    );
    expect(screen.getByRole('list')).toHaveClass(expectedClass);
  });

  it('defaults to the standard variant', () => {
    render(
      <List aria-label="Test list">
        <ListItem label="Item" />
      </List>,
    );
    expect(screen.getByRole('list')).toHaveClass('md3-list--standard');
  });

  it('segmented variant adds bg-md-surface class', () => {
    render(
      <List variant="segmented" aria-label="Test list">
        <ListItem label="Item" />
      </List>,
    );
    expect(screen.getByRole('list')).toHaveClass('bg-md-surface');
  });
});

// ─── Props ────────────────────────────────────────────────────────────────────

describe('List — Props', () => {
  it('forwards testId as data-testid on the root element', () => {
    render(
      <List testId="my-list" aria-label="Test list">
        <ListItem label="Item" />
      </List>,
    );
    expect(screen.getByTestId('my-list')).toBeInTheDocument();
    expect(screen.getByTestId('my-list').tagName).toBe('DIV');
  });

  it('merges consumer className without breaking the base class', () => {
    render(
      <List className="custom-class" aria-label="Test list">
        <ListItem label="Item" />
      </List>,
    );
    const list = screen.getByRole('list');
    expect(list).toHaveClass('custom-class');
    expect(list).toHaveClass('md3-list');
  });

  it('passes arbitrary HTML attributes to the root element', () => {
    render(
      <List data-analytics="main-nav" aria-label="Test list">
        <ListItem label="Item" />
      </List>,
    );
    expect(screen.getByRole('list')).toHaveAttribute(
      'data-analytics',
      'main-nav',
    );
  });

  it('forwards aria-label to the root element', () => {
    render(
      <List aria-label="Navigation">
        <ListItem label="Item" />
      </List>,
    );
    expect(
      screen.getByRole('list', { name: 'Navigation' }),
    ).toBeInTheDocument();
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('List — Accessibility', () => {
  it('has no axe violations — variant="standard"', async () => {
    const { container } = render(
      <List aria-label="Inbox" variant="standard">
        <ListItem label="Inbox" supportingText="124 unread messages" />
        <ListItem label="Starred" />
        <ListItem label="Drafts" supportingText="3 pending drafts" />
      </List>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — variant="segmented"', async () => {
    const { container } = render(
      <List aria-label="Navigation" variant="segmented">
        <ListItem label="Home" />
        <ListItem label="Profile" />
        <ListItem label="Settings" />
      </List>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — with interactive items', async () => {
    const { container } = render(
      <List aria-label="Actions">
        <ListItem label="Open" onClick={() => {}} />
        <ListItem label="Delete" onClick={() => {}} />
      </List>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

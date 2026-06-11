import { render, screen } from '@testing-library/react';
import axe from 'axe-core';

import { SegmentedButton } from './SegmentedButton';
import type { SegmentedButtonSelectionMode } from './SegmentedButton.types';
import { SegmentedButtonItem } from './SegmentedButtonItem';

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('SegmentedButton — Rendering', () => {
  it('renders all SegmentedButtonItem children', () => {
    render(
      <SegmentedButton selectionMode="single-select" aria-label="View">
        <SegmentedButtonItem label="Day" selected onClick={() => {}} />
        <SegmentedButtonItem label="Week" selected={false} onClick={() => {}} />
        <SegmentedButtonItem
          label="Month"
          selected={false}
          onClick={() => {}}
        />
      </SegmentedButton>,
    );
    expect(screen.getByRole('button', { name: 'Day' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Week' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Month' })).toBeInTheDocument();
  });

  it('applies role="group" to the container', () => {
    render(
      <SegmentedButton selectionMode="single-select" aria-label="View">
        <SegmentedButtonItem label="Day" selected={false} onClick={() => {}} />
      </SegmentedButton>,
    );
    expect(screen.getByRole('group', { name: 'View' })).toBeInTheDocument();
  });

  it('applies the md3-segmented-button base class', () => {
    render(
      <SegmentedButton selectionMode="single-select" aria-label="View">
        <SegmentedButtonItem label="Day" selected={false} onClick={() => {}} />
      </SegmentedButton>,
    );
    expect(screen.getByRole('group')).toHaveClass('md3-segmented-button');
  });
});

// ─── Selection mode ───────────────────────────────────────────────────────────

describe('SegmentedButton — Selection mode', () => {
  it.each<SegmentedButtonSelectionMode>([
    'single-select',
    'multi-select',
    'selection-required',
  ])('forwards selectionMode="%s" as data-selection-mode', (selectionMode) => {
    render(
      <SegmentedButton selectionMode={selectionMode} aria-label="View">
        <SegmentedButtonItem label="Day" selected={false} onClick={() => {}} />
      </SegmentedButton>,
    );
    expect(screen.getByRole('group')).toHaveAttribute(
      'data-selection-mode',
      selectionMode,
    );
  });
});

// ─── Props ────────────────────────────────────────────────────────────────────

describe('SegmentedButton — Props', () => {
  it('forwards testId as data-testid on the root element', () => {
    render(
      <SegmentedButton
        testId="my-segmented-button"
        selectionMode="single-select"
        aria-label="View"
      >
        <SegmentedButtonItem label="Day" selected={false} onClick={() => {}} />
      </SegmentedButton>,
    );
    expect(screen.getByTestId('my-segmented-button')).toBeInTheDocument();
    expect(screen.getByTestId('my-segmented-button').tagName).toBe('DIV');
  });

  it('merges consumer className without breaking the base class', () => {
    render(
      <SegmentedButton
        selectionMode="single-select"
        aria-label="View"
        className="custom-class"
      >
        <SegmentedButtonItem label="Day" selected={false} onClick={() => {}} />
      </SegmentedButton>,
    );
    const group = screen.getByRole('group');
    expect(group).toHaveClass('custom-class');
    expect(group).toHaveClass('md3-segmented-button');
  });

  it('passes arbitrary HTML attributes to the root element', () => {
    render(
      <SegmentedButton
        selectionMode="single-select"
        aria-label="View"
        data-analytics="view-toggle"
      >
        <SegmentedButtonItem label="Day" selected={false} onClick={() => {}} />
      </SegmentedButton>,
    );
    expect(screen.getByRole('group')).toHaveAttribute(
      'data-analytics',
      'view-toggle',
    );
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('SegmentedButton — Accessibility', () => {
  it('has no axe violations — selectionMode="single-select"', async () => {
    const { container } = render(
      <SegmentedButton selectionMode="single-select" aria-label="View">
        <SegmentedButtonItem label="Day" selected onClick={() => {}} />
        <SegmentedButtonItem label="Week" selected={false} onClick={() => {}} />
        <SegmentedButtonItem
          label="Month"
          selected={false}
          onClick={() => {}}
        />
      </SegmentedButton>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — selectionMode="multi-select"', async () => {
    const { container } = render(
      <SegmentedButton selectionMode="multi-select" aria-label="Format">
        <SegmentedButtonItem label="Bold" selected onClick={() => {}} />
        <SegmentedButtonItem label="Italic" selected onClick={() => {}} />
        <SegmentedButtonItem
          label="Underline"
          selected={false}
          onClick={() => {}}
        />
      </SegmentedButton>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

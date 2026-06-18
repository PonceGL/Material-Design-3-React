import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';

import { SearchBar } from '../SearchBar';
import { SearchView } from './SearchView';

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('SearchView — Rendering', () => {
  it('renders without crash with searchBar and children', () => {
    const { container } = render(
      <SearchView open searchBar={<SearchBar aria-label="Search" />}>
        <p>Result 1</p>
      </SearchView>,
    );
    expect(container.querySelector('.md3-search-view')).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByText('Result 1')).toBeInTheDocument();
  });

  it('applies the md3-search-view base class to the root element', () => {
    const { container } = render(
      <SearchView open searchBar={<SearchBar aria-label="Search" />} />,
    );
    expect(container.firstChild).toHaveClass('md3-search-view');
  });
});

// ─── Open/closed state ────────────────────────────────────────────────────────

describe('SearchView — Open/closed state', () => {
  it('reflects open as data-state="open"', () => {
    const { container } = render(
      <SearchView open searchBar={<SearchBar aria-label="Search" />} />,
    );
    expect(container.firstChild).toHaveAttribute('data-state', 'open');
  });

  it('reflects closed as data-state="closed"', () => {
    const { container } = render(
      <SearchView open={false} searchBar={<SearchBar aria-label="Search" />} />,
    );
    expect(container.firstChild).toHaveAttribute('data-state', 'closed');
  });

  it('is inert when closed', () => {
    const { container } = render(
      <SearchView open={false} searchBar={<SearchBar aria-label="Search" />} />,
    );
    expect(container.firstChild).toHaveAttribute('inert');
  });

  it('is not inert when open', () => {
    const { container } = render(
      <SearchView open searchBar={<SearchBar aria-label="Search" />} />,
    );
    expect(container.firstChild).not.toHaveAttribute('inert');
  });
});

// ─── Layout and style ─────────────────────────────────────────────────────────

describe('SearchView — Layout and style', () => {
  it('defaults layout to "full-screen" and style to "contained"', () => {
    const { container } = render(
      <SearchView open searchBar={<SearchBar aria-label="Search" />} />,
    );
    expect(container.firstChild).toHaveAttribute('data-layout', 'full-screen');
    expect(container.firstChild).toHaveAttribute('data-style', 'contained');
  });

  it('reflects a custom layout', () => {
    const { container } = render(
      <SearchView
        open
        layout="docked"
        searchBar={<SearchBar aria-label="Search" />}
      />,
    );
    expect(container.firstChild).toHaveAttribute('data-layout', 'docked');
  });

  it('reflects a custom style', () => {
    const { container } = render(
      <SearchView
        open
        style="divided"
        searchBar={<SearchBar aria-label="Search" />}
      />,
    );
    expect(container.firstChild).toHaveAttribute('data-style', 'divided');
  });

  it('applies the full-screen background class for the contained style', () => {
    const { container } = render(
      <SearchView open searchBar={<SearchBar aria-label="Search" />} />,
    );
    expect(container.firstChild).toHaveClass('bg-md-surface-container-low');
  });

  it('applies the docked background class for the contained style', () => {
    const { container } = render(
      <SearchView
        open
        layout="docked"
        searchBar={<SearchBar aria-label="Search" />}
      />,
    );
    expect(container.firstChild).toHaveClass('bg-md-surface-container-high');
  });

  it('does not apply a filled background class for the divided style', () => {
    const { container } = render(
      <SearchView
        open
        style="divided"
        searchBar={<SearchBar aria-label="Search" />}
      />,
    );
    expect(container.firstChild).not.toHaveClass('bg-md-surface-container-low');
    expect(container.firstChild).not.toHaveClass(
      'bg-md-surface-container-high',
    );
  });
});

// ─── Divider (style="divided") ─────────────────────────────────────────────────

describe('SearchView — Divider', () => {
  it('does not render a divider for the default contained style', () => {
    const { container } = render(
      <SearchView open searchBar={<SearchBar aria-label="Search" />} />,
    );
    expect(
      container.querySelector('.md3-search-view__divider'),
    ).not.toBeInTheDocument();
  });

  it('renders a divider for the divided style', () => {
    const { container } = render(
      <SearchView
        open
        style="divided"
        searchBar={<SearchBar aria-label="Search" />}
      />,
    );
    expect(
      container.querySelector('.md3-search-view__divider'),
    ).toBeInTheDocument();
  });
});

// ─── Escape closes the panel ────────────────────────────────────────────────────

describe('SearchView — Escape closes the panel', () => {
  it('calls onClose when Escape is pressed while open', async () => {
    const onClose = vi.fn();
    render(
      <SearchView
        open
        onClose={onClose}
        searchBar={<SearchBar aria-label="Search" />}
      />,
    );
    await userEvent.click(screen.getByRole('searchbox'));
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when Escape is pressed while closed', async () => {
    const onClose = vi.fn();
    render(
      <SearchView
        open={false}
        onClose={onClose}
        searchBar={<SearchBar aria-label="Search" />}
      />,
    );
    await userEvent.keyboard('{Escape}');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not throw when Escape is pressed and onClose is not provided', async () => {
    render(<SearchView open searchBar={<SearchBar aria-label="Search" />} />);
    await userEvent.click(screen.getByRole('searchbox'));
    await expect(userEvent.keyboard('{Escape}')).resolves.not.toThrow();
  });

  it('still calls a consumer-provided onKeyDown handler', async () => {
    const onKeyDown = vi.fn();
    render(
      <SearchView
        open
        onKeyDown={onKeyDown}
        searchBar={<SearchBar aria-label="Search" />}
      />,
    );
    await userEvent.click(screen.getByRole('searchbox'));
    await userEvent.keyboard('a');
    expect(onKeyDown).toHaveBeenCalled();
  });
});

// ─── Props ────────────────────────────────────────────────────────────────────

describe('SearchView — Props', () => {
  it('forwards testId as data-testid on the root element', () => {
    render(
      <SearchView
        open
        testId="my-search-view"
        searchBar={<SearchBar aria-label="Search" />}
      />,
    );
    const root = screen.getByTestId('my-search-view');
    expect(root).toBeInTheDocument();
    expect(root.tagName).toBe('DIV');
  });

  it('supports a native data-testid passed directly', () => {
    render(
      <SearchView
        open
        data-testid="native-view"
        searchBar={<SearchBar aria-label="Search" />}
      />,
    );
    expect(screen.getByTestId('native-view')).toBeInTheDocument();
  });

  it('merges consumer className without breaking the base class', () => {
    const { container } = render(
      <SearchView
        open
        className="custom-class"
        searchBar={<SearchBar aria-label="Search" />}
      />,
    );
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass('md3-search-view');
  });

  it('passes arbitrary HTML attributes to the root element', () => {
    const { container } = render(
      <SearchView
        open
        data-analytics="search-view"
        searchBar={<SearchBar aria-label="Search" />}
      />,
    );
    expect(container.firstChild).toHaveAttribute(
      'data-analytics',
      'search-view',
    );
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('SearchView — Accessibility', () => {
  it('has no axe violations — full-screen, contained, closed', async () => {
    const { container } = render(
      <SearchView open={false} searchBar={<SearchBar aria-label="Search" />}>
        <ul>
          <li>Result 1</li>
        </ul>
      </SearchView>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — full-screen, contained, open', async () => {
    const { container } = render(
      <SearchView open searchBar={<SearchBar aria-label="Search" />}>
        <ul>
          <li>Result 1</li>
        </ul>
      </SearchView>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — docked, contained, open', async () => {
    const { container } = render(
      <SearchView
        open
        layout="docked"
        searchBar={<SearchBar aria-label="Search" />}
      >
        <ul>
          <li>Result 1</li>
        </ul>
      </SearchView>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — divided style, open', async () => {
    const { container } = render(
      <SearchView
        open
        style="divided"
        searchBar={<SearchBar aria-label="Search" />}
      >
        <ul>
          <li>Result 1</li>
        </ul>
      </SearchView>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';

import { SearchBar } from './SearchBar';

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('SearchBar — Rendering', () => {
  it('renders without crash', () => {
    render(<SearchBar aria-label="Search" />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('renders a native <input type="search">', () => {
    render(<SearchBar aria-label="Search" />);
    expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'search');
  });

  it('allows overriding the default type', () => {
    render(<SearchBar aria-label="Search" type="text" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies the md3-search-bar base class to the root element', () => {
    render(<SearchBar aria-label="Search" />);
    expect(screen.getByRole('searchbox').parentElement).toHaveClass(
      'md3-search-bar',
    );
  });
});

// ─── Content slots ────────────────────────────────────────────────────────────

describe('SearchBar — Content slots', () => {
  it('renders leadingIcon when provided', () => {
    render(
      <SearchBar
        aria-label="Search"
        leadingIcon={<span data-testid="leading-icon" />}
      />,
    );
    expect(screen.getByTestId('leading-icon')).toBeInTheDocument();
  });

  it('does not render a leading wrapper when leadingIcon is not provided', () => {
    render(<SearchBar aria-label="Search" />);
    expect(screen.queryByTestId('leading-icon')).not.toBeInTheDocument();
  });

  it('renders trailingActions when provided', () => {
    render(
      <SearchBar
        aria-label="Search"
        trailingActions={<button data-testid="mic">Mic</button>}
      />,
    );
    expect(screen.getByTestId('mic')).toBeInTheDocument();
  });

  it('does not render a trailing wrapper when trailingActions is not provided', () => {
    render(<SearchBar aria-label="Search" />);
    expect(screen.queryByTestId('mic')).not.toBeInTheDocument();
  });
});

// ─── Native input props ───────────────────────────────────────────────────────

describe('SearchBar — Native input props', () => {
  it('forwards value and onChange', async () => {
    const onChange = vi.fn();
    render(<SearchBar aria-label="Search" value="hello" onChange={onChange} />);
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    expect(input.value).toBe('hello');
    await userEvent.type(input, 'x');
    expect(onChange).toHaveBeenCalled();
  });

  it('forwards placeholder', () => {
    render(<SearchBar aria-label="Search" placeholder="Search videos" />);
    expect(screen.getByPlaceholderText('Search videos')).toBeInTheDocument();
  });

  it('forwards onFocus and onBlur', () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    render(<SearchBar aria-label="Search" onFocus={onFocus} onBlur={onBlur} />);
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    input.focus();
    expect(onFocus).toHaveBeenCalledTimes(1);
    input.blur();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('forwards aria-label', () => {
    render(<SearchBar aria-label="Site search" />);
    expect(
      screen.getByRole('searchbox', { name: 'Site search' }),
    ).toBeInTheDocument();
  });
});

// ─── Props ────────────────────────────────────────────────────────────────────

describe('SearchBar — Props', () => {
  it('forwards testId as data-testid on the root element', () => {
    render(<SearchBar aria-label="Search" testId="my-search-bar" />);
    const root = screen.getByTestId('my-search-bar');
    expect(root).toBeInTheDocument();
    expect(root.tagName).toBe('DIV');
  });

  it('supports a native data-testid passed directly (lands on the input via ...rest)', () => {
    render(<SearchBar aria-label="Search" data-testid="native-input" />);
    expect(screen.getByTestId('native-input').tagName).toBe('INPUT');
  });

  it('merges consumer className on the root without breaking the base class', () => {
    render(<SearchBar aria-label="Search" className="custom-class" />);
    const root = screen.getByRole('searchbox').parentElement;
    expect(root).toHaveClass('custom-class');
    expect(root).toHaveClass('md3-search-bar');
  });

  it('passes arbitrary HTML attributes to the input', () => {
    render(<SearchBar aria-label="Search" data-analytics="search-bar" />);
    expect(screen.getByRole('searchbox')).toHaveAttribute(
      'data-analytics',
      'search-bar',
    );
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('SearchBar — Accessibility', () => {
  it('has no axe violations — minimal (aria-label only)', async () => {
    const { container } = render(<SearchBar aria-label="Search" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — with leadingIcon and trailingActions', async () => {
    const { container } = render(
      <SearchBar
        aria-label="Search"
        leadingIcon={<span aria-hidden="true">🔍</span>}
        trailingActions={<button aria-label="Voice search">🎤</button>}
      />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — placeholder only, no aria-label (placeholder is a valid, if weak, accessible-name fallback per the HTML-AAM spec)', async () => {
    const { container } = render(<SearchBar placeholder="Search" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

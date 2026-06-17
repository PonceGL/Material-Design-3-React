import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';

import { TextField } from './TextField';
import type { TextFieldStatus, TextFieldVariant } from './TextField.types';

const variants: TextFieldVariant[] = ['filled', 'outlined'];
const statuses: TextFieldStatus[] = ['none', 'error', 'success', 'warning'];

/** The `<fieldset>`/`<div>` that carries the variant + `data-status` classes. */
function getField(control: HTMLElement) {
  const field = control.closest('.md3-text-field');
  if (!field) throw new Error('Could not find the .md3-text-field wrapper');
  return field;
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('TextField — Rendering', () => {
  it('renders an input associated with its label', () => {
    render(<TextField label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it.each(variants)('renders the %s variant without crashing', (variant) => {
    render(<TextField label="Email" variant={variant} />);
    expect(getField(screen.getByLabelText('Email'))).toHaveClass(
      `md3-text-field--${variant}`,
    );
  });

  it('defaults to the filled variant', () => {
    render(<TextField label="Email" />);
    expect(getField(screen.getByLabelText('Email'))).toHaveClass(
      'md3-text-field--filled',
    );
  });

  it('sets placeholder=" " when no placeholder is provided, enabling :placeholder-shown', () => {
    render(<TextField label="Email" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('placeholder', ' ');
  });

  it('respects a custom placeholder', () => {
    render(<TextField label="Email" placeholder="you@example.com" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'placeholder',
      'you@example.com',
    );
  });

  it('does not leak internal-only props as literal attributes on the native input', () => {
    render(
      <TextField
        label="Email"
        variant="outlined"
        status="error"
        testId="email-field"
        showCharacterCount
        leadingIcon={<svg />}
      />,
    );
    const input = screen.getByLabelText('Email');
    for (const attr of [
      'label',
      'variant',
      'status',
      'testid',
      'showcharactercount',
      'leadingicon',
    ]) {
      expect(input).not.toHaveAttribute(attr);
    }
  });
});

// ─── Floating label ───────────────────────────────────────────────────────────

describe('TextField — Floating label', () => {
  it('gains focus on the input when focused', () => {
    // Arrange
    render(<TextField label="Email" />);
    const input = screen.getByLabelText('Email');

    // Act
    input.focus();

    // Assert
    expect(input).toHaveFocus();
  });

  it('carries a non-empty value after typing, which drives the CSS floating state via :not(:placeholder-shown)', () => {
    // Arrange
    render(<TextField label="Email" />);
    const input = screen.getByLabelText('Email');

    // Act
    fireEvent.change(input, { target: { value: 'hi@example.com' } });

    // Assert
    expect(input).toHaveValue('hi@example.com');
  });

  it('keeps the label associated with the input via htmlFor/id', () => {
    render(<TextField label="Email" />);
    const input = screen.getByLabelText('Email');
    const label = screen.getByText('Email', { selector: 'label' });
    expect(label).toHaveAttribute('for', input.id);
  });

  it('generates a unique id when the consumer does not provide one', () => {
    render(
      <>
        <TextField label="First" />
        <TextField label="Second" />
      </>,
    );
    const first = screen.getByLabelText('First');
    const second = screen.getByLabelText('Second');
    expect(first.id).not.toBe(second.id);
  });

  it('uses the consumer-provided id instead of generating one', () => {
    render(<TextField label="Email" id="custom-id" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'custom-id');
  });
});

// ─── Status ───────────────────────────────────────────────────────────────────

describe('TextField — Status', () => {
  it.each(statuses)('sets data-status="%s" on the field', (status) => {
    render(<TextField label="Email" status={status} />);
    expect(getField(screen.getByLabelText('Email'))).toHaveAttribute(
      'data-status',
      status,
    );
  });

  it('defaults status to "none"', () => {
    render(<TextField label="Email" />);
    expect(getField(screen.getByLabelText('Email'))).toHaveAttribute(
      'data-status',
      'none',
    );
  });

  it('sets aria-invalid="true" when status is "error"', () => {
    render(<TextField label="Email" status="error" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it.each(['none', 'success', 'warning'] as const)(
    'does not set aria-invalid when status is "%s"',
    (status) => {
      render(<TextField label="Email" status={status} />);
      expect(screen.getByLabelText('Email')).not.toHaveAttribute(
        'aria-invalid',
      );
    },
  );

  it('gives the supporting text role="alert" only when status is "error"', () => {
    render(
      <TextField label="Email" status="error" supportingText="Invalid email" />,
    );
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Invalid email');
  });

  it('does not set role="alert" on supporting text for non-error statuses', () => {
    render(
      <TextField label="Email" status="success" supportingText="Looks good" />,
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('associates the input with the supporting text via aria-describedby', () => {
    render(<TextField label="Email" supportingText="We never share this" />);
    const input = screen.getByLabelText('Email');
    const supportingText = screen.getByText('We never share this');
    expect(input).toHaveAttribute('aria-describedby', supportingText.id);
  });

  it('does not set aria-describedby when there is no supporting text', () => {
    render(<TextField label="Email" />);
    expect(screen.getByLabelText('Email')).not.toHaveAttribute(
      'aria-describedby',
    );
  });
});

// ─── Icons ────────────────────────────────────────────────────────────────────

describe('TextField — Icons', () => {
  it('renders a leading icon', () => {
    render(
      <TextField label="Search" leadingIcon={<svg data-testid="leading" />} />,
    );
    expect(screen.getByTestId('leading')).toBeInTheDocument();
  });

  it('renders a decorative trailing icon when there is no click handler', () => {
    render(
      <TextField
        label="Search"
        trailingIcon={<svg data-testid="trailing" />}
      />,
    );
    expect(screen.getByTestId('trailing')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('wraps the trailing icon in an accessible button when onTrailingIconClick is set', () => {
    render(
      <TextField
        label="Search"
        trailingIcon={<svg />}
        onTrailingIconClick={() => {}}
        trailingIconAriaLabel="Clear search"
      />,
    );
    expect(
      screen.getByRole('button', { name: 'Clear search' }),
    ).toBeInTheDocument();
  });

  it('calls onTrailingIconClick when the trailing button is clicked', async () => {
    // Arrange
    const onTrailingIconClick = vi.fn();
    render(
      <TextField
        label="Search"
        trailingIcon={<svg />}
        onTrailingIconClick={onTrailingIconClick}
        trailingIconAriaLabel="Clear search"
      />,
    );

    // Act
    await userEvent.click(screen.getByRole('button', { name: 'Clear search' }));

    // Assert
    expect(onTrailingIconClick).toHaveBeenCalledOnce();
  });

  it('adds the has-leading-icon/has-trailing-icon modifier classes', () => {
    render(
      <TextField label="Search" leadingIcon={<svg />} trailingIcon={<svg />} />,
    );
    const field = getField(screen.getByLabelText('Search'));
    expect(field).toHaveClass('md3-text-field--has-leading-icon');
    expect(field).toHaveClass('md3-text-field--has-trailing-icon');
  });
});

// ─── Character counter ────────────────────────────────────────────────────────

describe('TextField — Character counter', () => {
  it('renders the initial count for an uncontrolled field', () => {
    render(<TextField label="Bio" maxLength={10} showCharacterCount />);
    expect(screen.getByText('0/10')).toBeInTheDocument();
  });

  it('updates the count as the user types in an uncontrolled field', () => {
    // Arrange
    render(<TextField label="Bio" maxLength={10} showCharacterCount />);
    const input = screen.getByLabelText('Bio');

    // Act
    fireEvent.change(input, { target: { value: 'hello' } });

    // Assert
    expect(screen.getByText('5/10')).toBeInTheDocument();
  });

  it('reflects the length of a controlled value', () => {
    // Arrange
    const { rerender } = render(
      <TextField
        label="Bio"
        maxLength={10}
        showCharacterCount
        value="hi"
        onChange={() => {}}
      />,
    );
    expect(screen.getByText('2/10')).toBeInTheDocument();

    // Act
    rerender(
      <TextField
        label="Bio"
        maxLength={10}
        showCharacterCount
        value="hello"
        onChange={() => {}}
      />,
    );

    // Assert
    expect(screen.getByText('5/10')).toBeInTheDocument();
  });

  it('still calls the consumer onChange when showCharacterCount is set', () => {
    // Arrange
    const onChange = vi.fn();
    render(
      <TextField
        label="Bio"
        maxLength={10}
        showCharacterCount
        onChange={onChange}
      />,
    );

    // Act
    fireEvent.change(screen.getByLabelText('Bio'), {
      target: { value: 'hi' },
    });

    // Assert
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('still calls the consumer onChange for a controlled field with showCharacterCount', () => {
    // Arrange
    const onChange = vi.fn();
    render(
      <TextField
        label="Bio"
        maxLength={10}
        showCharacterCount
        value="hi"
        onChange={onChange}
      />,
    );

    // Act
    fireEvent.change(screen.getByLabelText('Bio'), {
      target: { value: 'hit' },
    });

    // Assert
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('does not render a counter without showCharacterCount', () => {
    render(<TextField label="Bio" maxLength={10} />);
    expect(screen.queryByText('0/10')).not.toBeInTheDocument();
  });

  it('does not render a counter without maxLength, even with showCharacterCount', () => {
    render(<TextField label="Bio" showCharacterCount />);
    expect(screen.queryByText(/^0\//)).not.toBeInTheDocument();
  });
});

// ─── Multiline ────────────────────────────────────────────────────────────────

describe('TextField — Multiline', () => {
  it('renders a textarea instead of an input', () => {
    render(<TextField label="Notes" multiline />);
    expect(screen.getByLabelText('Notes').tagName).toBe('TEXTAREA');
  });

  it('defaults rows to 3', () => {
    render(<TextField label="Notes" multiline />);
    expect(screen.getByLabelText('Notes')).toHaveAttribute('rows', '3');
  });

  it('respects a custom rows value', () => {
    render(<TextField label="Notes" multiline rows={6} />);
    expect(screen.getByLabelText('Notes')).toHaveAttribute('rows', '6');
  });

  it('adds the multiline modifier class', () => {
    render(<TextField label="Notes" multiline />);
    expect(getField(screen.getByLabelText('Notes'))).toHaveClass(
      'md3-text-field--multiline',
    );
  });

  it('still renders icons, supporting text and the counter in multiline mode', () => {
    render(
      <TextField
        label="Notes"
        multiline
        leadingIcon={<svg data-testid="leading" />}
        supportingText="Max 100 characters"
        maxLength={100}
        showCharacterCount
      />,
    );
    expect(screen.getByTestId('leading')).toBeInTheDocument();
    expect(screen.getByText('Max 100 characters')).toBeInTheDocument();
    expect(screen.getByText('0/100')).toBeInTheDocument();
  });

  it('updates the character counter as the user types in a multiline field', () => {
    // Arrange
    render(
      <TextField label="Notes" multiline maxLength={100} showCharacterCount />,
    );
    const textarea = screen.getByLabelText('Notes');

    // Act
    fireEvent.change(textarea, { target: { value: 'hello there' } });

    // Assert
    expect(screen.getByText('11/100')).toBeInTheDocument();
  });

  it('still calls the consumer onChange for a controlled multiline field with showCharacterCount', () => {
    // Arrange
    const onChange = vi.fn();
    render(
      <TextField
        label="Notes"
        multiline
        maxLength={100}
        showCharacterCount
        value="hi"
        onChange={onChange}
      />,
    );

    // Act
    fireEvent.change(screen.getByLabelText('Notes'), {
      target: { value: 'hit' },
    });

    // Assert
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('sets aria-invalid on the textarea when status is "error"', () => {
    render(<TextField label="Notes" multiline status="error" />);
    expect(screen.getByLabelText('Notes')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });
});

// ─── Props passthrough ─────────────────────────────────────────────────────────

describe('TextField — Props passthrough', () => {
  it('forwards testId as data-testid on the outer container', () => {
    render(<TextField label="Email" testId="email-field" />);
    expect(screen.getByTestId('email-field')).toBeInTheDocument();
  });

  it('merges consumer className onto the outer container', () => {
    render(<TextField label="Email" className="custom-class" />);
    const input = screen.getByLabelText('Email');
    const container = input.closest('.md3-text-field-container');
    expect(container).toHaveClass('custom-class');
  });

  it('forwards onFocus and onBlur', () => {
    // Arrange
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    render(<TextField label="Email" onFocus={onFocus} onBlur={onBlur} />);
    const input = screen.getByLabelText('Email');

    // Act
    fireEvent.focus(input);
    fireEvent.blur(input);

    // Assert
    expect(onFocus).toHaveBeenCalledOnce();
    expect(onBlur).toHaveBeenCalledOnce();
  });

  it('forwards arbitrary aria-* attributes to the input', () => {
    render(<TextField label="Email" aria-keyshortcuts="Control+L" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'aria-keyshortcuts',
      'Control+L',
    );
  });

  it('forwards arbitrary HTML attributes to the input', () => {
    render(<TextField label="Email" data-analytics="signup-form" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'data-analytics',
      'signup-form',
    );
  });

  it('forwards required', () => {
    render(<TextField label="Email" required />);
    expect(screen.getByLabelText('Email')).toBeRequired();
  });

  it('disables the input and dims the container when disabled', () => {
    render(<TextField label="Email" disabled testId="email-field" />);
    expect(screen.getByLabelText('Email')).toBeDisabled();
    expect(screen.getByTestId('email-field')).toHaveClass('opacity-[0.38]');
  });

  it('disables the trailing icon button when the field is disabled', () => {
    render(
      <TextField
        label="Search"
        disabled
        trailingIcon={<svg />}
        onTrailingIconClick={() => {}}
        trailingIconAriaLabel="Clear"
      />,
    );
    expect(screen.getByRole('button', { name: 'Clear' })).toBeDisabled();
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('TextField — Accessibility', () => {
  it.each(variants)(
    'has no axe violations — %s, basic render',
    async (variant) => {
      const { container } = render(
        <TextField label="Email" variant={variant} />,
      );
      const results = await axe.run(container);
      expect(results.violations).toHaveLength(0);
    },
  );

  it.each(variants)(
    'has no axe violations — %s, each status',
    async (variant) => {
      for (const status of statuses) {
        const { container, unmount } = render(
          <TextField
            label="Email"
            variant={variant}
            status={status}
            supportingText="Helper text"
          />,
        );
        const results = await axe.run(container);
        expect(results.violations).toHaveLength(0);
        unmount();
      }
    },
  );

  it('has no axe violations — with leading and trailing icons', async () => {
    const { container } = render(
      <TextField
        label="Search"
        leadingIcon={<svg aria-hidden="true" />}
        trailingIcon={<svg aria-hidden="true" />}
        onTrailingIconClick={() => {}}
        trailingIconAriaLabel="Clear"
      />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — with character counter', async () => {
    const { container } = render(
      <TextField label="Bio" maxLength={140} showCharacterCount />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations — disabled', async () => {
    const { container } = render(<TextField label="Email" disabled />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it.each(variants)(
    'has no axe violations — multiline, %s',
    async (variant) => {
      const { container } = render(
        <TextField label="Notes" multiline variant={variant} />,
      );
      const results = await axe.run(container);
      expect(results.violations).toHaveLength(0);
    },
  );

  it('has no axe violations — multiline with icons and supporting text', async () => {
    const { container } = render(
      <TextField
        label="Notes"
        multiline
        leadingIcon={<svg aria-hidden="true" />}
        supportingText="Max 100 characters"
        maxLength={100}
        showCharacterCount
      />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

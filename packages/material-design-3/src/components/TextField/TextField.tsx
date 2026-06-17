import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

import './TextField.css';
import type {
  TextFieldProps,
  TextFieldStatus,
  TextFieldVariant,
} from './TextField.types';

const base = ['md3-text-field', 'cursor-text'].join(' ');

const variantClasses: Record<TextFieldVariant, string> = {
  filled: 'md3-text-field--filled bg-md-surface-container-highest',
  outlined: 'md3-text-field--outlined bg-transparent',
};

const labelStatusClasses: Record<TextFieldStatus, string> = {
  none: 'text-md-on-surface-variant',
  error: 'text-md-error',
  success: 'text-md-success',
  warning: 'text-md-warning',
};

/**
 * Material Design 3 text field.
 *
 * Renders a single-line `<input>` in one of the two M3 visual variants
 * (`filled`, `outlined`) with a 100% CSS floating label — no internal
 * React state is used to track focus or whether the field is populated.
 * `status` drives the validation color of the indicator/outline and label
 * (`error` is the only M3-defined role; `success`/`warning` are an
 * extension of this library).
 *
 * @example
 * ```tsx
 * <TextField label="Email" variant="outlined" />
 * ```
 */
export function TextField(props: TextFieldProps) {
  const generatedId = useId();

  /* eslint-disable @typescript-eslint/no-unused-vars -- rendered in a later
     subtask (RCL-192: icons/supporting-text/counter, RCL-193: multiline).
     Already destructured here so they don't leak onto the native <input>. */
  const {
    testId,
    variant = 'filled',
    label,
    status = 'none',
    className,
    id,
    placeholder,
    disabled,
    multiline,
    leadingIcon,
    trailingIcon,
    onTrailingIconClick,
    trailingIconAriaLabel,
    supportingText,
    showCharacterCount,
    ...rest
  } = props;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const inputId = id ?? generatedId;
  // TODO(RCL-193): branch into <textarea> when `multiline` is true. Every
  // TextField renders an <input> for now, regardless of `multiline`.
  const inputProps = rest as InputHTMLAttributes<HTMLInputElement>;

  const rootClasses = cn(
    base,
    variantClasses[variant],
    disabled && 'opacity-[0.38] pointer-events-none',
    className,
  );

  const input = (
    <input
      id={inputId}
      placeholder={placeholder ?? ' '}
      disabled={disabled}
      aria-invalid={status === 'error' ? true : undefined}
      className="md3-text-field__input text-md-on-surface"
      {...inputProps}
    />
  );

  const labelEl = (
    <label
      htmlFor={inputId}
      className={cn('md3-text-field__label', labelStatusClasses[status])}
    >
      {label}
    </label>
  );

  if (variant === 'outlined') {
    return (
      <fieldset
        data-testid={testId}
        data-status={status}
        className={rootClasses}
      >
        {input}
        <legend className="md3-text-field__notch" aria-hidden="true">
          <span>{label}</span>
        </legend>
        {labelEl}
      </fieldset>
    );
  }

  return (
    <div data-testid={testId} data-status={status} className={rootClasses}>
      {input}
      {labelEl}
    </div>
  );
}

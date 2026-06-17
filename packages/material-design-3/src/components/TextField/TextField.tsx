import { useId, useState } from 'react';
import type { ChangeEvent, InputHTMLAttributes } from 'react';

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

/** Shared by the label, the supporting text and the trailing icon — all
 * three follow the exact same M3 color-by-status mapping. */
const statusTextClasses: Record<TextFieldStatus, string> = {
  none: 'text-md-on-surface-variant',
  error: 'text-md-error',
  success: 'text-md-success',
  warning: 'text-md-warning',
};

const trailingIconButtonStateLayer =
  'hover:bg-md-on-surface-variant/[0.08] focus-visible:bg-md-on-surface-variant/[0.1]';

/**
 * Material Design 3 text field.
 *
 * Renders a single-line `<input>` in one of the two M3 visual variants
 * (`filled`, `outlined`) with a 100% CSS floating label — no internal
 * React state is used to track focus or whether the field is populated.
 * `status` drives the validation color of the indicator/outline, label,
 * trailing icon and supporting text (`error` is the only M3-defined role;
 * `success`/`warning` are an extension of this library).
 *
 * @example
 * ```tsx
 * <TextField label="Email" variant="outlined" />
 * ```
 *
 * @example With a clear button and a character counter
 * ```tsx
 * <TextField
 *   label="Bio"
 *   trailingIcon={<ClearIcon />}
 *   onTrailingIconClick={() => setValue('')}
 *   trailingIconAriaLabel="Clear"
 *   maxLength={140}
 *   showCharacterCount
 * />
 * ```
 */
export function TextField(props: TextFieldProps) {
  const generatedId = useId();

  /* eslint-disable @typescript-eslint/no-unused-vars -- `multiline` is
     rendered in a later subtask (RCL-193). Already destructured here so
     it doesn't leak onto the native <input>. */
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
  const supportingTextId = `${inputId}-supporting-text`;

  // TODO(RCL-193): branch into <textarea> when `multiline` is true. Every
  // TextField renders an <input> for now, regardless of `multiline`.
  const { value, defaultValue, onChange, maxLength, ...inputAttrs } =
    rest as InputHTMLAttributes<HTMLInputElement>;

  const isControlled = value !== undefined;
  const [uncontrolledLength, setUncontrolledLength] = useState(
    () => String(defaultValue ?? '').length,
  );
  const length = isControlled ? String(value).length : uncontrolledLength;

  const handleChange = showCharacterCount
    ? (event: ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
          setUncontrolledLength(event.target.value.length);
        }
        onChange?.(event);
      }
    : onChange;

  const rootClasses = cn(
    base,
    variantClasses[variant],
    leadingIcon && 'md3-text-field--has-leading-icon',
    trailingIcon && 'md3-text-field--has-trailing-icon',
  );

  const input = (
    <input
      id={inputId}
      placeholder={placeholder ?? ' '}
      disabled={disabled}
      className="md3-text-field__input text-md-on-surface"
      {...inputAttrs}
      value={value}
      defaultValue={defaultValue}
      maxLength={maxLength}
      onChange={handleChange}
      aria-invalid={status === 'error' ? true : undefined}
      aria-describedby={supportingText ? supportingTextId : undefined}
    />
  );

  const labelEl = (
    <label
      htmlFor={inputId}
      className={cn('md3-text-field__label', statusTextClasses[status])}
    >
      {label}
    </label>
  );

  const leadingIconEl = leadingIcon && (
    <span
      aria-hidden="true"
      className="md3-text-field__icon shrink-0 text-md-on-surface-variant"
    >
      {leadingIcon}
    </span>
  );

  const trailingIconEl =
    trailingIcon &&
    (onTrailingIconClick ? (
      <button
        type="button"
        aria-label={trailingIconAriaLabel}
        onClick={onTrailingIconClick}
        disabled={disabled}
        className={cn(
          'md3-text-field__icon-button shrink-0',
          statusTextClasses[status],
          trailingIconButtonStateLayer,
        )}
      >
        <span aria-hidden="true" className="md3-text-field__icon">
          {trailingIcon}
        </span>
      </button>
    ) : (
      <span
        aria-hidden="true"
        className={cn(
          'md3-text-field__icon shrink-0',
          statusTextClasses[status],
        )}
      >
        {trailingIcon}
      </span>
    ));

  const field =
    variant === 'outlined' ? (
      <fieldset data-status={status} className={rootClasses}>
        {leadingIconEl}
        {input}
        {trailingIconEl}
        <legend className="md3-text-field__notch" aria-hidden="true">
          <span>{label}</span>
        </legend>
        {labelEl}
      </fieldset>
    ) : (
      <div data-status={status} className={rootClasses}>
        {leadingIconEl}
        {input}
        {trailingIconEl}
        {labelEl}
      </div>
    );

  const showSupportingRow = Boolean(
    supportingText || (showCharacterCount && maxLength != null),
  );

  return (
    <div
      data-testid={testId}
      className={cn(
        'md3-text-field-container',
        disabled && 'opacity-[0.38] pointer-events-none',
        className,
      )}
    >
      {field}
      {showSupportingRow && (
        <div className="md3-text-field__supporting-row">
          <p
            id={supportingTextId}
            role={status === 'error' && supportingText ? 'alert' : undefined}
            className={cn(
              'md3-text-field__supporting-text',
              statusTextClasses[status],
            )}
          >
            {supportingText}
          </p>
          {showCharacterCount && maxLength != null && (
            <span className="md3-text-field__counter">
              {length}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from './TextField';

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19zM10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
  </svg>
);

const ClearIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
      description: 'Variante visual según la especificación M3.',
    },
    label: {
      control: 'text',
      description: 'Etiqueta del campo. Siempre visible (resting o floating).',
    },
    status: {
      control: 'select',
      options: ['none', 'error', 'success', 'warning'],
      description:
        '`error` es el único rol M3 oficial; `success`/`warning` son una extensión de esta librería.',
    },
    supportingText: {
      control: 'text',
      description: 'Texto de ayuda/error/éxito/advertencia debajo del campo.',
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita el campo y atenúa todo el componente.',
    },
    multiline: {
      control: 'boolean',
      description:
        'Renderiza un <textarea> de altura fija + scroll en vez de un <input> (sin auto-grow).',
    },
    rows: {
      control: 'number',
      description:
        'Filas visibles del <textarea>. Solo aplica con multiline. Default 3.',
    },
    showCharacterCount: {
      control: 'boolean',
      description:
        'Muestra "longitud actual / maxLength" junto al supportingText.',
    },
    maxLength: {
      control: 'number',
      description: 'Requerido para que showCharacterCount muestre el contador.',
    },
    leadingIcon: {
      control: false,
      description: 'Icono antes del input/textarea. Decorativo, 24dp.',
    },
    trailingIcon: {
      control: false,
      description: 'Icono después del input/textarea.',
    },
    onTrailingIconClick: {
      control: false,
      description:
        'Si se define, envuelve trailingIcon en un botón accesible (requiere trailingIconAriaLabel).',
    },
    testId: {
      control: 'text',
      description: 'Propagado como data-testid en el contenedor raíz.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: 'Email',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <TextField label="Filled" variant="filled" />
      <TextField label="Outlined" variant="outlined" />
    </div>
  ),
};

export const States: Story = {
  name: 'States (enabled vs disabled — try hover/focus live)',
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <TextField label="Enabled" variant="filled" defaultValue="Populated" />
      <TextField
        label="Disabled"
        variant="filled"
        disabled
        defaultValue="Populated"
      />
      <TextField label="Enabled" variant="outlined" defaultValue="Populated" />
      <TextField
        label="Disabled"
        variant="outlined"
        disabled
        defaultValue="Populated"
      />
    </div>
  ),
};

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <TextField label="Search" variant="filled" leadingIcon={<SearchIcon />} />
      <TextField
        label="Search"
        variant="outlined"
        leadingIcon={<SearchIcon />}
      />
    </div>
  ),
};

function WithClearButtonExample() {
  const [value, setValue] = useState('Material Design 3');

  return (
    <TextField
      label="Search"
      leadingIcon={<SearchIcon />}
      trailingIcon={value ? <ClearIcon /> : undefined}
      onTrailingIconClick={value ? () => setValue('') : undefined}
      trailingIconAriaLabel="Clear search"
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}

export const WithClearButton: Story = {
  name: 'With Clear Button',
  render: () => <WithClearButtonExample />,
};

export const ValidationStates: Story = {
  name: 'Validation States',
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <TextField
        label="Email"
        status="error"
        supportingText="Enter a valid email"
        defaultValue="not-an-email"
      />
      <TextField
        label="Username"
        status="success"
        supportingText="Username is available"
        defaultValue="ponce.gl"
      />
      <TextField
        label="Password"
        status="warning"
        supportingText="Password is weak"
        defaultValue="123456"
      />
      <TextField
        label="Email"
        status="none"
        supportingText="We'll never share your email"
      />
    </div>
  ),
};

export const CharacterCounter: Story = {
  name: 'Character Counter',
  args: {
    label: 'Bio',
    maxLength: 140,
    showCharacterCount: true,
    supportingText: 'Tell us about yourself',
  },
};

export const Multiline: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <TextField label="Notes" multiline variant="filled" />
      <TextField label="Notes" multiline variant="outlined" />
      <TextField
        label="Description"
        multiline
        rows={5}
        leadingIcon={<SearchIcon />}
        status="error"
        supportingText="Description is required"
      />
      <TextField
        label="Bio"
        multiline
        maxLength={200}
        showCharacterCount
        defaultValue="Building Material Design 3 components for React."
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <TextField
        label="Email"
        variant="filled"
        disabled
        defaultValue="ponce@example.com"
      />
      <TextField
        label="Email"
        variant="outlined"
        disabled
        defaultValue="ponce@example.com"
      />
    </div>
  ),
};

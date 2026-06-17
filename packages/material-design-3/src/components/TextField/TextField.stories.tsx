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
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'url'],
      description:
        'Tipo nativo del <input>, restringido a un subconjunto seguro — solo afecta el teclado virtual/validación básica, nunca cambia el widget nativo (sin date/radio/number/etc.) ni duplica funcionalidad propia (sin search, que trae su propio botón de limpiar).',
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

// Cada story de abajo renderiza exactamente el código que el panel "Code" de
// Storybook muestra: las que solo usan props simples (string/number/boolean)
// se definen vía `args` (Storybook genera el snippet automáticamente); las
// que necesitan un ReactNode (iconos) o estado de React usan `render` con el
// JSX puesto directamente ahí — nunca delegado a un componente con nombre
// propio, porque entonces el panel de código solo mostraría esa referencia
// y no el uso real de TextField.

export const Default: Story = {
  args: {
    label: 'Email',
  },
};

export const Filled: Story = {
  args: {
    label: 'Email',
    variant: 'filled',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Email',
    variant: 'outlined',
  },
};

export const EmailType: Story = {
  name: 'Email Type',
  args: {
    label: 'Email',
    type: 'email',
  },
};

export const PhoneType: Story = {
  name: 'Phone Type',
  args: {
    label: 'Phone',
    type: 'tel',
  },
};

export const WithLeadingIcon: Story = {
  name: 'With Leading Icon',
  render: () => <TextField label="Search" leadingIcon={<SearchIcon />} />,
};

export const WithClearButton: Story = {
  name: 'With Clear Button',
  render: function Render() {
    const [value, setValue] = useState('Material Design 3');

    return (
      <TextField
        label="Search"
        leadingIcon={<SearchIcon />}
        trailingIcon={<ClearIcon />}
        onTrailingIconClick={() => setValue('')}
        trailingIconAriaLabel="Clear search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const ErrorStatus: Story = {
  name: 'Error',
  args: {
    label: 'Email',
    status: 'error',
    supportingText: 'Enter a valid email',
    defaultValue: 'not-an-email',
  },
};

export const SuccessStatus: Story = {
  name: 'Success',
  args: {
    label: 'Username',
    status: 'success',
    supportingText: 'Username is available',
    defaultValue: 'ponce.gl',
  },
};

export const WarningStatus: Story = {
  name: 'Warning',
  args: {
    label: 'Password',
    status: 'warning',
    supportingText: 'Password is weak',
    defaultValue: '123456',
  },
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
  args: {
    label: 'Notes',
    multiline: true,
    rows: 4,
  },
};

export const MultilineWithIconAndError: Story = {
  name: 'Multiline With Icon and Error',
  render: () => (
    <TextField
      label="Description"
      multiline
      rows={4}
      leadingIcon={<SearchIcon />}
      status="error"
      supportingText="Description is required"
    />
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Email',
    disabled: true,
    defaultValue: 'ponce@example.com',
  },
};

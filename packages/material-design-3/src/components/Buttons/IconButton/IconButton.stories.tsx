import type { Meta, StoryObj } from '@storybook/react';

import { IconButton } from './IconButton';
import type {
  ButtonShape,
  ButtonSize,
  IconButtonVariant,
} from './IconButton.types';

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64zM12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'filled', 'tonal', 'outlined'],
      description:
        'Variante visual. `standard` no tiene contenedor; `filled`, `tonal` y `outlined` añaden fondo y/o borde.',
    },
    size: {
      control: 'select',
      options: ['xs', 's', 'm', 'l', 'xl'],
      description:
        'Tamaño M3 Expressive, compartido con `Button`/`ButtonGroup`/`ToggleButton`. Define el ancho y alto (touch target cuadrado).',
    },
    shape: {
      control: 'select',
      options: ['round', 'square'],
      description: 'Forma en reposo y al presionar.',
    },
    icon: {
      control: false,
      description:
        'Icono renderizado dentro del botón. Acepta cualquier ReactNode.',
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita el botón y elimina los eventos de puntero.',
    },
    testId: {
      control: 'text',
      description: 'Propagado como data-testid en el elemento raíz.',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    variant: 'standard',
    icon: <SettingsIcon />,
    'aria-label': 'Configuración',
  },
};

const VARIANTS: IconButtonVariant[] = [
  'standard',
  'filled',
  'tonal',
  'outlined',
];

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {VARIANTS.map((variant) => (
        <IconButton
          key={variant}
          variant={variant}
          icon={<SettingsIcon />}
          aria-label={`Configuración (${variant})`}
        />
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    variant: 'filled',
    icon: <DeleteIcon />,
    disabled: true,
    'aria-label': 'Eliminar',
  },
};

export const CustomIcon: Story = {
  name: 'Custom Icon',
  argTypes: {
    icon: { control: 'text' },
  },
  args: {
    variant: 'tonal',
    icon: '★',
    'aria-label': 'Icono personalizado',
  },
};

const SIZES: ButtonSize[] = ['xs', 's', 'm', 'l', 'xl'];

export const Sizes: Story = {
  name: 'Sizes (size axis)',
  render: () => (
    <div className="flex flex-wrap items-end gap-3">
      {SIZES.map((size) => (
        <IconButton
          key={size}
          variant="filled"
          size={size}
          icon={<SettingsIcon />}
          aria-label={`Configuración (tamaño ${size})`}
        />
      ))}
    </div>
  ),
};

const SHAPES: ButtonShape[] = ['round', 'square'];

export const Shapes: Story = {
  name: 'Shapes (round vs square)',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {SHAPES.map((shape) => (
        <IconButton
          key={shape}
          variant="filled"
          shape={shape}
          icon={<SettingsIcon />}
          aria-label={`Configuración (forma ${shape})`}
        />
      ))}
    </div>
  ),
};

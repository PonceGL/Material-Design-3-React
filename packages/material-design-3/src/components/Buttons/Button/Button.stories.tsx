import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'elevated', 'filled-tonal', 'outlined', 'text'],
      description: 'Variante visual según la especificación M3.',
    },
    size: {
      control: 'select',
      options: ['xs', 's', 'm', 'l', 'xl'],
      description:
        'Tamaño M3 Expressive. Define el corner-radius en reposo (forma square) y al presionar.',
    },
    shape: {
      control: 'select',
      options: ['round', 'square'],
      description:
        'Forma M3 Expressive en reposo. "round" es siempre totalmente redondeado; "square" depende de size.',
    },
    children: {
      control: 'text',
      description: 'Etiqueta del botón.',
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita el botón y elimina los eventos de puntero.',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description:
        'Atributo type del elemento button. Por defecto "button" para evitar envíos accidentales de formulario.',
    },
    icon: {
      control: false,
      description: 'Nodo de icono líder, renderizado antes de la etiqueta.',
    },
    iconTrailing: {
      control: false,
      description:
        'Nodo de icono al final, renderizado después de la etiqueta.',
    },
    testId: {
      control: 'text',
      description: 'Propagado como data-testid en el elemento raíz.',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'filled',
    size: 'm',
    shape: 'round',
    children: 'Button',
    disabled: false,
    type: 'button',
  },
};

export const Filled: Story = {
  args: { variant: 'filled', children: 'Filled' },
};

export const Elevated: Story = {
  args: { variant: 'elevated', children: 'Elevated' },
};

export const FilledTonal: Story = {
  args: { variant: 'filled-tonal', children: 'Filled Tonal' },
};

export const Outlined: Story = {
  args: { variant: 'outlined', children: 'Outlined' },
};

export const Text: Story = {
  args: { variant: 'text', children: 'Text' },
};

export const Disabled: Story = {
  args: { variant: 'filled', children: 'Disabled', disabled: true },
};

export const WithLeadingIcon: Story = {
  args: {
    variant: 'filled',
    children: 'Add item',
    icon: <PlusIcon />,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    variant: 'filled',
    children: 'Continue',
    iconTrailing: <ArrowIcon />,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="filled">Filled</Button>
      <Button variant="elevated">Elevated</Button>
      <Button variant="filled-tonal">Filled Tonal</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </div>
  ),
};

export const Shapes: Story = {
  name: 'Shapes (round vs square)',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button shape="round">Round</Button>
      <Button shape="square">Square</Button>
    </div>
  ),
};

export const Sizes: Story = {
  name: 'Sizes (square shape, corner-radius scale)',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs" shape="square">
        XS
      </Button>
      <Button size="s" shape="square">
        S
      </Button>
      <Button size="m" shape="square">
        M
      </Button>
      <Button size="l" shape="square">
        L
      </Button>
      <Button size="xl" shape="square">
        XL
      </Button>
    </div>
  ),
};

import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { SplitButton } from './SplitButton';

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
  </svg>
);

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

const meta: Meta<typeof SplitButton> = {
  title: 'Components/SplitButton',
  component: SplitButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`SplitButton.Leading` (acción principal) y `SplitButton.Trailing` (trigger secundario, p. ej. para abrir un menú) deben usar la misma `variant` para que ambas partes se perciban como un único control. La gestión del menú/dropdown queda a cargo del consumidor vía el `onClick` de `Trailing`.',
      },
    },
  },
  argTypes: {
    spacing: {
      control: 'text',
      description:
        'Separación entre `Leading` y `Trailing` (longitud CSS). Por defecto 2dp.',
    },
    children: {
      control: false,
      description: '`SplitButton.Leading` y `SplitButton.Trailing`.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SplitButton>;

export const Default: Story = {
  render: (args) => (
    <SplitButton {...args}>
      <SplitButton.Leading>Confirmar</SplitButton.Leading>
      <SplitButton.Trailing
        icon={<ChevronDownIcon />}
        aria-label="Más opciones"
      />
    </SplitButton>
  ),
};

export const WithIconInLeading: Story = {
  name: 'With Icon in Leading',
  render: (args) => (
    <SplitButton {...args}>
      <SplitButton.Leading icon={<PlusIcon />}>Agregar</SplitButton.Leading>
      <SplitButton.Trailing
        icon={<ChevronDownIcon />}
        aria-label="Más opciones"
      />
    </SplitButton>
  ),
};

function ToggleTrailingExample(args: Story['args']) {
  const [checked, setChecked] = useState(false);

  return (
    <SplitButton {...args}>
      <SplitButton.Leading>Marcar como favorito</SplitButton.Leading>
      <SplitButton.Trailing
        icon={<ChevronDownIcon />}
        aria-label="Expandir opciones"
        checked={checked}
        onCheckedChange={setChecked}
      />
    </SplitButton>
  );
}

export const ToggleTrailing: Story = {
  name: 'Toggle Trailing',
  render: (args) => <ToggleTrailingExample {...args} />,
};

export const DisabledLeading: Story = {
  name: 'Disabled Leading',
  render: (args) => (
    <SplitButton {...args}>
      <SplitButton.Leading disabled>Confirmar</SplitButton.Leading>
      <SplitButton.Trailing
        icon={<ChevronDownIcon />}
        aria-label="Más opciones"
      />
    </SplitButton>
  ),
};

export const DisabledTrailing: Story = {
  name: 'Disabled Trailing',
  render: (args) => (
    <SplitButton {...args}>
      <SplitButton.Leading>Confirmar</SplitButton.Leading>
      <SplitButton.Trailing
        disabled
        icon={<ChevronDownIcon />}
        aria-label="Más opciones"
      />
    </SplitButton>
  ),
};

export const DisabledAll: Story = {
  name: 'Disabled All',
  render: (args) => (
    <SplitButton {...args}>
      <SplitButton.Leading disabled>Confirmar</SplitButton.Leading>
      <SplitButton.Trailing
        disabled
        icon={<ChevronDownIcon />}
        aria-label="Más opciones"
      />
    </SplitButton>
  ),
};

export const FilledVariant: Story = {
  name: 'Filled Variant',
  render: (args) => (
    <SplitButton {...args}>
      <SplitButton.Leading variant="filled">Confirmar</SplitButton.Leading>
      <SplitButton.Trailing
        variant="filled"
        icon={<ChevronDownIcon />}
        aria-label="Más opciones"
      />
    </SplitButton>
  ),
};

export const OutlinedVariant: Story = {
  name: 'Outlined Variant',
  render: (args) => (
    <SplitButton {...args}>
      <SplitButton.Leading variant="outlined">Confirmar</SplitButton.Leading>
      <SplitButton.Trailing
        variant="outlined"
        icon={<ChevronDownIcon />}
        aria-label="Más opciones"
      />
    </SplitButton>
  ),
};

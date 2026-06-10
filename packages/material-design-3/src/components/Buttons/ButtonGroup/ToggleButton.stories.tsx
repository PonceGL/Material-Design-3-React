import { Fragment, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import type {
  ToggleButtonProps,
  ToggleButtonVariant,
} from './ButtonGroup.types';
import { ToggleButton } from './ToggleButton';

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const meta: Meta<typeof ToggleButton> = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'filled', 'filled-tonal', 'outlined'],
      description:
        'Variante visual. El color depende también de `selected`, según la tabla "Toggle" de M3 (RCL-108).',
    },
    size: {
      control: 'select',
      options: ['xs', 's', 'm', 'l', 'xl'],
      description:
        'Tamaño M3 Expressive, compartido con `Button`/`ButtonGroup`. Define el touch-target y el padding horizontal, en reposo y al presionar.',
    },
    shape: {
      control: 'select',
      options: ['round', 'square'],
      description:
        'Forma en reposo cuando `selected=false`. Al seleccionarse, la forma cambia a la opuesta (shape-morph round ↔ square).',
    },
    selected: {
      control: 'boolean',
      description:
        'Estado seleccionado, reflejado como `aria-pressed`. Determina el color (tabla Toggle) y dispara el shape-morph.',
    },
    onSelectedChange: { action: 'selectedChange' },
    children: {
      control: 'text',
      description: 'Etiqueta del botón.',
    },
    icon: {
      control: false,
      description: 'Icono renderizado antes de la etiqueta.',
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita el botón y elimina los eventos de puntero.',
    },
    testId: {
      control: 'text',
      description: 'Propagado como data-testid en el elemento raíz.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleButton>;

/**
 * Wraps `ToggleButton` with local state so it stays interactive in
 * Storybook: `selected` from args is only the initial value, and clicking
 * toggles it (and notifies the `onSelectedChange` action).
 */
function ControlledToggleButton({
  selected,
  onSelectedChange,
  ...rest
}: ToggleButtonProps) {
  const [isSelected, setIsSelected] = useState(selected);

  return (
    <ToggleButton
      {...rest}
      selected={isSelected}
      onSelectedChange={(next) => {
        onSelectedChange(next);
        setIsSelected(next);
      }}
    />
  );
}

export const Primary: Story = {
  render: (args) => <ControlledToggleButton {...args} />,
  args: {
    variant: 'filled',
    size: 'm',
    shape: 'round',
    selected: false,
    children: 'Toggle',
  },
};

const VARIANTS: ToggleButtonVariant[] = [
  'elevated',
  'filled',
  'filled-tonal',
  'outlined',
];

export const AllVariants: Story = {
  name: 'All Variants (Toggle color table)',
  render: () => (
    <div className="grid grid-cols-[auto_auto_auto] items-center gap-3">
      <span />
      <span className="text-md-on-surface-variant text-sm font-medium">
        Unselected
      </span>
      <span className="text-md-on-surface-variant text-sm font-medium">
        Selected
      </span>
      {VARIANTS.map((variant) => (
        <Fragment key={variant}>
          <span className="text-md-on-surface text-sm capitalize">
            {variant}
          </span>
          <ControlledToggleButton
            variant={variant}
            selected={false}
            onSelectedChange={() => {}}
          >
            {variant}
          </ControlledToggleButton>
          <ControlledToggleButton
            variant={variant}
            selected
            onSelectedChange={() => {}}
          >
            {variant}
          </ControlledToggleButton>
        </Fragment>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  name: 'With Icon',
  render: (args) => <ControlledToggleButton {...args} />,
  args: {
    variant: 'filled-tonal',
    selected: true,
    icon: <StarIcon />,
    children: 'Favorito',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'filled',
    selected: false,
    disabled: true,
    children: 'Disabled',
  },
};

export const ShapeMorph: Story = {
  name: 'Shape Morph (round ↔ square)',
  render: (args) => <ControlledToggleButton {...args} />,
  args: {
    variant: 'outlined',
    shape: 'round',
    selected: false,
    children: 'Selecciona',
  },
};

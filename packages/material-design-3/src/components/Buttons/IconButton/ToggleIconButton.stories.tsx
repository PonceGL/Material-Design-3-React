import { Fragment, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import type {
  IconButtonVariant,
  ToggleIconButtonProps,
} from './IconButton.types';
import { ToggleIconButton } from './ToggleIconButton';

const FavoriteBorderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
  </svg>
);

const FavoriteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const meta: Meta<typeof ToggleIconButton> = {
  title: 'Components/ToggleIconButton',
  component: ToggleIconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'filled', 'tonal', 'outlined'],
      description:
        'Variante visual. El color depende también de `checked`, siguiendo la misma tabla "Toggle" que `ToggleButton`.',
    },
    size: {
      control: 'select',
      options: ['xs', 's', 'm', 'l', 'xl'],
      description:
        'Tamaño M3 Expressive, compartido con `Button`/`ButtonGroup`/`ToggleButton`/`IconButton`. Define el ancho y alto (touch target cuadrado).',
    },
    shape: {
      control: 'select',
      options: ['round', 'square'],
      description:
        'Forma en reposo cuando `checked=false`. Al activarse, la forma cambia a la opuesta (shape-morph round ↔ square).',
    },
    checked: {
      control: 'boolean',
      description:
        'Estado activado, reflejado como `aria-pressed`. Determina el color (tabla Toggle) y dispara el shape-morph.',
    },
    onCheckedChange: { action: 'checkedChange' },
    icon: {
      control: false,
      description: 'Icono renderizado mientras `checked` es `false`.',
    },
    checkedIcon: {
      control: false,
      description:
        'Icono renderizado mientras `checked` es `true`. Si no se indica, se reutiliza `icon`.',
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

type Story = StoryObj<typeof ToggleIconButton>;

/**
 * Wraps `ToggleIconButton` with local state so it stays interactive in
 * Storybook: `checked` from args is only the initial value, and clicking
 * toggles it (and notifies the `onCheckedChange` action).
 */
function ControlledToggleIconButton({
  checked,
  onCheckedChange,
  ...rest
}: ToggleIconButtonProps) {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <ToggleIconButton
      {...rest}
      checked={isChecked}
      onCheckedChange={(next) => {
        onCheckedChange(next);
        setIsChecked(next);
      }}
    />
  );
}

export const Default: Story = {
  name: 'Default (Unchecked)',
  render: (args) => <ControlledToggleIconButton {...args} />,
  args: {
    variant: 'standard',
    icon: <FavoriteBorderIcon />,
    checkedIcon: <FavoriteIcon />,
    checked: false,
    'aria-label': 'Favorito',
  },
};

export const Checked: Story = {
  render: (args) => <ControlledToggleIconButton {...args} />,
  args: {
    variant: 'tonal',
    icon: <FavoriteBorderIcon />,
    checkedIcon: <FavoriteIcon />,
    checked: true,
    'aria-label': 'Favorito',
  },
};

export const SameIconToggle: Story = {
  name: 'Same Icon Toggle',
  render: (args) => <ControlledToggleIconButton {...args} />,
  args: {
    variant: 'filled',
    icon: <FavoriteIcon />,
    checked: true,
    'aria-label': 'Favorito',
  },
};

const VARIANTS: IconButtonVariant[] = [
  'standard',
  'filled',
  'tonal',
  'outlined',
];

export const AllVariantsToggle: Story = {
  name: 'All Variants Toggle',
  render: () => (
    <div className="grid grid-cols-[auto_auto_auto] items-center gap-3">
      <span />
      <span className="text-md-on-surface-variant text-sm font-medium">
        Unchecked
      </span>
      <span className="text-md-on-surface-variant text-sm font-medium">
        Checked
      </span>
      {VARIANTS.map((variant) => (
        <Fragment key={variant}>
          <span className="text-md-on-surface text-sm capitalize">
            {variant}
          </span>
          <ControlledToggleIconButton
            variant={variant}
            icon={<FavoriteBorderIcon />}
            checkedIcon={<FavoriteIcon />}
            checked={false}
            onCheckedChange={() => {}}
            aria-label={`Favorito (${variant}, unchecked)`}
          />
          <ControlledToggleIconButton
            variant={variant}
            icon={<FavoriteBorderIcon />}
            checkedIcon={<FavoriteIcon />}
            checked
            onCheckedChange={() => {}}
            aria-label={`Favorito (${variant}, checked)`}
          />
        </Fragment>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    variant: 'filled',
    icon: <FavoriteBorderIcon />,
    checkedIcon: <FavoriteIcon />,
    checked: false,
    disabled: true,
    'aria-label': 'Favorito',
  },
};

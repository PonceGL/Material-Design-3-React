import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { ButtonGroup } from './ButtonGroup';
import type { ButtonGroupProps } from './ButtonGroup.types';
import { ToggleButton } from './ToggleButton';

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14" />
  </svg>
);

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

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'connected'],
      description:
        '"standard" separa los items con un gap escalado por `size` y agranda el item seleccionado (squish-expand). "connected" los empaqueta con un gap fijo de 2px y un corner-radius por item según `size`.',
    },
    size: {
      control: 'select',
      options: ['xs', 's', 'm', 'l', 'xl'],
      description:
        'Tamaño M3 Expressive, compartido con `Button`/`ToggleButton`. En "connected" define el corner-radius de cada item.',
    },
    shape: {
      control: 'select',
      options: ['round', 'square'],
      description:
        'Forma en reposo de los items. En "connected" con `shape="round"`, las esquinas externas del primer y último item se redondean por completo.',
    },
    selectionMode: {
      control: 'select',
      options: ['single-select', 'multi-select', 'selection-required'],
      description:
        'Comportamiento de selección de los items internos. `ButtonGroup` no gestiona el estado por sí mismo: cada item controla su propio `selected`.',
    },
    children: {
      control: false,
      description:
        'Items del grupo (`Button`, `IconButton` o `ToggleButton`, 2-5 recomendado).',
    },
    testId: {
      control: 'text',
      description: 'Propagado como data-testid en el elemento raíz.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

type GroupArgs = Omit<ButtonGroupProps, 'children'>;

function StandardGroupExample(args: GroupArgs) {
  const [selected, setSelected] = useState([false, true, false]);
  const labels = ['Day', 'Week', 'Month'];

  return (
    <ButtonGroup {...args}>
      {labels.map((label, index) => (
        <ToggleButton
          key={label}
          size={args.size}
          shape={args.shape}
          selected={selected[index]}
          onSelectedChange={(next) =>
            setSelected((prev) =>
              prev.map((value, i) => (i === index ? next : value)),
            )
          }
        >
          {label}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}

export const Standard: Story = {
  render: (args) => <StandardGroupExample {...args} />,
  args: {
    variant: 'standard',
    size: 'm',
    shape: 'round',
  },
};

function ConnectedGroupExample(args: GroupArgs) {
  const [selected, setSelected] = useState([true, false, false, false, false]);
  const labels = ['Music', 'Podcasts', 'Audiobooks', 'Radio', 'Live'];

  return (
    <ButtonGroup {...args}>
      {labels.map((label, index) => (
        <ToggleButton
          key={label}
          size={args.size}
          shape={args.shape}
          selected={selected[index]}
          onSelectedChange={(next) =>
            setSelected((prev) =>
              prev.map((value, i) => (i === index ? next : value)),
            )
          }
        >
          {label}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}

export const Connected: Story = {
  render: (args) => <ConnectedGroupExample {...args} />,
  args: {
    variant: 'connected',
    size: 'm',
    shape: 'round',
  },
};

function MixedChildrenExample(args: GroupArgs) {
  const [favorite, setFavorite] = useState(false);

  return (
    <ButtonGroup {...args}>
      <Button variant="outlined" icon={<SearchIcon />} aria-label="Buscar" />
      <Button variant="outlined">Cancelar</Button>
      <ToggleButton
        size={args.size}
        shape={args.shape}
        selected={favorite}
        onSelectedChange={setFavorite}
        icon={<StarIcon />}
      >
        Favorito
      </ToggleButton>
    </ButtonGroup>
  );
}

export const MixedChildren: Story = {
  name: 'Mixed Children (Button + ToggleButton)',
  render: (args) => <MixedChildrenExample {...args} />,
  args: {
    variant: 'standard',
    size: 'm',
    shape: 'round',
  },
};

function SingleSelectExample(args: GroupArgs) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(1);
  const labels = ['Left', 'Center', 'Right'];

  return (
    <ButtonGroup {...args} selectionMode="single-select">
      {labels.map((label, index) => (
        <ToggleButton
          key={label}
          size={args.size}
          shape={args.shape}
          selected={selectedIndex === index}
          onSelectedChange={(next) => setSelectedIndex(next ? index : null)}
        >
          {label}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}

function MultiSelectExample(args: GroupArgs) {
  const [selected, setSelected] = useState([true, false, true]);
  const labels = ['Bold', 'Italic', 'Underline'];

  return (
    <ButtonGroup {...args} selectionMode="multi-select">
      {labels.map((label, index) => (
        <ToggleButton
          key={label}
          size={args.size}
          shape={args.shape}
          selected={selected[index]}
          onSelectedChange={(next) =>
            setSelected((prev) =>
              prev.map((value, i) => (i === index ? next : value)),
            )
          }
        >
          {label}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}

function SelectionRequiredExample(args: GroupArgs) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const labels = ['S', 'M', 'L'];

  return (
    <ButtonGroup {...args} selectionMode="selection-required">
      {labels.map((label, index) => (
        <ToggleButton
          key={label}
          size={args.size}
          shape={args.shape}
          selected={selectedIndex === index}
          onSelectedChange={(next) => {
            if (next) setSelectedIndex(index);
          }}
        >
          {label}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}

export const SelectionModes: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-md-on-surface-variant text-sm">
          single-select
        </span>
        <SingleSelectExample {...args} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-md-on-surface-variant text-sm">multi-select</span>
        <MultiSelectExample {...args} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-md-on-surface-variant text-sm">
          selection-required
        </span>
        <SelectionRequiredExample {...args} />
      </div>
    </div>
  ),
  args: {
    variant: 'connected',
    size: 'm',
    shape: 'round',
  },
};

function DisabledItemExample(args: GroupArgs) {
  const [selected, setSelected] = useState([false, false, false]);
  const labels = ['Left', 'Center', 'Right'];

  return (
    <ButtonGroup {...args}>
      {labels.map((label, index) => (
        <ToggleButton
          key={label}
          size={args.size}
          shape={args.shape}
          disabled={index === 1}
          selected={selected[index]}
          onSelectedChange={(next) =>
            setSelected((prev) =>
              prev.map((value, i) => (i === index ? next : value)),
            )
          }
        >
          {label}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}

export const DisabledItem: Story = {
  name: 'Disabled Item',
  render: (args) => <DisabledItemExample {...args} />,
  args: {
    variant: 'standard',
    size: 'm',
    shape: 'round',
  },
};

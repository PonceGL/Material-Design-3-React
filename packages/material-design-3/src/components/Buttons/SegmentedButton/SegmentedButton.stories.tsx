import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { SegmentedButton } from './SegmentedButton';
import type { SegmentedButtonProps } from './SegmentedButton.types';
import { SegmentedButtonItem } from './SegmentedButtonItem';

const AlignLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="2" />
    <rect x="3" y="9" width="12" height="2" />
    <rect x="3" y="14" width="18" height="2" />
    <rect x="3" y="19" width="12" height="2" />
  </svg>
);

const AlignCenterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="2" />
    <rect x="6" y="9" width="12" height="2" />
    <rect x="3" y="14" width="18" height="2" />
    <rect x="6" y="19" width="12" height="2" />
  </svg>
);

const AlignRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="2" />
    <rect x="9" y="9" width="12" height="2" />
    <rect x="3" y="14" width="18" height="2" />
    <rect x="9" y="19" width="12" height="2" />
  </svg>
);

const meta: Meta<typeof SegmentedButton> = {
  title: 'Components/SegmentedButton',
  component: SegmentedButton,
  tags: ['autodocs'],
  argTypes: {
    selectionMode: {
      control: 'select',
      options: ['single-select', 'multi-select', 'selection-required'],
      description:
        'Comportamiento de selección de los items internos. `SegmentedButton` no gestiona el estado por sí mismo: cada `SegmentedButtonItem` controla su propio `selected`/`onClick`.',
    },
    children: {
      control: false,
      description: '`SegmentedButtonItem` items (2-5 recomendado).',
    },
    testId: {
      control: 'text',
      description: 'Propagado como data-testid en el elemento raíz.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SegmentedButton>;

type GroupArgs = Omit<SegmentedButtonProps, 'children'>;

function SingleSelectionExample(args: GroupArgs) {
  const [selected, setSelected] = useState(1);
  const labels = ['Day', 'Week', 'Month'];

  return (
    <SegmentedButton {...args}>
      {labels.map((label, index) => (
        <SegmentedButtonItem
          key={label}
          label={label}
          selected={selected === index}
          onClick={() => setSelected(index)}
        />
      ))}
    </SegmentedButton>
  );
}

export const SingleSelection: Story = {
  name: 'Single Selection',
  render: (args) => <SingleSelectionExample {...args} />,
  args: {
    selectionMode: 'single-select',
    'aria-label': 'Vista',
  },
};

function MultiSelectionExample(args: GroupArgs) {
  const [selected, setSelected] = useState([true, false, true]);
  const labels = ['Bold', 'Italic', 'Underline'];

  return (
    <SegmentedButton {...args}>
      {labels.map((label, index) => (
        <SegmentedButtonItem
          key={label}
          label={label}
          selected={selected[index]}
          onClick={() =>
            setSelected((prev) =>
              prev.map((value, i) => (i === index ? !value : value)),
            )
          }
        />
      ))}
    </SegmentedButton>
  );
}

export const MultiSelection: Story = {
  name: 'Multi Selection',
  render: (args) => <MultiSelectionExample {...args} />,
  args: {
    selectionMode: 'multi-select',
    'aria-label': 'Formato de texto',
  },
};

function WithIconsExample(args: GroupArgs) {
  const [selected, setSelected] = useState(0);
  const items = [
    { label: 'Left', icon: <AlignLeftIcon /> },
    { label: 'Center', icon: <AlignCenterIcon /> },
    { label: 'Right', icon: <AlignRightIcon /> },
  ];

  return (
    <SegmentedButton {...args}>
      {items.map((item, index) => (
        <SegmentedButtonItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          selected={selected === index}
          onClick={() => setSelected(index)}
        />
      ))}
    </SegmentedButton>
  );
}

export const WithIcons: Story = {
  name: 'With Icons',
  render: (args) => <WithIconsExample {...args} />,
  args: {
    selectionMode: 'single-select',
    'aria-label': 'Alineación de texto',
  },
};

function TextOnlyExample(args: GroupArgs) {
  const [selected, setSelected] = useState(0);
  const labels = ['Left', 'Center', 'Right'];

  return (
    <SegmentedButton {...args}>
      {labels.map((label, index) => (
        <SegmentedButtonItem
          key={label}
          label={label}
          selected={selected === index}
          onClick={() => setSelected(index)}
        />
      ))}
    </SegmentedButton>
  );
}

export const TextOnly: Story = {
  name: 'Text Only',
  render: (args) => <TextOnlyExample {...args} />,
  args: {
    selectionMode: 'single-select',
    'aria-label': 'Alineación de texto',
  },
};

function DisabledItemExample(args: GroupArgs) {
  const [selected, setSelected] = useState(0);
  const labels = ['Left', 'Center', 'Right'];

  return (
    <SegmentedButton {...args}>
      {labels.map((label, index) => (
        <SegmentedButtonItem
          key={label}
          label={label}
          disabled={index === 1}
          selected={selected === index}
          onClick={() => setSelected(index)}
        />
      ))}
    </SegmentedButton>
  );
}

export const DisabledItem: Story = {
  name: 'Disabled Item',
  render: (args) => <DisabledItemExample {...args} />,
  args: {
    selectionMode: 'single-select',
    'aria-label': 'Alineación de texto',
  },
};

function TwoItemsExample(args: GroupArgs) {
  const [selected, setSelected] = useState(0);
  const labels = ['On', 'Off'];

  return (
    <SegmentedButton {...args}>
      {labels.map((label, index) => (
        <SegmentedButtonItem
          key={label}
          label={label}
          selected={selected === index}
          onClick={() => setSelected(index)}
        />
      ))}
    </SegmentedButton>
  );
}

export const TwoItems: Story = {
  name: 'Two Items',
  render: (args) => <TwoItemsExample {...args} />,
  args: {
    selectionMode: 'single-select',
    'aria-label': 'Estado',
  },
};

function FiveItemsExample(args: GroupArgs) {
  const [selected, setSelected] = useState(2);
  const labels = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <SegmentedButton {...args}>
      {labels.map((label, index) => (
        <SegmentedButtonItem
          key={label}
          label={label}
          selected={selected === index}
          onClick={() => setSelected(index)}
        />
      ))}
    </SegmentedButton>
  );
}

export const FiveItems: Story = {
  name: 'Five Items',
  render: (args) => <FiveItemsExample {...args} />,
  args: {
    selectionMode: 'single-select',
    'aria-label': 'Tamaño',
  },
};

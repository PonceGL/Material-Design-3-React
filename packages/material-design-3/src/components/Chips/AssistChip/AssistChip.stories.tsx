import React from 'react';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import AssistChip, { AssistChipVariant } from './AssistChip';

const meta: Meta<typeof AssistChip> = {
  title: 'components/AssistChip',
  component: AssistChip,
};

export default meta;

type Story = StoryObj<typeof AssistChip>;

export const Basico: Story = {};

const ChipInteractivo = ({ variant }: { variant: AssistChipVariant }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <AssistChip
      variant={variant}
      selected={isSelected}
      onSelectedChange={setIsSelected}
    >
      {variant.toUpperCase()}
    </AssistChip>
  );
};
const variants: AssistChipVariant[] = [
  'primary',
  'filled',
  'elevated',
  'tonal',
  'outlined',
];

export const ListaDinamica = () => (
  <div className="flex gap-2">
    {variants.map((v) => (
      <ChipInteractivo key={v} variant={v} />
    ))}
  </div>
);

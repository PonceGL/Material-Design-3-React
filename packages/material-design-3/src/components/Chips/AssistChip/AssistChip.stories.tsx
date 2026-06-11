import React from 'react';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import AssistChip from './AssistChip';

const meta: Meta<typeof AssistChip> = {
  title: 'components/AssistChip',
  component: AssistChip,
};

export default meta;

type Story = StoryObj<typeof AssistChip>;

export const Basico: Story = {};

export const Interactivo = () => {
  const [isSelected, setIsSelected] = useState(false);

  return <AssistChip selected={isSelected} onSelectedChange={setIsSelected} />;
};

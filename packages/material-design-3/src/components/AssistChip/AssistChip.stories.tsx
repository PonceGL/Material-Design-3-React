import type { Meta, StoryObj } from '@storybook/react';

import AssistChip from './AssistChip';

const meta: Meta<typeof AssistChip> = {
  title: 'components/AssistChip',
  component: AssistChip,
};

export default meta;

type Story = StoryObj<typeof AssistChip>;

export const Basico: Story = {};

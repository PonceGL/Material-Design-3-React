import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'tonal', 'outlined', 'text'],
    },
    children: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'filled',
    children: 'Button',
    disabled: false,
  },
};

export const Filled: Story = {
  args: { variant: 'filled', children: 'Button' },
};

export const Tonal: Story = {
  args: { variant: 'tonal', children: 'Button' },
};

export const Outlined: Story = {
  args: { variant: 'outlined', children: 'Button' },
};

export const Text: Story = {
  args: { variant: 'text', children: 'Button' },
};

export const Disabled: Story = {
  args: { variant: 'filled', children: 'Button', disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Button variant="filled">Filled</Button>
      <Button variant="tonal">Tonal</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </div>
  ),
};

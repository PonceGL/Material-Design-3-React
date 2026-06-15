import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ListItem } from '../ListItem';
import { List } from './List';
import type { ListProps } from './List.types';

const InboxIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.34 3-3 3s-3-1.34-3-3H5V5h14v10z" />
  </svg>
);

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const DraftsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-12zM12 13 3.74 7.84 12 3l8.26 4.84L12 13z" />
  </svg>
);

const meta: Meta<typeof List> = {
  title: 'Components/Lists/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'segmented'],
      description:
        '`standard` (default) renders items flush with no background. `segmented` wraps the list in a `surface` container with 12dp gap between items.',
    },
    children: {
      control: false,
      description: '`ListItem` elements.',
    },
    testId: {
      control: 'text',
      description: 'Propagado como `data-testid` en el elemento raíz.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: (args) => (
    <List {...args} className="max-w-sm" aria-label="Example list">
      <ListItem
        leading={<InboxIcon />}
        label="Inbox"
        supportingText="124 unread messages"
        trailing="2h"
      />
      <ListItem leading={<StarIcon />} label="Starred" trailing="9" />
      <ListItem
        leading={<SendIcon />}
        label="Sent"
        supportingText="Last sent 2 days ago"
      />
      <ListItem
        leading={<DraftsIcon />}
        label="Drafts"
        supportingText="3 pending drafts"
      />
    </List>
  ),
  args: {
    variant: 'standard',
  },
};

export const Standard: Story = {
  render: () => (
    <List className="max-w-sm" aria-label="Standard list">
      <ListItem
        leading={<InboxIcon />}
        label="Inbox"
        supportingText="124 unread messages"
        trailing="2h"
        onClick={() => {}}
      />
      <ListItem
        leading={<StarIcon />}
        label="Starred"
        trailing="9"
        onClick={() => {}}
      />
      <ListItem
        leading={<SendIcon />}
        label="Sent"
        supportingText="Last sent 2 days ago"
        onClick={() => {}}
      />
      <ListItem
        leading={<DraftsIcon />}
        label="Drafts"
        supportingText="3 pending drafts"
        onClick={() => {}}
      />
    </List>
  ),
};

export const Segmented: Story = {
  render: () => (
    <List variant="segmented" className="max-w-sm" aria-label="Segmented list">
      <ListItem
        leading={<InboxIcon />}
        label="Inbox"
        supportingText="124 unread messages"
        trailing="2h"
        onClick={() => {}}
      />
      <ListItem
        leading={<StarIcon />}
        label="Starred"
        trailing="9"
        onClick={() => {}}
      />
      <ListItem
        leading={<SendIcon />}
        label="Sent"
        supportingText="Last sent 2 days ago"
        onClick={() => {}}
      />
      <ListItem
        leading={<DraftsIcon />}
        label="Drafts"
        supportingText="3 pending drafts"
        onClick={() => {}}
      />
    </List>
  ),
};

type ListArgs = Omit<ListProps, 'children'>;

function SelectionListExample(args: ListArgs) {
  const [selected, setSelected] = useState<number | null>(0);
  const items = [
    {
      label: 'Inbox',
      supportingText: '124 unread messages',
      icon: <InboxIcon />,
    },
    { label: 'Starred', icon: <StarIcon /> },
    {
      label: 'Sent',
      supportingText: 'Last sent 2 days ago',
      icon: <SendIcon />,
    },
    {
      label: 'Drafts',
      supportingText: '3 pending drafts',
      icon: <DraftsIcon />,
    },
  ];

  return (
    <List {...args} className="max-w-sm" aria-label="Navigation list">
      {items.map((item, index) => (
        <ListItem
          key={item.label}
          leading={item.icon}
          label={item.label}
          supportingText={item.supportingText}
          selected={selected === index}
          onClick={() => setSelected(index)}
        />
      ))}
    </List>
  );
}

export const SelectionList: Story = {
  name: 'Selection List (single-select)',
  render: (args) => <SelectionListExample {...args} />,
  args: { variant: 'standard' },
};

function SegmentedSelectionExample() {
  const [selected, setSelected] = useState<number | null>(1);
  const items = [
    { label: 'Inbox', icon: <InboxIcon /> },
    { label: 'Starred', icon: <StarIcon /> },
    { label: 'Sent', icon: <SendIcon /> },
  ];

  return (
    <List
      variant="segmented"
      className="max-w-sm"
      aria-label="Segmented navigation"
    >
      {items.map((item, index) => (
        <ListItem
          key={item.label}
          leading={item.icon}
          label={item.label}
          selected={selected === index}
          onClick={() => setSelected(index)}
        />
      ))}
    </List>
  );
}

export const SegmentedSelection: Story = {
  name: 'Segmented Selection',
  render: () => <SegmentedSelectionExample />,
};

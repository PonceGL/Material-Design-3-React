import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { List } from '../List';
import { ListItem } from './ListItem';
import type { ListItemProps } from './ListItem.types';

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

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

const NotificationsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
);

function Avatar({ initials }: { initials: string }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-md-primary-container text-sm font-medium text-md-on-primary-container">
      {initials}
    </span>
  );
}

const meta: Meta<typeof ListItem> = {
  title: 'Components/Lists/ListItem',
  component: ListItem,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto principal. Obligatorio.',
    },
    overline: {
      control: 'text',
      description:
        'Texto pequeño sobre el label (M3 Expressive). Su presencia activa la altura three-line (88dp).',
    },
    supportingText: {
      control: 'text',
      description:
        'Texto secundario bajo el label. Activa la altura two-line (72dp) si `overline` está ausente.',
    },
    selected: {
      control: 'boolean',
      description:
        'Estado seleccionado — aplica `secondary-container`/`on-secondary-container` y `corner-large`.',
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita el item — opacity 0.38 y sin interacción.',
    },
    leading: {
      control: false,
      description:
        'Slot inicial: avatar, ícono, imagen, video o control de selección.',
    },
    trailing: {
      control: false,
      description: 'Slot final: ícono, texto o control de selección.',
    },
    onClick: {
      action: 'clicked',
      description:
        'Si se provee, el item renderiza un `<button>` interno de ancho completo (single-action item).',
    },
    testId: {
      control: 'text',
      description: 'Propagado como `data-testid` en el elemento raíz.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ListItem>;

function ControlledListItem({ selected, onClick, ...rest }: ListItemProps) {
  const [isSelected, setIsSelected] = useState(selected ?? false);

  return (
    <ListItem
      {...rest}
      selected={isSelected}
      onClick={() => {
        setIsSelected((prev) => !prev);
        onClick?.();
      }}
    />
  );
}

export const Primary: Story = {
  render: (args) => (
    <List className="max-w-sm" aria-label="ListItem example">
      <ListItem {...args} />
    </List>
  ),
  args: {
    label: 'Inbox',
    supportingText: '124 unread messages',
    selected: false,
    disabled: false,
  },
};

export const OneLine: Story = {
  name: 'One Line (56dp)',
  render: () => (
    <List className="max-w-sm" aria-label="One-line items">
      <ListItem label="Inbox" />
      <ListItem label="Sent" />
      <ListItem label="Drafts" />
    </List>
  ),
};

export const TwoLine: Story = {
  name: 'Two Line (72dp)',
  render: () => (
    <List className="max-w-sm" aria-label="Two-line items">
      <ListItem label="Inbox" supportingText="124 unread messages" />
      <ListItem label="Sent" supportingText="Last sent 2h ago" />
      <ListItem label="Drafts" supportingText="3 pending drafts" />
    </List>
  ),
};

export const ThreeLine: Story = {
  name: 'Three Line (88dp)',
  render: () => (
    <List className="max-w-sm" aria-label="Three-line items">
      <ListItem
        overline="Priority"
        label="Inbox"
        supportingText="124 unread messages waiting for your reply"
      />
      <ListItem
        overline="Last sent"
        label="Outbox"
        supportingText="Thanks for your feedback on the proposal!"
      />
    </List>
  ),
};

export const WithLeadingIcon: Story = {
  name: 'With Leading Icon',
  render: () => (
    <List className="max-w-sm" aria-label="Items with leading icon">
      <ListItem
        leading={<InboxIcon />}
        label="Inbox"
        supportingText="124 unread messages"
      />
      <ListItem leading={<StarIcon />} label="Starred" />
      <ListItem
        leading={<NotificationsIcon />}
        label="Notifications"
        supportingText="You have 3 new notifications"
      />
    </List>
  ),
};

export const WithLeadingAvatar: Story = {
  name: 'With Leading Avatar',
  render: () => (
    <List className="max-w-sm" aria-label="Items with leading avatar">
      <ListItem
        leading={<Avatar initials="JD" />}
        label="Jane Doe"
        supportingText="Thanks for the update!"
      />
      <ListItem
        leading={<Avatar initials="MR" />}
        label="Maria Rodríguez"
        supportingText="See you at the meeting tomorrow"
      />
      <ListItem
        leading={<Avatar initials="TP" />}
        label="Tom Parker"
        supportingText="The report is ready for review"
      />
    </List>
  ),
};

export const WithTrailingText: Story = {
  name: 'With Trailing Text',
  render: () => (
    <List className="max-w-sm" aria-label="Items with trailing text">
      <ListItem
        label="Inbox"
        supportingText="124 unread messages"
        trailing="2h"
      />
      <ListItem label="Starred" trailing="9" />
      <ListItem label="Drafts" supportingText="3 pending drafts" trailing="3" />
    </List>
  ),
};

export const WithTrailingIcon: Story = {
  name: 'With Trailing Icon',
  render: () => (
    <List className="max-w-sm" aria-label="Items with trailing icon">
      <ListItem
        label="Inbox"
        supportingText="124 unread messages"
        trailing={<ChevronRightIcon />}
        onClick={() => {}}
      />
      <ListItem
        label="Starred"
        trailing={<ChevronRightIcon />}
        onClick={() => {}}
      />
      <ListItem
        label="Settings"
        trailing={<ChevronRightIcon />}
        onClick={() => {}}
      />
    </List>
  ),
};

export const Selected: Story = {
  name: 'Selected (controlled — click to toggle)',
  render: () => (
    <List className="max-w-sm" aria-label="Selectable items">
      <ControlledListItem
        leading={<InboxIcon />}
        label="Inbox"
        supportingText="124 unread messages"
      />
      <ControlledListItem leading={<StarIcon />} label="Starred" selected />
      <ControlledListItem label="Drafts" supportingText="3 pending drafts" />
    </List>
  ),
};

export const Disabled: Story = {
  render: () => (
    <List className="max-w-sm" aria-label="Disabled items">
      <ListItem
        leading={<InboxIcon />}
        label="Inbox"
        supportingText="Not available"
        disabled
        onClick={() => {}}
      />
      <ListItem label="Starred" disabled />
    </List>
  ),
};

export const Interactive: Story = {
  name: 'Interactive (Single Action)',
  render: () => (
    <List className="max-w-sm" aria-label="Interactive list">
      <ListItem
        leading={<InboxIcon />}
        label="Inbox"
        supportingText="124 unread messages"
        trailing={<ChevronRightIcon />}
        onClick={() => {}}
      />
      <ListItem
        leading={<StarIcon />}
        label="Starred"
        trailing={<ChevronRightIcon />}
        onClick={() => {}}
      />
      <ListItem
        leading={<NotificationsIcon />}
        label="Notifications"
        trailing={<ChevronRightIcon />}
        onClick={() => {}}
      />
    </List>
  ),
};

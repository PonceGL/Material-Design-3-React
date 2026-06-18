import { useState } from 'react';

import { IconButton } from '@/components/Buttons';
import type { Meta, StoryObj } from '@storybook/react';

import { SearchBar } from './SearchBar';

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19zM10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
  </svg>
);

const MicIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11z" />
  </svg>
);

// 30dp — exact M3 measurement for the SearchBar trailing avatar.
const Avatar = () => (
  <span
    aria-hidden="true"
    className="flex h-[1.875rem] w-[1.875rem] items-center justify-center rounded-full bg-md-primary-container text-xs font-medium text-md-on-primary-container"
  >
    JD
  </span>
);

const meta: Meta<typeof SearchBar> = {
  title: 'Components/Search/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    leadingIcon: {
      control: false,
      description:
        'Icono antes del input (p. ej. lupa, o flecha "back" cuando se usa junto a un SearchView abierto).',
    },
    trailingActions: {
      control: false,
      description:
        'Hasta 2 acciones (p. ej. un IconButton de esta librería) y/o un avatar.',
    },
    placeholder: {
      control: 'text',
      description:
        'Hinted text. Recomendado además de aria-label (no lo sustituye).',
    },
    'aria-label': {
      control: 'text',
      description:
        'Nombre accesible explícito — buena práctica, aunque placeholder ya sirve como último recurso.',
    },
    testId: {
      control: 'text',
      description: 'Propagado como data-testid en el contenedor raíz.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

// Todas las stories usan `render` con el JSX de SearchBar escrito
// directamente ahí (nunca delegado a un componente con nombre propio):
// leadingIcon/trailingActions son ReactNode, así que Storybook no puede
// serializarlos de vuelta a código fuente desde `args` — ver
// TextField.stories.tsx para el mismo criterio ya aplicado.

export const Default: Story = {
  render: () => (
    <SearchBar
      aria-label="Search"
      placeholder="Search…"
      leadingIcon={<SearchIcon />}
    />
  ),
};

export const WithTrailingAction: Story = {
  name: 'With Trailing Action',
  render: () => (
    <SearchBar
      aria-label="Search"
      placeholder="Search…"
      leadingIcon={<SearchIcon />}
      trailingActions={
        <IconButton size="s" icon={<MicIcon />} aria-label="Search by voice" />
      }
    />
  ),
};

export const WithAvatar: Story = {
  name: 'With Avatar',
  render: () => (
    <SearchBar
      aria-label="Search"
      placeholder="Search…"
      leadingIcon={<SearchIcon />}
      trailingActions={<Avatar />}
    />
  ),
};

export const FocusedInteractive: Story = {
  name: 'Focused (interactive)',
  render: function Render() {
    const [focused, setFocused] = useState(false);

    return (
      <div className="flex flex-col gap-2">
        <SearchBar
          aria-label="Search"
          placeholder="Search…"
          leadingIcon={<SearchIcon />}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <p className="text-sm text-md-on-surface-variant">
          {focused
            ? 'Focused — horizontal padding shrinks from 24dp to 12dp (M3 Expressive "grow on focus").'
            : 'Click the field above to see the focus transition.'}
        </p>
      </div>
    );
  },
};

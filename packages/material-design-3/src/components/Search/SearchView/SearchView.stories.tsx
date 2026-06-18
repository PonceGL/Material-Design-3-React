import { useState } from 'react';

import { List, ListItem } from '@/components/Lists';
import type { Meta, StoryObj } from '@storybook/react';

import { SearchBar } from '../SearchBar';
import { SearchView } from './SearchView';

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

const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" />
  </svg>
);

const HistoryIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M13 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7v4l4.29-4.29L13 .42V3zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8z" />
  </svg>
);

const recentSearches = [
  'Material Design 3',
  'React component library',
  'Search bar anatomy',
  'Expressive motion',
];

const meta: Meta<typeof SearchView> = {
  title: 'Components/Search/SearchView',
  component: SearchView,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description:
        'Visibilidad del panel (estado controlado). Siempre montado en el DOM — anima vía data-state.',
    },
    layout: {
      control: 'select',
      options: ['full-screen', 'docked'],
      description: 'Default: "full-screen".',
    },
    style: {
      control: 'select',
      options: ['contained', 'divided'],
      description: 'Default: "contained".',
    },
    searchBar: {
      control: false,
      description: 'El SearchBar asociado a este panel.',
    },
    children: {
      control: false,
      description: 'Contenido de sugerencias/resultados (p. ej. List).',
    },
    testId: {
      control: 'text',
      description: 'Propagado como data-testid en el elemento raíz.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchView>;

// Todas las stories interactivas usan `render: function Render() {...}`
// con el JSX de SearchView/SearchBar escrito directamente ahí — nunca
// delegado a un componente con nombre propio aparte, para que el panel
// "Code" de Storybook siempre muestre la composición real (mismo criterio
// aplicado en TextField.stories.tsx, ver feedback_storybook_real_code).

export const FullScreenContained: Story = {
  name: 'Full-screen, Contained',
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <div className="relative w-full max-w-xl">
        <SearchView
          open={open}
          onClose={() => setOpen(false)}
          searchBar={
            <SearchBar
              aria-label="Search"
              placeholder="Search…"
              leadingIcon={
                open ? (
                  <button
                    type="button"
                    aria-label="Back"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center"
                  >
                    <BackIcon />
                  </button>
                ) : (
                  <SearchIcon />
                )
              }
              onFocus={() => setOpen(true)}
            />
          }
        >
          <List aria-label="Recent searches">
            {recentSearches.map((query) => (
              <ListItem
                key={query}
                leading={<HistoryIcon />}
                label={query}
                onClick={() => setOpen(false)}
              />
            ))}
          </List>
        </SearchView>
      </div>
    );
  },
};

export const DockedContained: Story = {
  name: 'Docked, Contained',
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <div className="relative w-full max-w-xl">
        <SearchView
          open={open}
          layout="docked"
          onClose={() => setOpen(false)}
          searchBar={
            <SearchBar
              aria-label="Search"
              placeholder="Search…"
              leadingIcon={
                open ? (
                  <button
                    type="button"
                    aria-label="Back"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center"
                  >
                    <BackIcon />
                  </button>
                ) : (
                  <SearchIcon />
                )
              }
              onFocus={() => setOpen(true)}
            />
          }
        >
          <List aria-label="Recent searches">
            {recentSearches.map((query) => (
              <ListItem
                key={query}
                leading={<HistoryIcon />}
                label={query}
                onClick={() => setOpen(false)}
              />
            ))}
          </List>
        </SearchView>
      </div>
    );
  },
};

export const Divided: Story = {
  name: 'Divided (baseline)',
  render: function Render() {
    const [open, setOpen] = useState(true);

    return (
      <div className="w-full max-w-xl">
        <SearchView
          open={open}
          style="divided"
          onClose={() => setOpen(false)}
          searchBar={
            <SearchBar
              aria-label="Search"
              placeholder="Search…"
              leadingIcon={<SearchIcon />}
              onFocus={() => setOpen(true)}
            />
          }
        >
          <List aria-label="Recent searches">
            {recentSearches.map((query) => (
              <ListItem key={query} leading={<HistoryIcon />} label={query} />
            ))}
          </List>
        </SearchView>
      </div>
    );
  },
};

export const ClosedVsOpen: Story = {
  name: 'Closed vs Open',
  render: () => (
    <div className="flex flex-wrap gap-8">
      <div className="flex w-full max-w-sm flex-col gap-2">
        <p className="text-sm font-medium text-md-on-surface-variant">
          data-state=&quot;closed&quot;
        </p>
        <SearchView
          open={false}
          searchBar={
            <SearchBar
              aria-label="Search"
              placeholder="Search…"
              leadingIcon={<SearchIcon />}
            />
          }
        >
          <List aria-label="Recent searches">
            {recentSearches.map((query) => (
              <ListItem key={query} leading={<HistoryIcon />} label={query} />
            ))}
          </List>
        </SearchView>
      </div>
      <div className="flex w-full max-w-sm flex-col gap-2">
        <p className="text-sm font-medium text-md-on-surface-variant">
          data-state=&quot;open&quot;
        </p>
        <SearchView
          open
          searchBar={
            <SearchBar
              aria-label="Search"
              placeholder="Search…"
              leadingIcon={<SearchIcon />}
            />
          }
        >
          <List aria-label="Recent searches">
            {recentSearches.map((query) => (
              <ListItem key={query} leading={<HistoryIcon />} label={query} />
            ))}
          </List>
        </SearchView>
      </div>
    </div>
  ),
};

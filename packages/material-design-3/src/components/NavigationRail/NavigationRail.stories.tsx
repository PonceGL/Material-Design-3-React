import { useRef, useState } from 'react';

import { Button, IconButton } from '@/components/Buttons';
import type { Meta, StoryObj } from '@storybook/react';

import { NavigationRail } from './NavigationRail';
import type { NavigationRailHandle } from './NavigationRail.types';
import { NavigationRailItem } from './NavigationRailItem';
import { useNavigationRail } from './useNavigationRail';

const HomeOutlineIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 3 2 12h3v8h6v-6h2v6h6v-8h3z" />
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z" />
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
    <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64zM12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5z" />
  </svg>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

const ComposeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zm17.71-10.04a1 1 0 0 0 0-1.41l-2.5-2.5a1 1 0 0 0-1.41 0l-1.96 1.96 3.75 3.75z" />
  </svg>
);

const destinations = [
  {
    id: 'home',
    label: 'Home',
    icon: <HomeOutlineIcon />,
    activeIcon: <HomeIcon />,
  },
  { id: 'search', label: 'Search', icon: <SearchIcon /> },
  { id: 'updates', label: 'Updates', icon: <NotificationsIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
];

const meta: Meta<typeof NavigationRail> = {
  title: 'Components/NavigationRail',
  component: NavigationRail,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['collapsed', 'expanded'],
      description:
        'Modo controlado. Provisto junto con `onVariantChange`, el consumidor posee el estado y `defaultVariant` se ignora.',
    },
    defaultVariant: {
      control: 'select',
      options: ['collapsed', 'expanded'],
      description:
        'Variante inicial en modo no controlado. Default: "collapsed".',
    },
    modal: {
      control: 'boolean',
      description:
        'Renderiza la variante expandida como overlay modal (fondo surface-container, elevación level2, esquinas grandes). Sin efecto en collapsed.',
    },
    menu: {
      control: false,
      description:
        'Slot para el control que alterna collapsed/expanded (p. ej. un IconButton). El riel lo renderiza pero no provee su lógica.',
    },
    fab: {
      control: false,
      description:
        'Slot para un FAB opcional. En esta versión se usa un IconButton como placeholder — en el futuro será FAB/ExtendedFAB.',
    },
    children: {
      control: false,
      description: 'NavigationRailItem destinations (3-7 recomendado).',
    },
    testId: {
      control: 'text',
      description: 'Propagado como data-testid en el elemento raíz.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof NavigationRail>;

// Todas las stories interactivas usan `render: function Render() {...}` con
// el JSX escrito directamente ahí — nunca delegado a un componente con
// nombre propio aparte, para que el panel "Code" de Storybook siempre
// muestre la composición real (ver feedback_storybook_real_code).

export const Collapsed: Story = {
  name: 'Collapsed',
  render: function Render() {
    const rail = useNavigationRail('collapsed');
    const [page, setPage] = useState('home');

    return (
      <div className="h-[28rem]">
        <NavigationRail
          aria-label="Main"
          variant={rail.variant}
          menu={
            <IconButton
              variant="standard"
              icon={<MenuIcon />}
              aria-label="Toggle navigation"
              onClick={rail.toggle}
            />
          }
        >
          {destinations.map((destination) => (
            <NavigationRailItem
              key={destination.id}
              icon={destination.icon}
              activeIcon={destination.activeIcon}
              label={destination.label}
              selected={page === destination.id}
              onClick={() => setPage(destination.id)}
            />
          ))}
        </NavigationRail>
      </div>
    );
  },
};

export const Expanded: Story = {
  name: 'Expanded (standard)',
  render: function Render() {
    const rail = useNavigationRail('expanded');
    const [page, setPage] = useState('home');

    return (
      <div className="h-[28rem]">
        <NavigationRail
          aria-label="Main"
          variant={rail.variant}
          menu={
            <IconButton
              variant="standard"
              icon={<MenuIcon />}
              aria-label="Toggle navigation"
              onClick={rail.toggle}
            />
          }
        >
          {destinations.map((destination) => (
            <NavigationRailItem
              key={destination.id}
              icon={destination.icon}
              activeIcon={destination.activeIcon}
              label={destination.label}
              selected={page === destination.id}
              onClick={() => setPage(destination.id)}
            />
          ))}
        </NavigationRail>
      </div>
    );
  },
};

export const ExpandedModal: Story = {
  name: 'Expanded (modal)',
  render: function Render() {
    // El riel permanece siempre montado, alternando entre collapsed
    // (riel delgado permanente) y expanded+modal (overlay temporal) —
    // así la transición de ancho/fondo/elevación de NavigationRail.css
    // puede animarse. Desmontar y volver a montar todo el componente
    // (como hacía antes este ejemplo) salta directo al estado final,
    // sin ninguna animación posible.
    const rail = useNavigationRail('collapsed');
    const [page, setPage] = useState('home');
    const isOpen = rail.variant === 'expanded';

    return (
      <div className="relative h-[28rem] w-full max-w-2xl overflow-hidden bg-md-surface-variant">
        <div className="flex h-full flex-col gap-3 p-6 pl-28">
          <p className="text-sm font-medium text-md-on-surface-variant">
            Contenido de la página, detrás del overlay modal
          </p>
        </div>
        <div className="absolute inset-y-0 left-0">
          <NavigationRail
            aria-label="Main"
            variant={rail.variant}
            modal
            menu={
              <IconButton
                variant="standard"
                icon={<MenuIcon />}
                aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
                onClick={rail.toggle}
              />
            }
          >
            {destinations.map((destination) => (
              <NavigationRailItem
                key={destination.id}
                icon={destination.icon}
                activeIcon={destination.activeIcon}
                label={destination.label}
                selected={page === destination.id}
                onClick={() => setPage(destination.id)}
              />
            ))}
          </NavigationRail>
        </div>
      </div>
    );
  },
};

export const WithFabSlot: Story = {
  name: 'With FAB Slot',
  render: function Render() {
    const [page, setPage] = useState('home');

    return (
      <div className="h-[28rem]">
        <NavigationRail
          aria-label="Main"
          menu={
            <IconButton
              variant="standard"
              icon={<MenuIcon />}
              aria-label="Toggle navigation"
              onClick={() => {}}
            />
          }
          fab={
            <IconButton
              variant="filled"
              size="l"
              icon={<ComposeIcon />}
              aria-label="Compose"
            />
          }
        >
          {destinations.map((destination) => (
            <NavigationRailItem
              key={destination.id}
              icon={destination.icon}
              activeIcon={destination.activeIcon}
              label={destination.label}
              selected={page === destination.id}
              onClick={() => setPage(destination.id)}
            />
          ))}
        </NavigationRail>
      </div>
    );
  },
};

export const RecommendedUsage: Story = {
  name: 'Recommended Usage (useNavigationRail)',
  render: function Render() {
    const rail = useNavigationRail();
    const [page, setPage] = useState('home');

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Button size="s" variant="outlined" onClick={rail.collapse}>
            Collapse
          </Button>
          <Button size="s" variant="outlined" onClick={rail.expand}>
            Expand
          </Button>
          <span className="text-sm text-md-on-surface-variant">
            variant: {rail.variant}
          </span>
        </div>
        <div className="h-[24rem]">
          <NavigationRail
            aria-label="Main"
            variant={rail.variant}
            menu={
              <IconButton
                variant="standard"
                icon={<MenuIcon />}
                aria-label="Toggle navigation"
                onClick={rail.toggle}
              />
            }
          >
            {destinations.map((destination) => (
              <NavigationRailItem
                key={destination.id}
                icon={destination.icon}
                activeIcon={destination.activeIcon}
                label={destination.label}
                selected={page === destination.id}
                onClick={() => setPage(destination.id)}
              />
            ))}
          </NavigationRail>
        </div>
      </div>
    );
  },
};

export const AdvancedUsageRef: Story = {
  name: 'Advanced Usage (ref)',
  render: function Render() {
    const railRef = useRef<NavigationRailHandle>(null);
    const [page, setPage] = useState('home');

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Button
            size="s"
            variant="outlined"
            onClick={() => railRef.current?.collapse()}
          >
            Collapse
          </Button>
          <Button
            size="s"
            variant="outlined"
            onClick={() => railRef.current?.expand()}
          >
            Expand
          </Button>
          <Button
            size="s"
            variant="outlined"
            onClick={() => railRef.current?.toggle()}
          >
            Toggle
          </Button>
        </div>
        <div className="h-[24rem]">
          <NavigationRail aria-label="Main" ref={railRef}>
            {destinations.map((destination) => (
              <NavigationRailItem
                key={destination.id}
                icon={destination.icon}
                activeIcon={destination.activeIcon}
                label={destination.label}
                selected={page === destination.id}
                onClick={() => setPage(destination.id)}
              />
            ))}
          </NavigationRail>
        </div>
      </div>
    );
  },
};

export const LongList: Story = {
  name: 'Long List (100 Items)',
  render: function Render() {
    const [selected, setSelected] = useState(0);
    const items = Array.from({ length: 100 }, (_, index) => index);

    return (
      <div className="h-[28rem]">
        <NavigationRail aria-label="Main">
          {items.map((index) => (
            <NavigationRailItem
              key={index}
              icon={<HomeOutlineIcon />}
              activeIcon={<HomeIcon />}
              label={`Item ${index + 1}`}
              selected={selected === index}
              onClick={() => setSelected(index)}
            />
          ))}
        </NavigationRail>
      </div>
    );
  },
};

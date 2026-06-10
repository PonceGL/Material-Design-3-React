import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../components/Buttons';
import { createMD3Theme } from '../create-md3-theme';
import { MD3Provider } from './MD3Provider';
import type { MD3ProviderColorScheme } from './MD3Provider.types';

const defaultTheme = createMD3Theme({ primary: '#6750A4' });

const meta: Meta<typeof MD3Provider> = {
  title: 'Theme/MD3Provider',
  component: MD3Provider,
  tags: ['autodocs'],
  argTypes: {
    colorScheme: {
      control: 'select',
      options: ['light', 'dark', 'system'],
      description:
        'light / dark aplican el esquema forzado; system sigue la preferencia del SO.',
    },
    theme: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: {
    colorScheme: 'system',
    theme: defaultTheme,
  },
};

export default meta;

type Story = StoryObj<typeof MD3Provider>;

function ThemeDemo({ label }: { label: string }) {
  return (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: '13px',
          color: 'var(--md-sys-color-on-surface)',
        }}
      >
        {label}
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button variant="filled">Filled</Button>
        <Button variant="tonal">Tonal</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
      </div>
    </div>
  );
}

export const DefaultTheme: Story = {
  name: 'Default (system)',
  render: ({ colorScheme }: { colorScheme?: MD3ProviderColorScheme }) => (
    <MD3Provider theme={defaultTheme} colorScheme={colorScheme}>
      <ThemeDemo
        label={`colorScheme="${colorScheme ?? 'system'}" — sigue la preferencia del SO`}
      />
    </MD3Provider>
  ),
};

export const ThemeSwitcher: Story = {
  name: 'Theme Switcher (usa los controles)',
  render: ({ colorScheme }: { colorScheme?: MD3ProviderColorScheme }) => (
    <MD3Provider theme={defaultTheme} colorScheme={colorScheme}>
      <ThemeDemo label={`colorScheme="${colorScheme ?? 'system'}"`} />
    </MD3Provider>
  ),
};

export const LightForced: Story = {
  name: 'Light forzado',
  render: () => (
    <MD3Provider theme={defaultTheme} colorScheme="light">
      <ThemeDemo label='colorScheme="light" — independiente del SO' />
    </MD3Provider>
  ),
};

export const DarkForced: Story = {
  name: 'Dark forzado',
  render: () => (
    <MD3Provider theme={defaultTheme} colorScheme="dark">
      <ThemeDemo label='colorScheme="dark" — independiente del SO' />
    </MD3Provider>
  ),
};

export const CustomBrandColor: Story = {
  name: 'Custom Brand Color',
  render: () => {
    const brandTheme = createMD3Theme({ primary: '#E63946' });
    return (
      <MD3Provider theme={brandTheme} colorScheme="light">
        <ThemeDemo label="primary: #E63946 — toda la paleta generada a partir del color de marca" />
      </MD3Provider>
    );
  },
};

export const MultipleThemes: Story = {
  name: 'Multiple Themes (anidados)',
  render: () => {
    const outerTheme = createMD3Theme({ primary: '#6750A4' });
    const innerTheme = createMD3Theme({ primary: '#0066CC' });
    return (
      <MD3Provider theme={outerTheme} colorScheme="light">
        <div
          style={{
            padding: '16px',
            border: '2px dashed #6750A4',
            borderRadius: '8px',
          }}
        >
          <p style={{ margin: '0 0 12px', fontSize: '12px' }}>
            Outer provider — primary: #6750A4 (pierde, el inner escribe después)
          </p>
          <MD3Provider theme={innerTheme} colorScheme="light">
            <ThemeDemo label="Inner provider — primary: #0066CC (gana: escribe último en documentElement)" />
          </MD3Provider>
        </div>
      </MD3Provider>
    );
  },
};

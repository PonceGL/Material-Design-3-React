import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';

const libSrc = resolve(process.cwd(), '../../packages/material-design-3/src');

const config: StorybookConfig = {
  stories: [
    {
      directory: libSrc,
      files: '**/*.stories.@(js|jsx|mjs|ts|tsx)',
    },
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  previewHead: (head) =>
    `${head}<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" />`,
  async viteFinal(config) {
    return {
      ...config,
      plugins: [...(config.plugins ?? []), tailwindcss()],
      resolve: {
        ...config.resolve,
        alias: {
          ...(config.resolve?.alias as Record<string, string>),
          // More specific alias must come before the generic one to avoid prefix collision
          '@poncegl/material-design-3/styles.css': resolve(libSrc, 'styles.css'),
          '@poncegl/material-design-3': resolve(libSrc, 'index.ts'),
        },
      },
    };
  },
};

export default config;

import type { Decorator, Preview } from '@storybook/react';

import '@poncegl/material-design-3/styles.css';

const withRobotoFont: Decorator = (Story) => (
  <div style={{ fontFamily: "'Roboto', sans-serif" }}>
    <Story />
  </div>
);

const preview: Preview = {
  decorators: [withRobotoFont],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      autodocs: 'tag',
    },
  },
};

export default preview;

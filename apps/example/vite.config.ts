import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const exampleDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: exampleDir,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@poncegl/material-design-3': resolve(
        exampleDir,
        '../../packages/material-design-3/src/index.ts',
      ),
    },
  },
  server: {
    port: 5173,
  },
});

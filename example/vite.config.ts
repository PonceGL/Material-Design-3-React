import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const exampleDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: exampleDir,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@ponce/material-design-3": resolve(exampleDir, "../src/index.ts"),
    },
  },
  server: {
    port: 5173,
  },
});

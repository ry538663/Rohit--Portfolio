// filepath: client/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  root: 'client',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "client", "index.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "Src"),
    },
  },
});
/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom')) {
              return 'vendor-router';
            }
            if (id.includes('react-error-boundary') || id.includes('react-helmet-async')) {
              return 'vendor-react-utils';
            }
            if (id.includes('@reduxjs/toolkit') || id.includes('redux')) {
              return 'vendor-redux';
            }
            if (id.includes('react-redux')) {
              return 'vendor-react-redux';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'vendor-query';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-lucide';
            }
            if (id.includes('react-icons')) {
              return 'vendor-react-icons';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            if (id.includes('video.js')) {
              return 'vendor-video';
            }
            if (id.includes('leaflet') || id.includes('react-leaflet')) {
              return 'vendor-maps';
            }
            if (id.includes('react-dom')) {
              return 'vendor-react-dom';
            }
            if (id.includes('react') || id.includes('scheduler')) {
              return 'vendor-react';
            }
            return 'vendor-misc';
          }
          if (id.includes('/src/components/ui/')) {
            if (id.includes('Modal') || id.includes('Dropdown') || id.includes('Table')) {
              return 'ui-complex';
            }
            if (id.includes('DatePicker') || id.includes('Combobox') || id.includes('Select')) {
              return 'ui-forms';
            }
            return 'ui-components';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ["@reduxjs/toolkit", "react-redux"]
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: 'playwright',
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }]
  }
});
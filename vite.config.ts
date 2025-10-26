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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core vendor chunks
          "vendor-react": ["react", "react-dom"],
          "vendor-redux": ["@reduxjs/toolkit", "react-redux"],
          // Lazy reducer chunks (will be dynamically loaded)
          ...generateLazyReducerChunks()
        }
      }
    },
    // Enable code splitting
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ["@reduxjs/toolkit", "react-redux"]
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
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

// Helper function to generate lazy reducer chunks
function generateLazyReducerChunks() {
  // This will be populated dynamically as reducers are added
  // For now, we'll set up the pattern for future lazy reducers
  return {
    // Example: 'reducer-users': ['src/state/users'],
    // Example: 'reducer-products': ['src/state/products'],
  };
}
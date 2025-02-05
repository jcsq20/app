import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    setupFiles: './vitest.setup.ts',
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/dist/**', '**/src/shared/api/**'],
    coverage: {
      include: ['**/src/**/*.{ts,tsx}'],
      provider: 'v8',
      reporter: ['json', 'lcov', 'text', 'clover', 'cobertura'],
      exclude: [
        '**/src/**/*.test.{ts,tsx}',
        '**/src/shared/api/**',
        '**/src/shared/assets/**',
        '**/src/shared/i18n/**',
        '**/src/shared/reactQuery/**',
        '**/src/shared/theme/**',
        '**/src/shared/utils/**',
      ],
    },
  },
  plugins: [react()],
  build: {
    outDir: './dist',
    rollupOptions: {
      input: 'index.html', // replace with the entry point of your app
    },
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
});

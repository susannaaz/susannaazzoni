import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/susannaazzoni/',

  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },

  server: {
    port: 3000,
    host: true,
  },

  preview: {
    port: 3000,
    host: true,
  },
});
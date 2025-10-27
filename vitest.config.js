import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // ⬅️ ¡Debe estar en 'plugins'!
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./setupTests.js'],
  },
});


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative paths work on GitHub Pages subpaths
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});

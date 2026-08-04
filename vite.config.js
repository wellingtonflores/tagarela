import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Base relativa para funcionar dentro do Electron e build local
  server: {
    port: 5173,
    strictPort: true
  }
});

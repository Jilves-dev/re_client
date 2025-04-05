import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Osoittaa palvelimelle
        changeOrigin: true,
       // rewrite: (path) => path.replace(/^\/api/, '') // Poistaa ylimääräisen "/api"-prefiksin
      }
    }
  }
});


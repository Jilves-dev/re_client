import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    // Make sure environment variables are properly exposed to the client
    'process.env.VITE_API': JSON.stringify(process.env.VITE_API),
    'process.env.VITE_SERVER_URL': JSON.stringify(process.env.VITE_SERVER_URL),
  },
})






/*import { defineConfig } from 'vite'
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
  server: {*/
   /* proxy: {
      '/api': {
        target: 'http://localhost:8000', // Osoittaa palvelimelle
        changeOrigin: true,
      }
    }*//*
  }
});*/


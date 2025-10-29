import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables for the current mode
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
      server: {
    host: '0.0.0.0', // Salli yhteydet ulkopuolelta
    port: 5173
  },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      // Explicitly expose the VITE_API env variable
      'import.meta.env.VITE_API': JSON.stringify(env.VITE_API)
    }
  }
})
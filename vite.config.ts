import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Configuración limpia y ultra compatible para producción en Vercel
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: false,
    minify: true,
  },
  server: {
    host: '0.0.0.0',
    port: 8443,
  }
})

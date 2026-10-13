import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- Importamos Tailwind de forma segura
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // <-- Activamos los estilos en los plugins de Vite
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: false,
    minify: true,
  }
})

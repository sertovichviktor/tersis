import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Используем встроенный esbuild, он точно есть и он быстрее
    minify: 'esbuild',
    sourcemap: false
  }
})

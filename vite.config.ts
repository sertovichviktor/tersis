import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Это позволяет использовать @ для папки src
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Отключаем sourcemaps для ускорения и облегчения
    sourcemap: false,
    // Используем стандартный минификатор
    minify: 'esbuild',
  },
})

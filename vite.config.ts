import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // ВЫКЛЮЧИ ЭТО, чтобы файлы были легче
    minify: 'terser', // Хорошее сжатие
  }
})

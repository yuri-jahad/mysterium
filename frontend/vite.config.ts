import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  base: "./",
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, 'src') }
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx']  // Ajout des extensions
  },
  plugins: [react()]
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: "./",
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']  // Ajout des extensions
  },
  plugins: [react(), tsConfigPaths() ]
})
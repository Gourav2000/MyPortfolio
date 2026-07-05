import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed to GitHub Pages at /MyPortfolio/
export default defineConfig({
  base: '/MyPortfolio/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500,
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './docs',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/plugin.js',
        assetFileNames: 'assets/plugin.css',
        chunkFileNames: 'assets/chunk.js',
        manualChunks: undefined
      }
    }
  },
  base: 'https://amice13.github.io/react/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  }
})

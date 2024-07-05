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
        entryFileNames: 'plugin.js',
        assetFileNames: 'plugin.css',
        chunkFileNames: "chunk.js"
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

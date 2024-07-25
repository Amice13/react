import dotenv from 'dotenv'
dotenv.config()

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
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'assets/chunk.js',
        inlineDynamicImports: true,
        manualChunks: undefined
      }
    }
  },
  base: 'https://amice13.github.io/react/',
  define: {
    'process.env': {
      IS_DEV: process.env.IS_DEV === 'TRUE',
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@faker': fileURLToPath(new URL('./src/plugins/faker', import.meta.url)),
      '@validators': fileURLToPath(new URL('./src/plugins/validators', import.meta.url)),
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

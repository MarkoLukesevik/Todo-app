import { fileURLToPath, URL } from 'node:url'

import { defineConfig as defineTestConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineTestConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})

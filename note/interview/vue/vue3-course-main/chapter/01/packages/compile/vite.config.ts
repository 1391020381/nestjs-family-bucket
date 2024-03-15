import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 第三方依赖
          if (id.includes('node_modules')) {
            // Vue 相关 chunk
            if (id.includes('@vue') || id.includes('vue-router')) {
              return 'vue';
            }
            // 其他依赖
            return 'vendor';
          }
        },
      },
    },
  },
})

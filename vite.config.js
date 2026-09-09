import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api/sharekhan': {
        target: 'https://mcpuat.sharekhan.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/sharekhan/, '/api/v1/chat/completions'),
        secure: false
      }
    }
  }
})

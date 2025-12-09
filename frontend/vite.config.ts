import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  base: '/',
  define: {
    'import.meta.env.VITE_BUILD_ID': JSON.stringify(process.env.VERCEL_GIT_COMMIT_SHA || String(Date.now()))
  }
})



import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiProxyTarget = env.VITE_DEV_PROXY_API_TARGET || 'http://localhost:8080';
  const wsProxyTarget = env.VITE_DEV_PROXY_WS_TARGET || 'ws://localhost:8080';

  return {
    plugins: [react()],
    server: {
      port: 5173,
      strictPort: false,
      open: true,
      host: true,
      allowedHosts: true,
      proxy: {
        '/api': {
          target: apiProxyTarget,
          changeOrigin: true,
          secure: apiProxyTarget.startsWith('https://')
        },
        '/ws': {
          target: wsProxyTarget,
          ws: true,
          changeOrigin: true,
          secure: wsProxyTarget.startsWith('wss://')
        }
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'antd-vendor': ['antd', '@ant-design/icons'],
            'chart-vendor': ['recharts'],
            'scan-vendor': ['@zxing/browser', 'qrcode']
          }
        }
      }
    }
  }
})

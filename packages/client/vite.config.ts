import { defineConfig, mergeConfig } from 'vite';
import commonConfig from '../../vite.config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

const buildVersion = process.env.VITE_APP_BUILD_VERSION ?? '';

export default defineConfig(
  mergeConfig(commonConfig, {
    base: buildVersion ? `/${buildVersion}/` : '/',
    plugins: [react()],
    build: {
      outDir: path.resolve(__dirname, '../server/client'),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          // Use content hashing for long-term caching.
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]',
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
    test: {
      environment: 'jsdom',
      include: ['src/**/*.spec.{ts,tsx}'],
      emptyOutDir: true,
      globals: true,
      setupFiles: ['./setupTests.js'],
    },
  })
);

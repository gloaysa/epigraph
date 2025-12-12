import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// Define common Vite config
export default defineConfig({
  plugins: [tsconfigPaths()],
});

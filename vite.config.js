import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      aos: path.resolve(__dirname, 'node_modules/aos'),
    },
  },
});
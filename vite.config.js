import { resolve } from 'path';
import { defineConfig } from 'vite';

const LIB_NAME = 'ElAnimate';

export default defineConfig({
  root: './playground',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      formats: ['cjs', 'es', 'iife', 'umd'],
      name: LIB_NAME,
    },
  },
});

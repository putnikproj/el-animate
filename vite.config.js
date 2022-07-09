import { resolve } from 'path';
import { defineConfig } from 'vite';
import { babel } from '@rollup/plugin-babel';

const LIB_NAME = 'el-animate';
const LIB_NAME_CAMEL = 'ELAnimate';

export default defineConfig({
  root: './playground',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['cjs', 'es', 'iife', 'umd'],
      name: LIB_NAME_CAMEL,
      fileName: (format) => {
        if (format === 'cjs') {
          return `${LIB_NAME}.js`;
        }

        return `${LIB_NAME}.${format}.js`;
      },
    },
    rollupOptions: {
      plugins: [
        babel({
          babelHelpers: 'bundled',
          exclude: 'node_modules/**',
          extensions: ['.js', '.ts'],
        }),
      ],
      output: {
        generatedCode: 'es5',
      },
    },
  },
  server: { hmr: { clientPort: process.env.CODESPACES ? 443 : undefined } },
});

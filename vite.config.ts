/// <reference types="vite/client" />
/// <reference types="vitest" />
import path, { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import dts from 'vite-plugin-dts'
import { visualizer } from 'rollup-plugin-visualizer'


export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler"],
        ]
      }
    }),
    libInjectCss(),
    dts({
      exclude: ['**/*.stories.tsx', 'src/test', '**/*.test.tsx', '**/*.spec.tsx'],
      tsconfigPath: 'tsconfig.app.json',
      include: ['src/**/*'],
      insertTypesEntry: true,
      copyDtsFiles: true,
    }),
    visualizer({
      filename: 'dist/bundle-analysis.html',
      open: false,
      gzipSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['es'],
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: [
        /^react(\/.*)?$/,
        /^react-dom(\/.*)?$/,
        /^dayjs(\/.*)?$/,
        'clsx',
      ],
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name][extname]',
        globals: {
          react: 'React',
          'react-dom': 'React-dom',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      include: ['src/components'],
      exclude: ['**/*.stories.tsx'],
    },
  }
})

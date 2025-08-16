import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import type { Plugin } from 'vite';
import svgLoaderPlugin from 'vite-svg-loader';

function createSvgLoaderPlugin(): Plugin<any> {
  return svgLoaderPlugin({
    svgo: true,
    defaultImport: 'component',
  });
}

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'VueUI',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', '@libs/shared-types', 'bootstrap-icons-vue', '@vueuse/core'],
      output: {
        globals: {
          vue: 'Vue',
          '@libs/shared-types': 'SharedTypes',
          'bootstrap-icons-vue': 'BootstrapIconsVue',
          '@vueuse/core': 'VueUse',
        },
      },
    },
    outDir: 'dist',
  },
  plugins: [
    vue(),
    createSvgLoaderPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@libs/shared-types': path.resolve(__dirname, '../shared-types/src/index.ts'),
    },
  },
});


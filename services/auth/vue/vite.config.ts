import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';
import svgLoaderPlugin from 'vite-svg-loader';

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
  // Load env file from the root directory where the .env file is located
  const env = loadEnv(mode, path.resolve(__dirname, '../../../'), '');
  
  return {
    server: {
      host: env.VITE_AUTH_HOST || 'auth.qroog.local',
      port: Number(env.VITE_AUTH_PORT) || 5173,
    },
    plugins: [
      vue(),
      svgLoaderPlugin({
        svgo: true,
        defaultImport: 'component',
      }) as any,
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@libs/vue-ui': path.resolve(__dirname, '../../../libs/vue-ui/src/index.ts'),
        '@libs/shared-types': path.resolve(__dirname, '../../../libs/shared-types/src/index.ts'),
        '@libs/shared-env': path.resolve(__dirname, '../../../libs/shared-env/src/index.ts'),
        '@libs/styles': path.resolve(__dirname, '../../../libs/styles/src/style.css'),
      }
    },
    optimizeDeps: {
      include: ['@libs/vue-ui', '@libs/shared-types', '@libs/shared-env', '@libs/styles', '@vueuse/core']
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss,
          autoprefixer,
        ],
      },
    },
    // Make env variables available to the client
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      // Shared environment variables
      'import.meta.env.VITE_WEBSITE_HOST': JSON.stringify(env.VITE_WEBSITE_HOST),
      'import.meta.env.VITE_WEBSITE_PORT': JSON.stringify(env.VITE_WEBSITE_PORT),
      'import.meta.env.VITE_WEBSITE_APP_URL': JSON.stringify(env.VITE_WEBSITE_APP_URL),
      'import.meta.env.VITE_AUTH_HOST': JSON.stringify(env.VITE_AUTH_HOST),
      'import.meta.env.VITE_AUTH_PORT': JSON.stringify(env.VITE_AUTH_PORT),
      'import.meta.env.VITE_AUTH_API_URL': JSON.stringify(env.VITE_AUTH_API_URL),
      'import.meta.env.VITE_AUTH_APP_URL': JSON.stringify(env.VITE_AUTH_APP_URL),
    },
  };
});

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import svgLoaderPlugin from 'vite-svg-loader'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, '../../../'), '');

  return {
    plugins: [
      vue(),
      svgLoaderPlugin({
        svgo: true,
        defaultImport: 'component',
      }) as any,
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@libs/vue-ui': path.resolve(__dirname, '../../../libs/vue-ui/src/index.ts'),
        '@libs/shared-types': path.resolve(__dirname, '../../../libs/shared-types/src/index.ts'),
        '@libs/shared-env': path.resolve(__dirname, '../../../libs/shared-env/src/index.ts'),
        '@libs/styles': path.resolve(__dirname, '../../../libs/styles/src/style.css'),
      },
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
    server: {
      host: env.VITE_WEBSITE_HOST,
      port: Number(env.VITE_WEBSITE_PORT),
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
  }
})

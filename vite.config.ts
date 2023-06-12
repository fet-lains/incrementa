import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "@/assets/less/variables.less";',
        },
      },
    },
    optimizeDeps: {
      exclude: ['*-legacy'],
    },
    plugins: [
      vue(),
      VitePWA({
        manifest: {
          icons: [
            {
              src: '/favicon.svg',
              sizes: '512x512',
              type: 'image/svg',
              purpose: 'any maskable',
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
  });
};

import VueDevTools from 'vite-plugin-vue-devtools';
import dynamicImport from 'vite-plugin-dynamic-import';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const devPlugins = mode === 'development' ? [VueDevTools()] : [];

  return defineConfig({
    build: {
      target: 'esnext',
      assetsDir: 'static',
      rollupOptions: {
        output: {
          assetFileNames: assetInfo => {
            if (!assetInfo.name) {
              throw new Error('Assets name not found');
            }

            let extType = assetInfo.name.split('.').at(1);

            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'img';
            }

            return `static/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
        },
      },
    },
    server: {
      port: 9001,
      host: true,
    },
    plugins: [vue(), dynamicImport(), ...devPlugins],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
    },
  });
};

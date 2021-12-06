import path from 'path';
import { UserConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import vuePlugin from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import vueJsxPlugin from '@vitejs/plugin-vue-jsx';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import visualizer from 'rollup-plugin-visualizer';

export default ({ command }) => {
  const config: UserConfig = {
    plugins: [
      vuePlugin(),
      vueJsxPlugin(),
      eslintPlugin({
        cache: false,
        include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx']
      }),
      Components({
        dts: true,
        globalNamespaces: ['global'],
        include: [/\.vue$/],
        resolvers: [ElementPlusResolver({ ssr: true, importStyle: 'css' })],
        directoryAsNamespace: true
      })
    ],
    server: {
      port: 80
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  };

  if (command === 'build') {
    config.plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true
      })
    );
  }

  return config;
};

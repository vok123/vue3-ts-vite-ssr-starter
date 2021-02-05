import path from 'path';
import { UserConfig } from 'vite';
const vueJsxPlugin = require('@vitejs/plugin-vue-jsx');
const vuePlugin = require('@vitejs/plugin-vue');

export default {
  port: 80,
  plugins: [vuePlugin(), vueJsxPlugin()],
  alias: {
    '@': path.resolve(__dirname, 'src'),
    '@img': path.resolve(__dirname, 'src/assets/img')
  }
} as UserConfig;

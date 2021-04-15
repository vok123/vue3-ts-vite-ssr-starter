import path from 'path';
import { UserConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
const vueJsxPlugin = require('@vitejs/plugin-vue-jsx');
const vuePlugin = require('@vitejs/plugin-vue');

export default {
  port: 80,
  plugins: [
    vuePlugin(),
    vueJsxPlugin(),
    eslintPlugin({
      cache: false,
      include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
} as UserConfig;

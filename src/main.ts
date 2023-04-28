import { createPinia } from 'pinia';
import { createSSRApp } from 'vue';
import App from './app.vue';
import createRouter from '@/router';
import { ID_INJECTION_KEY } from 'element-plus';

export function createApp() {
  const app = createSSRApp(App);
  const store = createPinia();
  const router = createRouter();
  app.use(store).use(router);
  app.provide(ID_INJECTION_KEY, {
    prefix: 1024,
    current: 0
  });

  return { app, router, store };
}

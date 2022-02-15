import 'uno.css';
import App from './app.vue';
import '@/assets/css/index.css';
import { createApp } from 'vue';
import { isPromise } from './utils';
import createRouter from './router/';
import 'element-plus/theme-chalk/base.css';
import { createPinia } from 'pinia';

const router = createRouter();
const store = createPinia();

const app = createApp(App);
app.use(router).use(store);

router.beforeResolve((to, from, next) => {
  let diffed = false;
  const matched = router.resolve(to).matched;
  const prevMatched = router.resolve(from).matched;

  if (from && !from.name) {
    return next();
  }
  const activated = matched.filter((c, i) => {
    return diffed || (diffed = prevMatched[i] !== c);
  });
  if (!activated.length) {
    return next();
  }
  const matchedComponents: any = [];
  matched.map((route) => {
    matchedComponents.push(...Object.values(route.components));
  });
  const asyncDataFuncs = matchedComponents.map((component: any) => {
    const asyncData = component.asyncData || null;
    if (asyncData) {
      const config = {
        store,
        route: to
      };
      if (isPromise(asyncData) === false) {
        return Promise.resolve(asyncData(config));
      }
      return asyncData(config);
    }
  });
  try {
    Promise.all(asyncDataFuncs).then(() => {
      next();
    });
  } catch (err) {
    next(err as any);
  }
});

if (window.__INITIAL_STATE__) {
  store.state.value = window.__INITIAL_STATE__;
}
router.isReady().then(() => {
  app.mount('#app', true);
});

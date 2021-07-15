import App from './app.vue';
import el from 'element-plus';
import '@/assets/css/index.css';
import createStore from './store/';
import { createApp } from 'vue';
import { isPromise } from './utils';
import createRouter from './router/';
import { sync } from 'vuex-router-sync';
import 'element-plus/lib/theme-chalk/index.css';

const router = createRouter();
const store = createStore();
sync(store, router);

const app = createApp(App);
app.use(router).use(store);
app.use(el);

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
    next(err);
  }
});

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}
router.isReady().then(() => {
  app.mount('#app', true);
});

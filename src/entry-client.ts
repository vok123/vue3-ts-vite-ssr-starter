import { createSSRApp } from 'vue';
import App from './app.vue';
import '@/assets/css/index.css';
import createRouter from './router/';
import createStore from './store/';
import el from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import { isPromise } from './utils';

const router = createRouter();
const store = createStore();

const app = createSSRApp(App);
app.use(router).use(store);
app.use(el);

router.beforeResolve((to, from, next) => {
  let diffed = false;
  const matched = router.resolve(to).matched;
  const prevMatched = router.resolve(from).matched;

  if (from && !from.name && process.env.NODE_ENV !== 'development') {
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

import App from './app.vue';
import { createSSRApp } from 'vue';
import { isPromise } from './utils';
import createRouter from './router/';
import { renderToString } from '@vue/server-renderer';
import { createPinia } from 'pinia';

function renderPreloadLinks(modules, manifest) {
  let links = '';
  const seen = new Set();
  modules.forEach((id) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}

function renderPreloadLink(file) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`;
  } else {
    return '';
  }
}

export async function render(url, manifest) {
  const router = createRouter();
  const store = createPinia();
  const app = createSSRApp(App);
  app.use(router).use(store);
  router.push(url);
  try {
    await router.isReady();
    const to = router.currentRoute;
    const matchedRoute = to.value.matched;
    if (to.value.matched.length === 0) {
      return '';
    }
    const matchedComponents = [];
    matchedRoute.map((route) => {
      matchedComponents.push(...Object.values(route.components));
    });
    const asyncDataFuncs = matchedComponents.map((component) => {
      const asyncData = component.asyncData || null;
      if (asyncData) {
        const config = {
          store,
          route: to
        };
        if (isPromise(asyncData) === false) {
          const result = asyncData(config);
          return Promise.resolve(result);
        }
        return asyncData(config);
      }
    });
    await Promise.all(asyncDataFuncs);
    const ctx = {};
    const html = await renderToString(app, ctx);
    const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
    const state = JSON.stringify(store.state.value);
    return [html, state, preloadLinks];
  } catch (error) {
    console.log(error);
  }
}

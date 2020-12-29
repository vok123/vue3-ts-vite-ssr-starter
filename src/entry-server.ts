import { createSSRApp } from 'vue';
import renderer from '@vue/server-renderer';
import App from './app.vue';
import el from 'element-plus';
import createRouter from './router/';
import createStore from './store/';
import { isPromise } from './utils';
import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http');
const express = require('express');
const path = require('path');

const server = express();

server.use('/_assets', express.static(path.join(__dirname, '../client/_assets')));

server.get('*', (req: any, res: any) => {
  const router = createRouter();
  const store = createStore();
  const app = createSSRApp(App);
  app.use(router).use(store).use(el);
  router.push(req.url);
  router.isReady().then(() => {
    const to = router.currentRoute;
    const matchedRoute = to.value.matched;
    if (to.value.matched.length === 0) {
      res.end();
      return;
    }
    const matchedComponents: any = [];
    matchedRoute.map((route) => {
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
          const result = asyncData(config);
          return Promise.resolve(result);
        }
        return asyncData(config);
      }
    });

    (async () => {
      await Promise.all(asyncDataFuncs);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const html = await renderer.renderToString(app);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const state = JSON.stringify(store.state);
      res.end(`__HTML__`);
    })();
  });
});

server.listen(80, () => {
  console.log('started server at http://localhost');
});

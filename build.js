const { ssrBuild, build } = require('vite');
const replace = require('@rollup/plugin-replace');
const rollupAlias = require('@rollup/plugin-alias');
const path = require('path');

const aliasConfig = {
  '@': 'src',
  '@img': 'src/assets/img'
};

(async () => {

  const aliasPlugin = rollupAlias({
    entries: Object.keys(aliasConfig).map(key => {
      return { find: key, replacement: path.resolve(__dirname, aliasConfig[key]) };
    })
  });

  const clientResult = await build({
    outDir: 'dist/client',
    rollupInputOptions: {
      input: 'index.html',
      plugins: [aliasPlugin]
    },
    emitManifest: true,
    env: {
      VITE_VUE_ENV: 'client'
    }
  });
  await ssrBuild({
    outDir: 'dist/server',
    assetsDir: '',
    base: '/_assets',
    env: {
      VITE_VUE_ENV: 'server'
    },
    cssCodeSplit: true,
    rollupInputOptions: {
      input: 'src/entry-server.ts',
      plugins: [
        aliasPlugin,
        replace({
          __HTML__: clientResult[0].html.replace(
            '<div id="app">',
            '<div id="app" data-server-rendered="true">${html}' + '<script>window.__INITIAL_STATE__=${state}</script>'
          )
        })
      ]
    }
  });

  process.exit();
})();

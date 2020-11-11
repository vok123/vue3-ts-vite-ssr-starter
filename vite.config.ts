import { UserConfig } from 'vite';

const aliasConfig: Record<string, string> = {
  '@/': 'src/',
  '@img/': 'src/assets/img/'
};
export default {
  port: 80,
  optimizeDeps: {
    include: ['element-plus/lib/index.esm']
  },
  resolvers: [
    {
      alias (id) {
        let path = '';
        Object.keys(aliasConfig).find(key => {
          if (id.startsWith(key)) {
            const dir = '/' + aliasConfig[key];
            path = dir + id.slice(key.length);
          }
          return !!path;
        });
        return path;
      }
    }
  ]
} as UserConfig;
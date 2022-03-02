/* eslint-disable spaced-comment */
import { RouteRecordRaw } from 'vue-router';
import { Pinia } from 'pinia';

export interface IAsyncDataContext {
  route: RouteRecordRaw;
  store: Pinia;
}
declare module '@vue/runtime-core' {
  interface ComponentCustomOptions {
    asyncData?(context: IAsyncDataContext): Promise<any>;
  }
}

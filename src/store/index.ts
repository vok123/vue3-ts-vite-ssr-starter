import { RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router';
import { createStore, DispatchOptions, Store, useStore as vuexUseStore } from 'vuex';
import market, { IMarketState, IMarketStore } from './modules/market';
import user, { IUserState, IUserStore } from './modules/user';

interface IRouterExtends extends RouteLocationNormalized {
  from: RouteLocationNormalizedLoaded
}
export interface IRootState {
  user: IUserState;
  market: IMarketState;
  route: IRouterExtends;
}

export type IRootStore = IUserStore<Pick<IRootState, 'user'>> & IMarketStore<Pick<IRootState, 'market'>>;

const storeDispatchWarp = (store: Store<IRootState>) => {
  const { dispatch } = store;

  store.dispatch = (type: string, payload: any, options?: DispatchOptions) => {
    const { from } = store.state.route;
    if (from?.name || import.meta.env.SSR) {
      return dispatch(type, payload, options);
    }
    return Promise.resolve();
  };

  return store;
};

export default () => {
  const store = createStore<IRootState>({
    strict: true,
    modules: {
      user: user(),
      market: market()
    }
  });
  
  return storeDispatchWarp(store);
};

export const useStore = () => {
  return vuexUseStore<IRootState>();
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: IRootStore;
  }
}

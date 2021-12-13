import { InjectionKey } from 'vue';
import { RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router';
import { createStore, DispatchOptions, Store, useStore as baseUseStore } from 'vuex';
import market, { IMarketState } from './modules/market';
import user, { IUserState } from './modules/user';

export interface IModules {
  user: IUserState;
  market: IMarketState;
}

export interface IRootState {
  version: string;
  route?: IRouterExtends;
}

type TRootStore = Store<IRootState & IModules>;

export const storeKey = 'vuex-store' as unknown as InjectionKey<TRootStore>;

interface IRouterExtends extends RouteLocationNormalized {
  from: RouteLocationNormalizedLoaded;
}

const storeDispatchWarp = (store: Store<IRootState>) => {
  const { dispatch } = store;

  store.dispatch = (type: string, payload: any, options?: DispatchOptions) => {
    const { from } = store.state.route || {};
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
    state: {
      version: '1.0.0'
    },
    modules: {
      user: user(),
      market: market()
    }
  });

  return store || storeDispatchWarp(store);
};

export const useStore = () => {
  return baseUseStore(storeKey);
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<TRootStore>;
  }
}

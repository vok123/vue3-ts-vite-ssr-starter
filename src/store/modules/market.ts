import { getFruitList, IFruitItem } from '@/api/market';
import { Module } from 'vuex';
import { IRootState } from '..';
export interface IMarketState {
  fruitList: IFruitItem[];
}

export default () => {
  const market: Module<IMarketState, IRootState> = {
    namespaced: true,
    state: {
      fruitList: []
    },
    mutations: {
      updateFruitList(state, list: IFruitItem[]) {
        state.fruitList = list;
      }
    },
    actions: {
      async getFruitList({ commit }) {
        try {
          const data = await getFruitList();
          commit('updateFruitList', data);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return market;
};

import Axios from 'axios';
import { Module, Store } from 'vuex';
import { IRootState } from '..';
interface IFruitItem {
  id: number;
  name: string;
  price: number;
}
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
          const { data } = await Axios.get('http://localhost:5656/list');
          if (data.code === 0) {
            commit('updateFruitList', data.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return market;
};
export type IMarketStore<S = IMarketState> = Store<S>;

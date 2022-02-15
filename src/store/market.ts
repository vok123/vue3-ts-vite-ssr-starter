import { getFruitList, IFruitItem } from '@/api/market';
import { defineStore } from 'pinia';

export interface IMarketState {
  fruitList: IFruitItem[];
}

export const useMarket = defineStore('market', {
  state(): IMarketState {
    return {
      fruitList: []
    };
  },
  actions: {
    async getList() {
      try {
        const data = await getFruitList();
        this.fruitList = data;
      } catch (error) {
        console.log(error);
      }
    }
  }
});

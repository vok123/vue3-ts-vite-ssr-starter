import Axios from 'axios';

interface IResponse<T> {
  code: number;
  data: T;
  msg: string;
}

export interface IFruitItem {
  id: number;
  name: string;
  price: number;
}

export const getFruitList = async () => {
  const { data } = await Axios.get<IResponse<IFruitItem[]>>('/justTest/getFruitList');
  if (data.code === 0) {
    return data.data;
  }
  return [];
};
import { Module, Store } from 'vuex';
import { IRootState } from '..';
interface IUser {
  name: string;
  userId: string;
  token: string;
}
export interface IUserState {
  userInfo: IUser;
}

export default () => {
  const user: Module<IUserState, IRootState> = {
    namespaced: true,
    state: {
      userInfo: {
        name: '',
        userId: '',
        token: ''
      }
    },
    getters: {
      isLogin(state) {
        return !!state.userInfo.token;
      }
    },
    mutations: {
      updateToken(state, token: string) {
        state.userInfo.token = token;
      },
      updateUser(state, user: IUser) {
        state.userInfo = user;
      }
    },
    actions: {
      updateToken({ commit }, token: string) {
        commit('updateToken', token);
      }
    }
  };
  return user;
};
export type IUserStore<S = IUserState> = Store<S>;

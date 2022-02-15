import { defineStore } from 'pinia';

interface IUser {
  name: string;
  userId: string;
  token: string;
}
export interface IUserState {
  userInfo: IUser;
}

export const useUser = defineStore('user', {
  state(): IUserState {
    return {
      userInfo: {
        name: '',
        userId: '',
        token: ''
      }
    };
  },
  actions: {
    updateUser(info: IUser) {
      this.userInfo = info;
    },
    updateToken(token: string) {
      this.userInfo.token = token;
    }
  }
});

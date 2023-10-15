import { create } from 'zustand';
import { MethodWrap } from './base';
import { login, logout } from 'src/util/axios';

interface UserState {
  user: {
    name: string;
    userId: string;
    token: string;
  } | null;
}

interface MethodParam {
  login: {
    name: string;
    userId: string;
    token: string;
  };
  logout: void;
}

type StateType = UserState & MethodWrap<MethodParam>;

const INIT_STATE: UserState = {
  user: null,
};

const userInfo = window.localStorage.getItem('userInfo');

if (userInfo) {
  const { name, userId, token } = JSON.parse(userInfo);
  if (typeof name === 'string' && typeof userId === 'string' && typeof token === 'string') {
    INIT_STATE.user = {
      name,
      userId,
      token,
    };
    login(token);
  }
}

const useUserStore = create<StateType>((set) => ({
  ...INIT_STATE,
  login: (userInfo) => {
    set({ user: userInfo });
    login(userInfo.token);
    window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
  },
  logout: () => {
    set({ user: null });
    logout();
    window.localStorage.removeItem('userInfo');
  },
}));

export default useUserStore;

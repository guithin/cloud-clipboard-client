import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

export const login = (token: string) => {
  instance.defaults.headers.common.Authorization = token;
};

export const logout = () => {
  delete instance.defaults.headers.common.Authorization;
};

export default instance;

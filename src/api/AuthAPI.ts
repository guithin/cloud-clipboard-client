import axios from 'src/util/axios';
import { AuthIO } from 'common';

class AuthAPI {
  login(body: AuthIO.Login['ReqB']) {
    return axios.post<AuthIO.Login['ResB']>('/api/auth/login', body);
  }
}

export default new AuthAPI();

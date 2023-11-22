import axios from 'src/util/axios';
import { ClipboardIO } from 'common';

class AuthAPI {
  enterRoom(bucket: string) {
    return axios.get<ClipboardIO.EnterRoom['ResB']>('/api/clipboard/enter-room', {
      params: { bucket },
    });
  }
}

export default new AuthAPI();

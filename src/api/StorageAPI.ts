import axios from '../util/axios';
import { StorageIO } from 'common';

class StorageAPI {
  readDir(body: StorageIO.ReadDir['ReqB']) {
    return axios.post<StorageIO.ReadDir['ResB']>('/api/storage/readdir', body);
  }

  downloadItem(params: StorageIO.Download['ReqQ']) {
    return axios.get<ArrayBuffer>('/api/storage/download', {
      params,
      responseType: 'arraybuffer',
    });
  }

  getBucketList() {
    return axios.get<StorageIO.BucketLst['ResB']>('/api/storage/bucketlist');
  }
}

export default new StorageAPI();

import axios from 'src/util/axios';
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

  uploadItem(body: StorageIO.Upload['ReqB'], file: File) {
    const formData = new FormData();
    formData.append('file', file);
    Object.entries(body).forEach(([key, value]) => 
      formData.append(key, typeof value === 'string' ? value : JSON.stringify(value)),
    );
    return axios.post('/api/storage/upload', formData);
  }

  deleteItem(body: StorageIO.RmDirent['ReqB']) {
    return axios.post<StorageIO.RmDirent['ResB']>('/api/storage/rm', body);
  }

  mkdir(body: StorageIO.Mkdir['ReqB']) {
    return axios.post<StorageIO.Mkdir['ResB']>('/api/storage/mkdir', body);
  }

  mv(body: StorageIO.MvDirent['ReqB']) {
    return axios.post<StorageIO.MvDirent['ResB']>('/api/storage/mv', body);
  }
}

export default new StorageAPI();

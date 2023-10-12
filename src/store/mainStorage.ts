import { create } from 'zustand';
import { MethodWrap, OnlyState } from './base';
import { StorageIO } from 'common';
import StorageAPI from '../api/StorageAPI';

interface MemberVars {
  bucket: string;

  paths: string[];
  pathStr: string;

  items: StorageIO.ReadDir['ResB']['result'];

  loading: boolean;
}

interface MethodParam {
  refresh: void;
  enter: {
    bucket: string;
    path: string;
  };
}

type StateType = MemberVars & MethodWrap<MethodParam>;

const INIT_STATE: MemberVars = {
  bucket: '',
  paths: [],
  pathStr: '',
  items: [],
  loading: false,
};

const exampleStore = create<StateType>((set) => ({
  ...INIT_STATE,
  refresh: () => {
    set((state) => {
      StorageAPI.readDir({
        bucket: state.bucket,
        path: state.pathStr,
      }).then((res) => {
        set({ items: res.data.result, loading: false });
      });
      return { loading: true };
    });
  },
  enter: ({ bucket, path }) => {
    set((state) => {
      StorageAPI.readDir({
        bucket,
        path,
      }).then((res) => {
        set({
          items: res.data.result,
          loading: false,
        });
      });
      return {
        bucket,
        paths: path.split('/'),
        pathStr: path,
        loading: true,
      };
    });
  },
}));

export default exampleStore as OnlyState<StateType>;

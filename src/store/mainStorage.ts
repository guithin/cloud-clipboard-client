import { create } from 'zustand';
import { MethodWrap } from './base';
import { StorageIO } from 'common';
import StorageAPI from 'src/api/StorageAPI';
import { ArrayElement } from 'src/util/types';


type ItemType = ArrayElement<StorageIO.ReadDir['ResB']['result']>;
interface MemberVars {
  bucket: string;

  paths: string[];
  pathStr: string;

  items: StorageIO.ReadDir['ResB']['result'];

  loading: boolean;

  sltdItem: ItemType | null;
  contextMenu: {
    x: number;
    y: number;
  } | null;
}

interface MethodParam {
  refresh: void;
  enter: {
    bucket: string;
    path: string;
  };
  setSltItem: ItemType | null;
  openContextMenu: {
    x: number;
    y: number;
  };
  closeContextMenu: void;
}

type StateType = MemberVars & MethodWrap<MethodParam>;

const INIT_STATE: MemberVars = {
  bucket: '',
  paths: [],
  pathStr: '',
  items: [],
  loading: false,
  sltdItem: null,
  contextMenu: null,
};

const useMainStorageStore = create<StateType>((set) => ({
  ...INIT_STATE,
  refresh: () => {
    set((state) => {
      StorageAPI.readDir({
        bucket: state.bucket,
        path: state.pathStr,
      }).then((res) => {
        const items = res.data.result.sort((a, b) => Number(a.isFile) - Number(b.isFile));
        set({ items, loading: false });
      });
      return { loading: true };
    });
  },
  enter: ({ bucket, path }) => {
    set(() => {
      StorageAPI.readDir({
        bucket,
        path,
      }).then((res) => {
        const items = res.data.result.sort((a, b) => Number(a.isFile) - Number(b.isFile));
        set({
          items,
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
  setSltItem: (sltdItem) => set({ sltdItem }),
  openContextMenu: (contextMenu) => set({ contextMenu }),
  closeContextMenu: () => set({ contextMenu: null }),
}));

export default useMainStorageStore;

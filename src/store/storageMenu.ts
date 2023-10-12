import { create } from 'zustand';
import { StorageIO } from 'common';
import { MethodWrap, OnlyState } from './base';
import { ArrayElement } from '../util/types';

type ItemType = ArrayElement<StorageIO.ReadDir['ResB']['result']>;

interface MemberVars {
  info: {
    x: number;
    y: number;
    item: ItemType | null;
  } | null;
}

interface MethodParam {
  open: {
    x: number;
    y: number;
    item: ItemType;
  };
  onClose: void;
}

type StateType = MemberVars & MethodWrap<MethodParam>;

const INIT_STATE: MemberVars = {
  info: null,
};

const useStorageMenuStore = create<StateType>((set) => ({
  ...INIT_STATE,
  open: (info) => set({ info }),
  onClose: () => set({ info: null }),
}));

export default useStorageMenuStore as OnlyState<StateType>;

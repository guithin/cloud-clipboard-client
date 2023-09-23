import { create } from 'zustand';
import { MethodWrap, OnlyState } from './base';

interface MemberVars {
  id: string;
}

interface MethodParam {
  setId: string;
  unsetId: void;
}

type StateType = MemberVars & MethodWrap<MethodParam>;

const INIT_STATE: MemberVars = {
  id: '',
};

const exampleStore = create<StateType>((set) => ({
  ...INIT_STATE,
  setId: (id) => set({ id }),
  unsetId: () => set({ id: '' }),
}));

export default exampleStore as OnlyState<StateType>;

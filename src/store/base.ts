export type MethodWrap<T extends object> = {
  [K in keyof T]: T[K] extends void ? () => void : (p: T[K]) => void;
}

export interface OnlyState<T> {
  (): T;
}

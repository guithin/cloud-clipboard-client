import type { SxProps } from '@mui/material';

type DefaultStyleKeys =
  '__vc' |
  '__hc' |
  'w100' |
  'flex' |
  'h100';

const defaultStyle: { [key in DefaultStyleKeys]: SxProps } = {
  flex: {
    display: 'flex',
  },
  __vc: {
    display: 'flex',
    justifyContent: 'center',
  },
  __hc: {
    display: 'flex',
    alignItems: 'center',
  },
  w100: {
    width: '100%',
  },
  h100: {
    height: '100%',
  },
};

class StyleHelper<K extends string> {
  sx: Record<K | DefaultStyleKeys, SxProps>;

  constructor(st: Record<K, SxProps>) {
    this.sx = st as Record<string, SxProps>;
    Object.assign(this.sx, defaultStyle);
  }

  merge(...keys: (K | DefaultStyleKeys | SxProps)[]) {
    const ret = {} as Record<string, SxProps>;
    keys.forEach(key => Object.assign(ret, typeof key === 'string' ? this.sx[key] : key));
    return ret;
  }
}

type StyleMapper = <ClassKey extends string>(st: Record<ClassKey, SxProps>) => StyleHelper<ClassKey>;

export const createStyle: StyleMapper = st => new StyleHelper(st);

import React, { useCallback, useEffect, useRef, useState } from 'react';

interface IVScrollSlot<T = any> {
  height: number;
  width: number;
  top: number;
  left: number;
  item: T;
  key: string;
}

interface IInputItem<T> {
  height: number;
  item: T;
  key: string;
}

interface IProps<T> {
  items: IInputItem<T>[];
  itemsW: number | `${number}`;
  align: 'center' | 'right' | 'left';
  onItemRebatch?: (height: number) => unknown;
  renderf: (item: T) => JSX.Element;
  infinite?: (...a: any[]) => unknown;
  infiniteDisable?: boolean | (() => boolean);
  infiniteDistance?: number;
  reverse?: boolean;
}

const styles: {
  [key: string]: React.CSSProperties;
} = {
  top: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  wrappper: {
    position: 'relative',
    paddingBottom: '30px',
    width: '100%',
  },
};

const VirtualScroll = <T extends any>(props: IProps<T>): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);

  const [converted, setConverted] = useState<IVScrollSlot<T>[][]>([]);
  const [render, setRender] = useState<IVScrollSlot<T>[]>([]);
  const [height, setHeight] = useState(0);

  const convertItem = useCallback(() => {
    const { items, itemsW, align, onItemRebatch } = props;
    if (items.length === 0) {
      setHeight(0);
      setConverted([]);
      if (onItemRebatch) onItemRebatch(0);
      return;
    }
    const wrapper = ref.current;
    if (!wrapper) return;
    let realW = 0;
    let numPerWidth = 0;
    if (typeof itemsW === 'string') {
      numPerWidth = parseInt(itemsW, 10);
      realW = ~~((wrapper.clientWidth - 5) / numPerWidth);
    } else {
      realW = itemsW;
      numPerWidth = ~~((wrapper.clientWidth - 5) / itemsW);
    }
    if (numPerWidth === 0) return;
    let baseLeft = 0;
    if (align === 'right') {
      baseLeft = wrapper.clientWidth - numPerWidth * realW;
    } else if (align === 'center') {
      baseLeft = (wrapper.clientWidth - numPerWidth * realW) / 2;
    }
    const convertedLst: IVScrollSlot<T>[][] = new Array<IVScrollSlot<T>[]>(numPerWidth)
      .fill([])
      .map(() => []);
    const hLst: number[] = new Array(numPerWidth).fill(0);
    let maxHeight = 0;
    items.forEach(({ item, height, key }) => {
      const lowIdx = hLst.reduce((r, v, i, a) => (v >= a[r] ? r : i), -1);
      convertedLst[lowIdx].push({
        top: hLst[lowIdx] * (props.reverse ? -1 : 1) - height,
        left: baseLeft + lowIdx * realW,
        width: realW,
        item,
        height,
        key,
      });
      maxHeight = Math.max(maxHeight, hLst[lowIdx] + height);
      hLst[lowIdx] += height;
    });
    setHeight(maxHeight);
    if (props.reverse) {
      for (let i = 0; i < hLst.length; i++) {
        convertedLst[i].forEach((item) => item.top += hLst[i]);
      }
    }
    setConverted(convertedLst);
    if (onItemRebatch) onItemRebatch(maxHeight);
  }, [props]);

  const handleScroll = useCallback((scrollAct = false) => {
    const wrapper = ref.current;
    if (!wrapper) return;
    const { parentElement } = wrapper;
    if (!parentElement) return;
    const nowVYStart = parentElement.getBoundingClientRect().y - wrapper.getBoundingClientRect().y;
    const nowVYEnd = nowVYStart + parentElement.clientHeight;
    const newRenderLst: IVScrollSlot<T>[] = [];
    converted.forEach((lst) => {
      lst.forEach((item) => {
        if (item.top <= nowVYEnd && item.top + item.height >= nowVYStart) {
          newRenderLst.push(item);
        }
      });
    });
    setRender(newRenderLst);
    if (props.infinite) {
      const d = props.infiniteDisable;
      if ((typeof d === 'boolean' && d === false) || (typeof d === 'function' && d() === false)) {
        const isEndOfScroll = props.reverse ?
          nowVYStart <= 100 :
          nowVYEnd + (props.infiniteDistance || 100) >= height;
        if (isEndOfScroll) {
          props.infinite();
        }
      }
    }
    if (scrollAct && props.reverse) {
      const { parentElement } = wrapper;
      if (!parentElement) return;
      parentElement.scrollTop = parentElement.scrollHeight;
    }
  }, [converted, props, height]);

  useEffect(() => {
    window.addEventListener('resize', convertItem);
    return () => {
      window.removeEventListener('resize', convertItem);
    };
  }, [props]);

  useEffect(() => {
    convertItem();
  }, [props.items]);

  useEffect(() => {
    handleScroll(true);
  }, [converted]);

  return (
    <div style={styles.top} onScroll={() => handleScroll(false)}>
      <div ref={ref} style={{
        ...styles.wrappper,
        height: `${Math.max(10, height)}px`,
      }}>
        {render.map((i) => (
          <div
            style={{
              width: `${i.width}px`,
              top: `${i.top}px`,
              left: `${i.left}px`,
              height: `${i.height}px`,
              position: 'absolute',
              // transition: 'all .2s cubic-bezier(.55,0,.1,1)',
            }}
            key={i.key}
          >
            {props.renderf(i.item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualScroll;

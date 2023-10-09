const beforeCuts = [
  { units: '방금 전', divN: 1, nxtN: 60 },
  { units: '분 전', divN: 60, nxtN: 60 },
  { units: '시간 전', divN: 60 * 60, nxtN: 24 },
  { units: '일 전', divN: 24 * 60 * 60, nxtN: 7 },
];

export const getBeforeStr = (dt: Date) => {
  const now = new Date();
  const diff = now.getTime() - dt.getTime();
  for (let i = 0; i < beforeCuts.length; i++) {
    const { divN, nxtN } = beforeCuts[i];
    const value = Math.floor(diff / (divN * 1000));
    if (value < nxtN) {
      return `${i ? value : ''}${beforeCuts[i].units}`;
    }
  }
  return `${dt.getFullYear()}.${dt.getMonth() + 1}.`;
};

export const getSizeStr = (size: number) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let divN = 1;
  for (let i = 0; i < units.length; i++) {
    if (size < divN * 1024) {
      return `${Math.floor(size / divN)}${units[i]}`;
    }
    divN *= 1024;
  }
  return `어디까지 커질텐가`;
};

export const downloadFile = (data: ArrayBuffer, name: string) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', name);
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(url);
  link.remove();
};

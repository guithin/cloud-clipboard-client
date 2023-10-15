import React, { useState } from 'react';
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, MenuItem, Typography } from '@mui/material';
import { useMainStorageStore } from 'src/store';
import { ArrayElement } from 'src/util/types';
import { StorageIO } from 'common';
import { getSizeStr } from 'src/util/funcs';

interface DetailEl {
  key: string;
  displayStr: string;
  value: (item: ArrayElement<StorageIO.ReadDir['ResB']['result']>) => string;
}

const detailLst: DetailEl[] = [{
  key: 'name',
  displayStr: '이름',
  value: (item) => item.name,
}, {
  key: 'size',
  displayStr: '크기',
  value: (item) => getSizeStr(item.size),
}, {
  key: 'fileType',
  displayStr: '파일 타입',
  value: (item) => {
    if (!item.isFile) {
      return '폴더';
    }
    const temp = item.name.split('.');
    const ext = temp[temp.length - 1];
    return ext.toUpperCase() + ' 파일';
  },
}, {
  key: 'uploadTime',
  displayStr: '업로드 시간',
  value: (item) => {
    const dt = new Date(item.birthtime);
    return `${dt.getFullYear()}년 ${dt.getMonth() + 1}월 ${dt.getDate()}일, ${dt.getHours()}시 ${dt.getMinutes()}분 ${dt.getSeconds()}초`;
  },
}];

const ElDetail: React.FC = () => {
  const mss = useMainStorageStore();

  const [diaOpen, setDiaOpen] = useState(false);

  const [bucket, ...paths] = location.pathname.split('/').filter((path) => path !== '').slice(1);

  if (!mss.contextMenu || mss.sltdItem === null) {
    return null;
  }

  const { sltdItem } = mss;

  return (
    <>
      <MenuItem
        onClick={() => setDiaOpen(true)}
        onKeyDown={e => e.stopPropagation()}
      >
        상세정보
      </MenuItem>
      <Dialog
        open={diaOpen}
        onClose={mss.closeContextMenu}
      >
        <DialogTitle>상세정보</DialogTitle>
        <DialogContent sx={{ width: '450px' }}>
          <DialogContentText sx={{ color: '#000' }}>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ width: '40%' }}>
                Bucket
              </Typography>
              <Typography sx={{ width: '60%' }}>
                {bucket}
              </Typography>
            </Box>
          </DialogContentText>
          <DialogContentText sx={{ color: '#000' }}>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ width: '40%' }}>
                위치
              </Typography>
              <Typography sx={{ width: '60%' }}>
                {paths.join('/') || '/'}
              </Typography>
            </Box>
          </DialogContentText>
          {detailLst.map((dt) => (
            <DialogContentText key={dt.key} sx={{ color: '#000' }}>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ width: '40%' }}>
                  {dt.displayStr}
                </Typography>
                <Typography sx={{ width: '60%' }} noWrap>
                  {dt.value(sltdItem)}
                </Typography>
              </Box>
            </DialogContentText>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ElDetail;

import React, { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import { useMainStorageStore, useStorageMenuStore } from '../../../store';
import StorageAPI from '../../../api/StorageAPI';

const ElNewFolder: React.FC = () => {
  const location = useLocation();

  const mssRefresh = useMainStorageStore(st => st.refresh);
  const { info, onClose } = useStorageMenuStore();

  const [dirName, setDirName] = useState('');
  const [diaOpen, setDiaOpen] = useState(false);

  const handleClick = useCallback((dirName: string) => {
    if (!info || info.item) return;
    setDiaOpen(false);
    const [bucket, ...paths] = location.pathname.split('/').filter((path) => path !== '').slice(1);
    StorageAPI.mkdir({
      bucket,
      path: paths.join('/') + `/${dirName}`,
    }).then(() => {
      setDirName('');
      mssRefresh();
      onClose();
    }).catch(() => {
      alert('폴더 생성에 실패하였습니다.');
    });
  }, []);

  return (
    <>
      <MenuItem onClick={() => setDiaOpen(true)}>
        새 폴더
      </MenuItem>
      <Dialog
        open={diaOpen}
        onClose={() => setDiaOpen(false)}
      >
        <DialogTitle>새 폴더</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id='name'
            label='폴더 이름'
            value={dirName}
            onChange={({ target: { value } }) => setDirName(value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClick(dirName)}
            color='primary'
          >
            만들기
          </Button>
          <Button
            onClick={() => {
              setDiaOpen(false);
              setDirName('');
              onClose();
            }}
            color='primary'
          >
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ElNewFolder;
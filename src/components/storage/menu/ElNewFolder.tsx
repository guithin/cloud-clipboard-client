import React, { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import { useMainStorageStore } from 'src/store';
import StorageAPI from 'src/api/StorageAPI';

const ElNewFolder: React.FC = () => {
  const location = useLocation();

  const mss = useMainStorageStore();

  const [dirName, setDirName] = useState('');
  const [diaOpen, setDiaOpen] = useState(false);

  const handleClose = useCallback(() => {
    setDiaOpen(false);
    setDirName('');
    mss.closeContextMenu();
  }, [mss]);

  const handleClick = useCallback((dirName: string) => {
    if (!mss.contextMenu || mss.sltdItem) return;
    setDiaOpen(false);
    const [bucket, ...paths] = location.pathname.split('/').filter((path) => path !== '').slice(1);
    StorageAPI.mkdir({
      bucket,
      path: paths.join('/') + `/${dirName}`,
    }).then(() => {
      handleClose();
      mss.refresh();
    }).catch(() => {
      alert('폴더 생성에 실패하였습니다.');
    });
  }, [handleClose, mss, location.pathname]);

  return (
    <>
      <MenuItem
        onClick={() => setDiaOpen(true)}
        onKeyDown={e => e.stopPropagation()}
      >
        새 폴더
      </MenuItem>
      <Dialog
        open={diaOpen}
        onClose={handleClose}
      >
        <DialogTitle>새 폴더</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ mt: 1 }}
            label='폴더 이름'
            onKeyDown={(e) => e.stopPropagation()}
            onChange={(e) => setDirName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClick(dirName)} color='primary'>
            만들기
          </Button>
          <Button
            onClick={handleClose}
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

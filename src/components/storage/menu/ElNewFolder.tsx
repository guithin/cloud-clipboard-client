import React, { useCallback, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import { useMainStorageStore } from 'src/store';
import StorageAPI from 'src/api/StorageAPI';
import { createStyle } from 'src/util/styleHelter';

const style = createStyle({
  dialogContent: {
    width: '400px',
  },
  textField: {
    width: '100%',
    mt: 1,
  },
})

const ElNewFolder: React.FC = () => {

  const mss = useMainStorageStore();

  const [dirName, setDirName] = useState('');
  const [diaOpen, setDiaOpen] = useState(false);

  const handleClose = useCallback(() => {
    setDiaOpen(false);
    setDirName('');
    mss.closeContextMenu();
  }, [mss, setDirName]);

  const handleClick = useCallback((dirName: string) => {
    if (!mss.contextMenu || mss.sltdItem) return;
    setDiaOpen(false);
    StorageAPI.mkdir({
      bucket: mss.bucket,
      path: mss.pathStr + `/${dirName}`,
    }).then(() => {
      handleClose();
      mss.refresh();
    }).catch(() => {
      alert('폴더 생성에 실패하였습니다.');
    });
  }, [handleClose, mss]);

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
        <DialogContent sx={style.sx.dialogContent}>
          <TextField
            sx={style.sx.textField}
            label='폴더 이름'
            onKeyDown={(e) => e.stopPropagation()}
            onChange={(e) => setDirName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClick(dirName)} variant="contained">
            만들기
          </Button>
          <Button onClick={handleClose}>
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ElNewFolder;

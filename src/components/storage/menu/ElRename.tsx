import React, { useCallback, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import { useMainStorageStore } from 'src/store';
import { createStyle } from 'src/util/styleHelter';
import StorageAPI from 'src/api/StorageAPI';

const style = createStyle({
  dialogContent: {
    width: '400px',
  },
  textField: {
    width: '100%',
    mt: 1,
  },
})

const ElRename: React.FC = () => {
  const mss = useMainStorageStore();

  const [nname, setNname] = useState('');
  const [diaOpen, setDiaOpen] = useState(false);

  const handleClose = useCallback(() => {
    setDiaOpen(false);
    setNname('');
    mss.closeContextMenu();
  }, [mss, setNname]);

  const handleClick = useCallback(() => {
    if (!mss.sltdItem) return;
    const idx = mss.items.findIndex((item) => item.name === nname);
    if (idx !== -1 && confirm('이미 존재하는 이름입니다. 덮어쓰시겠습니까?') === false) {
      return;
    }
    StorageAPI.mv({
      bucket: mss.bucket,
      srcPath: [mss.pathStr, mss.sltdItem.name].join('/'),
      destPath: [mss.pathStr, nname].join('/'),
    }).then(() => {
      handleClose();
      mss.refresh();
    }).catch(() => {
      alert('이름 변경에 실패하였습니다.');
    });
  }, [nname, mss, handleClose]);

  return (
    <>
      <MenuItem
        onClick={() => {
          setDiaOpen(true);
          setNname(mss.sltdItem?.name || '');
        }}
        onKeyDown={e => e.stopPropagation()}
      >
        이름 바꾸기
      </MenuItem>
      <Dialog
        open={diaOpen}
        onClose={handleClose}
      >
        <DialogTitle>이름 바꾸기</DialogTitle>
        <DialogContent sx={style.sx.dialogContent}>
          <TextField
            sx={style.sx.textField}
            label='이름'
            value={nname}
            onChange={(e) => setNname(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} variant="contained">
            이름 바꾸기
          </Button>
          <Button onClick={handleClose}>
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ElRename;

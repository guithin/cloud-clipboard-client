import React, { useCallback, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItemButton, MenuItem, Typography } from '@mui/material';
import { StorageIO } from 'common';
import { useMainStorageStore } from 'src/store';
import { createStyle } from 'src/util/styleHelter';
import { Folder, Image, InsertDriveFile } from '@mui/icons-material';
import StorageAPI from 'src/api/StorageAPI';

const style = createStyle({
  dialogContent: {
    width: '450px',
    height: '30vh',
  },
  lstItemBtn: {
    borderBottom: '1px solid #e0e0e0',
  },
});


const getDirentIcon = (isFile: boolean, name: string) => {
  if (!isFile) {
    return <Folder sx={{ color: 'gray' }} />;
  }
  const ext = name.split('.').slice(-1)[0];
  const imageExts = ['jpg', 'png', 'gif', 'jpeg'];
  if (imageExts.includes(ext)) {
    return <Image sx={{ color: '#c13232' }} />;
  }
  return <InsertDriveFile />;
};

interface State {
  pathStr: string;
  items: StorageIO.ReadDir['ResB']['result'];
  loading: boolean;
}

const ElMove: React.FC = () => {
  const mss = useMainStorageStore();

  const [diaOpen, setDiaOpen] = useState(false);
  const [state, setState] = useState<State>({
    pathStr: mss.pathStr,
    items: mss.items,
    loading: false,
  });

  const handleClose = useCallback(() => {
    setState({
      pathStr: '',
      items: [],
      loading: false,
    });
    setDiaOpen(false);
    mss.closeContextMenu();
  }, [mss]);

  const handleClick = useCallback((name: string) => {
    const bucket = mss.bucket;
    const nxtPath = name === '..' ?
      state.pathStr.split('/').slice(0, -1).join('/') :
      [state.pathStr, name].join('/');

    StorageAPI.readDir({
      bucket,
      path: nxtPath,
    }).then((res) => {
      const { result } = res.data;
      setState({
        pathStr: nxtPath,
        items: [...result.filter(i => !i.isFile), ...result.filter(i => i.isFile)],
        loading: false,
      });
    });
    setState({ ...state, pathStr: nxtPath, loading: true });
  }, [mss, state]);

  const handleConfirm = useCallback(() => {
    if (!mss.contextMenu || !mss.sltdItem) return;
    const idx = state.items.findIndex(i => i.name === mss.sltdItem?.name);
    if (idx !== -1 && confirm('이미 존재하는 파일입니다. 덮어쓰시겠습니까?') === false) {
      return;
    }
    StorageAPI.mv({
      bucket: mss.bucket,
      srcPath: [mss.pathStr, mss.sltdItem.name].join('/'),
      destPath: [state.pathStr, mss.sltdItem.name].join('/'),
    }).then(() => {
      handleClose();
      mss.refresh();
    }).catch(() => {
      alert('이동에 실패하였습니다.');
    });
  }, [mss, state, handleClose]);

  if (!mss.contextMenu || !mss.sltdItem) {
    return null;
  }

  const LoadingJSX: JSX.Element = <Typography>로딩 중...</Typography>;

  const ListJSX: JSX.Element = (
    <List>
      {state.pathStr !== '' && (
        <ListItemButton sx={style.sx.lstItemBtn} onClick={() => handleClick('..')}>
          <Folder sx={{ color: 'gray' }} />
          <Typography sx={{ ml: 1 }}>..</Typography>
        </ListItemButton>
      )}
      {state.items.map((item) => (
        <ListItemButton
          key={item.name}
          sx={style.sx.lstItemBtn}
          disabled={item.isFile}
          onClick={() => handleClick(item.name)}
        >
          {getDirentIcon(item.isFile, item.name)}
          <Typography sx={{ ml: 1 }}>
            {item.name}
          </Typography>
        </ListItemButton>
      ))}
    </List>
  );

  return (
    <>
      <MenuItem
        onClick={() => setDiaOpen(true)}
        onKeyDown={e => e.stopPropagation()}
      >
        이동
      </MenuItem>
      <Dialog
        open={diaOpen}
        onClose={handleClose}
      >
        <DialogTitle>
          "{mss.sltdItem.name}" 이동
          <DialogContentText sx={{ mt: 1 }}>
            현재 위치: {state.pathStr || '/'}
          </DialogContentText>
        </DialogTitle>
        <DialogContent sx={style.sx.dialogContent}>
          {state.loading ? LoadingJSX : ListJSX}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleConfirm}>
            Confirm
          </Button>
          <Button onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ElMove;

import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TableCell, TableRow, Typography } from '@mui/material';
import { Folder, InsertDriveFile, Image } from '@mui/icons-material';
import { StorageIO } from 'common';
import { ArrayElement } from 'src/util/types';
import { createStyle } from 'src/util/styleHelter';
import StorageAPI from 'src/api/StorageAPI';
import { downloadFile, getBeforeStr, getSizeStr } from 'src/util/funcs';
import { useMainStorageStore } from 'src/store';

type ItemType = ArrayElement<StorageIO.ReadDir['ResB']['result']>;

const style = createStyle({
  root: {
    width: '100%',
  },
  item: {
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
    cursor: 'pointer',
    userSelect: 'none',
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

interface Props {
  item: ItemType;
}

const ExplorerItem: React.FC<Props> = ({ item }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openContextMenu, setSltItem, sltdItem } = useMainStorageStore();

  const handleClick = useCallback((nitem: ItemType) => {
    const [bucket, ...paths] = location.pathname.split('/').filter((path) => path !== '').slice(1);
    if (nitem.isFile) {
      StorageAPI.downloadItem({
        bucket,
        path: [...paths, nitem.name].join('/'),
      }).then((res) => {
        downloadFile(res.data, nitem.name);
      }).catch(() => {
        alert('error');
      });
      return;
    }
    navigate('/storage/' + [bucket, ...paths, nitem.name].join('/'));
  }, [location]);

  const handleContextMenuItem = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSltItem(item);
    openContextMenu({
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  return (
    <TableRow
      sx={style.merge('item', {
        backgroundColor: item.name === sltdItem?.name ? '#d0d0d0' : undefined,
      })}
      onClick={() => setSltItem(item)}
      onDoubleClick={() => handleClick(item)}
      onContextMenu={handleContextMenuItem}
    >
      <TableCell sx={style.sx.__hc}>
        {getDirentIcon(item.isFile, item.name)}
        <Typography sx={{ ml: 1 }}>
          {item.name}
        </Typography>
      </TableCell>
      <TableCell align="right">{item.isFile && getSizeStr(item.size)}</TableCell>
      <TableCell align="right">{getBeforeStr(new Date(item.mtime))}</TableCell>
    </TableRow>
  );
};

export default ExplorerItem;

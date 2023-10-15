import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useMainStorageStore } from 'src/store';
import ElDelete from './ElDelete';
import ElNewFolder from './ElNewFolder';
import ElDetail from './ElDetail';

const ContextMenu: React.FC = () => {
  const { contextMenu, closeContextMenu, sltdItem } = useMainStorageStore();

  if (contextMenu === null) {
    return null;
  }

  return (
    <Menu
      open={true}
      onClose={closeContextMenu}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      anchorReference="anchorPosition"
      anchorPosition={{ top: contextMenu.y, left: contextMenu.x }}
      slotProps={{
        paper: {
          sx: {
            width: '200px',
          },
        },
      }}
    >
      {sltdItem && <ElDelete />}
      {!sltdItem && <ElNewFolder />}
      {sltdItem && <ElDetail />}
      <MenuItem onKeyDown={e => e.stopPropagation()}>asdf</MenuItem>
      <MenuItem onKeyDown={e => e.stopPropagation()}>asdf</MenuItem>
    </Menu>
  );
};

export default ContextMenu;

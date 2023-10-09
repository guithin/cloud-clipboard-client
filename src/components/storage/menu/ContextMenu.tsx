import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useStorageMenuStore } from '../../../store';

const ContextMenu: React.FC = () => {
  const { info, onClose } = useStorageMenuStore();

  if (info === null) {
    return null;
  }

  return (
    <Menu
      open={true}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      anchorReference="anchorPosition"
      anchorPosition={{ top: info.y, left: info.x }}
    >
      <MenuItem>asdf</MenuItem>
      <MenuItem>asdf</MenuItem>
      <MenuItem>asdf</MenuItem>
    </Menu>
  );
};

export default ContextMenu;

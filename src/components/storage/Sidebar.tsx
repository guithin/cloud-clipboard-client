import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, Toolbar, Typography } from '@mui/material';
import { Storage } from '@mui/icons-material';
import { createStyle } from '../../util/styleHelter';
import { useUserStore } from '../../store';

const style = createStyle({
  drawer: {
    width: 240,
    flexShrink: 0,
    zIndex: 0,
    [`& .MuiDrawer-paper`]: {
      width: 240,
      boxSizing: 'border-box',
    },
  },
  item: {
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
    color: 'inherit',
    transition: `background-color
      250ms cubic-bezier(0.4, 0, 0.2, 1)0ms,box-shadow
      250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color
      250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color
      250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
  },
});

const Sidebar: React.FC = () => {
  const { user } = useUserStore();

  if (user === null) {
    return null;
  }

  return (
    <Drawer sx={style.sx.drawer} variant='permanent'>
      <Toolbar />
      <List>
        <Link
          to={'/storage/' + user.userId}
          style={{ textDecoration: 'none' }}
        >
          <ListItem sx={style.sx.item} key={'/storage/' + user.userId}>
            <ListItemIcon><Storage /></ListItemIcon>
            <Typography noWrap={true} color='textPrimary'>
              내 드라이브
            </Typography>
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default Sidebar;
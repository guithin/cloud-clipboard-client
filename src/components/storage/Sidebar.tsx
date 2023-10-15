import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, Toolbar, Tooltip, Typography } from '@mui/material';
import { Storage } from '@mui/icons-material';
import { StorageIO } from 'common';
import { createStyle } from 'src/util/styleHelter';
import { useUserStore } from 'src/store';
import StorageAPI from 'src/api/StorageAPI';

const style = createStyle({
  drawer: {
    width: 240,
    height: '100%',
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
  const [bucketList, setBucketList] = useState<StorageIO.BucketLst['ResB']['buckets']>([]);

  useEffect(() => {
    StorageAPI
      .getBucketList()
      .then((res) => setBucketList(res.data.buckets));
  }, []);

  if (user === null) {
    return null;
  }

  return (
    <Drawer sx={style.sx.drawer} variant='permanent'>
      <Toolbar />
      <List>
        <Link
          to={'/storage/' + user.userId}
          style={{ textDecoration: 'none', marginBottom: '20px', display: 'block' }}
        >
          <ListItem sx={style.sx.item} key={'/storage/' + user.userId}>
            <ListItemIcon><Storage /></ListItemIcon>
            <Typography noWrap={true} color='textPrimary'>
              내 드라이브
            </Typography>
          </ListItem>
        </Link>
        {bucketList.map((bucket) => (
          <Link
            to={'/storage/' + bucket.name}
            style={{ textDecoration: 'none' }}
            key={'/storage/' + bucket.name}
          >
            <Tooltip
              title={'owner - ' + bucket.ownerName}
              componentsProps={{
                tooltip: {
                  sx: {
                    fontSize: '15px',
                    padding: '10px 15px',
                  },
                },
              }}
            >
              <ListItem sx={style.sx.item} key={'/storage/' + bucket.name}>
                <ListItemIcon><Storage /></ListItemIcon>
                <Typography noWrap={true} color='textPrimary'>
                  {bucket.name}
                </Typography>
              </ListItem>
            </Tooltip>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
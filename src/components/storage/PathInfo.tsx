import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, List, ListItem, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createStyle } from '../../util/styleHelter';

const style = createStyle({
  list: {
    padding: '0',
    display: 'flex',
    height: '30px',
    alignItems: 'center',
    color: 'GrayText',
    ml: 2,
  },
  listItem: {
    padding: '0',
    paddingX: '10px',
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
    transition: `background-color
      250ms cubic-bezier(0.4, 0, 0.2, 1)0ms,box-shadow
      250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color
      250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color
      250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
  },
});

const PathInfo: React.FC = () => {
  const location = useLocation();

  const [pathLst, setPathLst] = useState<[string, string][]>([]);

  useEffect(() => {
    const paths = location.pathname.split('/').filter((path) => path !== '').slice(1);
    const pathLst: [string, string][] = [];
    let dstPath = '/storage';
    paths.forEach((path) => pathLst.push([dstPath += '/' + path, path]));
    setPathLst(pathLst);
  }, [location]);

  return (
    <List sx={style.sx.list}>
      {pathLst.map(([dst, name], idx) => (
        <Box sx={style.sx.__hc} key={dst}>
          <Link style={{ textDecoration: 'none' }} to={dst}>
            <ListItem sx={style.sx.listItem}>
              <Typography noWrap={true} color="black" fontSize={20}>
                {name}
              </Typography>
            </ListItem>
          </Link>
          {idx !== pathLst.length - 1 && <ArrowForwardIosIcon fontSize="small" />}
        </Box>
      ))}
    </List>
  );
};

export default PathInfo;

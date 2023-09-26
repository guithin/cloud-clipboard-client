import React from 'react';
import { createStyle } from '../util/styleHelter';
import { Box, CircularProgress } from '@mui/material';

interface IPorops {
  loading: boolean;
}

const style = createStyle({
  top: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#aaaa',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const GlobalLoading: React.FC<IPorops> = ({ loading }) => {

  if (!loading) {
    return null;
  }

  return (
    <Box sx={style.sx.top}>
      <CircularProgress size={100} />
    </Box>
  );
};

export default GlobalLoading;

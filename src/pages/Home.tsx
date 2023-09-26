import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { createStyle } from '../util/styleHelter';

const style = createStyle({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
  },
});

const Home: React.FC = () => {

  useEffect(() => {
    console.log(import.meta.env);
  }, []);

  return (
    <Box sx={style.sx.root}>
      Home
    </Box>
  );
};

export default Home;
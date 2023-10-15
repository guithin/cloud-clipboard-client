import React from 'react';
import { Box, ButtonBase, Paper, Typography } from '@mui/material';
import { Storage } from '@mui/icons-material';
import { createStyle } from 'src/util/styleHelter';
import { useNavigate } from 'react-router-dom';

const style = createStyle({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  servicePaper: {
    padding: '50px',
    ':hover': {
      backgroundColor: '#e0e0e0',
    },
    color: '#1976d2'
  },
  serviceTypo: {
    marginTop: '20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    color: 'black',
  },
});

interface ServiceInfo {
  name: string;
  icon: React.ReactNode;
  path: string;
}

const serviceInfo: ServiceInfo[] = [{
  name: 'storage',
  icon: <Storage fontSize="large" />,
  path: '/storage',
}];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={style.sx.root}>
      {serviceInfo.map(({ name, icon, path }) => (
        <ButtonBase key={name} onClick={() => navigate(path)}>
          <Paper sx={style.sx.servicePaper}>
            <Box sx={style.sx.__vc}>
              {icon}
            </Box>
            <Typography sx={style.sx.serviceTypo} variant="h6">
              {name}
            </Typography>
          </Paper>
        </ButtonBase>
      ))}
    </Box>
  );
};

export default Home;

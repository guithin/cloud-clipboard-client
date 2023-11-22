import React from 'react';
import { Box, ButtonBase, Paper, Typography } from '@mui/material';
import { Storage, ContentPaste } from '@mui/icons-material';
import { createStyle } from 'src/util/styleHelter';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'src/store';

const style = createStyle({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    gap: '20px',
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
  path: string | ((p: string) => string);
}

const serviceInfo: ServiceInfo[] = [{
  name: 'storage',
  icon: <Storage fontSize="large" />,
  path: (p: string) => `/storage/${p}`,
}, {
  name: 'clipboard',
  icon: <ContentPaste fontSize="large" />,
  path: (p: string) => `/clipboard/${p}`,
}];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const userid = useUserStore((state) => state.user?.userId);

  return (
    <Box sx={style.sx.root}>
      {serviceInfo.map(({ name, icon, path }) => (
        <ButtonBase
          key={name}
          onClick={() => {
            navigate(typeof path === 'string' ? path: path(userid ?? ''));
          }}
        >
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

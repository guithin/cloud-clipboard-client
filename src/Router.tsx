import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, IconButton } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import Home from './pages/Home';
import Login from './pages/Login';
import Storage from './pages/Storage';
import { useUserStore } from './store';
import { createStyle } from './util/styleHelter';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute label="Home"><Home /></PrivateRoute>} />
        <Route path="/storage/*" element={<PrivateRoute label="Storage"><Storage /></PrivateRoute>} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

const style = createStyle({
  appBar: {
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '60px',
    position: 'relative',
    mb: 2,
    zIndex: 2000,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  },
});

interface PrivateRouteProps {
  children: React.ReactNode;
  label: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, label }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUserStore();

  if (user === null) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <Box sx={style.sx.root}>
      <AppBar sx={style.sx.appBar}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ color: 'white', mr: 2 }} onClick={() => navigate('/')}>
            <HomeIcon />
          </IconButton>
          {label}
        </Box>
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </AppBar>
      {children}
    </Box>
  );
};

export default Router;

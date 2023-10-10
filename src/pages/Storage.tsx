import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from '../components/storage/Sidebar';
import PathInfo from '../components/storage/PathInfo';
import Explorer from '../components/storage/Explorer';
import ContextMenu from '../components/storage/menu/ContextMenu';
import { useUserStore } from '../store';

const Storage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useUserStore();

  useEffect(() => {
    if (!user) return;
    const paths = location.pathname.split('/').filter((path) => path !== '').slice(1);
    if (paths.length === 0) {
      navigate('/storage/' + user.userId);
    }
    console.log(paths);
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', display: 'flex', flex: '1 1 auto' }} id="storage-top">
      <Sidebar />
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
        <PathInfo />
        <Explorer />
      </Box>
      <ContextMenu />
    </Box>
  );
};

export default Storage;

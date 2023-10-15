import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from 'src/components/storage/Sidebar';
import PathInfo from 'src/components/storage/PathInfo';
import Explorer from 'src/components/storage/Explorer';
import ContextMenu from 'src/components/storage/menu/ContextMenu';
import { useMainStorageStore, useUserStore } from 'src/store';

const Storage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useUserStore();
  const mss = useMainStorageStore();

  useEffect(() => {
    if (!user) return;
    const [bucket, ...paths] = location.pathname.split('/').filter((path) => path !== '').slice(1);
    if (typeof bucket !== 'string' || bucket === '') {
      navigate('/storage/' + user.userId);
      return;
    }
    const pathStr = paths.join('/');
    if (pathStr !== mss.pathStr || mss.bucket !== bucket) {
      mss.enter({
        bucket,
        path: pathStr,
      });
    }
  }, [user, location, mss]);

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

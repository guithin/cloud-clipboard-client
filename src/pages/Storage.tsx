import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/storage/Sidebar';
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
    <>
      <Sidebar />
    </>
  );
};

export default Storage;

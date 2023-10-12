import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { MenuItem } from '@mui/material';
import { useMainStorageStore, useStorageMenuStore } from '../../../store';
import StorageAPI from '../../../api/StorageAPI';

const ElDelete: React.FC = () => {
  const location = useLocation();
  const { info, onClose } = useStorageMenuStore();
  const mssRefresh = useMainStorageStore((st) => st.refresh);

  const handleClick = useCallback(() => {
    if (!info || !info.item || !info.item.isFile) return;
    if (confirm('정말로 삭제하시겠습니까?') === false) return;
    const [bucket, ...paths] = location.pathname.split('/').filter((path) => path !== '').slice(1);
    StorageAPI.deleteItem({
      bucket,
      path: paths.join('/') + info.item.name,
    }).then(() => {
      mssRefresh();
      onClose();
    }).catch(() => {
      alert('삭제에 실패하였습니다.');
    });
  }, [info, location, mssRefresh]);

  if (!info || !info.item || !info.item.isFile) return null;

  return (
    <MenuItem onClick={handleClick}>
      삭제
    </MenuItem>
  );
};

export default ElDelete;

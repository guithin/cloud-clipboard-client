import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { MenuItem } from '@mui/material';
import { useStorageMenuStore } from '../../../store';
import StorageAPI from '../../../api/StorageAPI';

interface Props {
  needRefresh: () => unknown;
}

const ElDelete: React.FC<Props> = ({ needRefresh }) => {
  const location = useLocation();
  const { info } = useStorageMenuStore();

  const handleClick = useCallback(() => {
    if (!info || !info.item || !info.item.isFile) return;
    if (confirm('정말로 삭제하시겠습니까?') === false) return;
    const [bucket, ...path] = location.pathname.split('/').filter((path) => path !== '').slice(1);
    StorageAPI.deleteItem({
      bucket,
      path: path.join('/'),
    }).then(() => {
      needRefresh();
    }).catch(() => {
      alert('삭제에 실패하였습니다.');
    });
  }, [info, location]);

  if (!info || !info.item || !info.item.isFile) return null;

  return (
    <MenuItem onClick={handleClick}>
      삭제
    </MenuItem>
  );
};

export default ElDelete;

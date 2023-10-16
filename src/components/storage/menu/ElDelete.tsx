import React, { useCallback } from 'react';
import { MenuItem } from '@mui/material';
import { useMainStorageStore } from 'src/store';
import StorageAPI from 'src/api/StorageAPI';

const ElDelete: React.FC = () => {
  const mss = useMainStorageStore();

  const handleClick = useCallback(() => {
    if (!mss.sltdItem || !mss.contextMenu) return;
    if (!confirm(`(${mss.sltdItem.name}) ${mss.sltdItem.isFile ? '파일을' : '폴더를'} 정말로 삭제하시겠습니까?`)) {
      return;
    }
    StorageAPI.deleteItem({
      bucket: mss.bucket,
      path: mss.pathStr + '/' + mss.sltdItem.name,
    }).then(() => {
      mss.refresh();
      mss.closeContextMenu();
    }).catch(() => {
      alert('삭제에 실패하였습니다.');
    });
  }, [mss]);

  if (!mss.contextMenu || !mss.sltdItem) {
    return null;
  }

  return (
    <MenuItem
      onKeyDown={e => e.stopPropagation()}
      onClick={handleClick}
    >
      삭제
    </MenuItem>
  );
};

export default ElDelete;

import React, { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ExplorerItem from './ExplorerItem';
import { useMainStorageStore, useUserStore } from '../../store';
import StorageAPI from '../../api/StorageAPI';

// const style = createStyle({});

const Explorer: React.FC = () => {
  const location = useLocation();
  const { user } = useUserStore();
  const mss = useMainStorageStore();

  const ref = useRef<HTMLDivElement>(null);

  const handleDrop = useCallback(async (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.dataTransfer) return;
    const { files } = e.dataTransfer;
    const st = new Set<string>(mss.items.map((i) => i.name));
    for (let i = 0; i < files.length; i++) {
      st.add(files[i].name);
    }
    const duplicate = st.size !== (files.length + mss.items.length);
    if (duplicate && !confirm('file already exists. do you want to overwrite?')) {
      return;
    }
    const [bucket, ...paths] = location.pathname.split('/').filter((path) => path !== '').slice(1);
    if (!bucket) return;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await StorageAPI.uploadItem({
        bucket,
        path: [...paths].join('/'),
        filename: file.name,
      }, file);
    }
    mss.refresh();
  }, [mss, location, user]);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  useEffect(() => {
    if (ref.current) {
      document.addEventListener('dragover', handleDragOver);
      document.addEventListener('drop', handleDrop);
      return () => {
        document.removeEventListener('dragover', handleDragOver);
        document.removeEventListener('drop', handleDrop);
      };
    }
  }, [ref, mss.items, location]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    console.log('this is empty space');
  }, []);

  return (
    <TableContainer ref={ref} sx={{ flex: '1 1 auto' }} onContextMenu={handleContextMenu}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell width={120} align="right">크기</TableCell>
            <TableCell width={240} align="right">수정 날짜</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!mss.loading && mss.items.map((row) => (
            <ExplorerItem key={row.name} item={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Explorer;

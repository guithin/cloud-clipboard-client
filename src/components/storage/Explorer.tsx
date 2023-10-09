import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { createStyle } from '../../util/styleHelter';
import { useUserStore } from '../../store';
import StorageAPI from '../../api/StorageAPI';
import { StorageIO } from '../../../common/interfaces/storage';
import ExplorerItem from './ExplorerItem';

const style = createStyle({});

const Explorer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUserStore();

  const [item, setItem] = useState<StorageIO.ReadDir['ResB']['result']>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const [bucket, ...paths] = location.pathname.split('/').filter((path) => path !== '').slice(1);
    if (!user) return;
    if (!bucket) return;
    setLoading(true);
    StorageAPI.readDir({
      bucket,
      path: paths.join('/'),
    }).then((res) => {
      setItem(res.data.result.sort((a, b) => Number(a.isFile) - Number(b.isFile)));
      setLoading(false);
      // setTimeout(() => setLoading(false), 1000);
    }).catch(() => {
      console.log(paths, user.userId, bucket)
      if (paths.length === 0 && user.userId === bucket) {
        return alert('error');
      }
      navigate('/storage');
    });
  }, [location, user]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    console.log('this is empty space');
  }, []);

  if (loading) {
    return (
      <Box sx={style.merge('__hc', '__vc', 'w100', { height: '100vh', overflowY: 'auto' })}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer sx={{ flex: '1 1 auto' }} onContextMenu={handleContextMenu}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell width={120} align="right">크기</TableCell>
            <TableCell width={240} align="right">수정 날짜</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {item.map((row) => (
            <ExplorerItem key={row.name} item={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Explorer;

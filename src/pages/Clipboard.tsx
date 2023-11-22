import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from 'src/components/storage/Sidebar';
import VirtualScroll from 'src/components/VirtualScroll';
import ChatBox from 'src/components/clipboard/ChatBox';
import { useLocation } from 'react-router-dom';
import { socket } from 'src/util/wsHelper';
import ClipboardAPI from 'src/api/ClipboardAPI';

const item: string[] = [];

for (let i = 0; i < 10000; i++) {
  item.push('item' + i);
}


const Clipboard: React.FC = () => {
  const location = useLocation();

  const [rows, setRows] = useState(item.map((item) => ({
    height: 50,
    item,
    key: item,
  })));
  ArrayBuffer
  useEffect(() => {
    const bucket = location.pathname.split('/').filter((path) => path !== '')[1];
    socket.emit('EnterRoom', { bucket });
    socket.on('SendMsg', (data) => {
      setRows((prev) => [({
        height: 50,
        item: data.msg.type === 'text' ? data.msg.content : 'file',
        key: data.id,
      }), ...prev]);
    });

    ClipboardAPI.enterRoom(bucket).then((res) => {
      setRows(res.data.map((item) => ({
        height: 50,
        item: item.msg.type === 'text' ? item.msg.content : 'file',
        key: item.id,
      })));
    });

    return () => {
      socket.off('SendMsg');
      socket.emit('LeaveRoom', { bucket });
    };
  }, [location]);

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', display: 'flex', flex: '1 1 auto' }}>
      <Sidebar service="clipboard" />
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
        <VirtualScroll
          items={rows}
          itemsW="1"
          align="center"
          renderf={(item) => <div style={{ borderBottom: '1px solid black', width: '100%', height: '100%' }}>{item}</div>}
          reverse={true}
        />
        <ChatBox />
      </Box>
    </Box>
  );
};

export default Clipboard;

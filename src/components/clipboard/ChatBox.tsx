import React, { useCallback, useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import { createStyle } from 'src/util/styleHelter';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { socket } from 'src/util/wsHelper';

const style = createStyle({
  chatBox: {
    // height: '80px',
    width: '100%',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    background: '#f5f5f5',
    // background: 'red'
  }
});

const ChatBox: React.FC = () => {
  const [txt, setTxt] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bucket = location.pathname.split('/').filter((path) => path !== '')[1];
    socket.emit('MsgArrive', {
      bucket,
      msg: {
        type: 'text',
        content: txt,
      },
    });
    setTxt('');
  }, [txt]);

  return (
    <Box sx={style.sx.chatBox} component="form" onSubmit={handleSubmit}>
      <TextField
        value={txt}
        onChange={(e) => setTxt(e.target.value)}
        sx={{
          width: 'calc(100% - 60px)',
          background: 'white',
        }}
        placeholder="메세지를 입력하세요."
        size="small"
        InputProps={{
          autoComplete: 'off',
          endAdornment: (
            <IconButton>
              <AttachmentIcon />
            </IconButton>
          ),
        }}
      />
    </Box>
  )
};

export default ChatBox;

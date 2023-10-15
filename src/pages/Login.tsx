import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { createStyle } from 'src/util/styleHelter';
import AuthAPI from 'src/api/AuthAPI';
import { useUserStore } from 'src/store';

const style = createStyle({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    backgroundColor: '#f5f5f5',
  },
  rootPaper: {
    padding: '50px 20px',
    width: '300px',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  loginTypo: {
    width: '100%',
    fontFamily: '궁서체',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '30px',
  },
  textField: {
    width: '100%',
    marginY: '10px',
  },
});

const Login: React.FC = () => {
  const { login } = useUserStore((state) => ({ login: state.login }));
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    userId: '',
    password: '',
  });

  const handleLogin = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    AuthAPI.login(loginInfo).then((res) => {
      login({
        name: res.data.name,
        token: res.data.token,
        userId: loginInfo.userId,
      });
      navigate('/');
    }).catch(() => {
      alert('id, password를 확인해주세요.');
    });
  }, [loginInfo]);

  const handleChange = useCallback((type: 'userId' | 'password', value: string) => {
    setLoginInfo((prev) => ({
      ...prev,
      [type]: value,
    }));
  }, []);

  return (
    <Box sx={style.sx.root}>
      <Paper sx={style.sx.rootPaper}>
        <Typography sx={style.sx.loginTypo} variant="h3" component="h1">
          로그인
        </Typography>
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            label="아이디"
            variant="outlined"
            sx={style.sx.textField}
            onChange={(e) => handleChange('userId', e.target.value)}
          />
          <TextField
            label="비밀번호"
            variant="outlined"
            type="password"
            sx={style.sx.textField}
            onChange={(e) => handleChange('password', e.target.value)}
          />
          <Button sx={style.sx.textField} variant="contained" type="submit">
            로그인
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;

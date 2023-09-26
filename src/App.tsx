import React from 'react';
import Router from './Router';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_APP_BASE_URL);

socket.on('connect', () => {
  console.log('connected');
});

socket.on('disconnect', () => {
  console.log('disconnected');
});

socket.on('ExampleWSE', (data) => {
  console.log(data);
});

(window as any).temp = () => socket.emit('ExampleWSL', { id: 11 });

const App: React.FC = () => {
  return (
    <Router />
  );
};

export default App;

import io from 'socket.io-client';

export const socket = io(import.meta.env.VITE_APP_BASE_URL);

export const connectPromise = new Promise<void>((resolve, reject) => {
  socket.on('connect', () => resolve());
  socket.on('connect_error', (err) => reject(err));
});

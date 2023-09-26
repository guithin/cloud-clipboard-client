import React, { useEffect, useState } from 'react';
import Router from './Router';
import GlobalLoading from './components/GlobalLoading';
import { socket, connectPromise } from './util/wsHelper';

(window as any).temp = () => socket.emit('ExampleWSL', { id: 11 });

socket.on('ExampleWSE', (data) => {
  console.log(data);
});

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    connectPromise.then(() => setLoading(false));
  }, []);

  return (
    <>
      <Router />
      <GlobalLoading loading={loading} />
    </>
  );
};

export default App;

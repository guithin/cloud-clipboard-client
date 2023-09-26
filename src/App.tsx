import React, { useEffect, useState } from 'react';
import Router from './Router';
import GlobalLoading from './components/GlobalLoading';
import { socket, connectPromise } from './util/wsHelper';

(window as any).temp = () => socket.emit('api/example/ping', { id: 11 });

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

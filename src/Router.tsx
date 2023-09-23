import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
// import { useUserStore } from './store';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

// const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const location = useLocation();
//   const { userInfo } = useUserStore();

//   if (userInfo === null) {
//     return <Navigate to="/login" state={{ from: location }} />;
//   }

//   return <>{children}</>;
// };

export default Router;